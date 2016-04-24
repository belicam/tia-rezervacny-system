using ReservationSystemApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Security.Cryptography;
using System.Text;
using System.Web;

namespace ReservationSystemApi.Services
{
    public class TokenService
    {
        private ReservationSystemApiContext db = new ReservationSystemApiContext();
        
        private const string _alg = "HmacSHA256";
        private const string _salt = "yeTX0tz7bEjizgk6UxxN"; // Generated at https://www.random.org/strings


        public Token CreateToken(User user)
        {
            Token token = new Token();
            token.AccessToken = GenerateToken(user.Email, user.Password);

            return token;
        }

        public string getTokenFromHeader(HttpRequestMessage request) {
            try
            {
                IEnumerable<string> vals;
                if (request.Headers.TryGetValues("Reserv-Sys-Token", out vals))
                {
                    string token = vals.First();
                    Token dbtoken = db.Tokens.Where(t => t.AccessToken == token).FirstOrDefault();

                    if (dbtoken == null)
                    {
                        return null;
                    }

                    return dbtoken.AccessToken;
                }
            }
            catch (NullReferenceException e)
            {
                return null;
            }

            return null;
        }


        public static string GenerateToken(string username, string password)
        {
            string hash = string.Join(":", new string[] { username, new DateTime().ToString() });
            string hashLeft = "";
            string hashRight = "";

            using (HMAC hmac = HMACSHA256.Create(_alg))
            {
                hmac.Key = Encoding.UTF8.GetBytes(GetHashedPassword(password));
                hmac.ComputeHash(Encoding.UTF8.GetBytes(hash));

                hashLeft = Convert.ToBase64String(hmac.Hash);
                hashRight = string.Join(":", new string[] { username, new DateTime().ToString() });
            }

            return Convert.ToBase64String(Encoding.UTF8.GetBytes(string.Join(":", hashLeft, hashRight)));
        }

        private static string GetHashedPassword(string password)
        {
            string key = string.Join(":", new string[] { password, _salt });

            using (HMAC hmac = HMACSHA256.Create(_alg))
            {
                // Hash the key.
                hmac.Key = Encoding.UTF8.GetBytes(_salt);
                hmac.ComputeHash(Encoding.UTF8.GetBytes(key));

                return Convert.ToBase64String(hmac.Hash);
            }
        }
    }
}