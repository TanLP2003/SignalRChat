using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SignalRChat.Application.Repositories
{
    public interface IRepoManager
    {
        IAuthRepo Auth { get; }
        IRefreshTokenRepo RefreshToken { get; }
        IMessageRepo Message { get; }
        Task SaveAsync();
    }
}
