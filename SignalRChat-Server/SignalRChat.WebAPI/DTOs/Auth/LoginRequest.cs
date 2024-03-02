using System.ComponentModel.DataAnnotations;

namespace SignalRChat.WebAPI.DTOs.Auth
{
    public class LoginRequest
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }
        [Required]
        public string Password { get; set; }
    }
}
