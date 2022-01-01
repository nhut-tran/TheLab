using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Application.Service.EmailService
{
    public class EmailSConfigure
    {
        public string Host { get; set; }
        public int Port { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }

        public EmailContentType EmailContentType { get; set; }

    }
}