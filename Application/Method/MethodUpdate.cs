using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using AutoMapper;
using MediatR;
using Persistence;

namespace Application.MethodUpdate
{
    public class MethodUpdate
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Domain.Method Method { get; set; }
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
                var method = await _db.Method.FindAsync(request.Method.MethodID);

                if (method == null) Result<Unit>.Fail(new ErrorrType() { Name = "1", Message = "Method Not Found" });

                _mapper.Map(request.Method, method);

                var res = await _db.SaveChangesAsync() > 0;

                if (res) Result<Unit>.Success(Unit.Value);

                return Result<Unit>.Fail(new ErrorrType() { Name = "3", Message = "Some thing went wrong" });

            }
        }
    }

}
