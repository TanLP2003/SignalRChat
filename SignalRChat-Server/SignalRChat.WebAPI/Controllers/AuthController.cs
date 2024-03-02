using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using SignalRChat.Application.Services.Interfaces;
using SignalRChat.Application.Utils;
using SignalRChat.Core.Entites;
using SignalRChat.WebAPI.DTOs.Auth;
using SignalRChat.WebAPI.DTOs.User;
using SignalRChat.WebAPI.Hubs;
using System.Security.Claims;

namespace SignalRChat.WebAPI.Controllers
{
    [Route("api/auth")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IServiceManager _service;
        private readonly IMapper _mapper;
        private readonly IHubContext<ChatHub, IChatClient> _hubContext;
        private readonly IUploadService _uploadService;
        private readonly IJwtService _jwtService;

        public AuthController(IServiceManager service, IMapper mapper, IHubContext<ChatHub, IChatClient> hubContext, IUploadService uploadService, IJwtService jwtService)
        {
            _service = service;
            _mapper = mapper;
            _hubContext = hubContext;
            _uploadService = uploadService;
            _jwtService = jwtService;
        }

        [HttpPost("signup")]
        public async Task<IActionResult> SignUp([FromBody] UserRegisterDto userRegisterDto)
        {
            if (!ModelState.IsValid)
            {
                return UnprocessableEntity(ModelState);
            }
            var user = _mapper.Map<User>(userRegisterDto);
            await _service.Auth.CreateUser(user);
            await _hubContext.Clients.All.ReceiveNewUserEvent();
            return StatusCode(201);
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest request)
        {
            var user = await _service.Auth.VerifyUser(request.Email, request.Password);
            var accessToken = _jwtService.GenerateAccessToken(user.Id);
            var refreshToken = await _service.RefreshToken.GenerateRefreshToken(user.Id);
            return Ok(new LoginResponse(_mapper.Map<UserResponseDto>(user), accessToken, refreshToken));
        }

        [HttpPost("logout")]
        [Authorize]
        public async Task<IActionResult> Logout()
        {
            var claimsPrincipal = HttpContext.User;
            var userId = claimsPrincipal.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            await _service.RefreshToken.DeleteByUser(Guid.Parse(userId));
            return NoContent();
        }

        [HttpPost("refreshToken")]
        public async Task<IActionResult> RefreshToken([FromBody] TokenRefreshRequest request)
        {
            var refreshToken = await _service.RefreshToken.FindByToken(request.RefreshToken);
            await _service.RefreshToken.VerifyRefreshToken(refreshToken);
            var userId = _jwtService.GetUserIdFromToken(request.AccessToken);
            var newAccessToken = _jwtService.GenerateAccessToken(userId);
            return Ok(new TokenRefreshResponse
            {
                AccessToken = newAccessToken,
                RefreshToken = refreshToken.Token
            });
        }

        [HttpPut("update-user")]
        [Authorize]
        public async Task<IActionResult> UpdateUser([FromBody] UserUpdateDto userUpdateDto)
        {
            var claimsPrincipal = HttpContext.User;
            var userId = claimsPrincipal.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            var userUpdateInfo = _mapper.Map<User>(userUpdateDto);
            var updatedUser = await _service.Auth.UpdateUser(userId, userUpdateInfo);
            return Ok(_mapper.Map<UserResponseDto>(updatedUser));   
        }

        [HttpPut("change-password")]
        [Authorize]
        public async Task<IActionResult> ChangePassword([FromBody] ChangePasswordDto data)
        {
            await _service.Auth.ChangePassword(data.Email, data.CurrentPassword, data.NewPassword);
            return NoContent();
        }
        [HttpPost("change-avatar")]
        [Authorize]
        public async Task<IActionResult> ChangeAvatar([FromBody] AvatarImgDto avatarImgDto)
        {
            var claimsPrincipal = HttpContext.User;
            var userId = claimsPrincipal.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            var avatarUrl = await _uploadService.UploadFile(avatarImgDto.FileName, Convert.FromBase64String(avatarImgDto.AvatarEncodedBytes));
            var userChanged = await _service.Auth.ChangeAvatar(userId, avatarUrl);
            return Ok(_mapper.Map<UserResponseDto>(userChanged));
        }

        [HttpGet("get-all-users/{userId:guid}")]
        public async Task<IActionResult> GetAllUser(Guid userId)
        {
            var allUser = await _service.Auth.GetAllUser(userId);
            return Ok(_mapper.Map<List<UserResponseDto>>(allUser));
        }

        [HttpGet("get-contacted-users/{userId:guid}")]
        public async Task<IActionResult> GetContactedUsers(Guid userId)
        {
            var contactedList = await _service.Auth.GetContactedListOfUser(userId);
            return Ok(_mapper.Map<List<UserResponseDto>>(contactedList));
        }
    }
}
