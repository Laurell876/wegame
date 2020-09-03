using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class VideoGamesController : ControllerBase
    {
        private readonly StoreContext _context;
        public VideoGamesController(StoreContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<VideoGame>>> GetVideoGames()
        {
            return Ok(await _context.VideoGames.ToListAsync());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<VideoGame>> GetVideoGames(int id)
        {
            return Ok(await _context.VideoGames.FindAsync(id));
        }

    }
}