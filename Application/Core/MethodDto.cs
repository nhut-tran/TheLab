using System;

namespace Application.Core
{
    public class MethodDto
    {
        public Guid MethodID { get; set; }

        public string Name { get; set; }
        public string Unit { get; set; }

        public string Description { get; set; }

        public int TurnArroundDay { get; set; }
        public string DepartmentID { get; set; }
    }
}