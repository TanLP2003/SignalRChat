using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SignalRChat.Application.Utils
{
    public interface IJwtService
    {
        string GenerateAccessToken(Guid userId);
        Guid GetUserIdFromToken(string token);
    }
}
