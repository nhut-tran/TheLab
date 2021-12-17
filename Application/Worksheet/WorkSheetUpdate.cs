using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using AutoMapper;
using DocumentFormat.OpenXml.Office2010.ExcelAc;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.WorkSheetUpdate
{
    public class WorkSheetUpdate
    {
        public class Command : IRequest<Result<Unit>>
        {
            public WorkSheetDto WorkSheet { get; set; }
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
                var WorkSheet = await _db.WorkSheet
                .Include(w => w.Samples)

                .ThenInclude(w => w.Paramaters)
                .ThenInclude(p => p.Method)
                .Include(w => w.IssueTo)
                .AsSplitQuery()
                .FirstAsync(w => w.WorkSheetID == request.WorkSheet.WorkSheetID, cancellationToken: cancellationToken);

                if (WorkSheet == null) Result<Unit>.Fail(new ErrorrType() { Name = "1", Message = "WorkSheet Not Found" });

                _mapper.Map(request.WorkSheet, WorkSheet);

                _db.WorkSheet.Update(WorkSheet);

                var res = await _db.SaveChangesAsync(cancellationToken) > 0;

                if (res) return Result<Unit>.Success(Unit.Value);

                return Result<Unit>.Fail(new ErrorrType() { Name = "3", Message = "Some thing went wrong" });

            }
        }
    }

}
