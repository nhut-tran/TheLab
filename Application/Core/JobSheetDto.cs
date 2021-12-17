using System;
using System.Collections.Generic;

namespace Application.Core
{
    public class JobSheetDto
    {
        public Guid JobSheetID { get; set; }
        public string IssueTo { get; set; }
        public WorkSheetDto WorkSheet { get; set; }
    }
}