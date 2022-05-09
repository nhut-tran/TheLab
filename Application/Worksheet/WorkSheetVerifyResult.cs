using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Application.Interface;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Worksheet
{
    public class WorkSheetVerifyResult
    {
        public class Request : IRequest<Result<Unit>>
        {
            public List<string> WorkSheetList { get; set; }
            public string Department { get; set; }
            public string DepartmentID { get; set; }

        }

        public class Handler : IRequestHandler<Request, Result<Unit>>
        {
            private readonly DataContext _db;
            private readonly IMapper _mapper;
            private readonly IGetValueToApprove<string, int> _getStatus;

            public Handler(DataContext db, IMapper mapper, IGetValueToApprove<string, int> getStatus)
            {
                _mapper = mapper;
                _getStatus = getStatus;
                _db = db;
            }

            public async Task<Result<Unit>> Handle(Request request, CancellationToken cancellationToken)
            {


                foreach (var wsn in request.WorkSheetList)
                {

                    var workSheet = await _db.WorkSheet
                    .Include(w => w.Samples)
                    .ThenInclude(w => w.Paramaters.Where(p => p.Method.DepartmentID == request.DepartmentID && !string.IsNullOrEmpty(p.Result) && p.ResultDate.Date <= DateTime.Now.Date && p.Status == _getStatus.Process[request.Department]))
                    .ThenInclude(p => p.Method)
                    .Include(w => w.IssueTo)
                    .FirstOrDefaultAsync(w => w.WorkSheetNo == wsn, cancellationToken: cancellationToken);

                    if (workSheet.Status != _getStatus.Process[request.Department])
                    {
                        return Result<Unit>.Fail(new ErrorrType() { Name = "2", Message = "WorkSheet access is denied" });
                    }
                    workSheet.SetStatus();

                }
                var res = await _db.SaveChangesAsync(cancellationToken) > 0;

                if (res) return Result<Unit>.Success(Unit.Value);

                return Result<Unit>.Fail(new ErrorrType() { Name = "3", Message = "Some thing went wrong" });

            }
        }

    }
}