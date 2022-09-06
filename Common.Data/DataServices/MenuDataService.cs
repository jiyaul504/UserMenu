using UserLibrary.Common;
using Dapper;
using UserLibrary.Models;
using Common.Data.DataContracts;
using System;
using System.Collections.Generic;
using System.Text;

using UserLibrary.Common;
using Microsoft.Data.SqlClient;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using UserLibrary.BusinessModel;
using System.Data.SqlClient;
using UserLibrary.Common;

namespace Common.Data.DataServices
{
    public class MenuDataService : UserLibrary.DataContract.IMenuDataService
    {
       // public string connectionstring = "Server=IPZYCFCBSSWV002.pwcglb.com\\EIDYCFCBS_01,14330;Database=CommonLibrary;Trusted_Connection=True;";
        public IApplicationSettings appSettings;
        public MenuDataService(IApplicationSettings appSettings)
        {
            this.appSettings = appSettings;

        }


        // public List<SubMenuInfo> SaveSubMenu(SubMenuInfo submenuInfo)
        public int SaveSubMenu(SubMenuInfo submenuInfo, BaseModel userData)
        {
            var results = new List<SubMenuInfo>();
            int Id = 0;
            try
            {
                using (SqlConnection connection = new SqlConnection(appSettings.ConnectionString.DB))
                {
                    connection.Open();
                    SqlCommand com = new SqlCommand("uspAddSubMenuDetails", connection);
                    com.CommandType = System.Data.CommandType.StoredProcedure;
                    com.Parameters.AddWithValue("@Submenu_ID", submenuInfo.SubmenuID );
                    com.Parameters.AddWithValue("@Submenu_Name",submenuInfo.SubmenuName);
                    com.Parameters.AddWithValue("@Menu_ID",submenuInfo.MenuID);
                    com.Parameters.AddWithValue("@Priority",submenuInfo.Priority);
                    com.Parameters.AddWithValue("@Page_URL",submenuInfo.PageURL );
                    com.Parameters.AddWithValue("@Status_ID", submenuInfo.StatusID);
                    com.Parameters.AddWithValue("@LastModifiedBy", userData.LastModifiedBy);
                    com.Parameters.AddWithValue("@ModifiedByName",userData.LastModifiedByName);
                    SqlDataReader dr = null;
                    dr = com.ExecuteReader();
                    if(dr.Read())
                    {
                        Id = dr.GetInt32(0);
                    }
                    dr.Close();
                    connection.Close();
                }
            }
            catch (Exception exc)
            {
                string msg = exc.Message;

            }
            // return results;
            return Id;
        }


       


       public int SaveMenu(MenuInfo menuInfo, BaseModel userData)
        {
            var results = new List<MenuInfo>();
            int Id = 0;
            try
            {
            using (SqlConnection connection = new SqlConnection(appSettings.ConnectionString.DB))
                {
                    connection.Open();
                    SqlCommand com = new SqlCommand("uspAddMenuDetails", connection);
                    com.CommandType = System.Data.CommandType.StoredProcedure;
                    com.Parameters.AddWithValue("@Menu_ID", menuInfo.MenuID);
                    com.Parameters.AddWithValue("@Menu_Name", menuInfo.MenuName);
                    com.Parameters.AddWithValue("@Display_Menu_Name", menuInfo.DisplayMenuName);
                    com.Parameters.AddWithValue("@SequenceNumber",menuInfo.SequenceNumber);
                    com.Parameters.AddWithValue("@Page_URL",menuInfo.PageURL);
                    com.Parameters.AddWithValue("@Parent_ID", menuInfo.ParentMenuID);
                    com.Parameters.AddWithValue("@Status_ID", menuInfo.StatusID);
                    com.Parameters.AddWithValue("@LastModifiedBy", userData.LastModifiedBy);
                    com.Parameters.AddWithValue("@ModifiedByName", userData.LastModifiedByName);
                    SqlDataReader dr = null;
                    dr = com.ExecuteReader();
                    if (dr.Read())
                    {
                        Id = dr.GetInt32(0);
                    }
                    dr.Close();
                }
            }
            catch (Exception exc)
            {
                string msg = exc.Message;

            }
            return Id;
        }



