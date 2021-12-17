using System;
using System.Collections.Generic;

namespace Application.Core
{
    public class ErrorrType
    {
        private static readonly Dictionary<int, string> nameDictionary = new()
        {
            { 1, "NOTFOUND" },
            { 2, "VALIDATION_ERR" },
            { 3, "UNKNOWN" },
            { 4, "INVALID_ID" }

        };

        private string _name { get; set; }
        public string Name
        {
            get { return _name; }
            set { _name = nameDictionary[int.Parse(value)]; }
        }
        public string Message { get; set; }
    }
}