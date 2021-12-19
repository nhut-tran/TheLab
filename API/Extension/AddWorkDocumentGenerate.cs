using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Service;
using Application.Service.GenerateWorkSheet;
using Microsoft.Extensions.DependencyInjection;

namespace API.Extension
{
    public static class AddWorkDocumentGenerate
    {
        public static IServiceCollection AddWordDocument(this IServiceCollection services)
        {
            services.AddSingleton<Report>();
            services.AddSingleton<WorkSheetInfo>();
            services.AddSingleton<SampleInfo>();
            services.AddSingleton<GenerateWorkSheet>();
            return services;
        }
    }
}