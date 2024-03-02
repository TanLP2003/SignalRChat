namespace SignalRChat.WebAPI.DTOs.Message
{
    public class TextMessageDto
    {
        public Guid Id { get; set; }
        public Guid SenderId { get; set; }
        public Guid ReceiverId { get; set; }
        public string Text { get; set; }
        public DateTime TimeStamp { get; set; }
    }
}
