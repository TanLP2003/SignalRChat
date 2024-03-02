using SignalRChat.Application.Repositories;
using SignalRChat.Application.Services.Interfaces;
using SignalRChat.Core.Entites;
using SignalRChat.Core.Exceptions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SignalRChat.Application.Services
{
    public class AuthService : IAuthService
    {
        private readonly IRepoManager _repo;
        public AuthService(IRepoManager repo)
        {
            _repo = repo;
        }

        public async Task<User> GetUserFromId(Guid userId)
        {
            return await _repo.Auth.GetUserFromId(userId);
        }
        public async Task CreateUser(User user)
        {
            var result = await _repo.Auth.CreateUser(user);
            if (!result) throw new BadRequestException("Sign up failed");
        }
        public async Task<User> UpdateUser(string userId, User user)
        {
            return await _repo.Auth.UpdateUser(userId, user);
        }
        public async Task<User> VerifyUser(string username, string password)
        {
            return await _repo.Auth.ValidateUser(username, password);
        }
        public async Task ChangePassword(string email, string currentPassword, string newPassword)
        {
            var result = await _repo.Auth.ChangePassword(email, currentPassword, newPassword);
            if (!result) throw new BadRequestException("Change Password Failed!");
        }

        public async Task<User> ChangeAvatar(string userId, string url)
        {
            return await _repo.Auth.ChangeAvatar(userId, url);
        }

        public async Task<List<User>> GetAllUser(Guid userId)
        {
            return await _repo.Auth.GetUsers(userId);
        }
        public async Task<List<User>> GetContactedListOfUser(Guid userId)
        {
            return await _repo.Auth.GetContactedListOfUser(userId);
        }
    }
}
