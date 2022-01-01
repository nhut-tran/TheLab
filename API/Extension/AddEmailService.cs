using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Service.EmailService;
using Microsoft.Extensions.DependencyInjection;

namespace API.Extension
{
    public static class AddEmailService
    {
        public static IServiceCollection AddEmailServices(this IServiceCollection services, Action<EmailSConfigure> conf)
        {
            services.Configure(conf);
            services.AddSingleton<IEmailSender, EmailSender>();
            return services;
        }
    }
}