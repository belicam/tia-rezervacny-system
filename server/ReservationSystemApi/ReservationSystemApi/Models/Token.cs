using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace ReservationSystemApi.Models
{
    public class Token
    {
        public Token()
        {

        }

        public int Id { get; set; }

        [Index(IsUnique = true)]
        [MaxLength(255)]
        public string AccessToken { get; set; }
    }
}