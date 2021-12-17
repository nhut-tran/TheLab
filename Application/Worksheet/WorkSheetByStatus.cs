using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Application.Interface;
using AutoMapper;
using DocumentFormat.OpenXml.Office2010.ExcelAc;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Worksheet
{
    public class WorkSheetByStatus
    {
        public class Request : IRequest<ResultList<WorkSheetDto>>
        {
            public string Department { get; set; }
            public bool AcceptOrVerify { get; set; } // true if get worksheet with result
            public int Page { get; set; }
        }

        public class Handler : IRequestHandler<Request, ResultList<WorkSheetDto>>
        {
            private readonly DataContext _db;
            private readonly IMapper _mapper;
            private readonly IGetValueToApprove<string, int> _getStatus;
            public Handler(DataContext db,
            IMapper mapper,
            IGetValueToApprove<string, int> getStatus



            )
            {
                _mapper = mapper;
                _getStatus = getStatus;

                _db = db;
            }

            public async Task<ResultList<WorkSheetDto>> Handle(Request request, CancellationToken cancellationToken)
            {
                var query = _db.WorkSheet
                .Include(w => w.Samples)
                .ThenInclude(w => w.Paramaters)
                .ThenInclude(p => p.Method)
                .Include(w => w.IssueTo);


                List<Domain.WorkSheet> workSheets;
                if (!request.AcceptOrVerify)
                {
                    workSheets = await query.Where(w => w.Status == _getStatus.Accept[request.Department])
                    .OrderByDescending(w => w.ReceiveDate).ToListAsync(cancellationToken: cancellationToken);
                }
                else
                {
                    workSheets = await query.Where(w => w.Status == _getStatus.Verify[request.Department])
                    .Where(ws => ws.Samples.All(s => s.Paramaters.All(p => p.Result != null)))
                    .OrderByDescending(w => w.ReceiveDate)
                    .ToListAsync(cancellationToken: cancellationToken);
                }

                var mapWorkSheet = _mapper.Map<List<WorkSheetDto>>(workSheets);

                return ResultList<WorkSheetDto>.Success(mapWorkSheet, request.Page);

            }
        }

    }
}