using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations;

namespace ReservationSystemApi.Models
{
    public class Reservation
    {
        public Reservation()
        {

        }

        public int Id { get; set; }

        [Required(ErrorMessage = "Event is required.")]
        public Event Event { get; set; }

        [JsonIgnore]
        public User Owner { get; set; }

        [Required(ErrorMessage = "Row is required.")]
        public Row Row { get; set; }

        [Required(ErrorMessage = "Seat is required.")]
        public Seat Seat { get; set; }
    }

    public class ReservationPublic
    {
        public ReservationPublic()
        {

        }

        [Required(ErrorMessage = "Event id is required.")]
        public int Event { get; set; }

        [JsonIgnore]
        public User Owner { get; set; }

        [Required(ErrorMessage = "Row id is required.")]
        public int Row { get; set; }

        [Required(ErrorMessage = "Seat id is required.")]
        public int Seat { get; set; }
    }
}