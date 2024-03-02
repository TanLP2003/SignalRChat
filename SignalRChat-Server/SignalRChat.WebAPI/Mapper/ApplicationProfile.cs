using AutoMapper;
using SignalRChat.Core.Entites;
using SignalRChat.WebAPI.DTOs.Message;
using SignalRChat.WebAPI.DTOs.User;

namespace SignalRChat.WebAPI.Mapper
{
    public class ApplicationProfile : Profile
    {
        public ApplicationProfile()
        {
            CreateMap<UserRegisterDto, User>();
            CreateMap<User, UserResponseDto>().ReverseMap();
            CreateMap<UserUpdateDto, User>();
            CreateMap<Message, MessageDto>().ReverseMap();
            //CreateMap<FileMessageDto, MessageDto>();
        }
    }
}
