using Microsoft.AspNetCore.Mvc;
using SignalRChat.Application.Repositories;
using SignalRChat.Application.Services;
using SignalRChat.Application.Services.Interfaces;
using SignalRChat.Infrastructure.Repositories;
using SignalRChat.WebAPI.Extensions;
using SignalRChat.WebAPI.Hubs;
using SignalRChat.WebAPI.Middlewares;
using System.Text.Json;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.ConfigureDbContext(builder.Configuration);
builder.Services.ConfigureMapper();
builder.Services.ConfigureJwtScheme(builder.Configuration);
builder.Services.AddScoped<IRepoManager, RepoManager>();
builder.Services.AddScoped<IServiceManager, ServiceManager>();
builder.Services.Configure<ApiBehaviorOptions>(options =>
{
    options.SuppressModelStateInvalidFilter = true;
});
builder.Services.AddSignalR().AddHubOptions<ChatHub>(option =>
{
    option.EnableDetailedErrors = true;
    option.MaximumReceiveMessageSize = null;
    option.ClientTimeoutInterval = TimeSpan.FromMinutes(5);
}).AddJsonProtocol(option =>
{
    option.PayloadSerializerOptions.PropertyNamingPolicy = JsonNamingPolicy.CamelCase;
});
builder.Services.ConfigureCloudinary(builder.Configuration);
//builder.Services.ConfigureCors();
var app = builder.Build();
app.ConfigureExceptionHandler();
// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

//app.UseCors("CorsPolicy");
app.UseCors(policy => policy.AllowAnyHeader().AllowAnyMethod().WithOrigins("http://localhost:5173").AllowCredentials());   
//app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

app.MapHub<ChatHub>("/chat");
app.MapControllers();

app.Run();
