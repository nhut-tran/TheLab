using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;

namespace Domain
{
    public class AppUser : IdentityUser
    {
        public string DisplayName { get; set; }
        public string Role { get; set; }

        public Department Department { get; set; }
        public string DepartmentID { get; set; }
        public string Title { get; set; }

        public ICollection<Token> Token { get; set; } = new List<Token>();


    }
}