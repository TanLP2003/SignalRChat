using SignalRChat.Core.Entites;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SignalRChat.Application.Repositories
{
    public interface IMessageRepo
    {
        Task<List<Message>> GetMessageOfUser(Guid userId);
        Task<Message> SaveMessage(Message message);
        Task DeleteMessage(Guid messageId);
        Task<Message> GetLatestMessageWithUser(Guid firstUserId, Guid secondUserId);
    }
}
