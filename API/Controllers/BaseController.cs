using Application.Interface;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.DependencyInjection;

namespace API.Controllers
{
    public class BaseController : ControllerBase
    {
        protected IMediator _mediator;
        protected IMediator Mediator
        {
            get
            {
                if (_mediator == null) _mediator = HttpContext.RequestServices.GetService<IMediator>();

                return _mediator;
            }

        }

        protected IActionResult HandleRequestResult<T>(IResult<T> result)
        {
            if (!result.IsSuccess)
            {
                if (result.Error.Name == "NOTFOUND")
                {
                    return NotFound(result);
                }
                if (result.Error.Name == "UNKNONW")
                {
                    return BadRequest(result);
                }
                if (result.Error.Name == "VALIDATION_ERR")
                {
                    return BadRequest(result);
                }
            }
            return Ok(result);
        }



    }
}