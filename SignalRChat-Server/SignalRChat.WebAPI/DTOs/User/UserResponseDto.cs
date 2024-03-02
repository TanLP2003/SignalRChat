﻿namespace SignalRChat.WebAPI.DTOs.User
{
    public class UserResponseDto
    {
        public Guid Id { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? Email { get; set; }
        public string? UserName { get; set; }
        public string? PhoneNumber { get; set; }
        public string? Avatar { get; set; }
    }
}
