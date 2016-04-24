using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;
using System.Web.Http.ModelBinding;

namespace ReservationSystemApi.Services
{
    public class ValidatorService
    {
        public ModelStateDictionary validateModel(Object o)
        {
            var results = new List<ValidationResult>();
            var context = new ValidationContext(o, serviceProvider: null, items: null);
            var isValid = Validator.TryValidateObject(o, context, results);

            if (!isValid)
            {
                var modelState = new ModelStateDictionary();
                foreach (var validationResult in results)
                    modelState.AddModelError(validationResult.MemberNames.ToArray()[0], validationResult.ErrorMessage);
                
                return modelState;
            }

            return new ModelStateDictionary();
        }
    }
}