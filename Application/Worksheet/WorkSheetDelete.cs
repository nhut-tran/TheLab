using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.WorkSheet
{
    public class WorkSheetDelete
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Guid WorkSheetID { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _db;

            public Handler(DataContext db)
            {
                _db = db;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var WorkSheet = await _db.WorkSheet.FirstOrDefaultAsync(w => w.WorkSheetID == request.WorkSheetID, cancellationToken: cancellationToken);
                if (WorkSheet == null) Result<Unit>.Fail(new ErrorrType() { Name = "1", Message = "WorkSheet Not Found" });

                if (WorkSheet != null) _db.WorkSheet.Remove(WorkSheet);

                var res = await _db.SaveChangesAsync(cancellationToken) > 0;
                if (res) return Result<Unit>.Success(Unit.Value);

                return Result<Unit>.Fail(new ErrorrType() { Name = "3", Message = "Fail to delete" });
            }
        }
    }
}