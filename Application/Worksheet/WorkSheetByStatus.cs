using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Application.Interface;
using AutoMapper;
using DocumentFormat.OpenXml.Office2010.ExcelAc;
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
            public bool Verify { get; set; } // true if get worksheet with result
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
                //workSheet without result and for lab
                if (!request.Verify && request.Department.Contains("Lab"))
                {
                    if (request.DepartmentID == "Ma")
                    {
                        //if dept is manager lab get worksheet with paramaters already verified by lab
                        workSheets = await _db.WorkSheet
                        .Include(w => w.Samples)
                        .ThenInclude(w => w.Paramaters.Where(p => p.Status == _getStatus.Accept[request.Department]))
                        .ThenInclude(p => p.Method)
                        .Include(w => w.IssueTo)
                        .OrderByDescending(w => w.ReceiveDate)
                        .ToListAsync(cancellationToken: cancellationToken);
                        workSheets = workSheets.Where(w => w.Samples.All(s => s.Paramaters.Count() > 0)).ToList();
                    }
                    else
                    {
                        workSheets = await _db.WorkSheet
                                           .Include(w => w.Samples)
                                           .ThenInclude(w => w.Paramaters.Where(p => p.Method.DepartmentID == request.DepartmentID))
                                           .ThenInclude(p => p.Method)
                                           .Include(w => w.IssueTo)
                                           .Where(w => w.Samples.Where(s => s.Paramaters.Count() > 0).Count() > 0)
                                           .OrderByDescending(w => w.ReceiveDate).ToListAsync(cancellationToken: cancellationToken);

                        workSheets = workSheets.Where(w => w.Status == _getStatus.Accept[request.Department]).ToList();
                    }


                }
                else if (!request.Verify && !request.Department.Contains("Lab"))
                {
                    if (request.DepartmentID == "Rp")
                    {
                        //if dept is manager lab get worksheet with paramaters already verified by lab
                        workSheets = await _db.WorkSheet
                        .Include(w => w.Samples)
                        .ThenInclude(w => w.Paramaters.Where(p => p.Status == _getStatus.Accept[request.Department]))
                        .ThenInclude(p => p.Method)
                        .Include(w => w.IssueTo)
                        .OrderByDescending(w => w.ReceiveDate)
                        .ToListAsync(cancellationToken: cancellationToken);
                        workSheets = workSheets.Where(w => w.Samples.All(s => s.Paramaters.Count() > 0)).ToList();
                    }
                    else
                    {
                        workSheets = await _db.WorkSheet
                                                                 .Include(w => w.Samples)
                                                                 .ThenInclude(w => w.Paramaters)
                                                                 .ThenInclude(p => p.Method)
                                                                 .Include(w => w.IssueTo)
                                                                 .ToListAsync();
                        workSheets = workSheets.Where(w => w.Status == _getStatus.Accept[request.Department]).ToList();
                    }

                }
                else
                {
                    if (request.DepartmentID == "Rp")
                    {

                        workSheets = await _db.WorkSheet
                        .Include(w => w.Samples)
                        .ThenInclude(w => w.Paramaters.Where(p => p.Status == _getStatus.Verify[request.Department]))
                        .ThenInclude(p => p.Method)
                        .Include(w => w.IssueTo)
                        .OrderByDescending(w => w.ReceiveDate)
                        .ToListAsync(cancellationToken: cancellationToken);
                        workSheets = workSheets.Where(w => w.Samples.All(s => s.Paramaters.Count() > 0)).ToList();
                    }
                    else
                    {
                        workSheets = await _db.WorkSheet
                    .Include(w => w.Samples)
                    .ThenInclude(w => w.Paramaters.Where(p => p.Method.DepartmentID == request.DepartmentID))
                    .ThenInclude(p => p.Method)
                    .Include(w => w.IssueTo)
                    .Where(w => w.Samples.Where(s => s.Paramaters.Where(p => p.Method.DepartmentID == request.DepartmentID).Count() > 0).Count() > 0)
                    .OrderByDescending(w => w.ReceiveDate)
                    .ToListAsync(cancellationToken: cancellationToken);
                        workSheets = workSheets.Where(ws => ws.Samples.All(s => s.Paramaters.All(p => p.Result != null)))
                        .Where(w => w.Status == _getStatus.Process[request.Department]).ToList();

                    }

                }

                var mapWorkSheet = _mapper.Map<List<WorkSheetDto>>(workSheets);

                return ResultList<WorkSheetDto>.Success(mapWorkSheet, request.Page);

            }
        }

    }
}