        public int SaveRole(RoleList rolelist, BaseModel userData)
        {
            var results = new List<RoleList>();
            int Id = 0;
            try
            {
                using (SqlConnection connection = new SqlConnection(appSettings.ConnectionString.DB))
                {
                    connection.Open();
                    SqlCommand com = new SqlCommand("uspAddRoleDetails", connection);
                    com.CommandType = System.Data.CommandType.StoredProcedure;
                    com.Parameters.AddWithValue("@Role_ID", rolelist.RoleId);
                    com.Parameters.AddWithValue("@Role_Name", rolelist.RoleName);
                    com.Parameters.AddWithValue("@Status_ID", rolelist.Status);
                    com.Parameters.AddWithValue("@Issuperdmin", rolelist.IsuperAdminTrue);
                    com.Parameters.AddWithValue("@IsLosreq", rolelist.IsLosTrue);
                    com.Parameters.AddWithValue("@isSbUreq", rolelist.IsSbUTrue);
                    com.Parameters.AddWithValue("@LastModifiedBy", userData.LastModifiedBy);
                    com.Parameters.AddWithValue("@ModifiedOn", userData.LastModifiedOn);
                    com.Parameters.AddWithValue("@ModifiedByName", userData.LastModifiedByName);
                    SqlDataReader dr = null;
                    dr = com.ExecuteReader();
                    if (dr.Read())
                    {
                        Id = dr.GetInt32(0);
                    }
                    dr.Close();
                }
            }
            catch (Exception exc)
            {
                string msg = exc.Message;
            }
            return Id;
        }

        public int SaveUser(UserList userlist, BaseModel userData)
        {
            var results = new List<RoleList>();
            int Id = 0;
            try
            {
                using (SqlConnection connection = new SqlConnection(appSettings.ConnectionString.DB))
                {
                    connection.Open();
                    SqlCommand com = new SqlCommand("uspAddUserDetails", connection);
                    com.CommandType = System.Data.CommandType.StoredProcedure;
                    com.Parameters.AddWithValue("@User_ID", userlist.User_ID);
                    com.Parameters.AddWithValue("@Employee_ID", userlist.Employee_Id);
                    com.Parameters.AddWithValue("@Role_ID", userlist.RoleId);
                    com.Parameters.AddWithValue("@Status_ID", userlist.Status_ID);
                    com.Parameters.AddWithValue("@CreatedBy", userData.CreatedBy);
                    com.Parameters.AddWithValue("@CreatedByName", userData.CreatedByName);
                    com.Parameters.AddWithValue("@LastModifiedBy", userData.LastModifiedBy);
                    com.Parameters.AddWithValue("@ModifiedByName", userData.LastModifiedByName);
                    SqlDataReader dr = null;
                    dr = com.ExecuteReader();
                    if (dr.Read())
                    {
                        Id = dr.GetInt32(0);
                    }
                    dr.Close();
                }
            }
            catch (Exception exc)
            {
                string msg = exc.Message;

            }
            return Id;
        }


        public int SaveUsersPermission(UserList userPermission, BaseModel userData)
        {
            var results = new List<RoleList>();
            int Id = 0;
            try
            {
                using (SqlConnection connection = new SqlConnection(appSettings.ConnectionString.DB))
                {
                    connection.Open();
                    SqlCommand com = new SqlCommand("uspAddUsersPermissionDetails", connection);
                    com.CommandType = System.Data.CommandType.StoredProcedure;
                    com.Parameters.AddWithValue("@User_ID", userPermission.User_ID);
                    com.Parameters.AddWithValue("@Menu_ID", userPermission.Menu_Id);
                    com.Parameters.AddWithValue("@Role_ID", userPermission.RoleId);
                    //com.Parameters.AddWithValue("@Submenu_ID", userPermission.SubMenu_Id);
                    com.Parameters.AddWithValue("@Has_Write_Permission", userPermission.Has_Write_Permission);
                    com.Parameters.AddWithValue("@ModifiedBy", userData.LastModifiedBy);
                    com.Parameters.AddWithValue("@ModifiedByName", userData.LastModifiedByName);
                    SqlDataReader dr = null;
                    dr = com.ExecuteReader();
                    if (dr.Read())
                    {
                        Id = dr.GetInt32(0);
                    }
                    dr.Close();
                }
            }
            catch (Exception exc)
            {
                string msg = exc.Message;

            }
            return Id;
        }

