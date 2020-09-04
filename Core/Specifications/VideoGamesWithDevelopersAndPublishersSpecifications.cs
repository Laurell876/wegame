using System;
using System.Linq.Expressions;
using Core.Entities;

namespace Core.Specifications
{
    public class VideoGamesWithDevelopersAndPublishersSpecifications : BaseSpecification<VideoGame>
    {
        public VideoGamesWithDevelopersAndPublishersSpecifications(VideoGameSpecParams videoGameParams) : base(g => 
                (string.IsNullOrEmpty(videoGameParams.Search) || g.Title.ToLower().Contains(videoGameParams.Search)) &&
                (!videoGameParams.DeveloperId.HasValue || g.DeveloperId == videoGameParams.DeveloperId) &&
                (!videoGameParams.PublisherId.HasValue || g.PublisherId == videoGameParams.PublisherId)
            )
        {
            AddInclude(g => g.Developer);
            AddInclude(g => g.Publisher);
            AddOrderBy(g => g.Title);
            ApplyPaging(videoGameParams.PageSize * (videoGameParams.PageIndex - 1), videoGameParams.PageSize);

            if (!string.IsNullOrEmpty(videoGameParams.Sort))
            {
                switch (videoGameParams.Sort)
                {
                    case "priceAsc":
                        AddOrderBy(g => g.Price);
                        break;
                    case "priceDesc":
                        AddOrderByDescending(g => g.Price);
                        break;
                    case "ratingAsc":
                        AddOrderBy(g => g.Rating);
                        break;
                    case "ratingDesc":
                        AddOrderByDescending(g => g.Rating);
                        break;
                    case "releaseYearAsc":
                        AddOrderBy(g => g.ReleaseYear);
                        break;
                    case "releaseYearDesc":
                        AddOrderByDescending(g => g.ReleaseYear);
                        break;
                    default:
                        AddOrderBy(g => g.Title);
                        break;
                }
            }
        }

        public VideoGamesWithDevelopersAndPublishersSpecifications(int id) : base(g => g.Id == id)
        {
            AddInclude(g => g.Developer);
            AddInclude(g => g.Publisher);
        }
    }
}