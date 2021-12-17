using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using MediatR;
using Persistence;

namespace Application.Method
{
    public class MethodDelete
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Guid MethodID { get; set; }
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
                var method = await _db.Method.FindAsync(request.MethodID);
                if (method == null) Result<Unit>.Fail(new ErrorrType() { Name = "1", Message = "Method Not Found" });

                if (method != null) _db.Method.Remove(method);

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}