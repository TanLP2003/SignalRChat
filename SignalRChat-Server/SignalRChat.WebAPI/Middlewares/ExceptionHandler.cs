using Microsoft.AspNetCore.Diagnostics;
using SignalRChat.Core.Exceptions;

namespace SignalRChat.WebAPI.Middlewares
{
    public static class ExceptionHandler
    {
        public static void ConfigureExceptionHandler(this WebApplication app)
        {
            app.UseExceptionHandler(error =>
            {
                error.Run(async context =>
                {
                    var error = context.Features.Get<IExceptionHandlerFeature>().Error;
                    var exception = error is BaseException ? (BaseException)error : new BaseException(error.Message);

                    context.Response.ContentType = "application/json";
                    context.Response.StatusCode = exception.StatusCode;

                    await context.Response.WriteAsync(new ErrorMessage
                    {
                        Message = exception.Message,
                        StatusCode = exception.StatusCode
                    }.ToString());
                });
            });
        }
    }
}
