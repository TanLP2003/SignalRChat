using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SignalRChat.Infrastructure.Models
{
    public class UserModel : IdentityUser<Guid>
    {
        public override Guid Id { get;set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public override string? Email { get; set; }
        public override string? UserName { get; set; }
        public override string? PhoneNumber { get; set; }
        public string? Avatar { get; set; }
    }
}
