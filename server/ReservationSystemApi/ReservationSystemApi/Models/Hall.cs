using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace ReservationSystemApi.Models
{
    public class Hall
    {
        public Hall()
        {

        }

        public int Id { get; set; }

        [Required(ErrorMessage = "Name of hall is required.")]
        public string Name { get; set; }

        [JsonIgnore]
        public User Owner { get; set; }

        [Required(ErrorMessage = "Rows must not be empty.")]
        public ICollection<Row> Rows { get; set; }

        [Required(ErrorMessage = "Coordinate X of screen is required.")]
        public double ScreenX { get; set; }

        [Required(ErrorMessage = "Coordinate Y of screen is required.")]
        public double ScreenY { get; set; }
    }

    public class HallPublic
    {
        public HallPublic(Hall hall)
        {
            this.Id = hall.Id;
            this.Name = hall.Name;
            this.Owner = new UserPublic(hall.Owner);
            this.Rows = hall.Rows;
            this.ScreenX = hall.ScreenX;
            this.ScreenY = hall.ScreenY;
        }

        public int Id { get; set; }
        public string Name { get; set; }

        [JsonIgnore]
        public UserPublic Owner { get; set; }
        public ICollection<Row> Rows { get; set; }
        public double ScreenX { get; set; }
        public double ScreenY { get; set; }
    }

    public class HallOwner
    {
        public HallOwner(Hall hall)
        {
            this.Id = hall.Id;
            this.Name = hall.Name;
            this.Owner = new UserPublic(hall.Owner);
            this.Rows = hall.Rows;
            this.ScreenX = hall.ScreenX;
            this.ScreenY = hall.ScreenY;
        }

        public int Id { get; set; }
        public string Name { get; set; }

        [JsonIgnore]
        public UserPublic Owner { get; set; }
        public ICollection<Row> Rows { get; set; }
        public double ScreenX { get; set; }
        public double ScreenY { get; set; }
    }
}