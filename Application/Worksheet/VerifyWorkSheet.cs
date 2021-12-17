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
    public class VerifyWorkSheet
    {
        public class Request : IRequest<Result<Unit>>
        {
            public List<string> WorkSheetList { get; set; }
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
                foreach (var wsn in request.WorkSheetList)
                {
                    var workSheets = await _db.WorkSheet.FirstOrDefaultAsync(w => w.WorkSheetNo == wsn, cancellationToken: cancellationToken);
                    workSheets.SetStatus();

                }
                var res = await _db.SaveChangesAsync(cancellationToken) > 0;

                if (res) return Result<Unit>.Success(Unit.Value);

                return Result<Unit>.Fail(new ErrorrType() { Name = "3", Message = "Some thing went wrong" });

            }
        }

    }
}