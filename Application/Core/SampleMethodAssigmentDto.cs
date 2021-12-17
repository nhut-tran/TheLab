using System;
using Application.Core;
using Domain;

namespace API.DTOs
{
    public class SampleMethodAssigmentDto
    {
        public int SampleID { get; set; }
        public Guid MethodID { get; set; }

        public string Method { get; set; }
        public string Department { get; set; }
        public string Tartget { get; set; }
        public string Unit { get; set; }
        public string Result { get; set; }

        public string ResultDate { get; set; }

    }
}