        public List<UserPermissionList> getPermissionDetails(int userID)
        {
            var results = new List<UserPermissionList>();
            try
            {

                using (IDbConnection con = new SqlConnection(appSettings.ConnectionString.DB))

                //    using (IDbConnection con = new SqlConnection(appSettings.ConnectionString.DB))
                {
                    var dynamicParameters = new DynamicParameters();
                    dynamicParameters.Add("@User_ID", userID);
                    var reuslt = con.QueryMultiple
                        ("uspGetPermissionDetailsByUserId", dynamicParameters,
                        commandType: CommandType.StoredProcedure);
                    results = reuslt.Read<UserPermissionList>().ToList();
                }


            }
            catch (Exception exc)
            {
                string msg = exc.Message;
            }
            return results;
        }

        public int SaveUserswithoutsubmenuPermission(UserList userPermission)
        {
            var results = new List<RoleList>();
            int Id = 0;
            try
            {
                using (SqlConnection connection = new SqlConnection(appSettings.ConnectionString.DB))
                {
                    connection.Open();
                    SqlCommand com = new SqlCommand("uspAddUsersubmenuPermissionDetails", connection);
                    com.CommandType = System.Data.CommandType.StoredProcedure;
                    com.Parameters.AddWithValue("@User_ID", userPermission.User_ID);
                    com.Parameters.AddWithValue("@Menu_ID", userPermission.Menu_Id);
                    com.Parameters.AddWithValue("@Role_ID", userPermission.RoleId);
                    com.Parameters.AddWithValue("@Submenu_ID", userPermission.SubMenu_Id);
                    com.Parameters.AddWithValue("@Has_Write_Permission", userPermission.Has_Write_Permission);
                    SqlDataReader dr = null;
                    dr = com.ExecuteReader();
                    if (dr.Read())
                    {
                        Id = dr.GetInt32(0);
                    }
                    dr.Close();
                }
            }
            catch (Exception exc)
            {
                string msg = exc.Message;

            }
            return Id;
        }



        public int SaveRoleMapping(RoleList rolemappinglist, BaseModel userData)
        {
            var results = new List<MenuInfo>();
            int Id = 0;
            try
            {
                using (SqlConnection connection = new SqlConnection(appSettings.ConnectionString.DB))
                {
                    connection.Open();
                    SqlCommand com = new SqlCommand("uspAddRoleMenuMappingDetails", connection);
                    com.CommandType = System.Data.CommandType.StoredProcedure;
                    
                    //com.Parameters.AddWithValue("@Role_Menu_Mapping_ID", rolemappinglist.RoleId);
                    com.Parameters.AddWithValue("@Role_ID", rolemappinglist.RoleId);
                    com.Parameters.AddWithValue("@Menu_ID", rolemappinglist.Menu_Id);
                    //com.Parameters.AddWithValue("@Submenu_ID", rolemappinglist.SubMenu_Id);
                    com.Parameters.AddWithValue("@Status_ID", rolemappinglist.Status);
                    com.Parameters.AddWithValue("@LastModifiedBy", userData.LastModifiedBy);
                    com.Parameters.AddWithValue("@ModifiedByName", userData.LastModifiedByName);
                    SqlDataReader dr = null;
                    dr = com.ExecuteReader();
                    if (dr.Read())
                    {
                        Id = dr.GetInt32(0);
                    }
                    dr.Close();
                }
            }
            catch (Exception exc)
            {
                string msg = exc.Message;

            }
            return Id;
        }

