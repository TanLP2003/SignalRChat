using SignalRChat.WebAPI.DTOs.User;

namespace SignalRChat.WebAPI.DTOs.Auth
{
    public class LoginResponse
    {
        public UserResponseDto User { get; set; }
        public string AccessToken { get; set; }
        public string RefreshToken { get; set; }

        public LoginResponse(UserResponseDto user, string accessToken , string refreshToken)
        {
            User = user;
            AccessToken = accessToken;
            RefreshToken = refreshToken;
        }
    }
}
