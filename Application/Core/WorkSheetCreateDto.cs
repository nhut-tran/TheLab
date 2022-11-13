
using System.Collections.Generic;


namespace Application.Core
{
    public class WorkSheetCreateDto
    {
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