        public int SaveUserLosSbuMapping(UserList userLosSbuMapping, BaseModel userData)
        {
            var results = new List<MenuInfo>();
            int Id = 0;
            try
            {
                if (userLosSbuMapping.Type_ID == 1)
                {
                    using (SqlConnection connection = new SqlConnection(appSettings.ConnectionString.DB))
                    {
                        connection.Open();
                        SqlCommand com = new SqlCommand("uspLOSMappingAddEdit", connection);
                        com.CommandType = System.Data.CommandType.StoredProcedure;

                        com.Parameters.AddWithValue("@UserID", userLosSbuMapping.User_ID);
                        com.Parameters.AddWithValue("@LOSCode", userLosSbuMapping.LosId);
                        com.Parameters.AddWithValue("@LOS", userLosSbuMapping.LosName);
                        com.Parameters.AddWithValue("@IsActive", userLosSbuMapping.Status_ID);
                        com.Parameters.AddWithValue("@ModifiedBy", userData.LastModifiedBy);
                        com.Parameters.AddWithValue("@ModifiedByName", userData.LastModifiedByName);
                        SqlDataReader dr = null;
                        dr = com.ExecuteReader();
                        if (dr.Read())
                        {
                            Id = dr.GetInt32(0);
                        }
                        dr.Close();
                    }
                }
                else if (userLosSbuMapping.Type_ID == 2)
                {
                    using (SqlConnection connection = new SqlConnection(appSettings.ConnectionString.DB))
                    {
                        connection.Open();
                        SqlCommand com = new SqlCommand("uspSBUMappingAddEdit", connection);
                        com.CommandType = System.Data.CommandType.StoredProcedure;

                        com.Parameters.AddWithValue("@UserID", userLosSbuMapping.User_ID);
                        com.Parameters.AddWithValue("@SBU", userLosSbuMapping.SbuLosName);
                        com.Parameters.AddWithValue("@SBUCode", userLosSbuMapping.SubLosId);
                        com.Parameters.AddWithValue("@IsActive", userLosSbuMapping.Status_ID);
                        com.Parameters.AddWithValue("@ModifiedBy", userData.LastModifiedBy);
                        com.Parameters.AddWithValue("@ModifiedByName", userData.LastModifiedByName);
                        SqlDataReader dr = null;
                        dr = com.ExecuteReader();
                        if (dr.Read())
                        {
                            Id = dr.GetInt32(0);
                        }
                        dr.Close();
                    }
                }
            }
            catch (Exception exc)
            {
                string msg = exc.Message;

            }
            return Id;
        }




        public PagedResults<MenuInfo> GetMenuListings(MenuInfo menuInfo)
        {
            var results = new PagedResults<MenuInfo>();
            try
            {

                using (IDbConnection con = new SqlConnection(appSettings.ConnectionString.DB))
                {
                    var dynamicParameters = new DynamicParameters();

                    dynamicParameters.Add("@Offset", (menuInfo.pageIndex - 1) * menuInfo.pageSize);
                    dynamicParameters.Add("@PageSize", menuInfo.pageSize);

                    var reuslt = con.QueryMultiple
                        ("uspMenuDetails", dynamicParameters,
                        commandType: CommandType.StoredProcedure);
                    results.Items = reuslt.Read<MenuInfo>().ToList();
                    results.TotalCount = reuslt.ReadFirst<int>();
                }
            }

            catch (Exception exc)
            {
                string msg = exc.Message;

            }
            return results;
        }

        public PagedResults<Role> GetRoleListings(Role roleInfo)
        {
            var results = new PagedResults<Role>();
            try
            {

                using (IDbConnection con = new SqlConnection(appSettings.ConnectionString.DB))
                {
                    var dynamicParameters = new DynamicParameters();

                    dynamicParameters.Add("@Offset", (roleInfo.pageIndex - 1) * roleInfo.pageSize);
                    dynamicParameters.Add("@PageSize", roleInfo.pageSize);

                    var reuslt = con.QueryMultiple
                        ("uspGetRoleListDetails", dynamicParameters,
                        commandType: CommandType.StoredProcedure);
                    results.Items = reuslt.Read<Role>().ToList();
                    results.TotalCount = reuslt.ReadFirst<int>();
                }
            }

            catch (Exception exc)
            {
                string msg = exc.Message;

            }
            return results;
        }

        public PagedResults<User> GetUserListings(User userInfo)
        {
            var results = new PagedResults<User>();
            try
            {

                using (IDbConnection con = new SqlConnection(appSettings.ConnectionString.DB))
                {
                    var dynamicParameters = new DynamicParameters();

                    dynamicParameters.Add("@Offset", (userInfo.pageIndex - 1) * userInfo.pageSize);
                    dynamicParameters.Add("@PageSize", userInfo.pageSize);

                    var reuslt = con.QueryMultiple
                        ("uspGetUserListDetails", dynamicParameters,
                        commandType: CommandType.StoredProcedure);
                    results.Items = reuslt.Read<User>().ToList();
                    results.TotalCount = reuslt.ReadFirst<int>();
                }
            }

            catch (Exception exc)
            {
                string msg = exc.Message;

            }
            return results;
        }



