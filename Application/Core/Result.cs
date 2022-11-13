using System;
using System.Collections.Generic;
using System.Linq;
using Application.Interface;
using DocumentFormat.OpenXml.Office2010.ExcelAc;

namespace Application.Core
{



    public class Result<T> : IResult<T>
    {

        private string _entity;
        public bool IsSuccess { get; set; }
        public ErrorrType Error { get; set; }
        public Metadata Metadata { get; set; }
        public string Entity
        {

            set
            {
                var t = typeof(T).Name;

                if (t.Contains("Dto")) t = t.Replace("Dto", "");

                _entity = t;
            }
            get { return _entity; }
        }
        public T Value { get; set; }



        public static Result<T> Success(T value = default)
        {

            return new Result<T> { IsSuccess = true, Value = value, Entity = typeof(T).Name };

        }


        public static Result<T> Fail(ErrorrType err)
        {
            return new Result<T> { IsSuccess = false, Error = err };
        }


    }

    public class ResultList<T> : IResult<T>
    {

        private string _entity;
        public bool IsSuccess { get; set; }
        public ErrorrType Error { get; set; }
        public Metadata Metadata { get; set; }
        public string Entity
        {

            set
            {
                var t = typeof(T).Name;

                if (t.Contains("Dto")) t = t.Replace("Dto", "");

                _entity = t;
            }
            get { return _entity; }
        }
        public List<T> Value { get; set; }



        public static ResultList<T> Success(List<T> value, int page = 1)
        {
            var metada = new Metadata()
            {
                TotalItem = value.Count,
                ItemPerpage = 10,
                PageCount = (int)Math.Ceiling((decimal)value.Count / 10),
                CurrentPage = page
            };
            var val = value.Skip((metada.CurrentPage - 1) * metada.ItemPerpage).Take(metada.ItemPerpage).ToList();
            return new ResultList<T> { IsSuccess = true, Value = val, Entity = typeof(T).Name, Metadata = metada };

        }



        public static ResultList<T> Fail(ErrorrType err)
        {
            return new ResultList<T> { IsSuccess = false, Error = err };
        }

        
    }
    


}