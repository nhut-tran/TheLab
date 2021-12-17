using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Threading.Tasks;
using Application.Core;

namespace Application.Interface
{
    public interface IResult<T>
    {



        bool IsSuccess { get; set; }
        ErrorrType Error { get; set; }
        static Metadata Metadata { get; set; }
        string Entity { get; set; }



    }
}