using System.Threading.Tasks;
using Application.Department;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DepartmentController : BaseController
    {
        [AllowAnonymous]
        [HttpGet]
        public async Task<IActionResult> GetDeparmentList()
        {

            return HandleRequestResult(await Mediator.Send(new DepartmentDetail.Query()));
        }
    }
}