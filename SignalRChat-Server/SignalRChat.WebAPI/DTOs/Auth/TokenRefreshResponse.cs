namespace SignalRChat.WebAPI.DTOs.Auth
{
    public class TokenRefreshResponse
    {
        public string? AccessToken { get; set; }
        public string? RefreshToken { get; set; }
    }
}
