using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using AutoMapper;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.MethodCreate
{
    public class MethodCreate
    {
        public class Command : IRequest<Result<Unit>>
        {
            public MethodDto Method { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _db;
            private readonly IValidator<Domain.Method> _validator;
            private readonly IMapper _mapper;

            public Handler(DataContext db, IValidator<Domain.Method> validator, IMapper mapper)
            {
                _validator = validator;
                _mapper = mapper;
                _db = db;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {


               
                var mapMethod = _mapper.Map<Domain.Method>(request.Method);
               var validateRes =  _validator.Validate(mapMethod);
                if (!validateRes.IsValid) return Result<Unit>.Fail(new ErrorrType() { Name = "2", Message = validateRes.ToString(",") });
                _db.Method.Add(mapMethod);
               
                var res = await _db.SaveChangesAsync() > 0;



                if (res) return Result<Unit>.Success(Unit.Value);

                return Result<Unit>.Fail(new ErrorrType() { Name = "3", Message = "Some thing went wrong" });
            }
        }
    }

}
