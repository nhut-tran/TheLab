using System;
using System.Collections.Generic;

namespace Domain
{
    public class Method
    {
        public Guid MethodID { get; set; }

        public string Name { get; set; }
        public string Unit { get; set; }

        public string Description { get; set; }
        public string Target { get; set; }
        public int TurnArroundDay { get; set; }
        public string DepartmentID { get; set; }
        public bool Default { get; set; }
        public ICollection<SampleMethodAssigment> SampleMethodAssigments { get; set; }


    }
}