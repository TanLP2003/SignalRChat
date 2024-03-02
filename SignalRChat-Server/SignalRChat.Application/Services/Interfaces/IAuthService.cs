using SignalRChat.Core.Entites;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SignalRChat.Application.Services.Interfaces
{
    public interface IAuthService
    {
        Task<User> GetUserFromId(Guid userId);
        Task<User> VerifyUser(string username, string password);
        Task CreateUser(User user);
        Task<User> UpdateUser(string userId, User user);
        Task ChangePassword(string email, string currentPassword, string newPassword);
        Task<User> ChangeAvatar(string userId, string url);
        Task<List<User>> GetAllUser(Guid userId);
        Task<List<User>> GetContactedListOfUser(Guid userId);
    }
}
