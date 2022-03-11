using System;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Domain
{
    public class SampleMethodAssigment
    {

        public int SampleID { get; set; }
        public Guid MethodID { get; set; }

        public Sample Sample { get; set; }


        public Method Method { get; set; }

        public string Result { get; set; }
        public int Status { get; set; }
        public void SetStatus()
        {
            Status += 1;
        }
        public void ResetStatus()
        {
            Status -= 1;
        }


        [DisplayFormat(DataFormatString = "{dd/MM/yyyy}")]
        public DateTime ResultDate { get; set; }

        public void CalResultDate(int time)
        {
            ResultDate = DateTime.Today.AddDays(time);
        }

    }
}