using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;

namespace Application.Core
{
    public class Metadata
    {
        public int TotalItem { get; set; }
        public int ItemPerpage { get; set; }
        public int PageCount { get; set; }
        public int CurrentPage { get; set; }


    }
}