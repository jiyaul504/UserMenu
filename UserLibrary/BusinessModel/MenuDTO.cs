using System;
using System.Collections.Generic;
using System.Text;

namespace UserLibrary.BusinessModel
{
    public class MenuDTO
    {
        public string LOS_Code { get; set; }
        public string LOS_Name { get; set; }
        public string Menu_Code { get; set; }
        public string Menu_Name { get; set; }
        public string Parent_Menu_Code { get; set; }
        public string Parent_Menu_Name { get; set; }
    }
}
