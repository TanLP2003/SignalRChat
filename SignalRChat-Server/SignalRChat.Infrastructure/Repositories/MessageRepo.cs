using AutoMapper;
using Microsoft.EntityFrameworkCore;
using SignalRChat.Application.Repositories;
using SignalRChat.Core.Entites;
using SignalRChat.Infrastructure.Data;
using SignalRChat.Infrastructure.Models;
using System;
using System.Collections.Generic;
using System.Collections.Immutable;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SignalRChat.Infrastructure.Repositories
{
    public class MessageRepo : IMessageRepo
    {
        private readonly DataContext _dbContext;
        private readonly IMapper _mapper;
        public MessageRepo(DataContext dbContext, IMapper mapper)
        {
            _dbContext = dbContext;
            _mapper = mapper;
        }
        public async Task<List<Message>> GetMessageOfUser(Guid userId)
        {
            var messageModels = await _dbContext.Messages
                .Where(m => m.SenderId ==  userId || m.ReceiverId == userId)
                .OrderBy(m => m.TimeStamp)
                .ToListAsync();
            return _mapper.Map<List<Message>>(messageModels);
        }
        public async Task<Message> SaveMessage(Message message)
        {
            var messageModel = _mapper.Map<MessageModel>(message);
            var entry = _dbContext.Messages.Add(messageModel);
            return _mapper.Map<Message>(entry.Entity);
        }
        public Task DeleteMessage(Guid messageId)
        {
            throw new NotImplementedException();
        }

        public async Task<Message> GetLatestMessageWithUser(Guid firstUserId, Guid secondUserId)
        {
            var message = await _dbContext.Messages
                .Where(m => (m.SenderId == firstUserId && m.ReceiverId == secondUserId)
                            || (m.SenderId == secondUserId && m.ReceiverId == firstUserId)
                )
                .OrderByDescending(m => m.TimeStamp)
                .FirstOrDefaultAsync();
            return _mapper.Map<Message>(message);
        }
    }
}
