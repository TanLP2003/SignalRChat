using AutoMapper;
using SignalRChat.Core.Entites;
using SignalRChat.Infrastructure.Models;
using SignalRChat.Infrastructure.Models.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SignalRChat.Infrastructure.Mapper
{
    public class InfraProfile: Profile
    {
        public InfraProfile() 
        {
            CreateMap<User, UserModel>().ReverseMap();
            CreateMap<RefreshToken, RefreshTokenModel>()
                .ForMember(dest => dest.User, opt => opt.MapFrom(src => src.User));
            CreateMap<RefreshTokenModel, RefreshToken>()
                .ForMember(dest => dest.User, opt => opt.MapFrom(src => src.User));

            CreateMap<Message, MessageModel>()
                .ForMember(dest => dest.Type, opt => opt.MapFrom(src => (FileType)Enum.Parse(typeof(FileType), src.Type)));
            CreateMap<MessageModel, Message>()
                .ForMember(dest => dest.Type, opt => opt.MapFrom(src => src.Type.ToString()));
        }
    }
}
