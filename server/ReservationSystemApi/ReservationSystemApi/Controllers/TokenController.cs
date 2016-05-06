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

namespace ReservationSystemApi.Controllers
{
    [RoutePrefix("api/token")]
    [AuthorizeToken]
    public class TokenController : ApiController
    {
        private ReservationSystemApiContext db = new ReservationSystemApiContext();
        private TokenService tokenService;

        private TokenController() {
            tokenService = new TokenService();
        }

        [Route("")]
        [HttpGet]
        [ResponseType(typeof (Token))]
        public IQueryable<Token> GetTokens()
        {
            return db.Tokens;
        }

        [Route("{id:int}")]
        [HttpGet]
        [ResponseType(typeof(Token))]
        public IHttpActionResult GetToken(int id)
        {
            Token token = db.Tokens.Find(id);
            if (token == null)
            {
                return NotFound();
            }

            return Ok(token);
        }

        [Route("{id:int}")]
        [HttpPut]
        public IHttpActionResult PutToken(int id, Token token)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != token.Id)
            {
                return BadRequest();
            }

            db.Entry(token).State = System.Data.Entity.EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TokenExists(id))
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


        [Route("{id:int}")]
        [HttpDelete]
        [ResponseType(typeof(Token))]
        public IHttpActionResult DeleteToken(int id)
        {
            Token token = db.Tokens.Find(id);
            if (token == null)
            {
                return NotFound();
            }

            db.Tokens.Remove(token);
            db.SaveChanges();

            return Ok(token);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool TokenExists(int id)
        {
            return db.Tokens.Count(e => e.Id == id) > 0;
        }
    }
}