using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;


namespace Application.Core
{
    public class WorkSheetDto
    {

        public Guid WorkSheetID { get; set; }
        public string WorkSheetNo { get; set; }
        public string ReceiveNo { get; set; }
        public string IssueTo { get; set; }
        public string SealNumber { get; set; }
        public string ReceiveDate { get; set; }
        public string DisposalDate { get; set; }
        public int Status { get; set; }
        public string Note { get; set; }
        public string ResultDate { get; set; }
        public ICollection<SampleDto> Samples { get; set; } = new List<SampleDto>();
    }
}