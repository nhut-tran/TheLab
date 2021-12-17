using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Method
{
    public class MethodList
    {
        public class Request : IRequest<ResultList<Domain.Method>>
        {
            public Guid MethodID { get; set; }
        }

        public class Handler : IRequestHandler<Request, ResultList<Domain.Method>>
        {
            private readonly DataContext _db;

            public Handler(DataContext db)
            {
                _db = db;
            }

            public async Task<ResultList<Domain.Method>> Handle(Request request, CancellationToken cancellationToken)
            {
                var methods = await _db.Method.ToListAsync();
                var filter = methods.Where(t => t.MethodID != Guid.Empty);
                return ResultList<Domain.Method>.Success(filter.ToList());
            }
        }
    }
}