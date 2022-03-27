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
                //if (!Samples.Any()) return -1;
                var s = Samples.Select(s => s.Status).ToList();
                s.RemoveAll(n => n == -1);
                if (!s.Any()) return -1;
                var f = s.First();
                return s.All(n => n == f) ? f : -2;
            }

        }

        /*
            filter samples with empty Paramater
            samples with empty Paramater happen when query
            worksheet by department
            ***Warning**
            Only use when read data, not use when modified and save
        */
        public void RemoveSampleEmpty()
        {

            Samples = Samples.Where(s => s.Paramaters.Any()).ToList();
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