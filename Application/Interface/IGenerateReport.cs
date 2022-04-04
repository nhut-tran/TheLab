using System.Collections.Generic;
using System.IO;
using API.DTOs;
using Application.Core;


namespace Application.Interface
{
    public interface IGenerateReport<T, S, P>

    {
        Stream GenerateReport(WorkSheetDto ws);
        T CreateTable(SampleDto sample, List<SampleMethodAssigmentDto> filterParam); //List<SampleMethodAssigment> result
        S CreateTableStyle();
        List<P> CreateGeneralInfo(string customer, string receiveDate, SampleDto sample);

    }
}