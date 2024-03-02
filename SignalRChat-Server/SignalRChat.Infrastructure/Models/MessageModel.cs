using SignalRChat.Infrastructure.Models.Enums;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SignalRChat.Infrastructure.Models
{
    public class MessageModel
    {
        public Guid Id { get; set; }
        public Guid SenderId { get; set; }
        [ForeignKey("SenderId")]
        public UserModel Sender { get; set; }
        public Guid ReceiverId { get; set; }
        [ForeignKey("ReceiverId")]
        public UserModel Receiver { get; set; }
        public string Content { get; set; }
        public FileType Type { get; set; }
        public DateTime TimeStamp { get; set; }
    }
}
