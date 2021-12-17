using System;
using System.Net;
using System.Net.Http;
using System.Text.Json;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Microsoft.Extensions.Hosting;

namespace API.ErrorHandle
{
    public class Error
    {

        public class ExceptionErr
        {

            public int StatusCode { get; set; }
            public string Message { get; set; }
            public string Details { get; set; }
        }

        public static async Task HandleExceptionError(HttpContext context, IWebHostEnvironment env)
        {
            var exception = context.Features.Get<IExceptionHandlerFeature>().Error;
            context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
            context.Response.ContentType = "application/json";
            var err = new ExceptionErr()
            {
                StatusCode = context.Response.StatusCode,
                Message = env.IsDevelopment() ? exception.Message : "Server Error",
                Details = env.IsDevelopment() ? exception.StackTrace : "Some thing went wrong"
            };
            var option = new JsonSerializerOptions() { PropertyNamingPolicy = JsonNamingPolicy.CamelCase };
            var json = JsonSerializer.Serialize(err, option);

            await context.Response.WriteAsync(json);

        }
    }
}