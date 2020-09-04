using System.Collections.Generic;
using System.Threading.Tasks;
using Core.Entities;

namespace Core.Interfaces
{
    public interface IVideoGameRepository
    {
        Task<VideoGame> GetVideoGameByIdAsync(int id);
        Task<IReadOnlyList<VideoGame>> GetVideoGamesAsync();
        Task<IReadOnlyList<Developer>> GetDevelopersAsync();
        Task<IReadOnlyList<Publisher>> GetPublishersAsync();
    }
}