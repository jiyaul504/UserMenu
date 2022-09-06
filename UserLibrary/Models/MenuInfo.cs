using System;
using System.Collections.Generic;
using System.Text;

namespace UserLibrary.Models
{
    public  class MenuInfo : BaseModel
    {
        public int MenuID { get; set; }
        public string MenuName { get; set; }
        public string DisplayMenuName { get; set; }
        public int SequenceNumber { get; set; }
        public string PageURL { get; set; }
        public int ParentMenuID { get; set; }
        public string ParentMenuName { get; set; }
        public int StatusID { get; set; }
        public string Status { get; set; }
        public string LastModifiedBy { get; set; }
        public DateTimeOffset? LastModifiedOn { get; set; }
        public int RetVal { get; set; }
        public int pageSize { get; set; }
        public int pageIndex { get; set; }

    }
}
