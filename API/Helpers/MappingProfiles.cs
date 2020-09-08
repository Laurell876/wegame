using API.Dtos;
using AutoMapper;
using Core.Entities;
using Core.Entities.Identity;

namespace API.Helpers
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<VideoGame, VideoGameToReturnDto>()
            .ForMember(d => d.Developer, o => o.MapFrom(s => s.Developer.Name))
            .ForMember(d => d.Publisher, o => o.MapFrom(s => s.Publisher.Name))
            .ForMember(d => d.PictureUrl, o => o.MapFrom<VideoGameUrlResolver>())
            ;
            CreateMap<Address,AddressDto>().ReverseMap();

            CreateMap<CustomerBasketDto, CustomerBasket>();
            CreateMap<BasketItemDto, BasketItem>();
        }
    }
}