using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.JobSheet
{
    public class CustomerDetail
    {
        public class Query : IRequest<ResultList<CustomerDto>>
        {

        }


        public class Handler : IRequestHandler<Query, ResultList<CustomerDto>>
        {
            private readonly DataContext _db;
            private readonly IMapper _mapper;


            public Handler(DataContext db, IMapper mapper)
            {

                _mapper = mapper;
                _db = db;
            }

            public async Task<ResultList<CustomerDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                var customer = await _db.Customer.ToListAsync(cancellationToken: cancellationToken);
                if (customer == null) return ResultList<CustomerDto>.Fail(new ErrorrType() { Name = "1", Message = "Not found" });
                var mapCustomer = _mapper.Map<List<CustomerDto>>(customer);
                return ResultList<CustomerDto>.Success(mapCustomer);
            }
        }
    }
}