using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using Core.Entities;
using Microsoft.Extensions.Logging;

namespace Infrastructure.Data
{
    public class StoreContextSeed
    {
        public static async Task SeedAsync(StoreContext context, ILoggerFactory loggerFactory)
        {
            try
            {
                if (!context.Developers.Any())
                {
                    var developersData = File.ReadAllText("../Infrastructure/Data/SeedData/developers.json");

                    var developers = JsonSerializer.Deserialize<List<Developer>>(developersData);

                    foreach (var item in developers)
                    {
                        context.Developers.Add(item);
                    }

                    await context.SaveChangesAsync();
                }

                if (!context.Publishers.Any())
                {
                    var publishersData = File.ReadAllText("../Infrastructure/Data/SeedData/publishers.json");

                    var publishers = JsonSerializer.Deserialize<List<Publisher>>(publishersData);

                    foreach (var item in publishers)
                    {
                        context.Publishers.Add(item);
                    }

                    await context.SaveChangesAsync();
                }

                if (!context.VideoGames.Any())
                {
                    var videogamesData = File.ReadAllText("../Infrastructure/Data/SeedData/videogames.json");

                    var videogames = JsonSerializer.Deserialize<List<VideoGame>>(videogamesData);

                    foreach (var item in videogames)
                    {
                        context.VideoGames.Add(item);
                    }

                    await context.SaveChangesAsync();
                }


            }catch(Exception ex) {
                var logger = loggerFactory.CreateLogger<StoreContextSeed>();
                logger.LogError(ex.Message);
            }
        }
    }
}