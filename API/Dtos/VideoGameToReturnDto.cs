namespace API.Dtos
{
    public class VideoGameToReturnDto
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string PictureUrl { get; set; }
        public string Description { get; set; }
        public int ReleaseYear { get; set; }
        public int Rating { get; set; }
        public decimal Price { get; set; }
        public string Genre { get; set; }
        public int PublisherId { get; set; }
        public string Publisher { get; set; }
        public int DeveloperId { get; set; }
        public string Developer { get; set; }
    }
}