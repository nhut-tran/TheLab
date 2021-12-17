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

        [DisplayFormat(DataFormatString = "{dd/MM/yyyy}")]
        public DateTime ResultDate { get; set; }

        public void CalResultDate(int time)
        {
            ResultDate = DateTime.Today.AddDays(time);
        }

    }
}