using UserLibrary.BusinessModel;
using UserLibrary.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace UserLibrary.DataContract
{
    public interface IMenuDataService
    {
        public int SaveMenu(MenuInfo menuInfo, BaseModel userData);
        PagedResults<MenuInfo> GetMenuListings(MenuInfo menuInfo);
        PagedResults<Role> GetRoleListings(Role roleInfo);

         PagedResults<User> GetUserListings(User userInfo);

        PagedResults<SubMenuInfo> GetSubListings(SubMenuInfo submenuInfo);
        Task<List<MenuList>> GetMenuTypes();
        Task<List<AddLosDTO>> GetUserLOS();
        Task<List<UserDTO>> GetRoles();
        Task<List<EngPartnerMangerDTO>> GetAllUsers();
        Task<List<SubMenuDTO>> GetSubMenuTypes(SubMenuDTO submenu);
        Task<List<SubMenuDTO>> GetSubMenuUserTypes(SubMenuDTO submenu);
        Task<List<AddSbuDTO>> GetUserSBU(AddSbuDTO sbulist);
        Task<List<RoleList>> GetbyRoleId(RoleList roleInfo);

        Task<List<UserList>> GetbyUserId(UserList userInfo);
        Task<List<MenuList>> GetUserMenuList(MenuList MenuInfo);

        //Task<List<LoginDTO>> GetLoginRoleTypes(LoginDTO loginInfo);
        //Task<List<LoginDTO>> GetLoginMenuDetails(LoginDTO loginInfo);


        Task<List<RoleList>> CheckRoleISuperAdmin(RoleList roleInfo);
        public int SaveSubMenu(SubMenuInfo submenuInfo, BaseModel userData);
        public int SaveRole(RoleList rolelist, BaseModel userData);
        public int SaveUser(UserList userlist, BaseModel userData);
        public int SaveRoleMapping(RoleList rolemappinglist, BaseModel userData);
        public int SaveUserLosSbuMapping(UserList userLosSbuMapping, BaseModel userData);
        public int SaveUsersPermission(UserList userLosSbuMapping, BaseModel userData);
        public List<UserPermissionList> getPermissionDetails(int userID);

        public int SaveUserswithoutsubmenuPermission(UserList userLosSbuMapping);
        Task<List<UserList>> GetMenubyUserId(UserList userInfo);

        public List<MasterErrorMessage> GetMasterErrorMessagesByPageId(int PageId);



    }
}
