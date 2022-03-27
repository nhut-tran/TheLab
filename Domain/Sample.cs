using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;

namespace Domain
{
    public class Sample
    {
        public int SampleID { get; set; }

        public int SampleNo { get; set; }
        public Guid WorkSheetID { get; set; }
        public WorkSheet WorkSheet { get; set; }
        public string Description { get; set; }
        public float Weight { get; set; }
        public string Note { get; set; }
        public bool Urgent { get; set; }
        public string SealNumber { get; set; }


        public int Status
        {
            get
            {
                // if (!Paramaters.Any()) return -1;
                // return Paramaters.Max(p => p.Status);

                var s = Paramaters.Select(s => s.Status).ToList();
                s.RemoveAll(n => n == -1);
                if (!s.Any()) return -1;
                var f = s.First();
                return s.All(n => n == f) ? f : -2;

            }


        }
        public void SetStatus()
        {
            Paramaters.ToList().ForEach(p => p.SetStatus());
        }
        public void ResetStatus()
        {
            Paramaters.ToList().ForEach(p => p.ResetStatus());
        }

        [DisplayFormat(DataFormatString = "{dd/MM/yyyy}")]
        [NotMapped]
        public DateTime ResultDate
        {
            get
            {
                return CalResultDate();
            }


            set
            {

            }
        }

        private DateTime CalResultDate()
        {

            if (!Paramaters.Any()) return DateTime.Now;
            return Paramaters.Max(t => t.ResultDate);
        }

        public bool Sampling { get; set; }
        public ICollection<SampleMethodAssigment> Paramaters { get; set; } = new List<SampleMethodAssigment>();

    }
}