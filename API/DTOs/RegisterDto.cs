using System.ComponentModel.DataAnnotations;
using Domain;

namespace API.DTOs
{
    public class RegisterDto
    {


        public string UserName { get; set; }

        public string Department { get; set; }
        public string Email { get; set; }

        public string Role { get; set; }

        public string Title { get; set; }


        public string Password { get; set; }
    }
}