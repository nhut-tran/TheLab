using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;


namespace Domain
{
    public class WorkSheet
    {


        public WorkSheet()
        {
            ReceiveDate = DateTime.Now;

        }

        public Guid WorkSheetID { get; set; }

        public string ReceiveNo { get; set; }
        public string WorkSheetNo { get; set; }

        public Customer IssueTo { get; set; }
        public string CustomerId { get; set; }
        public DateTime ReceiveDate { get; set; }
        public int DisposalTime { get; set; } = 10;
        public string Note { get; set; }
        public int Status { get; set; }
        public void SetStatus()
        {
            Status += 1;

        }
        public void ResetStatus()
        {
            Status -= 1;
        }

        [NotMapped]
        public DateTime ResultDate
        {
            get
            {
                return CalResultDate();
            }

        }

        private DateTime CalResultDate()
        {
            if (Samples.Count > 0)
            {

                return Samples.Max(t => t.ResultDate);
            }
            return DateTime.Now;

        }

        public ICollection<Sample> Samples { get; set; } = new List<Sample>();


    }
}

// 0: receive
// 1: approve receive
// 2: lab approve receive
// 3 enter result
// 4: lab approve result
//5: ma app
//6: report