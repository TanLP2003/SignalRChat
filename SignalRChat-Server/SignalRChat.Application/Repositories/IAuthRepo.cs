using SignalRChat.Core.Entites;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SignalRChat.Application.Repositories
{
    public interface IAuthRepo
    {
        Task<User> GetUserFromId(Guid userId);
        Task<bool> CreateUser(User user);
        Task<User> UpdateUser(string userId, User user);
        Task<User> ValidateUser(string username, string password);
        Task<bool> ChangePassword(string email, string currentPassword, string newPassword);
        Task<User> ChangeAvatar(string userId, string url);
        Task<List<User>> GetUsers(Guid userId);
        Task<List<User>> GetContactedListOfUser(Guid userId);
    }
}
