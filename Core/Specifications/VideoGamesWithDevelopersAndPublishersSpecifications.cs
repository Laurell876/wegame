using System;
using System.Linq.Expressions;
using Core.Entities;

namespace Core.Specifications
{
    public class VideoGamesWithDevelopersAndPublishersSpecifications : BaseSpecification<VideoGame>
    {
        public VideoGamesWithDevelopersAndPublishersSpecifications()
        {
            AddInclude(g => g.Developer);
            AddInclude(g => g.Publisher);
        }

        public VideoGamesWithDevelopersAndPublishersSpecifications(int id) : base(g => g.Id == id)
        {
            AddInclude(g => g.Developer);
            AddInclude(g => g.Publisher);
        }
    }
}