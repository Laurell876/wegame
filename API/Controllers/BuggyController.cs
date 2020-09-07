using API.Errors;
using Infrastructure.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class BuggyController : BaseApiController
    {
        private readonly StoreContext _context;
        public BuggyController(StoreContext context)
        {
            _context = context;
        }

        [HttpGet("notfound")]
        public ActionResult GetNotFoundRequest()
        {
            var videogame = _context.VideoGames.Find(500);

            if (videogame == null)
            {
                return NotFound(new ApiResponse(404));
            }

            return Ok();
        }


        [HttpGet("testauth")]
        [Authorize]
        public ActionResult<string> GetSecretText()
        {
            return "secret info";
        }

        [HttpGet("servererror")]
        public ActionResult GetServerError()
        {
            var videogame = _context.VideoGames.Find(500);

            var videogametoReturn = videogame.ToString();

            return Ok();
        }

        [HttpGet("badrequest")]
        public ActionResult GetBadRequest()
        {
            return BadRequest(new ApiResponse(400));
        }

        [HttpGet("badrequest/{id}")]
        public ActionResult GetValidationError(int id)
        {
            return Ok();
        }
    }
}