using SignalRChat.Core.Entites;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SignalRChat.Application.Services.Interfaces
{
    public interface IRefreshTokenService
    {
        Task<string> GenerateRefreshToken(Guid userId);
        Task DeleteByUser(Guid userId);
        Task VerifyRefreshToken(RefreshToken refreshToken);
        Task<RefreshToken> FindByToken(string token);
    }
}
