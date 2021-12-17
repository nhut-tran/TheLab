using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.WorkSheet
{
    public class WorkSheetList
    {
        public class Request : IRequest<ResultList<Domain.WorkSheet>>
        {
            public Guid WorkSheetID { get; set; }
        }

        public class Handler : IRequestHandler<Request, ResultList<Domain.WorkSheet>>
        {
            private readonly DataContext _db;

            public Handler(DataContext db)
            {
                _db = db;
            }

            public async Task<ResultList<Domain.WorkSheet>> Handle(Request request, CancellationToken cancellationToken)
            {
                var WorkSheets = await _db.WorkSheet.ToListAsync();

                return ResultList<Domain.WorkSheet>.Success(WorkSheets);
            }
        }
    }
}