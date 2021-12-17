using Application.Validator;
using Domain;
using FluentValidation;
using Microsoft.Extensions.DependencyInjection;

namespace API.Extension
{
    public static class AddValidator
    {


        public static IServiceCollection AddValidate(this IServiceCollection services)

        {

            services.AddTransient<IValidator<Method>, MethodValidator>();
            services.AddTransient<IValidator<Sample>, SampleValidator>();
            services.AddTransient<IValidator<WorkSheet>, WorkSheetValidator>();
            services.AddTransient<IValidator<Department>, DepartmentValidator>();
            services.AddTransient<IValidator<SampleMethodAssigment>, SampleMethodAssigmentValidator>();

            return services;
        }
    }
}