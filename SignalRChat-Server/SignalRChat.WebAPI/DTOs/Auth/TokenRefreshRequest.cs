using System.ComponentModel.DataAnnotations;

namespace SignalRChat.WebAPI.DTOs.Auth
{
    public class TokenRefreshRequest
    {
        [Required]
        public string? AccessToken { get; set; }
        [Required]
        public string? RefreshToken { get; set; }
    }
}
