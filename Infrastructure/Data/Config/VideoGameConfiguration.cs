using Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Data.Migrations
{
    public class VideoGameConfiguration : IEntityTypeConfiguration<VideoGame>
    {
        public void Configure(EntityTypeBuilder<VideoGame> builder)
        {
            builder.Property(p => p.Id).IsRequired();
            builder.Property(p => p.Title).IsRequired();
            builder.Property(p => p.Description).IsRequired();
            builder.Property(p => p.Price).HasColumnType("decimal(18, 2)").IsRequired();
            builder.Property(p => p.PictureUrl).IsRequired();
            builder.Property(p => p.Rating).IsRequired();
            builder.Property(p => p.ReleaseYear).IsRequired();
            builder.Property(p => p.Genre).IsRequired();
            builder.HasOne(b => b.Developer).WithMany()
                .HasForeignKey(p => p.DeveloperId);
            builder.HasOne(b => b.Publisher).WithMany()
                .HasForeignKey(p => p.PublisherId);
        }
    }
}