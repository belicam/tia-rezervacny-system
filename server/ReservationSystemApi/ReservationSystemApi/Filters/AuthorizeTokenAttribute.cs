using ReservationSystemApi.Models;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using System.Web.Http.Controllers;

namespace ReservationSystemApi.Filters
{
    public class AuthorizeTokenAttribute : AuthorizeAttribute
    {
        private ReservationSystemApiContext db = new ReservationSystemApiContext();

        public override void OnAuthorization(HttpActionContext actionContext)
        {
            if (AuthorizeRequest(actionContext))
            {
                return;
            }

            HandleUnauthorizedRequest(actionContext);
        }

        protected override void HandleUnauthorizedRequest(HttpActionContext actionContext)
        {
            actionContext.Response = new HttpResponseMessage(HttpStatusCode.Unauthorized);
        }

        private bool AuthorizeRequest(HttpActionContext actionContext)
        {
            try
            {
                IEnumerable<string> vals;
                if (actionContext.Request.Headers.TryGetValues("Reserv-Sys-Token", out vals))
                {
                    string token = vals.First();
                    Token dbtoken = db.Tokens.Where(t => t.AccessToken == token).FirstOrDefault();

                    if (dbtoken == null)
                    {
                        return false;
                    }
                }
            }
            catch (NullReferenceException e)
            {
                return false;
            }

            return true;
        }

    }
}