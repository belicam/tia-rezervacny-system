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
using ReservationSystemApi.Services;
using ReservationSystemApi.Filters;
using System.ComponentModel.DataAnnotations;
using System.Web.Http.ModelBinding;

namespace ReservationSystemApi.Controllers
{
    [RoutePrefix("api/event")]
    public class EventController : ApiController
    {
        private ReservationSystemApiContext db = new ReservationSystemApiContext();
        private TokenService ts = new TokenService();

        [Route("")]
        [HttpGet]
        public IQueryable<Event> GetEvents()
        {
            return db.Events;
        }

        [Route("{id:int}")]
        [HttpGet]
        [ResponseType(typeof(Event))]
        public IHttpActionResult GetEvent(int id)
        {
            Event @event = db.Events.Include("Hall").Include("Hall.Rows").Include("Hall.Rows.Seats")
                .Where(e => e.Id == id).SingleOrDefault();

            if (@event == null)
            {
                return NotFound();
            }

            return Ok(@event);
        }

        [Route("orderedByDate")]
        [HttpGet]
        public IHttpActionResult GetEventsOrderedByDate()
        {
            try
            {
                var evts = db.Events.Include("Hall").OrderBy(e => e.Start);
                return Ok(evts);
            }
            catch (Exception e)
            {
                return InternalServerError(e);
            }
        }


        [AuthorizeToken]
        [Route("byOwner")]
        [HttpGet]
        [ResponseType(typeof(Event))]
        public IHttpActionResult GetEventsByOwnerId()
        {
            try
            {
                string headerToken = ts.getTokenFromHeader(Request);
                User u = db.Users.Include("Token")
                    .Where(us => us.Token.AccessToken == headerToken).FirstOrDefault();

                ICollection<Event> events = db.Events.Include("Hall").Include("Owner")
                    .Where(e => e.Owner.Id == u.Id).OrderBy(e => e.Start).ToArray();

                if (events == null)
                {
                    return NotFound();
                }
                return Ok(events);
            }
            catch (Exception e)
            {
                return InternalServerError(e);
            }
        }

        [AuthorizeToken]
        [Route("{id:int}")]
        [HttpPut]
        public IHttpActionResult PutEvent(int id, Event @event)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != @event.Id)
            {
                return BadRequest();
            }

            db.Entry(@event).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!EventExists(id))
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
        [ResponseType(typeof(EventPublic))]
        public IHttpActionResult PostEvent(EventCreate @event)
        {
            try
            {
                string headerToken = ts.getTokenFromHeader(Request);
                User u = db.Users.Include("Token")
                    .Where(us => us.Token.AccessToken == headerToken).FirstOrDefault();

                Hall eventHall = db.Halls.Find(@event.Hall);

                Event newEvent = new Event();
                newEvent.Owner = u;
                newEvent.Hall = eventHall;
                newEvent.Name = @event.Name;
                newEvent.Duration = @event.Duration;
                newEvent.Start = @event.Start;
                newEvent.TicketPrice = @event.TicketPrice;
                newEvent.About = @event.About;

                var results = new List<ValidationResult>();
                var context = new ValidationContext(newEvent, serviceProvider: null, items: null);
                var isValid = Validator.TryValidateObject(newEvent, context, results);

                if (!isValid)
                {
                    var modelState = new ModelStateDictionary();
                    foreach (var validationResult in results)
                        modelState.AddModelError(validationResult.MemberNames.ToArray()[0], validationResult.ErrorMessage);

                    return BadRequest(modelState);
                }


                db.Events.Add(newEvent);
                db.SaveChanges();

                return Ok(new EventPublic(newEvent));
            }
            catch (Exception e)
            {
                return InternalServerError(e);
            }
        }

        [AuthorizeToken]
        [Route("{id:int}")]
        [HttpDelete]
        [ResponseType(typeof(Event))]
        public IHttpActionResult DeleteEvent(int id)
        {
            Event @event = db.Events.Find(id);
            if (@event == null)
            {
                return NotFound();
            }

            db.Events.Remove(@event);
            db.SaveChanges();

            return Ok(@event);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool EventExists(int id)
        {
            return db.Events.Count(e => e.Id == id) > 0;
        }
    }
}