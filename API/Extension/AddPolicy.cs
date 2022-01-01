using System.Linq;
using Infrastructure.Security;
using Microsoft.AspNetCore.Authorization;
using Microsoft.Extensions.DependencyInjection;

namespace API.Extension
{
    public static class AddPolicy
    {

        public static IServiceCollection AddPolicyAuth(this IServiceCollection services)
        {

            services.AddAuthorization(op =>
             {
                 var policyBuilder = new AuthorizationPolicyBuilder();
                 op.FallbackPolicy = policyBuilder.RequireAuthenticatedUser().Build();

                 op.AddPolicy("SampleReceive", policy => policy.Requirements.Add(new DepartmentAndTitleRequirement("SampleReceive")));
                 op.AddPolicy("SampleOperate", policy => policy.Requirements.Add(new DepartmentAndTitleRequirement("SampleReceive", "Header")));

                 op.AddPolicy("Microbiology", policy => policy.Requirements.Add(new DepartmentAndTitleRequirement("Microbiology")));
                 op.AddPolicy("MicrobiologyOperate", policy => policy.Requirements.Add(new DepartmentAndTitleRequirement("Microbiology", "Header")));

                 op.AddPolicy("Report", policy => policy.Requirements.Add(new DepartmentAndTitleRequirement("Report")));
                 op.AddPolicy("ReportOperate", policy => policy.Requirements.Add(new DepartmentAndTitleRequirement("Report", "Header")));

                 op.AddPolicy("Manager", policy => policy.Requirements.Add(new DepartmentAndTitleRequirement("Manager")));
                 op.AddPolicy("ManagerOperate", policy => policy.Requirements.Add(new DepartmentAndTitleRequirement("Manager", "Header")));

                 op.AddPolicy("HeaderLevel", policy => policy.RequireClaim("Title", "Header"));
                 op.AddPolicy("CustomerService", policy => policy.Requirements.Add(new DepartmentAndTitleRequirement("CustomerService")));

             });
            services.AddTransient<IAuthorizationHandler, DepartmentAndTitleRequirementHandler>();


            return services;
        }
    }
}