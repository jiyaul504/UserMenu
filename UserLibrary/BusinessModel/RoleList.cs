using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace UserLibrary.BusinessModel
{
    public class RoleList
    {
        public String MenuId { get; set; }
        public String MenuName { get; set; }
        public int RoleId { get; set; }
        public String SubMenuId { get; set; }
        public String SubMenuName { get; set; }
        public int Menu_Id { get; set; }
        public int SubMenu_Id { get; set; }
        public string RoleName { get; set; }
        public string Status { get; set; }
        public string IsuperAdminTrue { get; set; }
        public int IsuperAdminTrueChk { get; set; }
        public string IsLosTrue { get; set; }
        public string IsSbUTrue { get; set; }
        public string Menu_Name { get; set; }
        public string Submenu_Name { get; set; }
        public int RoleMenuMappingID { get; set; }
        public string RoleIdstr { get; set; }
        public string Role_Menu_Mapping_IDstr { get; set; }
        public List<string> RoleMenuMapping_List { get; set; }
        public List<string> LOS_Code_List { get; set; }

        public List<string> SBU_Code_List { get; set; }

        public List<string> LOS_Name_List { get; set; }

        public List<string> SBU_Name_List { get; set; }
        public List<string> permission { get; set; }
        
        //public string LOS_Code_List { get; set; }

        //public string SBU_Code_List { get; set; }

        //public string LOS_Name_List { get; set; }

        //public string SBU_Name_List { get; set; }


    }

}
