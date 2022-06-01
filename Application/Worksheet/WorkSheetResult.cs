using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using AutoMapper;
using System.Linq;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Worksheet
{
    public class WorkSheetResult
    {


        public class Command : IRequest<Result<Unit>>
        {
            public WorkSheetDto WorkSheet { get; set; }
            public string DepartmentID { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _db;
            private readonly IMapper _mapper;

            public Handler(DataContext db, IMapper mapper)
            {
                _db = db;
                _mapper = mapper;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var workSheet = await _db.WorkSheet
                .Include(w => w.Samples)
                .ThenInclude(w => w.Paramaters.Where(p => p.Method.DepartmentID == request.DepartmentID))
                .ThenInclude(p => p.Method)
                .Include(w => w.IssueTo)
                .FirstOrDefaultAsync(w => w.WorkSheetID == request.WorkSheet.WorkSheetID, cancellationToken: cancellationToken);

                if (workSheet == null) Result<Unit>.Fail(new ErrorrType() { Name = "1", Message = "WorkSheet Not Found" });

                var mapWorkSheet = _mapper.Map<Domain.WorkSheet>(request.WorkSheet);
                foreach (var sample in mapWorkSheet.Samples)
                {

                    foreach (var p in sample.Paramaters)
                    {
                        if (!string.IsNullOrEmpty(p.Result))
                        {

                            var resultFromDatabase = workSheet.Samples.FirstOrDefault(s => s.SampleID == sample.SampleID).Paramaters.FirstOrDefault(pa => pa.MethodID == p.MethodID).Result;
                            if (string.IsNullOrEmpty(resultFromDatabase))
                                workSheet.Samples.FirstOrDefault(s => s.SampleID == sample.SampleID).Paramaters.FirstOrDefault(pa => pa.MethodID == p.MethodID).Result = p.Result;
                        }

                    }
                }

                var res = await _db.SaveChangesAsync(cancellationToken) > 0;

                if (res) return Result<Unit>.Success(Unit.Value);

                return Result<Unit>.Fail(new ErrorrType() { Name = "3", Message = "Something went wrong" });



            }
        }

    }
}

