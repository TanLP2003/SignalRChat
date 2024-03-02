using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using SignalRChat.Application.Repositories;
using SignalRChat.Infrastructure.Data;
using SignalRChat.Infrastructure.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SignalRChat.Infrastructure.Repositories
{
    public class RepoManager : IRepoManager
    {
        private readonly DataContext _context;
        private readonly Lazy<IAuthRepo> _authRepo;
        private readonly Lazy<IRefreshTokenRepo> _refreshRepo;
        private readonly Lazy<IMessageRepo> _messageRepo;
        public RepoManager(DataContext context, UserManager<UserModel> userManager, IMapper mapper)
        {
            _context = context;
            _authRepo = new Lazy<IAuthRepo>(() => new AuthRepo(userManager, mapper, context));
            _refreshRepo = new Lazy<IRefreshTokenRepo>(() => new RefreshTokenRepo(context, mapper));
            _messageRepo = new Lazy<IMessageRepo>(() => new MessageRepo(context, mapper));
        }

        public IAuthRepo Auth => _authRepo.Value;
        public IRefreshTokenRepo RefreshToken => _refreshRepo.Value;
        public IMessageRepo Message => _messageRepo.Value;   
        public async Task SaveAsync() => await _context.SaveChangesAsync();
    }
}
