using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Infrastructure.Data;
using Core.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Core.Interfaces;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class VideoGamesController : ControllerBase
    {
        private readonly IVideoGameRepository _repo;
        public VideoGamesController(IVideoGameRepository repo)
        {
            _repo = repo;
        }

        [HttpGet]
        public async Task<ActionResult<List<VideoGame>>> GetVideoGames()
        {
            return Ok(await _repo.GetVideoGamesAsync());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<VideoGame>> GetVideoGames(int id)
        {
            return Ok(await _repo.GetVideoGameByIdAsync(id));
        }

        [HttpGet("developers")]
        public async Task<ActionResult<IReadOnlyList<Developer>>> GetDevelopers()
        {
            return Ok(await _repo.GetDevelopersAsync());
        }

        [HttpGet("publishers")]
        public async Task<ActionResult<IReadOnlyList<Developer>>> GetPublishers()
        {
            return Ok(await _repo.GetPublishersAsync());
        }

    }
}