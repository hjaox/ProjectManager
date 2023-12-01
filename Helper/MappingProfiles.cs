using AutoMapper;
using ProjectManager.Dto;
using ProjectManager.Models;

namespace ProjectManager.Helper
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<User, UserDto>();
            CreateMap<UserDto, User>();
        }
    }
}
