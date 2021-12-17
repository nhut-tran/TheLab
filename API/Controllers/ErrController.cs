using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Routing;

namespace API.Controllers
{
    [ApiController]
    public class ErrController : ControllerBase
    {
        [Route("/error")]
        public IActionResult Err()
        {
            return Problem("Some thing went wrong");
        }
    }
}