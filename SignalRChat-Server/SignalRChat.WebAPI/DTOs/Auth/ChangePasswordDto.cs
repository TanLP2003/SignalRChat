using System.ComponentModel.DataAnnotations;

namespace SignalRChat.WebAPI.DTOs.Auth
{
    public class ChangePasswordDto
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }
        public string CurrentPassword { get; set; }
        public string NewPassword { get; set; }
    }
}
