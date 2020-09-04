using API.Dtos;
using AutoMapper;
using Core.Entities;
using Microsoft.Extensions.Configuration;

namespace API.Helpers
{
    public class VideoGameUrlResolver : IValueResolver<VideoGame, VideoGameToReturnDto, string>
    {
        private readonly IConfiguration _config;



        public VideoGameUrlResolver(IConfiguration config)
        {
            _config = config;
        }

        public string Resolve(VideoGame source, VideoGameToReturnDto destination, string destMember, ResolutionContext context)
        {
            if (!string.IsNullOrEmpty(source.PictureUrl))
            {
                return _config["ApiUrl"] + source.PictureUrl;
            }

            return null;
        }
    }
}