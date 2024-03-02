using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SignalRChat.Infrastructure.Models
{
    public class RefreshTokenModel
    {
        public Guid Id { get; set; }
        [ForeignKey("User")]
        public Guid UserId { get; set; }
        public UserModel User { get; set; }
        public string Token { get; set; }
        public DateTime ExpiredTime { get; set; }
    }
}
