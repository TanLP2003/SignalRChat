using SignalRChat.Application.Repositories;
using SignalRChat.Application.Services.Interfaces;
using SignalRChat.Core.Entites;
using SignalRChat.Core.Exceptions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace SignalRChat.Application.Services
{
    public class RefreshTokenService : IRefreshTokenService
    {
        private readonly IRepoManager _repo;
        public RefreshTokenService(IRepoManager repo) 
        {
            _repo = repo;
        }
        public async Task DeleteByUser(Guid userId)
        {
            await _repo.RefreshToken.DeleteByUserId(userId);
            await _repo.SaveAsync();
        }

        public async Task<RefreshToken> FindByToken(string token)
        {
            var refreshToken = await _repo.RefreshToken.FindByRefreshToken(token);
            if (refreshToken == null) throw new NotFoundException($"Refresh Token {token} not exist!");
            return refreshToken;
        }

        public async Task<string> GenerateRefreshToken(Guid userId)
        {
            await _repo.RefreshToken.DeleteByUserId(userId);
            var randomByte = new byte[32];
            string token;
            using (var randomGenerator = RandomNumberGenerator.Create())
            {
                randomGenerator.GetBytes(randomByte);
                token = Convert.ToBase64String(randomByte);
            }
            _repo.RefreshToken.Create(userId, token);
            await _repo.SaveAsync();
            return token;
        }

        public async Task VerifyRefreshToken(RefreshToken refreshToken)
        {
            if(refreshToken.ExpiredTime.CompareTo(DateTime.Now) < 0)
            {
                await _repo.RefreshToken.DeleteByUserId(refreshToken.UserId);   
                await _repo.SaveAsync();
            }
        }
    }
}
