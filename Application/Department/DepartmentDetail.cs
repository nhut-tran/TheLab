using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Department
{
    public class DepartmentDetail
    {
        public class Query : IRequest<ResultList<DepartmentDto>>
        {

        }


        public class Handler : IRequestHandler<Query, ResultList<DepartmentDto>>
        {
            private readonly DataContext _db;
            private readonly IMapper _mapper;


            public Handler(DataContext db, IMapper mapper)
            {

                _mapper = mapper;
                _db = db;
            }

            public async Task<ResultList<DepartmentDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                var department = await _db.Department.ToListAsync(cancellationToken: cancellationToken);
                if (department == null) return ResultList<DepartmentDto>.Fail(new ErrorrType() { Name = "1", Message = "Not found" });
                var mapDeparment = _mapper.Map<List<DepartmentDto>>(department);
                return ResultList<DepartmentDto>.Success(mapDeparment);
            }
        }
    }
}