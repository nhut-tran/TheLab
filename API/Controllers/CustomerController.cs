using System.Threading.Tasks;
using Application.JobSheet;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [AllowAnonymous]
    [Route("api/[controller]")]
    public class CustomerController : BaseController
    {


        [HttpGet]
        public async Task<IActionResult> GetCusomterList()
        {

            return HandleRequestResult(await Mediator.Send(new CustomerDetail.Query()));
        }
    }
}