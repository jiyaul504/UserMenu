using System;
using System.Collections.Generic;
using System.Text;
using UserLibrary.Models;
using System.Collections.Generic;
using System.Threading.Tasks;
using UserLibrary.BusinessModel;

namespace UserLibrary.ServiceContracts
{
  public interface   IMenuService
    {
        
        public int SaveMenu(MenuInfo menuInfo, BaseModel userData);
        public int SaveSubMenu(SubMenuInfo submenuInfo, BaseModel userData);
        public PagedResults<MenuInfo> GetMenuListings(MenuInfo menuInfo);
        public PagedResults<Role> GetRoleListings(Role roleInfo);
        public PagedResults<User> GetUserListings(User userInfo);
        public PagedResults<SubMenuInfo> GetSubListings(SubMenuInfo submenuInfo);
        //public Task<List<LoginDTO>> GetLoginRoleTypes(LoginDTO loginInfo);
        public Task<List<MenuList>> GetUserMenuList(MenuList MenuInfo);

        //public Task<List<LoginDTO>> GetLoginMenuDetails(LoginDTO loginInfo);
        public Task<List<MenuList>> GetMenuTypes();
        public Task<List<AddLosDTO>> GetUserLOS();
        public Task<List<UserDTO>> GetRoles();
        public Task<List<EngPartnerMangerDTO>> GetAllUsers();
        public Task<List<SubMenuDTO>> GetSubMenuTypes(SubMenuDTO submenu);

        public Task<List<SubMenuDTO>> GetSubMenuUserTypes(SubMenuDTO submenu);

        public Task<List<AddSbuDTO>> GetUserSBU(AddSbuDTO sbulist);
        public Task<List<RoleList>> GetbyRoleId(RoleList roleInfo);
        public Task<List<UserList>> GetbyUserId(UserList userInfo);
        public Task<List<RoleList>> CheckRoleISuperAdmin(RoleList roleInfo);
        public int SaveRole(RoleList rolelist, BaseModel userData);
        public int SaveUser(UserList userlist, BaseModel userData);
        public int SaveRoleMapping(RoleList rolemappinglist, BaseModel userData);
        public int SaveUserLosSbuMapping(UserList userLosSbuMapping, BaseModel userData);
        public int SaveUsersPermission(UserList userPermission, BaseModel userData);
        public List<UserPermissionList> getPermissionDetails(int userID);

        public int SaveUserswithoutsubmenuPermission(UserList userPermission);
        
            public Task<List<UserList>> GetMenubyUserId(UserList userInfo);
            public List<MasterErrorMessage> GetMasterErrorMessagesByPageId(int PageId);


    }
}
