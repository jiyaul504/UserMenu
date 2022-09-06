using System;
using System.Collections.Generic;
using System.Text;
//using Microsoft.AspNetCore.Mvc.Rendering;

namespace UserLibrary.Models
{
    public class SubMenuInfo : BaseModel
    {
        public int SubmenuID { get; set; }
        public string SubmenuName { get; set; }
        public int MenuID { get; set; }
        public string MenuName { get; set; }
        public int Priority { get; set; }
        public string PageURL { get; set; }
        public int StatusID { get; set; }
        public string Status { get; set; }
        public string LastModifiedBy { get; set; }
        public DateTimeOffset? LastModifiedOn { get; set; }
      //  public List<SelectListItem> MenuList { get; set; }
        public int pageSize { get; set; }
        public int pageIndex { get; set; }
        public int RetVal { get; set; }
    }
}
