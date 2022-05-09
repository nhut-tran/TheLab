using System;
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
    public class WorkSheetSelectEnterResult
    {
        public class Request : IRequest<ResultList<WorkSheetDto>>
        {
            public string Department { get; set; }
            public string DepartmentID { get; set; }
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

                List<Domain.WorkSheet> workSheets;

                workSheets = await _db.WorkSheet
                .Include(w => w.Samples)
                .ThenInclude(s => s.Paramaters.Where(p => p.Method.DepartmentID == request.DepartmentID))
                .ThenInclude(p => p.Method)
                .Include(w => w.IssueTo)
                .OrderByDescending(w => w.ReceiveDate)
                .ToListAsync(cancellationToken: cancellationToken);


                workSheets = workSheets
              .Where(w => w.Status == _getStatus.Process[request.Department] && w.ResultDate.Date <= DateTime.Now.Date).ToList();


                workSheets.ForEach(w => w.RemoveSampleEmpty());

                var mapWorkSheet = _mapper.Map<List<WorkSheetDto>>(workSheets);

                return ResultList<WorkSheetDto>.Success(mapWorkSheet, request.Page);

            }
        }
    }
}
