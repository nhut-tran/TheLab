using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Application.Interface;
using Application.Service;
using Application.Service.EmailService;
using AutoMapper;


using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Worksheet
{
    public class WorkSheetEmail
    {
        public class Command : IRequest<Result<Unit>>
        {
            public string WorkSheetNo { get; set; }
            public string Department { get; set; }

        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _db;
            private readonly IMapper _mapper;
            private readonly IGetValueToApprove<string, int> _getStatus;
            private readonly Report _report;
            private readonly IEmailSender _emailSender;
            public Handler(DataContext db, IMapper mapper, IGetValueToApprove<string, int> getStatus,
             Report report,
             IEmailSender emailSender
            )
            {

                _mapper = mapper;
                _getStatus = getStatus;
                _db = db;
                _report = report;
                _emailSender = emailSender;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                int allowStatus;
                allowStatus = request.Department == "Report" ? _getStatus.Verify[request.Department] : _getStatus.Accept[request.Department];

                Domain.WorkSheet workSheet = await _db.WorkSheet
               .Include(w => w.Samples)
               .ThenInclude(w => w.Paramaters)
               .ThenInclude(p => p.Method)
               .Include(w => w.IssueTo)
               .AsSplitQuery()
               .Where(w => w.Status == allowStatus)
                .FirstOrDefaultAsync(w => w.WorkSheetNo == request.WorkSheetNo, cancellationToken: cancellationToken);
                if (workSheet == null) return Result<Unit>.Fail(new ErrorrType() { Name = "1", Message = "Not found" });

                await _db.SaveChangesAsync(cancellationToken);
                var mapWorkSheet = _mapper.Map<WorkSheetDto>(workSheet);
                var mapCustomer = _mapper.Map<CustomerDto>(workSheet.IssueTo);
                var reportStream = _report.GenerateReport(mapWorkSheet);
                EmailContentType emailContentType = EmailContentType.SendResult;
                if (request.Department == "CustomerService") emailContentType = EmailContentType.SendReceipt;
                try
                {
                    _emailSender.Send(mapCustomer, mapWorkSheet, emailContentType, reportStream);
                    workSheet.SetStatus();
                    return Result<Unit>.Success();
                }
                catch (System.Exception)
                {

                    return Result<Unit>.Fail(new ErrorrType() { Name = "3", Message = "Cannot send email" });
                }







            }


        }
    }
}
