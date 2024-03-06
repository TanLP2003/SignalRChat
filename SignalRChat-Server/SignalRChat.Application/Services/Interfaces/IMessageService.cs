using SignalRChat.Core.Entites;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SignalRChat.Application.Services.Interfaces
{
    public interface IMessageService
    {
        Task<Message> SaveMessage(Message message);
        Task<List<Message>> GetMessagesOfUser(Guid userId);
        Task<Message> GetLatestMessageBetweenUsers(Guid firstUserId, Guid secondUserId);
    }
}
