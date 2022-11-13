using System;
using System.Collections.Generic;
using API.DTOs;
using AutoMapper;
using Domain;

namespace Application.Core
{
    public class MapperProfile : Profile
    {
        public MapperProfile()
        {
            CreateMap<MethodDto, Domain.Method>()
                .ForMember(t => t.MethodID, o => o.Ignore());
            CreateMap<Domain.Method, MethodDto>();
            CreateMap<Domain.WorkSheet, List<WorkSheetDto>>();

            CreateMap<Sample, SampleDto>()
            .ForMember(t => t.Description, o => o.NullSubstitute(""))
            .ForMember(t => t.ResultDate, o => o.MapFrom(t => t.ResultDate.ToString("dd-MM-yyyy")))
            .ForMember(t => t.Note, o => o.NullSubstitute(""))
            .ForMember(t => t.SealNumber, o => o.NullSubstitute(""));

            CreateMap<SampleDto, Sample>()
              .ForMember(t => t.ResultDate, o => o.Ignore());

            CreateMap<Sample, Sample>();
            CreateMap<SampleMethodAssigment, SampleMethodAssigmentDto>()
             .ForMember(t => t.Department, o => o.MapFrom(s => s.Method.DepartmentID))
            .ForMember(t => t.Method, o => o.MapFrom(s => s.Method.Name))
             .ForMember(t => t.MethodID, o => o.MapFrom(s => s.MethodID))
             .ForMember(t => t.Tartget, o => o.MapFrom(s => s.Method.Target))
              .ForMember(t => t.Result, o => o.MapFrom(s => s.Result))
              .ForMember(t => t.Status, o => o.MapFrom(s => s.Status))
               .ForMember(t => t.ResultDate, o => o.MapFrom(s => s.ResultDate.ToString("dd-MM-yyyy")))
               .ForMember(t => t.Unit, o => o.MapFrom(s => s.Method.Unit));

            CreateMap<SampleMethodAssigmentDto, SampleMethodAssigment>()
             .ForMember(t => t.Method, o => o.Ignore())
             .ForMember(t => t.MethodID, o => o.MapFrom(s => s.MethodID))
              .ForMember(t => t.Result, o => o.MapFrom(s => s.Result))
              .ForMember(t => t.ResultDate, o => o.Ignore());
                
              

            CreateMap<Domain.WorkSheet, WorkSheetDto>()
            .ForMember(t => t.ResultDate, o => o.MapFrom(s => s.ResultDate.ToString("dd-MM-yyyy")))
            .ForMember(t => t.DisposalDate, o => o.MapFrom(s => s.ReceiveDate.AddDays((double)s.DisposalTime).ToString("dd-MM-yyyy")))
            .ForMember(t => t.IssueTo, o => o.MapFrom(s => s.IssueTo.CustomerId))
            .ForMember(t => t.Note, o => o.NullSubstitute(""))
            .ForMember(t => t.IssueTo, o => o.NullSubstitute(""));

            //  .ForMember(t => t.WorkSheetNo, o => o.MapFrom(s => "WSN"));


            CreateMap<WorkSheetDto, Domain.WorkSheet>()
            .ForMember(t => t.ReceiveDate, o => o.Ignore())
            .ForMember(t => t.ResultDate, o => o.Ignore())
            .ForMember(t => t.IssueTo, o => o.Ignore())
            .ForMember(t => t.WorkSheetNo, o => o.Ignore())
            .ForMember(t => t.ReceiveNo, o => o.Ignore());

            CreateMap<Customer, CustomerDto>();
            CreateMap<Domain.Department, DepartmentDto>();

            // .ForAllOtherMembers(t => t.NullSubstitute(""));
        }
    }
}