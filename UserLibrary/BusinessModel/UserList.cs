using UserLibrary.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace UserLibrary.BusinessModel
{
   public class UserList : BaseModel
    {
        public string Employee_Id { get; set; }
        public string Employee_Name { get; set; }

        public int User_ID { get; set; }
        public string UserID { get; set; }
        public string LosName { get; set; }
        public string SubLosId { get; set; }

        public String MenuId { get; set; }
        //public string EmployeeId { get; set; }
        public List<string> EmployeeId { get; set; }
        public string EmployeeName { get; set; }


        public int RoleId { get; set; }
        public string Role_ID { get; set; }
        public String SubMenuId { get; set; }
        public string LosId { get; set; }
        public string SbuLosId { get; set; }
        public string SbuLosName { get; set; }
        public int Menu_Id { get; set; }
        public int SubMenu_Id { get; set; }
        public int Has_Write_Permission { get; set; }


        public string RoleName { get; set; }
        public string Status { get; set; }
        public int Type_ID { get; set; }
        public int Status_ID { get; set; }
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


        public List<string> MENU_Code_List { get; set; }

        public List<string> SUBMENU_Code_List { get; set; }

        public List<string> MENU_Name_List { get; set; }

        public List<string> SUBMENU_Name_List { get; set; }
        public List<string> Has_Write_Permissions { get; set; }


        public List<UserPermissiondetails> userPermissiondetails { get; set; }


        //public List<string> PermissionList { get; set; }


    }


    public class UserPermissiondetails
    {
        public string listID { get; set; }
        public string menuid { get; set; }
        public string submenuid { get; set; }
        public string permission { get; set; }
    }
    public class UserPermission
    {
        public string listID { get; set; }
        public string menuid { get; set; }
        public string submenuid { get; set; }
        public string permission { get; set; }
        public string submenuname { get; set; }
    }

    public class LOSSBUDetails
    {
        public string LosId { get; set; }
        public string LosName { get; set; }
        public string SbuLosId { get; set; }
        public string SbuLosName { get; set; }
        public UserList List { get; set; }
    }

}
