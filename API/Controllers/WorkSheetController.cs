using System;
using System.Collections.Generic;
using System.IO;
using System.Security.Claims;
using System.Threading.Tasks;
using Application.Core;
using Application.Worksheet;
using Application.WorkSheet;
using Application.WorkSheetCreate;
using Application.WorkSheetUpdate;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.Net.Http.Headers;
using Application.Service;
using Application.Service.GenerateWorkSheet;
using Application.Service.EmailService;
using API.DTOs;

namespace API.Controllers
{
    [ApiController]
    // [Authorize]
    [Route("api/[controller]")]
    public class WorkSheetController : BaseController
    {
        private readonly IWebHostEnvironment _env;
        private readonly IEmailSender _emailSender;
        private readonly ILogger _log;
        private readonly Report _report;
        private readonly GenerateWorkSheet _generateWorkSheet;

        public WorkSheetController(

            ILogger<WorkSheetController> log,
            Report report,
            GenerateWorkSheet generateWorkSheet,
            IWebHostEnvironment env,
            IEmailSender emailSender
        )
        {
            _log = log;
            _report = report;
            _generateWorkSheet = generateWorkSheet;
            _env = env;
            _emailSender = emailSender;
        }

        private async Task<Stream> getWordDocumentStream(string wsNo)
        {
            var depa = HttpContext.User.FindFirstValue("Department");
            var depaID = HttpContext.User.FindFirstValue("DepartmentID");
            var doc = await Mediator.Send(new WorkSheetDetail.Query { WorkSheetNo = wsNo, Department = depa, DepartmentID = depaID });

            var reportStream = _generateWorkSheet.GenerateWS(doc.Value);
            return reportStream;
        }
        // create blank WorkSheet
        [HttpGet("blank/{nummberOfSample}")]
        public async Task<IActionResult> CreateBlankWorkSheet(int nummberOfSample)
        {
            return HandleRequestResult(await Mediator.Send(new WorkSheetCreateBlank.Command() { NumberOfSample = nummberOfSample}));
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
            var depaID = HttpContext.User.FindFirstValue("DepartmentID");
            return HandleRequestResult(await Mediator.Send(new WorkSheetDetail.Query() { WorkSheetNo = id, Department = depa, DepartmentID = depaID }));
        }
        [Authorize]
        [HttpGet("WorkSheetForResult/{page}")]
        public async Task<IActionResult> GetWorkSheetToEnterResult(int page)
        {
            var depa = HttpContext.User.FindFirstValue("Department");
            var depaID = HttpContext.User.FindFirstValue("DepartmentID");
            return HandleRequestResult(await Mediator.Send(new WorkSheetSelectEnterResult.Request { Department = depa, DepartmentID = depaID, Page = page}));
        }
        [Authorize]
        [HttpGet("BySample/{id}")]
        public async Task<IActionResult> GetOneWorkSheetBySample(int id)
        {
            var depa = HttpContext.User.FindFirstValue("Department");
            var depaID = HttpContext.User.FindFirstValue("DepartmentID");

            return HandleRequestResult(await Mediator.Send(new WorkSheetDetail.Query() { SampleID = id, Department = depa, DepartmentID = depaID }));
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
            var depaID = HttpContext.User.FindFirstValue("DepartmentID");
            return HandleRequestResult(await Mediator.Send(new WorkSheetResult.Command() { WorkSheet = workSheet, DepartmentID = depaID }));
        }

        //get list of worksheet to approved base on deparment+worksheet status
        [Authorize("HeaderLevel")]
        [HttpGet("UnApproved/{page}")]
        public async Task<IActionResult> GetWorkSheets(int page)
        {
            var depa = HttpContext.User.FindFirstValue("Department");
            var depaID = HttpContext.User.FindFirstValue("DepartmentID");
            return HandleRequestResult(await Mediator.Send(new WorkSheetByStatus.Request() { Department = depa, Page = page, DepartmentID = depaID }));
        }
        //get list of worksheet to approved by deparment
        [Authorize("HeaderLevel")]
        [HttpGet("Approved/{page}")]
        public async Task<IActionResult> GetWorkSheetSendEmail(int page)
        {
            var depa = HttpContext.User.FindFirstValue("Department");
            var depaID = HttpContext.User.FindFirstValue("DepartmentID");
            return HandleRequestResult(await Mediator.Send(new WorkSheetByStatus.Request() { Department = depa, Page = page, WithResult = true, DepartmentID = depaID }));
        }
        //approved result
        [Authorize("HeaderLevel")]
        [HttpGet("UnApproveWithResult")]
        public async Task<IActionResult> GetWorkSheetsWithResult()
        {
            var depa = HttpContext.User.FindFirstValue("Department");
            var depaID = HttpContext.User.FindFirstValue("DepartmentID");
            return HandleRequestResult(await Mediator.Send(new WorkSheetByStatus.Request() { Department = depa, WithResult = true, DepartmentID = depaID }));
        }

