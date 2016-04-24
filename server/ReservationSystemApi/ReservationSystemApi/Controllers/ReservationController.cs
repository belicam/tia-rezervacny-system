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
using System.ComponentModel.DataAnnotations;
using System.Web.Http.ModelBinding;

namespace ReservationSystemApi.Controllers
{
    [RoutePrefix("api/reservation")]
    [AuthorizeToken]
    public class ReservationController : ApiController
    {
        private ReservationSystemApiContext db = new ReservationSystemApiContext();
        private TokenService ts = new TokenService();
        private ValidatorService vs = new ValidatorService();

        [Route("")]
        [HttpGet]
        public IQueryable<Reservation> GetReservations()
        {
            return db.Reservations;
        }

        [Route("{id:int}")]
        [HttpGet]
        [ResponseType(typeof(Reservation))]
        public IHttpActionResult GetReservation(int id)
        {
            Reservation reservation = db.Reservations.Find(id);
            if (reservation == null)
            {
                return NotFound();
            }

            return Ok(reservation);
        }


        [Route("byEvent/{id:int}")]
        [HttpGet]
        [ResponseType(typeof(Seat))]
        public IHttpActionResult GetEventReservations(int id)
        {
            try
            {
                var reservations = db.Reservations.Include("Event").Include("Event.Hall").Include("Row")
                    .Include("Seat").Where(r => r.Event.Id == id).ToList<Reservation>();

                List<Seat> reservedSeats = new List<Seat>();

                reservations.ForEach(r => reservedSeats.Add(r.Seat));

                if (reservations == null)
                {
                    return NotFound();
                }

                return Ok(reservedSeats);
            }
            catch (Exception e)
            {
                return InternalServerError(e);
            }
        }


        [Route("byOwner")]
        [HttpGet]
        [ResponseType(typeof(Reservation))]
        public IHttpActionResult GetReservationsByOwnerId()
        {
            try
            {
                string headerToken = ts.getTokenFromHeader(Request);
                User u = db.Users.Include("Token")
                    .Where(us => us.Token.AccessToken == headerToken).FirstOrDefault();

                var reservations = db.Reservations.Include("Event").Include("Event.Hall").Include("Owner")
                    .Include("Row").Include("Seat").Where(r => r.Owner.Id == u.Id);

                if (reservations == null)
                {
                    return NotFound();
                }
                return Ok(reservations);
            }
            catch (Exception e)
            {
                return InternalServerError(e);
            }
        }

        [Route("{id:int}")]
        [HttpPut]
        public IHttpActionResult PutReservation(int id, Reservation reservation)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != reservation.Id)
            {
                return BadRequest();
            }

            db.Entry(reservation).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ReservationExists(id))
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


        [Route("multiple")]
        [HttpPost]
        [ResponseType(typeof(Reservation))]
        public IHttpActionResult PostMultipleReservations(List<ReservationPublic> reservations)
        {
            try
            {
                string headerToken = ts.getTokenFromHeader(Request);
                User u = db.Users.Include("Token")
                    .Where(us => us.Token.AccessToken == headerToken).FirstOrDefault();

                List<Reservation> newReservations = new List<Reservation>();

                reservations.ForEach(r =>
                {
                    Reservation reservation = new Reservation();
                    reservation.Event = db.Events.Find(r.Event);
                    reservation.Row = db.Rows.Find(r.Row);
                    reservation.Seat = db.Seats.Find(r.Seat);
                    reservation.Owner = u;

                    newReservations.Add(reservation);
                });

                foreach (Reservation r in newReservations) {
                    var ms = vs.validateModel(r);
                    if (ms.Count > 0)
                    {
                        return BadRequest(ms);
                    }
                }

                db.Reservations.AddRange(newReservations);

                db.SaveChanges();
                return Ok();
            }
            catch (Exception e)
            {
                return InternalServerError(e);
            }
        }

        [Route("{id:int}")]
        [HttpDelete]
        [ResponseType(typeof(Reservation))]
        public IHttpActionResult DeleteReservation(int id)
        {
            Reservation reservation = db.Reservations.Find(id);
            if (reservation == null)
            {
                return NotFound();
            }

            db.Reservations.Remove(reservation);
            db.SaveChanges();

            return Ok(reservation);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool ReservationExists(int id)
        {
            return db.Reservations.Count(e => e.Id == id) > 0;
        }
    }
}