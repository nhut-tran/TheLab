using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;


namespace Infrastructure.Security
{
    public class DepartmentAndTitleRequirement : DeparmentRequirement, IAuthorizationRequirement
    {
        public DepartmentAndTitleRequirement(string requirement)
        {
            Department = requirement;
        }

        public DepartmentAndTitleRequirement(string requirement, string title)
        : this(requirement)
        {
            Title = Title.Append(title);
        }
        public override string Department { get; set; }
        public override IEnumerable<string> Title { get; set; } = new List<string>();
    }

    public class DepartmentAndTitleRequirementHandler : AuthorizationHandler<DeparmentRequirement>
    {
        protected override Task HandleRequirementAsync(AuthorizationHandlerContext context, DeparmentRequirement requirement)
        {
            if (context.User == null) return Task.CompletedTask;

            var userDepartment = context.User.FindFirstValue("Department");
            var userTitle = context.User.FindFirstValue("Title");
            var titleRequired = !requirement.Title.Any() || requirement.Title.Contains(userTitle);
            if (userDepartment == requirement.Department && titleRequired)
            {
                context.Succeed(requirement);
            }
            else
            {
                context.Fail();
            }
            return Task.CompletedTask;
        }

    }

}