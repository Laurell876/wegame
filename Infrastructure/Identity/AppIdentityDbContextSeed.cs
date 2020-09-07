using System.Linq;
using System.Threading.Tasks;
using Core.Entities.Identity;
using Microsoft.AspNetCore.Identity;

namespace Infrastructure.Identity
{
    public class AppIdentityDbContextSeed
    {
        public static async Task SeedUsersAsync(UserManager<AppUser> userManager)
        {
            if (!userManager.Users.Any())
            {
                var user = new AppUser{
                    DisplayName = "Bob",
                    Email = "bob@test.com",
                    UserName = "bob@test.com",
                    Address = new Address {
                        FirstName = "Bob",
                        LastName = "Johnson",
                        Street =  "10 Horror Road",
                        City = "New York",
                        State = "NY",
                        Zipcode = "90210"
                    }
                };
                // password needs - at least 1 upper and lower case character, 1 non alpha numeric character and 1 numeric character
                await userManager.CreateAsync(user, "Pa$$w0rd"); 
            }
        }
    }
}