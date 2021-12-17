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
using Microsoft.Extensions.Configuration;
using Persistence;

namespace Application.WorkSheet
{
    public class WorkSheetReport
    {
        public class Query : IRequest<Result<WorkSheetDto>>
        {
            public string WorkSheetNo { get; set; }
            public string Department { get; set; }

        }

        public class Handler : IRequestHandler<Query, Result<WorkSheetDto>>
        {
            private readonly DataContext _db;
            private readonly IMapper _mapper;
            private readonly IGetValueToApprove<string, int> _getStatus;

            public IConfiguration Config { get; }


            public Handler(DataContext db, IMapper mapper, IGetValueToApprove<string, int> getStatus)
            {

                _mapper = mapper;
                _getStatus = getStatus;
                _db = db;
            }

            public async Task<Result<WorkSheetDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                Domain.WorkSheet workSheet = await _db.WorkSheet
               .Include(w => w.Samples)
               .ThenInclude(w => w.Paramaters)
               .ThenInclude(p => p.Method)
               .Include(w => w.IssueTo)
               .AsSplitQuery()
               .Where(w => w.Status >= _getStatus.Accept[request.Department])
                .FirstOrDefaultAsync(w => w.WorkSheetNo == request.WorkSheetNo, cancellationToken: cancellationToken);
                workSheet.SetStatus();
                await _db.SaveChangesAsync(cancellationToken);


                if (workSheet == null) return Result<WorkSheetDto>.Fail(new ErrorrType() { Name = "1", Message = "Not found" });
                var mapWorkSheet = _mapper.Map<WorkSheetDto>(workSheet);

                return Result<WorkSheetDto>.Success(mapWorkSheet);





            }
        }
    }
}