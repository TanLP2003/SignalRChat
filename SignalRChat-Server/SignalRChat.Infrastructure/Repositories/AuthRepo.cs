using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using SignalRChat.Application.Repositories;
using SignalRChat.Core.Entites;
using SignalRChat.Core.Exceptions;
using SignalRChat.Infrastructure.Data;
using SignalRChat.Infrastructure.Models;
using SignalRChat.Infrastructure.Models.Const;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace SignalRChat.Infrastructure.Repositories
{
    public class AuthRepo : IAuthRepo
    {
        private readonly UserManager<UserModel> _userManager;
        private readonly IMapper _mapper;
        private readonly DataContext _dbContext;

        public AuthRepo(UserManager<UserModel> userManager, IMapper mapper, DataContext dataContext)
        {
            _userManager = userManager;
            _mapper = mapper;
            _dbContext = dataContext;
        }
        public async Task<User> GetUserFromId(Guid userId)
        {
            var userModel = await _userManager.FindByIdAsync(userId.ToString()) ?? throw new BadRequestException($"user with id: {userId} not exist");
            return _mapper.Map<User>(userModel);
        }

        public async Task<bool> CreateUser(User user)
        {
            if(user.Avatar == null)
            {
                user.Avatar = Const.DEFAULT_AVATAR;
            }
            var userModel = _mapper.Map<UserModel>(user);
            var result = await _userManager.CreateAsync(userModel, user.Password);
            return result.Succeeded;
        }

        public async Task<User> ValidateUser(string email, string password)
        {
            var userModel = await _userManager.FindByEmailAsync(email);
            if (userModel == null){
                throw new BadRequestException($"User with name : {email} not exist");
            }else if (!await _userManager.CheckPasswordAsync(userModel, password))
            {
                throw new BadRequestException("Password is not correct");
            }
            var user = _mapper.Map<User>(userModel);
            return user;
        }

        public async Task<User> UpdateUser(string userId, User user)
        {
            var userToUpdate = await _userManager.FindByIdAsync(userId) ?? throw new BadRequestException("User not exist");
            userToUpdate.PhoneNumber = user.PhoneNumber;
            userToUpdate.UserName = user.UserName;
            userToUpdate.Email = user.Email;
            userToUpdate.FirstName = user.FirstName;
            userToUpdate.LastName = user.LastName;
            var result = await _userManager.UpdateAsync(userToUpdate);
            if (!result.Succeeded)
            {
                throw new BadRequestException("Update User Failed!");
            }
            return _mapper.Map<User>(userToUpdate);
        }

        public async Task<bool> ChangePassword(string email, string currentPassword, string newPassword)
        {
            var userModel = await _userManager.FindByEmailAsync(email) ?? throw new BadRequestException($"User with name : {email} not exist");
            var result = await _userManager.ChangePasswordAsync(userModel, currentPassword, newPassword);
            if (!result.Succeeded)
            {
                foreach(var error in result.Errors)
                {
                    Console.WriteLine(error);
                }
            }
            return result.Succeeded;
        }

        public async Task<User> ChangeAvatar(string userId, string url)
        {
            var userToChange = await _userManager.FindByIdAsync(userId) ?? throw new BadRequestException("User not exist");
            userToChange.Avatar = url;
            var result = await _userManager.UpdateAsync(userToChange);
            if (!result.Succeeded)
            {
                throw new BadRequestException("Change Avatar Failed!");
            }
            return _mapper.Map<User>(userToChange);
        }

        public async Task<List<User>> GetContactedListOfUser(Guid userId)
        {
            var contactedList = await _dbContext.Users
            .Where(u => u.Id != userId &&
                        (_dbContext.Messages
                            .Where(m => m.SenderId == userId)
                            .Select(m => m.ReceiverId)
                            .Distinct()
                            .Any(receiverId => receiverId == u.Id) ||
                         _dbContext.Messages
                            .Where(m => m.ReceiverId == userId)
                            .Select(m => m.SenderId)
                            .Distinct()
                            .Any(senderId => senderId == u.Id)
                        )
                    )
            .Select(u => u)
            .Distinct()
            .ToListAsync();
            return _mapper.Map<List<User>>(contactedList);
        }
        public async Task<List<User>> GetUsers(Guid userId)
        {
            var allUser = await _dbContext.Users
                .Where(user => user.Id != userId)
                .ToListAsync();
            return _mapper.Map<List<User>>(allUser);
        }
    }
}