using System;
using System.Collections.Generic;
using System.Text;

namespace UserLibrary.Models
{
   public class Role : BaseModel
    {
        public int Role_ID { get; set; }
        public string Role_Name { get; set; }
        public string StatusID { get; set; }
        public string Issuperdmin { get; set; }
        public string IsLosreq { get; set; }
        public string isSbUreq { get; set; }
        public int MenuName{ get; set; }
        public int SubMenuName { get; set; }
        public string PageURL { get; set; }
        public string Status { get; set; }
        public string LastModifiedBy { get; set; }
        public DateTimeOffset? LastModifiedOn { get; set; }
        public int RetVal { get; set; }
        public int pageSize { get; set; }
        public int pageIndex { get; set; }
    }
}
