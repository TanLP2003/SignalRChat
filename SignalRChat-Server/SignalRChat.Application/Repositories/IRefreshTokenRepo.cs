using SignalRChat.Core.Entites;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SignalRChat.Application.Repositories
{
    public interface IRefreshTokenRepo
    {
        Task<RefreshToken> FindByRefreshToken(string token);
        Task DeleteByUserId(Guid userId);
        void Create(Guid userId,  string refreshToken);
    }
}
