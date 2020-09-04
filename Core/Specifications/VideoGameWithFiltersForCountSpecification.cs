using Core.Entities;

namespace Core.Specifications
{
    public class VideoGameWithFiltersForCountSpecification : BaseSpecification<VideoGame>
    {
        public VideoGameWithFiltersForCountSpecification(VideoGameSpecParams videoGameParams) : base(g =>
                (string.IsNullOrEmpty(videoGameParams.Search) || g.Title.ToLower().Contains(videoGameParams.Search)) &&
                (!videoGameParams.DeveloperId.HasValue || g.DeveloperId == videoGameParams.DeveloperId) &&
                (!videoGameParams.PublisherId.HasValue || g.PublisherId == videoGameParams.PublisherId)
            )
        {

        }
    }
}