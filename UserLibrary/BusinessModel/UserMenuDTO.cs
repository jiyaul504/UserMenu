using System;
using System.Collections.Generic;
using System.Text;

namespace UserLibrary.BusinessModel
{
  public  class UserMenuDTO
    {
        public string menu_Code { get; set; }
        public string menu_Name { get; set; }
        public string Parent_Menu_Code { get; set; }
        public string Parent_Menu_Name { get; set; }
    }
}
