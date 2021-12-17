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

        public int Status { get; set; }

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


            return Paramaters.Max(t => t.ResultDate);
        }
        public void CalStatus()
        {
            if (Status < 6)
            {
                Status += 1;
            }

        }
        public bool Sampling { get; set; }
        public ICollection<SampleMethodAssigment> Paramaters { get; set; } = new List<SampleMethodAssigment>();

    }
}