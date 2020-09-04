using System.Collections.Generic;
using System.Threading.Tasks;
using Core.Entities;
using Core.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Data
{
    public class VideoGameRepository : IVideoGameRepository
    {
        private readonly StoreContext _context;
        public VideoGameRepository(StoreContext context)
        {
            _context = context;
        }

        public async Task<VideoGame> GetVideoGameByIdAsync(int id)
        {
            return await _context.VideoGames.FindAsync(id);
        }

        public async Task<IReadOnlyList<VideoGame>> GetVideoGamesAsync()
        {
            return await _context.VideoGames.ToListAsync();
        }
        
        public async Task<IReadOnlyList<Developer>> GetDevelopersAsync()
        {
            return await _context.Developers.ToListAsync();
        }

        public async Task<IReadOnlyList<Publisher>> GetPublishersAsync()
        {
            return await _context.Publishers.ToListAsync();
        }
    }
}