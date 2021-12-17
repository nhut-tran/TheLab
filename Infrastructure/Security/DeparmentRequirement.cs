
using System.Collections.Generic;
using Microsoft.AspNetCore.Authorization;

namespace Infrastructure.Security
{
    public abstract class DeparmentRequirement : IAuthorizationRequirement
    {
        public abstract string Department { get; set; }
        public abstract IEnumerable<string> Title { get; set; }
    }
}