using CloudinaryDotNet;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using SignalRChat.Application.Utils;
using SignalRChat.Core.Entites;
using SignalRChat.Infrastructure;
using SignalRChat.Infrastructure.Data;
using SignalRChat.Infrastructure.Models;
using SignalRChat.Infrastructure.Utils;
using System.Reflection;
using System.Security.Cryptography.X509Certificates;
using System.Text;

namespace SignalRChat.WebAPI.Extensions
{
    public static class AppExtensions
    {
        public static void ConfigureCors(this IServiceCollection services)
        {
            services.AddCors(options =>
            {
                options.AddPolicy("CorsPolicy", builder =>
                     builder.AllowAnyOrigin()
                             .AllowAnyMethod()
                             .AllowAnyHeader());
            });
        }
        public static void ConfigureDbContext(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddDbContext<DataContext>(option =>
            {
                option.UseSqlServer(configuration.GetConnectionString("DbConnection"));
            });

            services.AddIdentity<UserModel, IdentityRole<Guid>>(opt =>
            {
                opt.Password.RequireDigit = false;
                opt.Password.RequireLowercase = false;
                opt.Password.RequireUppercase = false;
                opt.Password.RequireNonAlphanumeric = false;
                opt.Password.RequiredLength = 5;
            })
               .AddEntityFrameworkStores<DataContext>()
            .AddDefaultTokenProviders();
        }

        public static void ConfigureMapper(this IServiceCollection services)
        {
            services.AddAutoMapper(typeof(InfraDependencyInjection).Assembly);
            services.AddAutoMapper(Assembly.GetExecutingAssembly());
        }

        public static void ConfigureJwtScheme(this IServiceCollection services, IConfiguration configuration)
        {
            var secretKey = configuration.GetSection("SecuritySetting")["SecretKey"];
            var encodedKey = Encoding.UTF8.GetBytes(secretKey);
            services.AddAuthentication(opt =>
            {
                opt.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                opt.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
                .AddJwtBearer(options =>
                {
                    options.Events = new JwtBearerEvents
                    {
                        OnAuthenticationFailed = context =>
                        {
                            if (context.Exception.GetType() == typeof(SecurityTokenExpiredException))
                            {
                                context.Response.Headers.Add("IS_TOKEN_EXPIRED", "true");
                            }
                            return Task.CompletedTask;
                        },
                    };
                    options.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateAudience = false,
                        ValidateIssuer = false,
                        ValidateLifetime = true,
                        ValidateIssuerSigningKey = true,
                        IssuerSigningKey = new SymmetricSecurityKey(encodedKey)
                    };
                });

            services.AddScoped<IJwtService, JwtService>();
        }
        public static void ConfigureCloudinary(this IServiceCollection services, IConfiguration configuration)
        {
            var cloudName = configuration.GetSection("Cloudinary")["cloudName"];
            var apiKey = configuration.GetSection("Cloudinary")["apiKey"];
            var apiSecret = configuration.GetSection("Cloudinary")["apiSecret"];
            var account = new Account(cloudName, apiKey, apiSecret);
            var cloudinary = new Cloudinary(account);
            services.AddSingleton(cloudinary);
            services.AddScoped<IUploadService, UploadService>();
        }
    }
}