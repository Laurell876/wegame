using System.ComponentModel.DataAnnotations;

namespace API.Dtos
{
    public class BasketItemDto
    {
        [Required]
        public int Id { get; set; }
        [Required]
        public string VideoGameTitle { get; set; }
        [Required]
        [Range(0.10, double.MaxValue, ErrorMessage = "Price must be greater than 0.10")]
        public decimal Price { get; set; }
        [Required]
        [Range(1, double.MaxValue, ErrorMessage = "Quantity must be at least 1")]
        public int Quantity { get; set; }
        [Required]
        public string PictureUrl { get; set; }
        [Required]
        public string Developer { get; set; }
        [Required]
        public string Publisher { get; set; }
    }
}