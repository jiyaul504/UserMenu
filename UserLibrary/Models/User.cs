using System;
using System.Collections.Generic;
using System.Text;

namespace UserLibrary.Models
{
    public class User : BaseModel
    {
        public int Employee_ID { get; set; }
        public int User_ID { get; set; }
        public int Role_ID { get; set; }
        public string EmployeeID { get; set; }
        public string Role_Name { get; set; }
        public string Employee_Name { get; set; }
        public string StatusID { get; set; }
        public string LastModifiedBy { get; set; }
        public DateTimeOffset? LastModifiedOn { get; set; }
        public int RetVal { get; set; }
        public int pageSize { get; set; }
        public int pageIndex { get; set; }
    }
}
