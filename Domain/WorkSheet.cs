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


        public int Status
        {
            get
            {
                return Samples.Min(s => s.Status);
            }

        }
        public void SetStatus()
        {
            Samples.ToList().ForEach(s => s.SetStatus());
        }
        public void ResetStatus()
        {
            Samples.ToList().ForEach(s => s.ResetStatus());
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
        public List<Sample> GetSamples(string department)
        {
            return Samples.Select(s =>
             {
                 var c = s.Paramaters.Where(p => p.Method.DepartmentID == department).ToList();
                 s.Paramaters = c;
                 return s;
             }).ToList();

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