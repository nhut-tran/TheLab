using System.Collections.Generic;
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
    public class UnverifyWorkSheet
    {
        public class Request : IRequest<Result<Unit>>
        {
            public string WorkSheetNo { get; set; }
            public string Department { get; set; }

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


                var workSheet = await _db.WorkSheet.FirstOrDefaultAsync(w => w.WorkSheetNo == request.WorkSheetNo, cancellationToken: cancellationToken);

                if (workSheet.Status != _getStatus.Verify[request.Department])
                    return Result<Unit>.Fail(new ErrorrType() { Name = "2", Message = "WorkSheet access is denied" });

                workSheet.ResetStatus();
                var res = await _db.SaveChangesAsync(cancellationToken) > 0;

                if (res) return Result<Unit>.Success(Unit.Value);

                return Result<Unit>.Fail(new ErrorrType() { Name = "3", Message = "Some thing went wrong" });

            }
        }
    }
}