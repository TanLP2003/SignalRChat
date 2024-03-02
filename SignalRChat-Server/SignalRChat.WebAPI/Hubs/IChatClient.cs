using SignalRChat.Core.Entites;
using SignalRChat.WebAPI.DTOs.Message;
using SignalRChat.WebAPI.DTOs.User;

namespace SignalRChat.WebAPI.Hubs
{
    public interface IChatClient
    {
        Task ReceiveNewUserEvent();
        Task ReceiveUserStatus(string userId, string status);
        Task ReceiveOnlineUsersWhenJustLogined(string userId);
        Task ReceiveMessage(MessageDto message);
    }
}
