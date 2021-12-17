using System;
using System.Collections;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain
{
    public class Department
    {
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public string DepartmentID { get; set; }

        public string Name { get; set; }

        public string HeaderName { get; set; }

        public ICollection<Method> Methods { get; set; }
    }
}