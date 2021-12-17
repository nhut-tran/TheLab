using System;
using System.Collections.Generic;
using API.DTOs;
using Domain;

namespace Application.Core
{
    public class SampleDto
    {

        public int SampleID { get; set; }
        public Guid WorkSheetID { get; set; }
        public int SampleNo { get; set; }
        public string Description { get; set; }
        public float Weight { get; set; }
        public string Note { get; set; }
        public int Status { get; set; }
        public string ResultDate { get; set; }
        public string SealNumber { get; set; }

        public bool Sampling { get; set; }
        public ICollection<SampleMethodAssigmentDto> Paramaters { get; set; } = new List<SampleMethodAssigmentDto>();
    }
}