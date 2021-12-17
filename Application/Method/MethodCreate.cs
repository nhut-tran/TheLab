using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.MethodCreate
{
    public class MethodCreate
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Domain.Method Method { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _db;
            private readonly IValidator<Domain.Method> _validator;

            public Handler(DataContext db, IValidator<Domain.Method> validator)
            {
                _validator = validator;
                _db = db;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var validateRes = _validator.Validate(request.Method);

                if (!validateRes.IsValid) return Result<Unit>.Fail(new ErrorrType() { Name = "2", Message = validateRes.ToString(",") });

                _db.Method.Add(request.Method);

                var res = await _db.SaveChangesAsync() > 0;



                if (res) return Result<Unit>.Success(Unit.Value);

                return Result<Unit>.Fail(new ErrorrType() { Name = "3", Message = "Some thing went wrong" });
            }
        }
    }

}
