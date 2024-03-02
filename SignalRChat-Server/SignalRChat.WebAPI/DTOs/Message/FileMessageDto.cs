namespace SignalRChat.WebAPI.DTOs.Message
{
    public class FileMessageDto
    {
        public Guid Id { get; set; }
        public Guid SenderId { get; set; }
        public Guid ReceiverId { get; set; }
        public string FileName { get; set; }
        public string FileType { get; set; }
        public string File { get; set; } //base64 encoded string
        public DateTime TimeStamp { get; set; }
    }
}
