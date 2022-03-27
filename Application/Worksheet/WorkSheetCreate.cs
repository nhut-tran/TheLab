using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.WorkSheetCreate
{
    public class WorkSheetCreate
    {
        public class Command : IRequest<Result<Unit>>
        {
            public WorkSheetDto WorkSheet { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _db;
            private readonly IValidator<Domain.WorkSheet> _validator;
            private readonly IMapper _mapper;

            public Handler(DataContext db, IValidator<Domain.WorkSheet> validator, IMapper mapper)
            {
                _mapper = mapper;
                _validator = validator;
                _db = db;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {

                var blankWorkSheet = _db.WorkSheet
                .Include(w => w.Samples)
                .ThenInclude(w => w.Paramaters)
                .ThenInclude(p => p.Method)
                .FirstOrDefault(t => t.WorkSheetID == request.WorkSheet.WorkSheetID);

                var customer = _db.Customer.FirstOrDefault(t => t.CustomerId == request.WorkSheet.IssueTo);


                blankWorkSheet.IssueTo = customer;
                _mapper.Map(request.WorkSheet, blankWorkSheet);

                var validateRes = _validator.Validate(blankWorkSheet);

                if (!validateRes.IsValid) return Result<Unit>.Fail(new ErrorrType() { Name = "2", Message = validateRes.ToString(",") });

                _db.WorkSheet.Update(blankWorkSheet);

                var res = await _db.SaveChangesAsync(cancellationToken) > 0;

                if (res) return Result<Unit>.Success(Unit.Value);

                return Result<Unit>.Fail(new ErrorrType() { Name = "3", Message = "Some thing went wrong" });
            }
        }
    }

}
