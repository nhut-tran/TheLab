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


                Domain.WorkSheet workSheet = await _db.WorkSheet
               .Include(w => w.Samples)
               .ThenInclude(w => w.Paramaters.Where(p => p.Status == _getStatus.Verify[request.Department]))
               .ThenInclude(p => p.Method)
               .Include(w => w.IssueTo)
               .FirstOrDefaultAsync(w => w.WorkSheetNo == request.WorkSheetNo, cancellationToken: cancellationToken);
                if (workSheet == null) return Result<Unit>.Fail(new ErrorrType() { Name = "1", Message = "Not found" });


                var mapWorkSheet = _mapper.Map<WorkSheetDto>(workSheet);
                var mapCustomer = _mapper.Map<CustomerDto>(workSheet.IssueTo);
                var reportStream = _report.GenerateReport(mapWorkSheet);

                try
                {
                    _emailSender.Send(mapCustomer, mapWorkSheet, EmailContentType.SendResult, reportStream);
                    workSheet.SetStatus();
                    await _db.SaveChangesAsync(cancellationToken);
                    return Result<Unit>.Success();
                }
                catch (Exception)
                {

                    return Result<Unit>.Fail(new ErrorrType() { Name = "3", Message = "Cannot send email" });
                }







            }


        }
    }
}
