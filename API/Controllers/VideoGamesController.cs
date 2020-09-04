using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Infrastructure.Data;
using Core.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Core.Interfaces;
using Core.Specifications;
using API.Dtos;
using AutoMapper;
using API.Errors;
using Microsoft.AspNetCore.Http;
using API.Helpers;

namespace API.Controllers
{
    public class VideoGamesController : BaseApiController
    {
        private readonly IGenericRepository<VideoGame> _videoGameRepo;
        private readonly IGenericRepository<Developer> _developerRepo;
        private readonly IGenericRepository<Publisher> _publisherRepo;
        private readonly IMapper mapper;

        public VideoGamesController(
            IGenericRepository<VideoGame> videoGameRepo, 
            IGenericRepository<Developer> developerRepo, 
            IGenericRepository<Publisher> publisherRepo,
            IMapper mapper
            )
        {
            _publisherRepo = publisherRepo;
            this.mapper = mapper;
            _developerRepo = developerRepo;
            _videoGameRepo = videoGameRepo;
        }

        [HttpGet]
        public async Task<ActionResult<Pagination<VideoGameToReturnDto>>> GetVideoGames([FromQuery]VideoGameSpecParams videoGameParams)
        {
            var spec = new VideoGamesWithDevelopersAndPublishersSpecifications(videoGameParams);

            var countSpec = new VideoGameWithFiltersForCountSpecification(videoGameParams);

            var totalItems = await _videoGameRepo.CountAsync(countSpec);

            var videoGames = await _videoGameRepo.ListAsync(spec);

            var data = mapper.Map<IReadOnlyList<VideoGame>, IReadOnlyList<VideoGameToReturnDto>>(videoGames);
            
            return Ok(new Pagination<VideoGameToReturnDto>(videoGameParams.PageIndex, videoGameParams.PageSize, totalItems, data));
        }

        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ApiResponse), StatusCodes.Status404NotFound)]
        public async Task<ActionResult<VideoGameToReturnDto>> GetVideoGames(int id)
        {
            var spec = new VideoGamesWithDevelopersAndPublishersSpecifications(id);
            var videoGame = await _videoGameRepo.GetEntityWithSpec(spec);
            
            if (videoGame == null) return NotFound(new ApiResponse(400));

            return Ok(mapper.Map<VideoGame, VideoGameToReturnDto>(videoGame));
        }

        [HttpGet("developers")]
        public async Task<ActionResult<IReadOnlyList<Developer>>> GetDevelopers()
        {
            return Ok(await _developerRepo.ListAllAsync());
        }

        [HttpGet("publishers")]
        public async Task<ActionResult<IReadOnlyList<Developer>>> GetPublishers()
        {
            return Ok(await _publisherRepo.ListAllAsync());
        }

    }
}