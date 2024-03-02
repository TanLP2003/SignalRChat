namespace SignalRChat.WebAPI.DTOs.Message
{
    public class MessageDto
    {
        public Guid Id { get; set; }
        public Guid SenderId { get; set; }
        public Guid ReceiverId { get; set; }
        public string Content { get; set; }
        public string Type { get; set; }
        public DateTime TimeStamp { get; set; }
        public MessageDto() { }
    }
}