        public PagedResults<SubMenuInfo> GetSubListings(SubMenuInfo submenuInfo)
        {
            var results = new PagedResults<SubMenuInfo>();
            try
            {

                using (IDbConnection con = new SqlConnection(appSettings.ConnectionString.DB))
                {
                    var dynamicParameters = new DynamicParameters();

                    dynamicParameters.Add("@Offset", (submenuInfo.pageIndex - 1) * submenuInfo.pageSize);
                    dynamicParameters.Add("@PageSize", submenuInfo.pageSize);

                    var reuslt = con.QueryMultiple
                        ("uspSubMenuDetails", dynamicParameters,
                        commandType: CommandType.StoredProcedure);
                    results.Items = reuslt.Read<SubMenuInfo>().ToList();
                    results.TotalCount = reuslt.ReadFirst<int>();
                }
            }

            catch (Exception exc)
            {
                string msg = exc.Message;

            }
            return results;
        }


        public async Task<List<MenuList>> GetMenuTypes()
        {
            List<MenuList> menuTypes = new List<MenuList>();
            try
            {


                 using (IDbConnection con = new SqlConnection(appSettings.ConnectionString.DB))
                
                //    using (IDbConnection con = new SqlConnection(appSettings.ConnectionString.DB))
                {
                    var dynamicParameters = new DynamicParameters();
                    var reuslt = con.QueryMultiple
                        ("uspGetMenuTypes", dynamicParameters,
                        commandType: CommandType.StoredProcedure);
                    menuTypes = reuslt.Read<MenuList>().ToList();
                }


            }
            catch (Exception exc)
            {
                string msg = exc.Message;
            }
            return menuTypes;
        }
        public async Task<List<AddLosDTO>> GetUserLOS()
        {
            List<AddLosDTO> menuTypes = new List<AddLosDTO>();
            try
            {


                using (IDbConnection con = new SqlConnection(appSettings.ConnectionString.DB))

                //    using (IDbConnection con = new SqlConnection(appSettings.ConnectionString.DB))
                {
                    var dynamicParameters = new DynamicParameters();
                    var reuslt = con.QueryMultiple
                        ("uspGetUserLOSTypes", dynamicParameters,
                        commandType: CommandType.StoredProcedure);
                    menuTypes = reuslt.Read<AddLosDTO>().ToList();
                }


            }
            catch (Exception exc)
            {
                string msg = exc.Message;
            }
            return menuTypes;
        }


        public async Task<List<UserDTO>> GetRoles()
        {
            List<UserDTO> menuTypes = new List<UserDTO>();
            try
            {


                using (IDbConnection con = new SqlConnection(appSettings.ConnectionString.DB))

                //    using (IDbConnection con = new SqlConnection(appSettings.ConnectionString.DB))
                {
                    var dynamicParameters = new DynamicParameters();
                    var reuslt = con.QueryMultiple
                        ("uspGetRolesTypes", dynamicParameters,
                        commandType: CommandType.StoredProcedure);
                    menuTypes = reuslt.Read<UserDTO>().ToList();
                }


            }
            catch (Exception exc)
            {
                string msg = exc.Message;
            }
            return menuTypes;
        }


        public async Task<List<EngPartnerMangerDTO>> GetAllUsers()
        {
            List<EngPartnerMangerDTO> menuTypes = new List<EngPartnerMangerDTO>();
            try
            {


                using (IDbConnection con = new SqlConnection(appSettings.ConnectionString.DB))

                //    using (IDbConnection con = new SqlConnection(appSettings.ConnectionString.DB))
                {
                    var dynamicParameters = new DynamicParameters();
                    var reuslt = con.QueryMultiple
                        ("uspGetAllUsers", dynamicParameters,
                        commandType: CommandType.StoredProcedure);
                    menuTypes = reuslt.Read<EngPartnerMangerDTO>().ToList();
                }


            }
            catch (Exception exc)
            {
                string msg = exc.Message;
            }
            return menuTypes;
        }


        public async Task<List<SubMenuDTO>> GetSubMenuTypes(SubMenuDTO submenu)
        {
            List<SubMenuDTO> menuTypes = new List<SubMenuDTO>();
            try
            {


                using (IDbConnection con = new SqlConnection(appSettings.ConnectionString.DB))

                //    using (IDbConnection con = new SqlConnection(appSettings.ConnectionString.DB))
                {
                    var dynamicParameters = new DynamicParameters();
                    dynamicParameters.Add("@MenuId",submenu.Menu_Code);
                    var reuslt = con.QueryMultiple
                        ("uspGetSubMenuTypes", dynamicParameters,
                        commandType: CommandType.StoredProcedure);
                    menuTypes = reuslt.Read<SubMenuDTO>().ToList();
                }


            }
            catch (Exception exc)
            {
                string msg = exc.Message;
            }
            return menuTypes;
        }


