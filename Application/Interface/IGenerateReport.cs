using System.Collections.Generic;
using System.IO;
using Application.Core;


namespace Application.Interface
{
    public interface IGenerateReport<T, S, P>

    {
        Stream GenerateReport(string path, WorkSheetDto ws);
        T CreateTable(SampleDto sample); //List<SampleMethodAssigment> result
        S CreateTableStyle();
        List<P> CreateGeneralInfo(string customer, string receiveDate, SampleDto sample);

    }
}