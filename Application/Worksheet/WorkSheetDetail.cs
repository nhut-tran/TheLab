using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Application.Interface;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.WorkSheet
{
    public class WorkSheetDetail
    {
        public class Query : IRequest<Result<WorkSheetDto>>
        {
            public string WorkSheetNo { get; set; }
            public int SampleID { get; set; }
            public string Department { get; set; }
            public string DepartmentID { get; set; }

        }

        public class Handler : IRequestHandler<Query, Result<WorkSheetDto>>
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

            public async Task<Result<WorkSheetDto>> Handle(Query request, CancellationToken cancellationToken)
            {

                Domain.WorkSheet workSheet;

                var query = _db.WorkSheet
                .Include(w => w.Samples)
                .ThenInclude(w => w.Paramaters.Where(p => p.Method.DepartmentID == request.DepartmentID))
                .ThenInclude(p => p.Method)
                .Include(w => w.IssueTo);

                if (request.DepartmentID == "Re" | request.DepartmentID == "Rp" | request.DepartmentID == "Ma")
                {
                    query = _db.WorkSheet
                    .Include(w => w.Samples)
                    .ThenInclude(w => w.Paramaters)
                    .ThenInclude(p => p.Method)
                    .Include(w => w.IssueTo);
                }
                //search by SampleID or WorkSheet Number
                if (request.SampleID > 0)
                {
                    workSheet = await query.FirstOrDefaultAsync(ws => ws.Samples.Any(s => s.SampleID == request.SampleID), cancellationToken: cancellationToken);
                }
                else
                {
                    workSheet = await query.FirstOrDefaultAsync(w => w.WorkSheetNo == request.WorkSheetNo, cancellationToken: cancellationToken);
                }

                if (workSheet == null) return Result<WorkSheetDto>.Fail(new ErrorrType() { Name = "1", Message = "Not found" });

                workSheet.RemoveSampleEmpty();

                var mapWorkSheet = _mapper.Map<WorkSheetDto>(workSheet);

                return Result<WorkSheetDto>.Success(mapWorkSheet);

            }
        }
    }
}