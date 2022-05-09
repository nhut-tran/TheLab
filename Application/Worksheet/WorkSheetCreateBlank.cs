using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;
using System.Collections.Generic;

namespace Application.Worksheet
{
    public class WorkSheetCreateBlank
    {
        public class Command : IRequest<Result<WorkSheetDto>>
        {
            public int NumberOfSample { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<WorkSheetDto>>
        {
            private readonly DataContext _db;

            private readonly IMapper _mapper;

            public Handler(DataContext db, IValidator<Domain.WorkSheet> validator, IMapper mapper)
            {
                _mapper = mapper;
                _db = db;
            }

            public async Task<Result<WorkSheetDto>> Handle(Command request, CancellationToken cancellationToken)
            {
                if (request.NumberOfSample < 1) return Result<WorkSheetDto>.Fail(new ErrorrType() { Name = "2", Message = "Number of is at least 1" });

                var blankWorkSheet = new Domain.WorkSheet();

                for (int i = 0; i < request.NumberOfSample; i++)
                {
                    var sample = new Sample();
                    var method = _db.Method.FirstOrDefault(t => t.MethodID == Guid.Empty);
                    var sampleAss = new SampleMethodAssigment()
                    {
                        Method = method
                    };
                    sample.Paramaters.Add(sampleAss);
                    blankWorkSheet.Samples.Add(sample);
                }

                _db.WorkSheet.Add(blankWorkSheet);

                var res = await _db.SaveChangesAsync(cancellationToken) > 0;

                await _db.SaveChangesAsync(cancellationToken);
                var savedBlank = (Domain.WorkSheet)_db.Entry(blankWorkSheet).GetDatabaseValues().ToObject();
                //worksheetNo is create by trigger in DB only exist when ws is saved in BD.
                //blankWorkSheet need to get data from saved one
                blankWorkSheet.WorkSheetNo = savedBlank.WorkSheetNo;
                var mapWorkSheet = _mapper.Map<WorkSheetDto>(blankWorkSheet);
                if (res) return Result<WorkSheetDto>.Success(mapWorkSheet);

                return Result<WorkSheetDto>.Fail(new ErrorrType() { Name = "3", Message = "Some thing went wrong" });
            }
        }

    }
}