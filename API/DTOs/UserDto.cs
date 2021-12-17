using API.Services;

namespace API.DTOs
{
    public class UserDto
    {
        public string UserName { get; set; }
        public string Email { get; set; }

        public TokenRespone Token { get; set; }

        public string Title { get; set; }
        public string Department { get; set; }
        public string Photo { get; set; }
    }
}