using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;
using Newtonsoft.Json;
using SignalRChat.Application.Services.Interfaces;
using SignalRChat.Application.Utils;
using SignalRChat.Core.Entites;
using SignalRChat.WebAPI.DTOs.Message;

namespace SignalRChat.WebAPI.Hubs
{
    [Authorize]
    public class ChatHub : Hub<IChatClient>
    {
        private readonly IServiceManager _service;
        private readonly IMapper _mapper;
        private readonly IUploadService _uploadService; 
        private readonly ILogger<ChatHub> _logger;
        public ChatHub(IServiceManager service, IMapper mapper, IUploadService uploadService, ILogger<ChatHub> logger)
        {
            _service = service;
            _mapper = mapper;
            _uploadService = uploadService;
            _logger = logger;
        }

        public override async Task OnConnectedAsync()
        {
            _logger.LogInformation($"{Context.UserIdentifier} : {Context.ConnectionId}");
            await Clients.Others.ReceiveUserStatus(Context.UserIdentifier, "online");
        }
        public override async Task OnDisconnectedAsync(Exception? exception)
        {
            var userId = Guid.Parse(Context.UserIdentifier);
            _logger.LogWarning($"{userId} disconnected...");
            await Clients.Others.ReceiveUserStatus(Context.UserIdentifier, "offline");
        }

        public async Task SendTextMessage(string messageJson)
        {
            _logger.LogWarning(messageJson);
            var message = JsonConvert.DeserializeObject<MessageDto>(messageJson);
            _logger.LogWarning("user: " + Context.User.Identity.IsAuthenticated);
            await Clients.User(message.ReceiverId.ToString()).ReceiveMessage(message);
            var newMessage = _mapper.Map<Message>(message);
            await _service.Message.SaveMessage(newMessage);
        }
        public async Task<MessageDto> SendFileMessage(string fileMessageJson)
        {
            //Console.WriteLine(fileMessageJson);
            var fileMessage = JsonConvert.DeserializeObject<FileMessageDto>(fileMessageJson);
            _logger.LogWarning("Sending file message");
            string fileType = fileMessage.FileType;
            if (fileType != "Image" && fileType != "Video") fileType = "File";
            var url = await _uploadService.UploadFile(fileMessage.FileName, Convert.FromBase64String(fileMessage.File));
            var newMessage = new MessageDto
            {
                Id = fileMessage.Id,
                SenderId = fileMessage.SenderId,
                ReceiverId = fileMessage.ReceiverId,
                Content = url,
                Type = fileType,
                TimeStamp = fileMessage.TimeStamp
            };
            await Clients.User(newMessage.ReceiverId.ToString()).ReceiveMessage(newMessage);
            await _service.Message.SaveMessage(_mapper.Map<Message>(newMessage));
            return newMessage;
        }

        public async Task SendMyStatusToUserJustLogin(string justLoginedUserId)
        {
            _logger.LogWarning($"Sending my status to userId: {justLoginedUserId}");
            await Clients.User(justLoginedUserId).ReceiveOnlineUsersWhenJustLogined(Context.UserIdentifier);
        }
    }
}
