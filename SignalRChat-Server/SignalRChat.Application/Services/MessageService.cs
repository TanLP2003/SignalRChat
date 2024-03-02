using SignalRChat.Application.Repositories;
using SignalRChat.Application.Services.Interfaces;
using SignalRChat.Core.Entites;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SignalRChat.Application.Services
{
    public class MessageService : IMessageService
    {
        private readonly IRepoManager _repo;
        public MessageService(IRepoManager repo)
        {
            _repo = repo;
        }
        public async Task<Message> SaveMessage(Message message)
        {
            var result = await _repo.Message.SaveMessage(message);
            await _repo.SaveAsync();
            return result;
        }

        public async Task<List<Message>> GetMessagesOfUser(Guid userId)
        {
            return await _repo.Message.GetMessageOfUser(userId);
        }

        public async Task<Message> GetLatestMessageBetweenUsers(Guid firstUserId, Guid secondUserId)
        {
            return await _repo.Message.GetLatestMessageWithUser(firstUserId, secondUserId);
        }

    }
}