        //unverify worksheet
        [Authorize("HeaderLevel")]
        [HttpGet("Unverify/{wsn}")]
        public async Task<IActionResult> UnverifyWorkSheet(string wsn)
        {
            var depa = HttpContext.User.FindFirstValue("Department");
            var depaID = HttpContext.User.FindFirstValue("DepartmentID");
            return HandleRequestResult(await Mediator.Send(new UnverifyWorkSheet.Request() { Department = depa, WorkSheetNo = wsn, DepartmentID = depaID }));
        }
        //approved worksheet by increase worksheet status
        [HttpPost("verify")]
        public async Task<IActionResult> VerifyWorkSheet(List<string> workSheetList)
        {
            var depa = HttpContext.User.FindFirstValue("Department");
            var depaID = HttpContext.User.FindFirstValue("DepartmentID");
            return HandleRequestResult(await Mediator.Send(new VerifyWorkSheet.Request() { WorkSheetList = workSheetList, Department = depa, DepartmentID = depaID }));
        }
        [HttpPost("verifyresult")]
        public async Task<IActionResult> VerifyWorkSheetResult(List<string> workSheetList)
        {
            var depa = HttpContext.User.FindFirstValue("Department");
            var depaID = HttpContext.User.FindFirstValue("DepartmentID");
            return HandleRequestResult(await Mediator.Send(new WorkSheetVerifyResult.Request() { WorkSheetList = workSheetList, Department = depa, DepartmentID = depaID }));
        }

        //generate report
        [Authorize("Report")]
        [HttpGet("generateReport/{wsno}")]
        public async Task<IActionResult> GenerateReport(string wsNo)
        {
            var depa = HttpContext.User.FindFirstValue("Department");
            var doc = await Mediator.Send(new WorkSheetReport.Query { WorkSheetNo = wsNo, Department = depa });

            var reportStream = _report.GenerateReport(doc.Value);
            if (reportStream.Length > 0)
            {
                var cd = new ContentDispositionHeaderValue("attachment");
                cd.FileName = $"{doc.Value.ReceiveNo}.docx";
                Response.Headers[HeaderNames.ContentDisposition] = cd.ToString();
                return new FileStreamResult(reportStream, new MediaTypeHeaderValue("application/vnd.openxmlformats-officedocument.wordprocessingml.document"))
                {

                };
            }

            return HandleRequestResult(Result<Domain.WorkSheet>.Fail(
                new ErrorrType() { Name = "3", Message = "Cannot export report" })
                );


        }
        //generate worksheet
        [Authorize("SampleReceive")]
        [HttpGet("generateworksheet/{wsno}")]
        public async Task<IActionResult> GenerateWorkSheet(string wsNo)
        {
            var reportStream = await getWordDocumentStream(wsNo);

            if (reportStream.Length > 0)
            {
                var cd = new ContentDispositionHeaderValue("attachment");
                cd.FileName = "WS.docx";
                Response.Headers[HeaderNames.ContentDisposition] = cd.ToString();
                return new FileStreamResult(reportStream, new MediaTypeHeaderValue("application/vnd.openxmlformats-officedocument.wordprocessingml.document"));
            }

            return HandleRequestResult(Result<Domain.WorkSheet>.Fail(
                new ErrorrType() { Name = "3", Message = "Cannot export report" }));
        }

        [Authorize("CustomerService")]
        [HttpGet("sendemailreceipt/{wsn}")]
        public async Task<IActionResult> SendEmailReceipt(string wsn)
        {

            var depa = HttpContext.User.FindFirstValue("Department");
            return HandleRequestResult(await Mediator.Send(new WorkSheetEmail.Command { WorkSheetNo = wsn, Department = depa }));
        }

        [Authorize("Report")]
        [HttpGet("sendemailreport/{wsn}")]
        public async Task<IActionResult> SendEmailReport(string wsn)
        {

            var depa = HttpContext.User.FindFirstValue("Department");
            return HandleRequestResult(await Mediator.Send(new WorkSheetEmail.Command { WorkSheetNo = wsn, Department = depa }));

        }

       
    }




}