        public async Task<List<SubMenuDTO>> GetSubMenuUserTypes(SubMenuDTO submenu)
        {
            List<SubMenuDTO> menuTypes = new List<SubMenuDTO>();
            try
            {


                using (IDbConnection con = new SqlConnection(appSettings.ConnectionString.DB))

                //    using (IDbConnection con = new SqlConnection(appSettings.ConnectionString.DB))
                {
                    var dynamicParameters = new DynamicParameters();
                    dynamicParameters.Add("@MenuId", submenu.Menu_Code);
                    dynamicParameters.Add("@Role_ID", submenu.Role_ID);
                    var reuslt = con.QueryMultiple
                        ("uspGetuserSubMenuTypes", dynamicParameters,
                        commandType: CommandType.StoredProcedure);
                    menuTypes = reuslt.Read<SubMenuDTO>().ToList();
                }


            }
            catch (Exception exc)
            {
                string msg = exc.Message;
            }
            return menuTypes;
        }

        public async Task<List<AddSbuDTO>> GetUserSBU(AddSbuDTO sbulist)
        {
            List<AddSbuDTO> menuTypes = new List<AddSbuDTO>();
            try
            {


                using (IDbConnection con = new SqlConnection(appSettings.ConnectionString.DB))

                //    using (IDbConnection con = new SqlConnection(appSettings.ConnectionString.DB))
                {
                    var dynamicParameters = new DynamicParameters();
                    dynamicParameters.Add("@LOS_Code", sbulist.LOS_Code);
                    var reuslt = con.QueryMultiple
                        ("uspGetUserSBUTypes", dynamicParameters,
                        commandType: CommandType.StoredProcedure);
                    menuTypes = reuslt.Read<AddSbuDTO>().ToList();
                }


            }
            catch (Exception exc)
            {
                string msg = exc.Message;
            }
            return menuTypes;
        }


        public async Task<List<RoleList>> GetbyRoleId(RoleList roleInfo)
        {
            List<RoleList> menuTypes = new List<RoleList>();
            try
            {


                using (IDbConnection con = new SqlConnection(appSettings.ConnectionString.DB))

                //    using (IDbConnection con = new SqlConnection(appSettings.ConnectionString.DB))
                {
                    var dynamicParameters = new DynamicParameters();
                    dynamicParameters.Add("@Role_ID", roleInfo.RoleId);
                    var reuslt = con.QueryMultiple
                        ("uspGetbyRoleId", dynamicParameters,
                        commandType: CommandType.StoredProcedure);
                    menuTypes = reuslt.Read<RoleList>().ToList();
                }


            }
            catch (Exception exc)
            {
                string msg = exc.Message;
            }
            return menuTypes;
        }

        public async Task<List<UserList>> GetbyUserId(UserList userInfo)
        {
            List<UserList> menuTypes = new List<UserList>();
            try
            {

                using (IDbConnection con = new SqlConnection(appSettings.ConnectionString.DB))

                //    using (IDbConnection con = new SqlConnection(appSettings.ConnectionString.DB))
                {
                    var dynamicParameters = new DynamicParameters();
                    dynamicParameters.Add("@User_ID", userInfo.User_ID);
                    var reuslt = con.QueryMultiple
                        ("uspGetbyUserId", dynamicParameters,
                        commandType: CommandType.StoredProcedure);
                    menuTypes = reuslt.Read<UserList>().ToList();
                }


            }
            catch (Exception exc)
            {
                string msg = exc.Message;
            }
            return menuTypes;
        }
        public async Task<List<UserList>> GetMenubyUserId(UserList userInfo)
        {
            List<UserList> menuTypes = new List<UserList>();
            try
            {

                using (IDbConnection con = new SqlConnection(appSettings.ConnectionString.DB))

                //    using (IDbConnection con = new SqlConnection(appSettings.ConnectionString.DB))
                {
                    var dynamicParameters = new DynamicParameters();
                    dynamicParameters.Add("@User_ID", userInfo.User_ID);
                    var reuslt = con.QueryMultiple
                        ("uspGetMenubyUSERId", dynamicParameters,
                        commandType: CommandType.StoredProcedure);
                    menuTypes = reuslt.Read<UserList>().ToList();
                }


            }
            catch (Exception exc)
            {
                string msg = exc.Message;
            }
            return menuTypes;
        }



