using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SignalRChat.Application.Services.Interfaces;
using SignalRChat.WebAPI.DTOs.Message;
using SignalRChat.WebAPI.DTOs.User;

namespace SignalRChat.WebAPI.Controllers
{
    [Route("api/messages")]
    [ApiController]
    [Authorize]
    public class MessageController : ControllerBase
    {
        private readonly IServiceManager _services;
        private readonly IMapper _mapper;
        public MessageController(IServiceManager services, IMapper mapper)
        {
            _services = services;
            _mapper = mapper;
        }

        [HttpGet("get-message-of-user/{userId:guid}")]
        public async Task<IActionResult> LoadMessage(Guid userId)
        {
            var result = await _services.Message.GetMessagesOfUser(userId);
            return Ok(_mapper.Map<List<MessageDto>>(result));
        }

        [HttpGet("get-latest-message")]
        public async Task<IActionResult> GetLatestMessageBetweenUser([FromQuery] Guid firstUserId, [FromQuery] Guid secondUserId)
        {
            var message = await _services.Message.GetLatestMessageBetweenUsers(firstUserId, secondUserId);
            return Ok(_mapper.Map<MessageDto>(message));
        }
    }
}
