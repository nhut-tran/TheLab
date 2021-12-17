using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using DocumentFormat.OpenXml.Office2010.ExcelAc;
using Domain;
using MediatR;
using Persistence;

namespace Application.Method
{
    public class MethodDetail
    {
        public class Query : IRequest<Result<Domain.Method>>
        {
            public Guid MethodID { get; set; }
        }


        public class Handler : IRequestHandler<Query, Result<Domain.Method>>
        {
            private readonly DataContext _db;

            public Handler(DataContext db)
            {
                _db = db;
            }

            public async Task<Result<Domain.Method>> Handle(Query request, CancellationToken cancellationToken)
            {
                var method = await _db.Method.FindAsync(request.MethodID);

                if (method == null) return Result<Domain.Method>.Fail(new ErrorrType() { Name = "1", Message = "Not found" });

                return Result<Domain.Method>.Success(method);
            }
        }
    }
}