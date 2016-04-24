using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace ReservationSystemApi.Models
{
    public class Seat
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "Number of seat is required.")]
        public int Number { get; set; }
      
        [Required(ErrorMessage = "Coordinate X of seat is required.")]
        public double x { get; set; }
        
        [Required(ErrorMessage = "Coordinate Y of seat is required.")]
        public double y { get; set; }  
    }
}