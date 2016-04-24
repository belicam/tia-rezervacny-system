using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace ReservationSystemApi.Filters
{
    public class DateMinNowAttribute : RangeAttribute
    {
        public DateMinNowAttribute()
            : base(typeof(DateTime), DateTime.Now.ToShortDateString(), DateTime.MaxValue.ToShortDateString()) { }
    }
}