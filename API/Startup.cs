using System;
using System.Text;
using API.ErrorHandle;
using API.Extension;
using API.Options;
using API.Services;
using Application.Core;
using Application.Interface;
using Application.Method;
using Application.Service;
using Application.Service.GenerateWorkSheet;
using Domain;
using Infrastructure.Security;
using MediatR;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using Persistence;

namespace API
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {

            services.AddControllers();

            services.AddIdentityCore<AppUser>(opt =>
            {
                opt.Password.RequireNonAlphanumeric = false;


            }).AddEntityFrameworkStores<DataContext>()

            .AddSignInManager<SignInManager<AppUser>>();

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("Super Super Key Super Super Key"));
            services.AddAuthentication(op =>
            {
                op.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                op.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
                op.DefaultForbidScheme = JwtBearerDefaults.AuthenticationScheme;
            })
            .AddJwtBearer(op =>
            {
                op.TokenValidationParameters = new TokenValidationParameters()
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = key,
                    ValidateIssuer = false,
                    ValidateAudience = false,
                    ClockSkew = TimeSpan.Zero

                };

                // op.Events = new JwtBearerEvents()
                // {
                //   OnAuthenticationFailed = context =>
                //     {
                //       context.Principal
                //         return Task.CompletedTask;
                //     }
                // };
            });
            services.AddPolicyAuth();
            services.AddCors(options =>
                    {
                        options.AddPolicy("FoodL",
                                          builder =>
                                          {
                                              builder.AllowAnyHeader().AllowAnyMethod().AllowCredentials().WithExposedHeaders("Content-Disposition").WithOrigins("http://localhost:3000");
                                          });
                    });

            services.AddDbContext<DataContext>(op =>
            {
                op.UseNpgsql(Configuration.GetConnectionString("Default"));
            });
            services.AddScoped<TokenService>();
            services.AddSingleton<IGetValueToApprove<string, int>, GetStatusValueApprove>();
            services.AddSingleton<Report>();
            services.AddSingleton<GenerateWorkSheet>();
            services.AddScoped<SeedData>();

            services.AddValidate();
            // services.AddTransient<IValidator<Method>, MethodValidator>();
            services.AddMediatR(typeof(MethodList.Handler).Assembly);
            services.AddAutoMapper(typeof(MapperProfile).Assembly);

            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "API", Version = "v1" });
            });

            services.Configure<PrefixOption>(Configuration.GetSection("Prefix"));

        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            app.UseExceptionHandler(err => err.Run(
                async context => await Error.HandleExceptionError(context, env)
            ));
            if (env.IsDevelopment())
            {
                //app.UseDeveloperExceptionPage();


            }

            app.UseHttpsRedirection();

            app.UseRouting();
            app.UseCors("FoodL");
            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}

