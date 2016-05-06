using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using ReservationSystemApi.Models;
using ReservationSystemApi.Filters;
using ReservationSystemApi.Services;
using System.Collections;

namespace ReservationSystemApi.Controllers
{
    [RoutePrefix("api/hall")]
    public class HallController : ApiController
    {
        private ReservationSystemApiContext db = new ReservationSystemApiContext();
        private TokenService ts = new TokenService();

        [Route("")]
        [HttpGet]
        public IQueryable<Hall> GetHalls()
        {
            return db.Halls;
        }

        [Route("{id:int}")]
        [HttpGet]
        [ResponseType(typeof(Hall))]
        public IHttpActionResult GetHall(int id)
        {
            Hall hall = db.Halls.Include(h => h.Rows.Select(r => r.Seats)).Include("Owner")
                    .Where(e => e.Id == id).SingleOrDefault();

            if (hall == null)
            {
                return NotFound();
            }

            return Ok(new HallPublic(hall));
        }

        [AuthorizeToken]
        [Route("byOwner")]
        [HttpGet]
        [ResponseType(typeof(Hall))]
        public IHttpActionResult GetHallsByOwnerId()
        {
            try
            {
                string headerToken = ts.getTokenFromHeader(Request);
                User u = db.Users.Include("Token")
                    .Where(us => us.Token.AccessToken == headerToken).FirstOrDefault();

                ICollection<Hall> halls = db.Halls
                    .Include(h => h.Rows.Select(r => r.Seats)).Include("Owner")
                    .Where(e => e.Owner.Id == u.Id).ToArray();

                if (halls == null)
                {
                    return NotFound();
                }

                List<HallOwner> res = new List<HallOwner>();

                foreach (Hall hall in halls)
                {
                    var hasreservations = false;
                    foreach (Event e in db.Events.Include("Hall").Where(e => e.Hall.Id == hall.Id).ToList())
                    {
                        hasreservations = hasreservations || e.HasReservations;
                    }

                    res.Add(new HallOwner(hall, hasreservations));
                }

                return Ok(res);
            }
            catch (Exception e)
            {
                return InternalServerError(e);
            }
        }


        [AuthorizeToken]
        [Route("{id:int}")]
        [HttpPut]
        public IHttpActionResult PutHall(int id, Hall newHall)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != newHall.Id)
            {
                return BadRequest();
            }

            try
            {
                Hall existingHall = db.Halls
                        .Include(h => h.Rows.Select(r => r.Seats)).Include("Owner")
                        .Where(e => e.Id == id).SingleOrDefault();


                existingHall.Rows.ToList<Row>().ForEach(r => { r.Seats.ToList<Seat>().ForEach(s => db.Seats.Remove(s)); db.Rows.Remove(r); });

                db.Entry(existingHall).CurrentValues.SetValues(newHall);
                existingHall.Rows = newHall.Rows;

                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!HallExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        [AuthorizeToken]
        [Route("")]
        [HttpPost]
        [ResponseType(typeof(Hall))]
        public IHttpActionResult PostHall(Hall hall)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }


            try
            {
                string headerToken = ts.getTokenFromHeader(Request);
                User u = db.Users.Include("Token")
                    .Where(us => us.Token.AccessToken == headerToken).FirstOrDefault();

                hall.Owner = u;
                db.Halls.Add(hall);
                db.SaveChanges();

                return Ok(new HallPublic(hall));
            }
            catch (Exception e)
            {
                return InternalServerError(e);
            }
        }

        [AuthorizeToken]
        [Route("{id:int}")]
        [HttpDelete]
        [ResponseType(typeof(Hall))]
        public IHttpActionResult DeleteHall(int id)
        {
            Hall hall = db.Halls.Include(h => h.Rows.Select(r => r.Seats)).Include("Owner")
                .Where(e => e.Id == id).SingleOrDefault();
            ;
            if (hall == null)
            {
                return NotFound();
            }


            hall.Rows.ToList<Row>().ForEach(r => { r.Seats.ToList<Seat>().ForEach(s => db.Seats.Remove(s)); db.Rows.Remove(r); });

            db.Halls.Remove(hall);
            db.SaveChanges();

            return Ok(hall);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool HallExists(int id)
        {
            return db.Halls.Count(e => e.Id == id) > 0;
        }
    }
}