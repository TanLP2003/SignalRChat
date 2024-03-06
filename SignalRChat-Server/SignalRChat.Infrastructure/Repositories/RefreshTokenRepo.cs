using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using SignalRChat.Application.Repositories;
using SignalRChat.Core.Entites;
using SignalRChat.Infrastructure.Data;
using SignalRChat.Infrastructure.Models;
using SignalRChat.Infrastructure.Models.Const;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SignalRChat.Infrastructure.Repositories
{
    public class RefreshTokenRepo : IRefreshTokenRepo
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public RefreshTokenRepo(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        public void Create(Guid userId, string refreshToken)
        {
            var refreshTokenModel = new RefreshTokenModel();
            refreshTokenModel.UserId = userId;
            refreshTokenModel.Token = refreshToken;
            refreshTokenModel.ExpiredTime = DateTime.Now.AddMinutes(5 * Const.TIME_TO_LIVE);
            _context.RefreshTokens.Add(refreshTokenModel);
        }
        public async Task DeleteByUserId(Guid userId)
        {
            var refreshToken = await _context.RefreshTokens.Where(r => r.UserId == userId).FirstOrDefaultAsync();
            if(refreshToken != null)
            {
                _context.RefreshTokens.Remove(refreshToken);
            }
        }
        public async Task<RefreshToken> FindByRefreshToken(string token)
        {
            var refreshTokenModel = await _context.RefreshTokens.Where(r => r.Token == token).FirstOrDefaultAsync();
            return _mapper.Map<RefreshToken>(refreshTokenModel);   
        }
    }
}
