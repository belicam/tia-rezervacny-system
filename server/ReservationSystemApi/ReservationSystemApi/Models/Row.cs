using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace ReservationSystemApi.Models
{
    public class Row
    {
        public Row()
        {

        }

        public int Id { get; set; }

        [Required(ErrorMessage = "Number of row is required.")]
        public int Number { get; set; }

        [Required(ErrorMessage = "Seats in row are required.")]
        public ICollection<Seat> Seats { get; set; }
    }
}