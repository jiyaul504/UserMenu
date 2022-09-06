
using UserLibrary.BusinessModel;
using UserLibrary.Models;
using UserLibrary.ServiceContracts;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;


namespace UserLibrary.Services
{
    public class MenuService : IMenuService
    {
        private readonly DataContract.IMenuDataService MenuMasterDataService;

        public MenuService(DataContract.IMenuDataService MenuMasterDataService)
        {
            this.MenuMasterDataService = MenuMasterDataService;
        }
        public int SaveMenu(MenuInfo menuInfo, BaseModel userData)
        {
            int result = this.MenuMasterDataService.SaveMenu(menuInfo, userData);
            return result;
        }
        public int SaveSubMenu(SubMenuInfo submenuInfo, BaseModel userData)
        {
            int result = this.MenuMasterDataService.SaveSubMenu(submenuInfo, userData);
            return result;
        }

        public int SaveRole(RoleList rolelist, BaseModel userData)
        {
            int result = this.MenuMasterDataService.SaveRole(rolelist, userData);
            return result;
        }

        public int SaveUser(UserList userlist, BaseModel userData)
        {
            int result = this.MenuMasterDataService.SaveUser(userlist, userData);
            return result;
        }

        public int SaveUsersPermission(UserList userLosSbuMapping, BaseModel userData)
        {
            int result = this.MenuMasterDataService.SaveUsersPermission(userLosSbuMapping, userData);
            return result;
        }
        public List<UserPermissionList> getPermissionDetails(int userID)
        {
            return this.MenuMasterDataService.getPermissionDetails(userID);
        }

        public int SaveUserswithoutsubmenuPermission(UserList userLosSbuMapping)
        {
            int result = this.MenuMasterDataService.SaveUserswithoutsubmenuPermission(userLosSbuMapping);
            return result;
        }


        public int SaveRoleMapping(RoleList rolemappinglist, BaseModel userData)
        {
            int result = this.MenuMasterDataService.SaveRoleMapping(rolemappinglist, userData);
            return result;
        }

        public int SaveUserLosSbuMapping(UserList userLosSbuMapping, BaseModel userData)
        {
            int result = this.MenuMasterDataService.SaveUserLosSbuMapping(userLosSbuMapping, userData);
            return result;
        }


        public async Task<List<MenuList>> GetMenuTypes()
        {
            return await MenuMasterDataService.GetMenuTypes();
        }
        public async Task<List<AddLosDTO>> GetUserLOS()
        {
            return await MenuMasterDataService.GetUserLOS();
        }

        public async Task<List<UserDTO>> GetRoles()
        {
            return await MenuMasterDataService.GetRoles();
        }

        public async Task<List<EngPartnerMangerDTO>> GetAllUsers()
        {
            return await MenuMasterDataService.GetAllUsers();
        }

        public async Task<List<SubMenuDTO>> GetSubMenuTypes(SubMenuDTO submenu)
        {
            return await MenuMasterDataService.GetSubMenuTypes(submenu);
        }
        public async Task<List<SubMenuDTO>> GetSubMenuUserTypes(SubMenuDTO submenu)
        {
            return await MenuMasterDataService.GetSubMenuUserTypes(submenu);
        }

        public async Task<List<AddSbuDTO>> GetUserSBU(AddSbuDTO sbulist)
        {
            return await MenuMasterDataService.GetUserSBU(sbulist);
        }


        public async Task<List<RoleList>> GetbyRoleId(RoleList roleInfo)
        {
            return await MenuMasterDataService.GetbyRoleId(roleInfo);
        }

        public async Task<List<MenuList>> GetUserMenuList(MenuList MenuInfo)
        {
            return await MenuMasterDataService.GetUserMenuList(MenuInfo);
        }
        public async Task<List<UserList>> GetbyUserId(UserList userInfo)
        {
            return await MenuMasterDataService.GetbyUserId(userInfo);
        }

        public async Task<List<UserList>> GetMenubyUserId(UserList userInfo)
        {
            return await MenuMasterDataService.GetMenubyUserId(userInfo);
        }
        //public async Task<List<LoginDTO>> GetLoginMenuDetails(LoginDTO loginInfo)
        //{
        //    return await MenuMasterDataService.GetLoginMenuDetails(loginInfo);
        //}
        //public async Task<List<LoginDTO>> GetLoginRoleTypes(LoginDTO loginInfo)
        //{
        //    return await MenuMasterDataService.GetLoginRoleTypes(loginInfo);
        //}

        public async Task<List<RoleList>> CheckRoleISuperAdmin(RoleList roleInfo)
        {
            return await MenuMasterDataService.CheckRoleISuperAdmin(roleInfo);
        }

        public PagedResults<MenuInfo> GetMenuListings(MenuInfo menuInfo)
        {
            return MenuMasterDataService.GetMenuListings(menuInfo);
        }


        public PagedResults<Role> GetRoleListings(Role roleInfo)
        {
            return MenuMasterDataService.GetRoleListings(roleInfo);
        }

        public PagedResults<User> GetUserListings(User userInfo)
        {
            return MenuMasterDataService.GetUserListings(userInfo);
        }


        public PagedResults<SubMenuInfo> GetSubListings(SubMenuInfo submenuInfo)
        {
            return MenuMasterDataService.GetSubListings(submenuInfo);
        }

        public List<MasterErrorMessage> GetMasterErrorMessagesByPageId(int PageId)
        {
            return MenuMasterDataService.GetMasterErrorMessagesByPageId(PageId);
            ;
        }
    }
}
