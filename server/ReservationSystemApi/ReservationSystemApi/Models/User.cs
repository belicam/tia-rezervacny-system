using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace ReservationSystemApi.Models
{
    public class User
    {
        public User()
        {
            this.IsAdmin = false;
            this.Deactivated = false;
        }

        public int Id { get; set; }

        [Required(ErrorMessage = "Password is required.")]
        [MinLength(5, ErrorMessage= "Password length must be at least {1} characters.")]
        public string Password { get; set; }

        [Index(IsUnique = true)]
        [MaxLength(255)]
        [EmailAddress(ErrorMessage = "The Email Address is not valid.")]
        [Required(ErrorMessage = "Email is required.")]
        public string Email { get; set; }

        public bool IsOrganizer { get; set; }

        [Required(ErrorMessage = "Name is required.")]
        public string Name { get; set; }

        [JsonIgnore]
        public Token Token { get; set; }

        [JsonIgnore]
        public bool IsAdmin { get; set; }
 
        [JsonIgnore]
        public bool Deactivated { get; set; }
    }

    public class UserInfo
    {
        public int Id { get; set; }

        [JsonIgnore]
        public string Password { get; set; }

        public string Email { get; set; }
        public bool IsOrganizer { get; set; }
        public string Name { get; set; }
        public Token Token { get; set; }
        public bool IsAdmin { get; set; }

        public UserInfo()
        {

        }

        public UserInfo (User user) {
            this.Id = user.Id;
            this.Password = user.Password;
            this.Email = user.Email;
            this.IsOrganizer = user.IsOrganizer;
            this.Token = user.Token;
            this.Name = user.Name;
            this.IsAdmin = user.IsAdmin;
        }
    }

    public class UserPublic // for admin listing users
    {
        public int Id { get; set; }

        [JsonIgnore]
        public string Password { get; set; }

        public string Email { get; set; }

        public bool IsOrganizer { get; set; }

        public string Name { get; set; }

        public bool IsAdmin { get; set; }

        public bool Deactivated { get; set; }

        public UserPublic(User user)
        {
            this.Id = user.Id;
            this.Password = user.Password;
            this.Email = user.Email;
            this.IsOrganizer = user.IsOrganizer;
            this.Name = user.Name;
            this.IsAdmin = user.IsAdmin;
            this.Deactivated = user.Deactivated;
        }

    }

}