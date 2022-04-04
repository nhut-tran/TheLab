using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Application.Interface;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Worksheet
{
    public class WorkSheetByStatus
    {
        public class Request : IRequest<ResultList<WorkSheetDto>>
        {
            public string Department { get; set; }
            public string DepartmentID { get; set; }
            public bool WithResult { get; set; } // true if get worksheet with result
            public int Page { get; set; }
        }

        public class Handler : IRequestHandler<Request, ResultList<WorkSheetDto>>
        {
            private readonly DataContext _db;
            private readonly IMapper _mapper;
            private readonly IGetValueToApprove<string, int> _getStatus;
            public Handler(DataContext db,
            IMapper mapper,
            IGetValueToApprove<string, int> getStatus
            )
            {
                _mapper = mapper;
                _getStatus = getStatus;
                _db = db;
            }

            public async Task<ResultList<WorkSheetDto>> Handle(Request request, CancellationToken cancellationToken)
            {

                List<Domain.WorkSheet> workSheets;
                
                Expression<Func<Sample, IEnumerable<SampleMethodAssigment>>> filterByStatus = s => s.Paramaters.Where(p => p.Status == (request.WithResult ? _getStatus.Verify[request.Department] :_getStatus.Accept[request.Department]));
                Expression<Func<Sample, IEnumerable<SampleMethodAssigment>>> filterByDept = request.WithResult ? s => s.Paramaters.Where(p => p.Method.DepartmentID == request.DepartmentID && !string.IsNullOrEmpty(p.Result)) : s => s.Paramaters.Where(p => p.Method.DepartmentID == request.DepartmentID);
                Func<Domain.WorkSheet, bool> filterbyWorkSheetStatus = w => w.Status == _getStatus.Accept[request.Department];

                var firstFilter = filterByDept;
                var secondFilter = filterbyWorkSheetStatus;

               
                if (request.DepartmentID == "Ma" | request.DepartmentID == "Re" | request.DepartmentID == "Rp")
                {
                    firstFilter = filterByStatus;
                }

                workSheets = await _db.WorkSheet
                .Include(w => w.Samples)
                .ThenInclude(firstFilter)
                .ThenInclude(p => p.Method)
                .Include(w => w.IssueTo)
                .OrderByDescending(w => w.ReceiveDate)
                .ToListAsync(cancellationToken: cancellationToken);

                if (!request.WithResult)
                {
                    workSheets = workSheets.Where(secondFilter).ToList();
                } else
                {
                    if(request.Department.Contains("Lab"))
                    {
                        workSheets = workSheets
                       .Where(w => w.Status == _getStatus.Process[request.Department]).ToList();
                    } else
                    {
                        workSheets = workSheets
                      .Where(w => w.Status == _getStatus.Verify[request.Department]).ToList();
                    }
                    
                }

                workSheets.ForEach(w => w.RemoveSampleEmpty());

                var mapWorkSheet = _mapper.Map<List<WorkSheetDto>>(workSheets);

                return ResultList<WorkSheetDto>.Success(mapWorkSheet, request.Page);

            }
        }

    }
}