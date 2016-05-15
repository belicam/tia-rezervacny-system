using Newtonsoft.Json;
using ReservationSystemApi.Filters;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace ReservationSystemApi.Models
{
    public class Event
    {
        public Event()
        {
        }

        public int Id { get; set; }

        [Required(ErrorMessage="Name of event is required")]
        public string Name { get; set; }

        [Required(ErrorMessage = "Duration of event is required")]
        [Range(0, int.MaxValue)]
        public int Duration { get; set; }
        
        public string About { get; set; }

        [DateMinNow(ErrorMessage="Date must be older than now.")]
        [Required(ErrorMessage = "Start date of event is required")]
        public DateTime Start { get; set; }

        [Required(ErrorMessage = "Event ticket price is required")]
        [Range(0, int.MaxValue)]
        public int TicketPrice { get; set; }

        [Required(ErrorMessage = "Event hall is required")]
        public Hall Hall { get; set; }

        [JsonIgnore]
        public User Owner { get; set; }
    }

    public class EventPublic
    {
        public EventPublic(Event evt)
        {
            this.Id = evt.Id;
            this.Name = evt.Name;
            this.Duration = evt.Duration;
            this.About = evt.About;
            this.Start = evt.Start;
            this.TicketPrice = evt.TicketPrice;
            this.Hall = evt.Hall;
            this.Owner = new UserPublic(evt.Owner);
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public int Duration { get; set; }
        public string About { get; set; }
        public DateTime Start { get; set; }
        public int TicketPrice { get; set; }
        public Hall Hall { get; set; }

        [JsonIgnore]
        public UserPublic Owner { get; set; }
    }

    public class EventCreate
    {
        [Required(ErrorMessage = "Name of event is required")]
        public string Name { get; set; }
        
        [Required(ErrorMessage = "Duration is required")]
        public int Duration { get; set; }
        
        public string About { get; set; }
        
        [Required(ErrorMessage = "Start datetime is required")]
        public DateTime Start { get; set; }

        [Required(ErrorMessage = "TicketPrice is required")]
        public int TicketPrice { get; set; }
        
        [Required(ErrorMessage = "Hall id is required")]
        public int Hall { get; set; }
    }

}