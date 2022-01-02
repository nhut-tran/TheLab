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