        public async Task<List<MenuList>> GetUserMenuList(MenuList MenuInfo)
        {
            List<MenuList> menuTypes = new List<MenuList>();
            try
            {

                using (IDbConnection con = new SqlConnection(appSettings.ConnectionString.DB))

                //    using (IDbConnection con = new SqlConnection(appSettings.ConnectionString.DB))
                {
                    var dynamicParameters = new DynamicParameters();
                    dynamicParameters.Add("@Role_ID", MenuInfo.Role_ID);
                    var reuslt = con.QueryMultiple
                        ("uspGetUserMenuList", dynamicParameters,
                        commandType: CommandType.StoredProcedure);
                    menuTypes = reuslt.Read<MenuList>().ToList();
                }


            }
            catch (Exception exc)
            {
                string msg = exc.Message;
            }
            return menuTypes;
        }

        //public async Task<List<LoginDTO>> GetLoginRoleTypes(LoginDTO loginInfo)
        //{
        //    List<LoginDTO> menuTypes = new List<LoginDTO>();
        //    try
        //    {


        //        using (IDbConnection con = new SqlConnection(appSettings.ConnectionString.DB))

        //        //    using (IDbConnection con = new SqlConnection(appSettings.ConnectionString.DB))
        //        {
        //            var dynamicParameters = new DynamicParameters();
        //            dynamicParameters.Add("@ID", loginInfo.ID);
        //            var reuslt = con.QueryMultiple
        //                ("uspGetLoginRolesTypes", dynamicParameters,
        //                commandType: CommandType.StoredProcedure);
        //            menuTypes = reuslt.Read<LoginDTO>().ToList();
        //        }


        //    }
        //    catch (Exception exc)
        //    {
        //        string msg = exc.Message;
        //    }
        //    return menuTypes;
        //}


        public async Task<List<RoleList>> CheckRoleISuperAdmin(RoleList roleInfo)
        {
            List<RoleList> menuTypes = new List<RoleList>();
            try
            {


                using (IDbConnection con = new SqlConnection(appSettings.ConnectionString.DB))

                //    using (IDbConnection con = new SqlConnection(appSettings.ConnectionString.DB))
                {
                    var dynamicParameters = new DynamicParameters();
                    dynamicParameters.Add("@Role_ID", roleInfo.RoleId);
                    var reuslt = con.QueryMultiple
                        ("uspGetbyRoleTypeIssuperAdmin", dynamicParameters,
                        commandType: CommandType.StoredProcedure);
                    menuTypes = reuslt.Read<RoleList>().ToList();
                }


            }
            catch (Exception exc)
            {
                string msg = exc.Message;
            }
            return menuTypes;
        }



        //public async Task<List<LoginDTO>> GetLoginMenuDetails(LoginDTO loginInfo)
        //{
        //    List<LoginDTO> menuTypes = new List<LoginDTO>();
        //    try
        //    {


        //        using (IDbConnection con = new SqlConnection(appSettings.ConnectionString.DB))

        //        //    using (IDbConnection con = new SqlConnection(appSettings.ConnectionString.DB))
        //        {
        //            var dynamicParameters = new DynamicParameters();
        //            dynamicParameters.Add("@ID", loginInfo.ID);
        //            dynamicParameters.Add("@Role_ID", loginInfo.Role_ID);
        //            var reuslt = con.QueryMultiple
        //                ("uspGetLoginMenuDetail", dynamicParameters,
        //                commandType: CommandType.StoredProcedure);
        //            menuTypes = reuslt.Read<LoginDTO>().ToList();
        //        }


        //    }
        //    catch (Exception exc)
        //    {
        //        string msg = exc.Message;
        //    }
        //    return menuTypes;
        //}

        public List<MasterErrorMessage> GetMasterErrorMessagesByPageId(int PageId)
        {
            var results = new List<MasterErrorMessage>();
            try
            {
                using (IDbConnection con = new SqlConnection(appSettings.ConnectionString.DB))
                {
                    var dynamicParameters = new DynamicParameters();

                    dynamicParameters.Add("@PageId", PageId);

                    var reuslt = con.QueryMultiple
                        ("uspMasterErrorMessageGetByPageId", dynamicParameters,
                        commandType: CommandType.StoredProcedure);
                    results = reuslt.Read<MasterErrorMessage>().ToList();
                }
            }
            catch (Exception ex)
            {
                results = null;
                throw ex;
            }
            return results;
        }
    }
}
