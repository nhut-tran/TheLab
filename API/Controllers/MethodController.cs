using System;
using System.Threading.Tasks;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

using Application.Method;
using Application.MethodCreate;
using Application.MethodUpdate;

using Domain;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]

    [AllowAnonymous]

    public class MethodController : BaseController
    {
        [HttpGet]
        public async Task<IActionResult> GetMethod()
        {
            // throw new InvalidOperationException("Logfile cannot be read-only");
            return HandleRequestResult(await Mediator.Send(new MethodList.Request()));
        }


        [HttpGet("{id}")]
        public async Task<IActionResult> GetOneMethod(Guid id)
        {

            return HandleRequestResult(await Mediator.Send(new MethodDetail.Query() { MethodID = id }));
        }
        [HttpPost]
        public async Task<IActionResult> CreateMethod(Method method)
        {
            return HandleRequestResult(await Mediator.Send(new MethodCreate.Command() { Method = method }));


        }

        [HttpPut]
        public async Task<IActionResult> UpdateMethod(Method method)
        {
            return HandleRequestResult(await Mediator.Send(new MethodUpdate.Command() { Method = method }));


        }
    }
}