using SignalRChat.Application.Utils;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SignalRChat.Application.Services.Interfaces
{
    public interface IServiceManager
    {
        IAuthService Auth { get; }
        IRefreshTokenService RefreshToken { get; }   
        IMessageService Message { get; }
    }
}
