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
using System.Text;
using CryptSharp;
using System.Runtime.CompilerServices;
using ReservationSystemApi.Services;

namespace ReservationSystemApi.Controllers
{
    [RoutePrefix("api/user")]
    public class UserController : ApiController
    {

        private ReservationSystemApiContext db = new ReservationSystemApiContext();
        private TokenService ts = new TokenService();

        [Route("")]
        [HttpGet]
        [ResponseType(typeof(User))]
        public IHttpActionResult GetUsers()
        {
            return Ok(db.Users);
        }

        [Route("{id:int}")]
        [HttpGet]
        [ResponseType(typeof(User))]
        public IHttpActionResult GetUser(int id)
        {
            User user = db.Users.Find(id);
            if (user == null)
            {
                return NotFound();
            }

            return Ok(user);
        }

        [Route("login")]
        [HttpPost]
        [ResponseType(typeof(UserInfo))]
        public IHttpActionResult LoginUser(User user)
        {
            try
            {
                var dbuser = db.Users.Include("Token")
                    .Where(u => (u.Email == user.Email))
                    .FirstOrDefault();

                if (dbuser == null)
                {
                    return NotFound();
                }

                if (Crypter.CheckPassword(user.Password, dbuser.Password))
                {
                    if (dbuser.Token == null)
                    {
                        Token token = ts.CreateToken(dbuser);
                        token = db.Tokens.Add(token);

                        dbuser.Token = token;
                        db.Entry(dbuser).State = System.Data.Entity.EntityState.Modified;
                        try
                        {
                            db.SaveChanges();
                        }
                        catch (DbUpdateException)
                        {
                        }
                    }

                    return Ok(new UserInfo(dbuser));
                }
                else
                {
                    return BadRequest(ModelState);
                }
            }
            catch (Exception e)
            {
                return InternalServerError(e);
            }
        }


        [Route("signup")]
        [HttpPost]
        [ResponseType(typeof(UserInfo))]
        public IHttpActionResult SignupUser(User user)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            User dbuser = db.Users.Where(u => u.Email == user.Email).FirstOrDefault();
            if (dbuser != null)
            {
                return BadRequest("Email already signed up.");
            }
            else
            {
                user.Password = Crypter.Blowfish.Crypt(user.Password);
                
                Token token = ts.CreateToken(user);
                token = db.Tokens.Add(token);
                user.Token = token;
                
                db.Users.Add(user);
                db.SaveChanges();

                UserInfo userInfo = new UserInfo(user);

                return Ok(userInfo);
            }
        }


        [Route("{id:int}")]
        [HttpPut]
        public IHttpActionResult PutUser(int id, User user)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != user.Id)
            {
                return BadRequest();
            }

            db.Entry(user).State = System.Data.Entity.EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserExists(id))
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
        public IHttpActionResult DeleteUser(int id)
        {
            User user = db.Users.Include("Token").SingleOrDefault(u => u.Id == id);

            if (user == null)
            {
                return NotFound();
            }

            try
            {
                db.Tokens.Remove(user.Token);
            }
            catch (ArgumentNullException e)
            {

            }

            db.Users.Remove(user);
            db.SaveChanges();

            return Ok();
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool UserExists(int id)
        {
            return db.Users.Count(e => e.Id == id) > 0;
        }
    }
}