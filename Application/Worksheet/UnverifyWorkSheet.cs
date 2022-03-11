using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Application.Interface;
using AutoMapper;

using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Worksheet
{
    public class UnverifyWorkSheet
    {
        public class Request : IRequest<Result<Unit>>
        {
            public string WorkSheetNo { get; set; }
            public bool Verify { get; set; } // true if with result
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


                Domain.WorkSheet workSheet;
                int allowedStatus = _getStatus.Verify[request.Department];
                if (request.Department.Contains("Lab"))
                {
                    workSheet = await _db.WorkSheet
                                        .Include(w => w.Samples)
                                        .ThenInclude(s => s.Paramaters.Where(p => p.Method.DepartmentID == request.DepartmentID))
                                        .ThenInclude(p => p.Method)
                                        .Include(w => w.IssueTo)
                                        .Where(w => w.Samples.Where(s => s.Paramaters.Where(p => p.Method.DepartmentID == request.DepartmentID).Count() > 0).Count() > 0)
                                        .FirstOrDefaultAsync(w => w.WorkSheetNo == request.WorkSheetNo);
                    allowedStatus = workSheet.Samples.All(s => s.Paramaters.All(p => p.Result != null)) ?
                                        _getStatus.Verify[request.Department] :
                                        allowedStatus;

                }
                else
                {
                    workSheet = await _db.WorkSheet
                                    .Include(w => w.Samples)
                                    .ThenInclude(w => w.Paramaters)
                                    .ThenInclude(p => p.Method)
                                    .Include(w => w.IssueTo)
                                    .FirstOrDefaultAsync(w => w.WorkSheetNo == request.WorkSheetNo);
                }

                if (workSheet.Status != allowedStatus)
                    return Result<Unit>.Fail(new ErrorrType() { Name = "2", Message = "WorkSheet access is denied" });

                workSheet.ResetStatus();
                var res = await _db.SaveChangesAsync(cancellationToken) > 0;

                if (res) return Result<Unit>.Success(Unit.Value);

                return Result<Unit>.Fail(new ErrorrType() { Name = "3", Message = "Some thing went wrong" });

            }
        }
    }
}