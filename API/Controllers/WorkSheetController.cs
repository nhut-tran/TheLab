using System;
using System.Collections.Generic;
using System.IO;
using System.Security.Claims;
using System.Threading.Tasks;
using API.Options;
using Application.Core;
using Application.Worksheet;
using Application.WorkSheet;
using Application.WorkSheetCreate;
using Application.WorkSheetUpdate;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Microsoft.Net.Http.Headers;
using Application.Service;
using Application.Service.GenerateWorkSheet;

namespace API.Controllers
{
    [ApiController]
    // [Authorize]
    [Route("api/[controller]")]
    public class WorkSheetController : BaseController
    {
        private readonly PrefixOption _options;
        private readonly IWebHostEnvironment _env;
        private readonly ILogger _log;
        private readonly Report _report;
        private readonly GenerateWorkSheet _generateWorkSheet;

        public WorkSheetController(
            IOptions<PrefixOption> options,
            ILogger<WorkSheetController> log,
            Report report,
            GenerateWorkSheet generateWorkSheet,
            IWebHostEnvironment env
        )
        {
            _log = log;
            _report = report;
            _generateWorkSheet = generateWorkSheet;
            _options = options.Value;
            _env = env;
        }
        // create blank WorkSheet
        [HttpGet("blank/{numSample}")]
        public async Task<IActionResult> CreateBlankWorkSheet(int numSample)
        {
            return HandleRequestResult(await Mediator.Send(new WorkSheetCreateBlank.Command() { NumberOfSample = numSample }));
        }
        // create fill data to blank WorkSheet
        [Authorize("SampleReceive")]
        [HttpPost]
        public async Task<IActionResult> CreateWorkSheet(WorkSheetDto workSheet)
        {
            return HandleRequestResult(await Mediator.Send(new WorkSheetCreate.Command() { WorkSheet = workSheet }));
        }


        [Authorize]
        [HttpGet("{id}")]
        public async Task<IActionResult> GetOneWorkSheet(string id)
        {
            var depa = HttpContext.User.FindFirstValue("Department");
            return HandleRequestResult(await Mediator.Send(new WorkSheetDetail.Query() { WorkSheetNo = id, Department = depa }));
        }
        [Authorize]
        [HttpGet("BySample/{id}")]
        public async Task<IActionResult> GetOneWorkSheetBySample(int id)
        {
            var depa = HttpContext.User.FindFirstValue("Department");

            return HandleRequestResult(await Mediator.Send(new WorkSheetDetail.Query() { SampleID = id, Department = depa }));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteWorkSheet(Guid id)
        {

            return HandleRequestResult(await Mediator.Send(new WorkSheetDelete.Command() { WorkSheetID = id }));
        }

        [HttpPut]
        public async Task<IActionResult> UpdateWorkSheet(WorkSheetDto workSheet)
        {

            return HandleRequestResult(await Mediator.Send(new WorkSheetUpdate.Command() { WorkSheet = workSheet }));
        }

        //result input
        [HttpPut("Result")]
        public async Task<IActionResult> EnterResult(WorkSheetDto workSheet)
        {

            return HandleRequestResult(await Mediator.Send(new WorkSheetResult.Command() { WorkSheet = workSheet }));
        }

        //get list of worksheet to verify or accept of base on deparment+worksheet status
        [Authorize("HeaderLevel")]
        [HttpGet("UnApprove/{page}")]
        public async Task<IActionResult> GetWorkSheets(int page)
        {
            var depa = HttpContext.User.FindFirstValue("Department");
            return HandleRequestResult(await Mediator.Send(new WorkSheetByStatus.Request() { Department = depa, Page = page }));
        }
        //verify result
        [Authorize("HeaderLevel")]
        [HttpGet("UnApproveWithResult")]
        public async Task<IActionResult> GetWorkSheetsWithResult()
        {
            var depa = HttpContext.User.FindFirstValue("Department");
            return HandleRequestResult(await Mediator.Send(new WorkSheetByStatus.Request() { Department = depa, AcceptOrVerify = true }));
        }

        //unverify or accept worksheet by increase worksheet status
        [Authorize("HeaderLevel")]
        [HttpGet("Unverify/{wsn}")]
        public async Task<IActionResult> UnverifyWorkSheet(string wsn)
        {
            var depa = HttpContext.User.FindFirstValue("Department");
            return HandleRequestResult(await Mediator.Send(new UnverifyWorkSheet.Request() { Department = depa, WorkSheetNo = wsn }));
        }
        //verify or accept worksheet by increase worksheet status
        [HttpPost("verify")]
        public async Task<IActionResult> VerifyWorkSheet(List<string> workSheetList)
        {
            //var depa = HttpContext.User.FindFirstValue("Department");
            return HandleRequestResult(await Mediator.Send(new VerifyWorkSheet.Request() { WorkSheetList = workSheetList }));
        }

        //generate report
        [Authorize("Report")]
        [HttpGet("generateReport/{wsno}")]
        public async Task<IActionResult> GenerateReport(string wsNo)
        {
            var depa = HttpContext.User.FindFirstValue("Department");
            var doc = await Mediator.Send(new WorkSheetReport.Query { WorkSheetNo = wsNo, Department = depa });
            var path = Path.Combine(_env.WebRootPath, "report.docx");
            var reportStream = _report.GenerateReport(path, doc.Value);
            if (reportStream.Length > 0)
            {
                var cd = new ContentDispositionHeaderValue("attachment");
                cd.FileName = "Report.docx";
                Response.Headers[HeaderNames.ContentDisposition] = cd.ToString();
                return new FileStreamResult(reportStream, new MediaTypeHeaderValue("application/vnd.openxmlformats-officedocument.wordprocessingml.document"))
                {

                };
            }

            return HandleRequestResult(Result<Domain.WorkSheet>.Fail(
                new ErrorrType() { Name = "3", Message = "Cannot export report" })
                );


        }
        [HttpGet("generateworksheet/{wsno}")]
        public async Task<IActionResult> GenerateWorkSheet(string wsNo)
        {
            var depa = HttpContext.User.FindFirstValue("Department");
            var doc = await Mediator.Send(new WorkSheetDetail.Query { WorkSheetNo = wsNo, Department = depa });

            var reportStream = _generateWorkSheet.GenerateWS(doc.Value);
            _log.LogInformation(doc.Value.WorkSheetNo);
            if (reportStream.Length > 0)
            {
                var cd = new ContentDispositionHeaderValue("attachment");
                cd.FileName = "WS.docx";
                Response.Headers[HeaderNames.ContentDisposition] = cd.ToString();
                return new FileStreamResult(reportStream, new MediaTypeHeaderValue("application/vnd.openxmlformats-officedocument.wordprocessingml.document"))
                {

                };
            }

            return HandleRequestResult(Result<Domain.WorkSheet>.Fail(
                new ErrorrType() { Name = "3", Message = "Cannot export report" })
                );


        }





    }


}

