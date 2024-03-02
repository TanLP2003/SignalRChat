using SignalRChat.Application.Repositories;
using SignalRChat.Application.Services.Interfaces;
using SignalRChat.Application.Utils;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SignalRChat.Application.Services
{
    public class ServiceManager : IServiceManager
    {
        private readonly Lazy<IAuthService> _authService;
        private readonly Lazy<IRefreshTokenService> _refreshTokenService;
        private readonly Lazy<IMessageService> _messageService;
        public ServiceManager(IRepoManager repo)
        {
            _authService = new Lazy<IAuthService>(() => new  AuthService(repo));    
            _refreshTokenService = new Lazy<IRefreshTokenService>(() => new  RefreshTokenService(repo));
            _messageService = new Lazy<IMessageService>(() => new MessageService(repo));

        }

        public IAuthService Auth => _authService.Value;
        public IRefreshTokenService RefreshToken => _refreshTokenService.Value;
        public IMessageService Message => _messageService.Value;
    }
}
