using UserLibrary.Models;
using UserLibrary.ServiceContracts;
using UserMenu.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc.Rendering;

using PagedList;

using Microsoft.AspNetCore.Authorization;

using Microsoft.AspNetCore.Mvc.Rendering;


using System.Net;
using Newtonsoft.Json;
using System.IO;
using UserLibrary.BusinessModel;
using UserLibrary.Enums;
using UserLibrary.Common;
using UserLibrary.Common;

namespace CommonTests.Web.Controllers
{
    public class HomeController : Controller
    {
        //private readonly IDocumentManager documentManager;
        //  private readonly IUserInterface userInterface;


        private readonly ILogger<HomeController> _logger;

        public IMenuService _MenuService;
        public ILoggerService _loggerService;
        //public ICommonService _CommonService;

        public HomeController(ILogger<HomeController> logger, IMenuService MenuService, ILoggerService loggerService)// ICommonService commonService)
        {
            // userInterface = _userInterface;
            _MenuService = MenuService;
            _logger = logger;
            _loggerService = loggerService;
            // _CommonService = commonService;
        }
        [HttpGet]
        //public async Task<ActionResult> SaveMenu(string menuId,string Menu, string priority, string PageUrl, string status)
        public ActionResult SaveMenu(string menuId, string Menu, string DisplayName, string sequenceNumber, string PageUrl, string parentId, string status, string userdata)
        {

            //var userAge = int.Parse(TempData["age"].ToString());
            ResponseData _responseData = new ResponseData();
            //  string data = "Successss";
            try
            {
                int result = 0;
                int MenuId = Convert.ToInt32(menuId);
                int SequenceNumber = Convert.ToInt32(sequenceNumber);
                int ParentId = Convert.ToInt32(parentId);
                int StatusId = 0;
                if (status == "true")
                    StatusId = 1;

                var userData = userdata != null ? JsonConvert.DeserializeObject<BaseModel>(userdata) : new BaseModel();

                var isMandatoryValidationPassed = true;
                var MandatoryMessage = "Please Enter following fileds value - ";
                if (String.IsNullOrEmpty(Menu))
                {
                    isMandatoryValidationPassed = false;
                    MandatoryMessage += "Menu,";
                }
                if (String.IsNullOrEmpty(DisplayName))
                {
                    isMandatoryValidationPassed = false;
                    MandatoryMessage += "Display Menu Name,";
                }
                if (String.IsNullOrEmpty(sequenceNumber))
                {
                    isMandatoryValidationPassed = false;
                    MandatoryMessage += "Sequence Number,";
                }
                if (String.IsNullOrEmpty(PageUrl))
                {
                    isMandatoryValidationPassed = false;
                    MandatoryMessage += "PageUrl,";
                }
                MandatoryMessage = MandatoryMessage.TrimEnd(',');

                if (!isMandatoryValidationPassed)
                {
                    _responseData.Id = result;
                    _responseData.Message = MandatoryMessage;
                    return Content(JsonConvert.SerializeObject(_responseData), "application/json");
                }

                MenuInfo menuInfo = new MenuInfo();
                menuInfo.MenuID = MenuId;
                menuInfo.MenuName = Menu;
                menuInfo.DisplayMenuName = DisplayName;
                menuInfo.SequenceNumber = SequenceNumber;
                menuInfo.PageURL = PageUrl;
                menuInfo.ParentMenuID = ParentId;
                menuInfo.StatusID = StatusId;

                List<MenuInfo> Dashboardlst = new List<MenuInfo>();
                //Dashboardlst = _MenuService.SaveMenu(menuInfo);
                result = _MenuService.SaveMenu(menuInfo, userData);
                //var pageresult = (List<MasterErrorMessage>)TempData.Peek("MasterErrorMsg");
                var tempresult = TempData["MasterErrorMsg"];
                var pageresult = JsonConvert.DeserializeObject<List<MasterErrorMessage>>(tempresult.ToString());
                TempData.Keep();
                if (result == 0 && pageresult != null && pageresult.Count > 0)
                {
                    _responseData.Id = result;
                    _responseData.Message = pageresult.Where(m => m.Code == PageErrorCode.MenuNameisalreayexists).Select(m => m.Message).FirstOrDefault();
                }
                else if (menuId == null && result != 0 && pageresult != null && pageresult.Count > 0)
                {
                    _responseData.Id = result;
                    _responseData.Message = pageresult.Where(m => m.Code == PageErrorCode.MenuAddedsuccessfully).Select(m => m.Message).FirstOrDefault();
                }
                else if (menuId != null && result != 0 && pageresult != null && pageresult.Count > 0)
                {
                    _responseData.Id = result;
                    _responseData.Message = pageresult.Where(m => m.Code == PageErrorCode.MenuUpdatedsuccessfully).Select(m => m.Message).FirstOrDefault();
                }
                else
                {
                    if (menuId != null)
                    {
                        _responseData.Id = result;
                        _responseData.Message = pageresult.Where(m => m.Code == PageErrorCode.MenuUpdatedFailed).Select(m => m.Message).FirstOrDefault();

                    }
                    else
                    {
                        _responseData.Id = result;
                        _responseData.Message = pageresult.Where(m => m.Code == PageErrorCode.MenuAddedFailed).Select(m => m.Message).FirstOrDefault();

                    }
                }
                TempData.Remove("MasterErrorMsg");
                //return Json(result, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                _loggerService.LogError(ex, ex.Message);
            }
            return Content(JsonConvert.SerializeObject(_responseData), "application/json");
        }

        [HttpGet]
        public async Task<ActionResult> SubSaveMenu(string submenuId, string subMenu, string menuId, string priority, string PageUrl, string status, string userdata)
        {
            ResponseData _responseData = new ResponseData();
            try
            {
                SubMenuInfo submenuInfo = new SubMenuInfo();
                int SubmenuId = Convert.ToInt32(submenuId);
                int MenuId = Convert.ToInt32(menuId);
                int Priority = Convert.ToInt32(priority);
                int result = 0;
                int StatusId = 0;
                if (status == "true")
                    StatusId = 1;

                var userData = userdata != null ? JsonConvert.DeserializeObject<BaseModel>(userdata) : new BaseModel();

                var isMandatoryValidationPassed = true;
                var MandatoryMessage = "Please Enter following fileds value - ";
                if (String.IsNullOrEmpty(subMenu))
                {
                    isMandatoryValidationPassed = false;
                    MandatoryMessage += "SubMenu,";
                }
                if (String.IsNullOrEmpty(menuId))
                {
                    isMandatoryValidationPassed = false;
                    MandatoryMessage += "Menu,";
                }
                if (String.IsNullOrEmpty(priority))
                {
                    isMandatoryValidationPassed = false;
                    MandatoryMessage += "Priority,";
                }
                if (String.IsNullOrEmpty(PageUrl))
                {
                    isMandatoryValidationPassed = false;
                    MandatoryMessage += "PageUrl,";
                }
                MandatoryMessage = MandatoryMessage.TrimEnd(',');

                if (!isMandatoryValidationPassed)
                {
                    _responseData.Id = result;
                    _responseData.Message = MandatoryMessage;
                    return Content(JsonConvert.SerializeObject(_responseData), "application/json");
                }

                submenuInfo.SubmenuID = SubmenuId;
                submenuInfo.SubmenuName = subMenu;
                submenuInfo.MenuID = MenuId;
                submenuInfo.Priority = Priority;
                submenuInfo.PageURL = PageUrl;
                submenuInfo.StatusID = StatusId;
                submenuInfo.StatusID = StatusId;

                List<SubMenuInfo> Dashboardlst = new List<SubMenuInfo>();
                //Dashboardlst = _MenuService.SaveSubMenu(submenuInfo);
                result = _MenuService.SaveSubMenu(submenuInfo, userData);
                //return Content(JsonConvert.SerializeObject(Dashboardlst), "application/json");
                var tempresult = TempData["MasterErrorMsg"];
                var pageresult = JsonConvert.DeserializeObject<List<MasterErrorMessage>>(tempresult.ToString());
                TempData.Keep();
                if (result == 0 && pageresult != null && pageresult.Count > 0)
                {
                    _responseData.Id = result;
                    _responseData.Message = pageresult.Where(m => m.Code == PageErrorCode.SubMenuNameisalreayexists).Select(m => m.Message).FirstOrDefault();
                }
                else if (menuId == null && result != 0 && pageresult != null && pageresult.Count > 0)
                {
                    _responseData.Id = result;
                    _responseData.Message = pageresult.Where(m => m.Code == PageErrorCode.SubMenuAddedsuccessfully).Select(m => m.Message).FirstOrDefault();
                }
                else if (menuId != null && result != 0 && pageresult != null && pageresult.Count > 0)
                {
                    _responseData.Id = result;
                    _responseData.Message = pageresult.Where(m => m.Code == PageErrorCode.SubMenuUpdatedsuccessfully).Select(m => m.Message).FirstOrDefault();
                }
                else
                {
                    if (menuId != null)
                    {
                        _responseData.Id = result;
                        _responseData.Message = pageresult.Where(m => m.Code == PageErrorCode.SubMenuAddedFailed).Select(m => m.Message).FirstOrDefault();

                    }
                    else
                    {
                        _responseData.Id = result;
                        _responseData.Message = pageresult.Where(m => m.Code == PageErrorCode.SubMenuUpdatedFailed).Select(m => m.Message).FirstOrDefault();

                    }
                }
                TempData.Remove("MasterErrorMsg");
                //result = _MenuService.SaveMenu(menuInfo);
                //return Json(result, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                _loggerService.LogError(ex, ex.Message);
            }
            return Content(JsonConvert.SerializeObject(_responseData), "application/json");
        }


        [HttpGet]
        public PagedResponse<SubMenuInfo> GetSubListings(int pageSize, int pageIndex)
        {
            StaticPagedList<SubMenuInfo> adminListings = null;
            try
            {
                SubMenuInfo submenuInfo = new SubMenuInfo();
                submenuInfo.pageSize = pageSize;
                submenuInfo.pageIndex = pageIndex;

                var allUserLOSList = _MenuService.GetSubListings(submenuInfo);

                adminListings = new StaticPagedList<SubMenuInfo>(
                        allUserLOSList.Items,
                        pageIndex == 0 ? 1 : pageIndex,
                        pageIndex == 0 ? allUserLOSList.TotalCount > 0 ? allUserLOSList.TotalCount : 1 : pageSize,
                        allUserLOSList.TotalCount);
            }
            catch (Exception ex)
            {
                _loggerService.LogError(ex, ex.Message);
            }
            return new PagedResponse<SubMenuInfo>(adminListings);
        }

        [HttpGet]
        public PagedResponse<MenuInfo> GetMenuListings(int pageSize, int pageIndex)
        {
            StaticPagedList<MenuInfo> adminListings = null;
            try
            {
                MenuInfo menuInfo = new MenuInfo();
                menuInfo.pageSize = pageSize;
                menuInfo.pageIndex = pageIndex;

                //var allUserLOSList = _MenuService.GetMenuListings(pageSize, pageIndex);
                var allUserLOSList = _MenuService.GetMenuListings(menuInfo);

                adminListings = new StaticPagedList<MenuInfo>(
                        allUserLOSList.Items,
                        pageIndex == 0 ? 1 : pageIndex,
                        pageIndex == 0 ? allUserLOSList.TotalCount > 0 ? allUserLOSList.TotalCount : 1 : pageSize,
                        allUserLOSList.TotalCount);
            }
            catch (Exception ex)
            {
                _loggerService.LogError(ex, ex.Message);
            }
            return new PagedResponse<MenuInfo>(adminListings);
        }

        [HttpGet]
        public PagedResponse<Role> GetRoleListings(int pageSize, int pageIndex)
        {
            StaticPagedList<Role> adminListings = null;
            try
            {
                Role roleInfo = new Role();
                roleInfo.pageSize = pageSize;
                roleInfo.pageIndex = pageIndex;

                //var allUserLOSList = _MenuService.GetMenuListings(pageSize, pageIndex);
                var allUserLOSList = _MenuService.GetRoleListings(roleInfo);

                adminListings = new StaticPagedList<Role>(
                        allUserLOSList.Items,
                        pageIndex == 0 ? 1 : pageIndex,
                        pageIndex == 0 ? allUserLOSList.TotalCount > 0 ? allUserLOSList.TotalCount : 1 : pageSize,
                        allUserLOSList.TotalCount);
            }
            catch (Exception ex)
            {
                _loggerService.LogError(ex, ex.Message);
            }
            return new PagedResponse<Role>(adminListings);
        }


        [HttpGet]
        public PagedResponse<User> GetUserListings(int pageSize, int pageIndex)
        {
            StaticPagedList<User> adminListings = null;
            try
            {
                User userInfo = new User();
                userInfo.pageSize = pageSize;
                userInfo.pageIndex = pageIndex;

                var allUserLOSList = _MenuService.GetUserListings(userInfo);

                adminListings = new StaticPagedList<User>(
                        allUserLOSList.Items,
                        pageIndex == 0 ? 1 : pageIndex,
                        pageIndex == 0 ? allUserLOSList.TotalCount > 0 ? allUserLOSList.TotalCount : 1 : pageSize,
                        allUserLOSList.TotalCount);
            }
            catch (Exception ex)
            {
                _loggerService.LogError(ex, ex.Message);
            }
            return new PagedResponse<User>(adminListings);
        }





        public List<MenuDTO> GetLOS()
        {
            var result = new List<MenuDTO>();
            try
            {
                List<MenuList> losTypes = _MenuService.GetMenuTypes().Result;
                List<MenuDTO> menulst = new List<MenuDTO>();
                foreach (var item in losTypes)
                {
                    MenuDTO dr = new MenuDTO();
                    dr.LOS_Code = Convert.ToString(item.Id);
                    dr.LOS_Name = item.Name;
                    dr.Parent_Menu_Code = Convert.ToString(item.ParentId);
                    dr.Parent_Menu_Name = item.ParentName;
                    menulst.Add(dr);

                }
                result = menulst.ToList();
            }
            catch (Exception ex)
            {
                _loggerService.LogError(ex, ex.Message);
            }
            return result;
        }


        public List<UserMenuDTO> GetMENU()
        {
            var result = new List<UserMenuDTO>();
            try
            {
                List<MenuList> losTypes = _MenuService.GetMenuTypes().Result;
                List<UserMenuDTO> menulst = new List<UserMenuDTO>();
                foreach (var item in losTypes)
                {
                    UserMenuDTO dr = new UserMenuDTO();
                    dr.menu_Code = Convert.ToString(item.Id);
                    dr.menu_Name = item.Name;
                    menulst.Add(dr);

                }
                result = menulst.ToList();
            }
            catch (Exception ex)
            {
                _loggerService.LogError(ex, ex.Message);
            }
            return result;
        }


        public List<UserMenuDTO> GetUserMENUList(int RoleId)
        {
            var result = new List<UserMenuDTO>();
            try
            {
                MenuList MenuInfo = new MenuList();
                MenuInfo.Role_ID = RoleId;
                // List<MenuList> losTypes = _MenuService.GetMenuTypes().Result;
                List<MenuList> losTypes = _MenuService.GetUserMenuList(MenuInfo).Result;
                List<UserMenuDTO> menulst = new List<UserMenuDTO>();
                foreach (var item in losTypes)
                {
                    UserMenuDTO dr = new UserMenuDTO();
                    dr.menu_Code = Convert.ToString(item.Id);
                    dr.menu_Name = item.Name;
                    dr.Parent_Menu_Code = Convert.ToString(item.ParentId);
                    dr.Parent_Menu_Name = item.ParentName;
                    menulst.Add(dr);

                }
                result = menulst.ToList();
            }
            catch (Exception ex)
            {
                _loggerService.LogError(ex, ex.Message);
            }
            return result;
        }

        //  public List<UserSubMenuDTO> GetUserSUBMENU(string menuCode)
        public List<UserSubMenuDTO> GetUserSUBMENU(string menuCode, int RoleId)
        {
            var result = new List<UserSubMenuDTO>();
            try
            {
                // string MenuId = losCode;
                SubMenuDTO submenu = new SubMenuDTO();
                submenu.Menu_Code = menuCode;
                submenu.Role_ID = RoleId;
                // List<SubMenuDTO> losTypes = _MenuService.GetSubMenuTypes(MenuId).Result;
                // List<SubMenuDTO> losTypes = _MenuService.GetSubMenuTypes(submenu).Result;
                List<SubMenuDTO> losTypes = _MenuService.GetSubMenuUserTypes(submenu).Result;
                //  GetSubMenuUserTypes
                List<UserSubMenuDTO> menulst = new List<UserSubMenuDTO>();
                foreach (var item in losTypes)
                {
                    UserSubMenuDTO dr = new UserSubMenuDTO();
                    dr.menu_Code = item.Menu_Code;
                    dr.menu_Name = item.Menu_Name;
                    dr.submenu_Code = item.SubMenu_Code;
                    dr.submenu_Name = item.SubMenu_Name;
                    menulst.Add(dr);

                }
                result = menulst.ToList();
            }
            catch (Exception ex)
            {
                _loggerService.LogError(ex, ex.Message);
            }
            return result;
        }


        public List<RoleList> CheckRoleTypeId(int roleId)
        {
            var result = new List<RoleList>();
            try
            {
                RoleList roleinfo = new RoleList();
                roleinfo.RoleId = roleId;
                List<RoleList> losTypes = _MenuService.CheckRoleISuperAdmin(roleinfo).Result;
                List<RoleList> menulst = new List<RoleList>();
                foreach (var item in losTypes)
                {
                    RoleList dr = new RoleList();
                    dr.IsuperAdminTrue = item.IsuperAdminTrue;
                    dr.IsLosTrue = item.IsLosTrue;
                    dr.IsSbUTrue = item.IsSbUTrue;
                    menulst.Add(dr);
                }
                result = menulst.ToList();
            }
            catch (Exception ex)
            {
                _loggerService.LogError(ex, ex.Message);
            }
            return result;
        }



        public List<AddLosDTO> GetUserLOS()
        {
            var result = new List<AddLosDTO>();
            try
            {
                List<AddLosDTO> losTypes = _MenuService.GetUserLOS().Result;
                List<AddLosDTO> menulst = new List<AddLosDTO>();
                var distinctLos = losTypes.GroupBy(x => x.LOS_Name).Select(y => y.First());
                foreach (var item in distinctLos)
                {
                    AddLosDTO dr = new AddLosDTO();
                    dr.LOS_Code = item.LOS_Code;
                    dr.LOS_Name = item.LOS_Name;
                    menulst.Add(dr);

                }
                result = menulst.ToList();
            }
            catch (Exception ex)
            {
                _loggerService.LogError(ex, ex.Message);
            }
            return result;
        }



        public List<SubMenuDTO> GetSBU(string losCode)
        {
            var result = new List<SubMenuDTO>();
            try
            {
                // string MenuId = losCode;
                SubMenuDTO submenu = new SubMenuDTO();
                submenu.Menu_Code = losCode;
                // List<SubMenuDTO> losTypes = _MenuService.GetSubMenuTypes(MenuId).Result;
                List<SubMenuDTO> losTypes = _MenuService.GetSubMenuTypes(submenu).Result;
                List<SubMenuDTO> menulst = new List<SubMenuDTO>();
                foreach (var item in losTypes)
                {
                    SubMenuDTO dr = new SubMenuDTO();
                    dr.LOS_Code = Convert.ToString(item.Menu_Code);
                    dr.LOS_Name = item.Menu_Name;
                    dr.SBU_Code = Convert.ToString(item.SubMenu_Code);
                    dr.SBU_Name = item.SubMenu_Name;
                    menulst.Add(dr);

                }
                result = menulst.ToList();
            }
            catch (Exception ex)
            {
                _loggerService.LogError(ex, ex.Message);
            }
            return result;
        }
        public List<AddSbuDTO> GetUserSBU(string losCode)
        {
            var result = new List<AddSbuDTO>();
            try
            {
                // string MenuId = losCode;
                AddSbuDTO sbulist = new AddSbuDTO();
                var losCodeList = !String.IsNullOrEmpty(losCode) ? losCode.Split(',').Distinct().ToList() : new List<string>();
                sbulist.LOS_Code = String.Join(',', losCodeList);
                // List<SubMenuDTO> losTypes = _MenuService.GetSubMenuTypes(MenuId).Result;
                List<AddSbuDTO> losTypes = _MenuService.GetUserSBU(sbulist).Result;
                List<AddSbuDTO> menulst = new List<AddSbuDTO>();
                foreach (var item in losTypes)
                {
                    AddSbuDTO dr = new AddSbuDTO();
                    dr.LOS_Code = item.LOS_Code;
                    dr.LOS_Name = item.LOS_Name;
                    dr.SBU_Code = item.SBU_Code;
                    dr.SBU_Name = item.SBU_Name;
                    menulst.Add(dr);

                }
                result = menulst.ToList();
            }
            catch (Exception ex)
            {
                _loggerService.LogError(ex, ex.Message);
            }
            return result;
        }



        [HttpGet]
        public JsonResult GetEmployeeAutoCompleteSearchDetails(string text)
        {
            try
            {
                List<EngPartnerMangerDTO> losTypes = _MenuService.GetAllUsers().Result;

                if (!string.IsNullOrEmpty(text))
                {

                    return Json(losTypes);
                }
            }
            catch (Exception ex)
            {
                _loggerService.LogError(ex, ex.Message);
            }
            return null;
        }

        public List<EngPartnerMangerDTO> GetAllUsers()
        {
            var result = new List<EngPartnerMangerDTO>();
            try
            {
                List<EngPartnerMangerDTO> losTypes = _MenuService.GetAllUsers().Result;
                List<EngPartnerMangerDTO> menulst = new List<EngPartnerMangerDTO>();

                foreach (var item in losTypes)
                {
                    EngPartnerMangerDTO userList = new EngPartnerMangerDTO();
                    //UserDTO dr = new UserDTO();
                    // Comm_Eng_Partner_Manger_DTO emp = new Comm_Eng_Partner_Manger_DTO();
                    // Comm_Eng_Partner_Manger_DTO los = new Comm_Eng_Partner_Manger_DTO();
                    userList.ID = item.ID;
                    userList.Name = item.Name;
                    userList.FullName = item.FullName;
                    //menulst.Add(emp);
                    //menulst.Add(emp);
                    menulst.Add(userList);



                }
                result = menulst.ToList();
            }
            catch (Exception ex)
            {
                _loggerService.LogError(ex, ex.Message);
            }
            return result;
        }






        [HttpPost]
        public IActionResult AddRoles()
        {
            var data = Request.Form["users"];
            //var losCode = Request.Form["losCode"].ToString();
            //var sbuCode = Request.Form["sbuCode"].ToString();
            return Ok();
        }



        [HttpGet]
        public async Task<ActionResult> AddUser(string UserList, string PermissionList, string MenuId, string IsLOSMandatory, string userdata)
        {
            ResponseData _responseData = new ResponseData();
            string Userids = "";
            int result = 0;
            int status = 0;
            int statuscheck = 0;
            int RoleId = 0;
            var menuitem = new List<UserPermissionList>();
            try
            {

                var userData = userdata != null ? JsonConvert.DeserializeObject<BaseModel>(userdata) : new BaseModel();
                var user_List = JsonConvert.DeserializeObject<List<UserList>>(UserList);
                var permissionList = JsonConvert.DeserializeObject<List<UserPermissionList>>(PermissionList);
                if (MenuId != null)
                    menuitem = JsonConvert.DeserializeObject<List<UserPermissionList>>(MenuId);
                UserList userMenu = new UserList();

                foreach (var item in user_List)
                {
                    var isMandatoryValidationPassed = true;
                    var MandatoryMessage = "Please Enter following fileds value - ";
                    if (item.EmployeeId == null && item.User_ID == 0)
                    {
                        isMandatoryValidationPassed = false;
                        MandatoryMessage += "User,";
                    }
                    if (String.IsNullOrEmpty(item.Role_ID))
                    {
                        isMandatoryValidationPassed = false;
                        MandatoryMessage += "Role,";
                    }
                    if (String.IsNullOrEmpty(item.LosId) && IsLOSMandatory == "True")
                    {
                        isMandatoryValidationPassed = false;
                        MandatoryMessage += "LOS,";
                    }
                    if (String.IsNullOrEmpty(item.SbuLosId) && IsLOSMandatory == "True")
                    {
                        isMandatoryValidationPassed = false;
                        MandatoryMessage += "SBU,";
                    }
                    if (permissionList == null || permissionList.Count == 0)
                    {
                        isMandatoryValidationPassed = false;
                        MandatoryMessage += "Menu, Submenu and it's Permission,";
                    }
                    MandatoryMessage = MandatoryMessage.TrimEnd(',');

                    if (!isMandatoryValidationPassed)
                    {
                        _responseData.Id = result;
                        _responseData.Message = MandatoryMessage;
                        return Content(JsonConvert.SerializeObject(_responseData), "application/json");
                    }

                    UserList userlist = new UserList();
                    Userids = item.User_ID.ToString();
                    if (item.User_ID > 0)
                    {
                        userlist.Employee_Id = "Test";
                        userlist.User_ID = item.User_ID;
                    }
                    else
                    {
                        string val = item.EmployeeId[0].ToString();
                        userlist.Employee_Id = val;
                    }
                    var existingPermissionList = _MenuService.getPermissionDetails(userlist.User_ID);
                    userlist.RoleId = Convert.ToInt32(item.Role_ID);
                    RoleId = Convert.ToInt32(item.Role_ID);
                    userlist.Status_ID = Convert.ToInt32(item.Status_ID);
                    statuscheck = Convert.ToInt32(item.Status_ID);
                    result = _MenuService.SaveUser(userlist, userData);
                    if (status == 0)
                        status = result;
                    if (status > 0)
                    {
                        if (item.LosId.Length > 0)
                        {
                            string[] Menulist = item.LosId.Split(',');
                            string[] subMenulist = item.SubLosId.Split(',');

                            foreach (var lst in Menulist)
                            {
                                UserList userLosSbuMapping = new UserList();

                                userLosSbuMapping.User_ID = status;
                                userLosSbuMapping.LosId = lst;
                                userLosSbuMapping.RoleId = RoleId;
                                userLosSbuMapping.Status_ID = Convert.ToInt32(item.Status_ID);
                                userLosSbuMapping.Type_ID = 1;

                                result = _MenuService.SaveUserLosSbuMapping(userLosSbuMapping, userData);
                            }
                            foreach (var sublst in subMenulist)
                            {
                                UserList userLosSbuMapping = new UserList();

                                userLosSbuMapping.User_ID = status;
                                userLosSbuMapping.SubLosId = sublst;
                                userLosSbuMapping.RoleId = RoleId;
                                userLosSbuMapping.Status_ID = Convert.ToInt32(item.Status_ID);
                                userLosSbuMapping.Type_ID = 2;

                                result = _MenuService.SaveUserLosSbuMapping(userLosSbuMapping, userData);
                            }
                        }
                    }
                    if (status > 0)
                    {
                        if (permissionList.Count > 0)
                        {
                            // permissionList = permissionList.Except(existingPermissionList).ToList();
                            var checkList = new List<UserPermissionList>();
                            foreach (var list in permissionList)
                            {
                                //if (existingPermissionList.Where(_ => _.menuid == list.menuid.ToString() && _.submenuid == list.submenuid.ToString() && _.permission == list.permission.ToString()).Count() == 0)
                                //{
                                if (checkList.Count == 0 || checkList.Where(_ => _.menuid == list.menuid.ToString() && _.permission == list.permission.ToString()).Count() == 0)
                                {
                                    UserList userPermission = new UserList();
                                    userPermission.User_ID = status;
                                    userPermission.Menu_Id = Convert.ToInt32(list.menuid);
                                    //userPermission.SubMenu_Id = Convert.ToInt32(list.submenuid);
                                    userPermission.RoleId = RoleId;
                                    userPermission.Has_Write_Permission = Convert.ToInt32(list.permission);
                                    userPermission.Status_ID = statuscheck;
                                    result = _MenuService.SaveUsersPermission(userPermission, userData);
                                    checkList.Add(list);
                                }
                                //}
                            }
                        }
                        else
                        {
                            foreach (var list in menuitem)
                            {
                                string[] Menudata = list.menuid.Split(',');
                                foreach (var lst in Menudata)
                                {
                                    UserList userPermission = new UserList();
                                    userPermission.User_ID = status;
                                    userPermission.Menu_Id = Convert.ToInt32(lst);

                                    userPermission.Status_ID = statuscheck;
                                    result = _MenuService.SaveUsersPermission(userPermission, userData);
                                }
                            }
                        }
                    }
                }
                // status = result;
                result = status;
                //var result = "";
                var tempresult = TempData["MasterErrorMsg"];
                var pageresult = JsonConvert.DeserializeObject<List<MasterErrorMessage>>(tempresult.ToString());
                TempData.Keep();
                if (result == 0 && pageresult != null && pageresult.Count > 0)
                {
                    _responseData.Id = result;
                    _responseData.Message = pageresult.Where(m => m.Code == PageErrorCode.UserNameisalreayexists).Select(m => m.Message).FirstOrDefault();
                }
                else if ((Userids == "" || Userids == "0") && result != 0 && pageresult != null && pageresult.Count > 0)
                {
                    _responseData.Id = result;
                    _responseData.Message = pageresult.Where(m => m.Code == PageErrorCode.UserAddedsuccessfully).Select(m => m.Message).FirstOrDefault();
                }
                else if (Userids != "" && result != 0 && pageresult != null && pageresult.Count > 0)
                {
                    _responseData.Id = result;
                    _responseData.Message = pageresult.Where(m => m.Code == PageErrorCode.UserUpdatedsuccessfully).Select(m => m.Message).FirstOrDefault();
                }
                else
                {
                    if (Userids != "")
                    {
                        _responseData.Id = result;
                        _responseData.Message = pageresult.Where(m => m.Code == PageErrorCode.UserUpdatefailed).Select(m => m.Message).FirstOrDefault();

                    }
                    else
                    {
                        _responseData.Id = result;
                        _responseData.Message = pageresult.Where(m => m.Code == PageErrorCode.UserAddedfailed).Select(m => m.Message).FirstOrDefault();

                    }
                }
                TempData.Remove("MasterErrorMsg");
                return Content(JsonConvert.SerializeObject(_responseData), "application/json");
            }
            catch (Exception ex)
            {
                _loggerService.LogError(ex, ex.Message);
            }
            return null;
        }

        [HttpGet]
        public async Task<ActionResult> AddRole(string RoleList, string userdata)
        {
            ResponseData _responseData = new ResponseData();
            try
            {
                string RolesIds = "";
                int result = 0;
                int status = 0;
                var user_List = JsonConvert.DeserializeObject<List<RoleList>>(RoleList);
                var userData = userdata != null ? JsonConvert.DeserializeObject<BaseModel>(userdata) : new BaseModel();
                int returnresult = 0;

                foreach (var item in user_List)
                {
                    //item.Role_Menu_Mapping_IDstr = item.Role_Menu_Mapping_IDstr.Replace(@"\", "");

                    var isMandatoryValidationPassed = true;
                    var MandatoryMessage = "Please Enter following fileds value - ";
                    if (String.IsNullOrEmpty(item.RoleName))
                    {
                        isMandatoryValidationPassed = false;
                        MandatoryMessage += "Role,";
                    }
                    if (String.IsNullOrEmpty(item.MenuId))
                    {
                        isMandatoryValidationPassed = false;
                        MandatoryMessage += "Menu,";
                    }
                    MandatoryMessage = MandatoryMessage.TrimEnd(',');

                    if (!isMandatoryValidationPassed)
                    {
                        _responseData.Id = result;
                        _responseData.Message = MandatoryMessage;
                        return Content(JsonConvert.SerializeObject(_responseData), "application/json");
                    }

                    RolesIds = item.RoleIdstr;
                    RoleList rolelist = new RoleList();
                    rolelist.RoleId = Convert.ToInt32(item.RoleIdstr);
                    rolelist.RoleName = item.RoleName;
                    rolelist.Status = item.Status;
                    rolelist.IsuperAdminTrue = item.IsuperAdminTrue;
                    rolelist.IsLosTrue = item.IsLosTrue;
                    rolelist.IsSbUTrue = item.IsSbUTrue;
                    result = _MenuService.SaveRole(rolelist, userData);
                    if (status == 0)
                        status = result;
                    if (status > 0)
                    {
                        if (Convert.ToInt32(item.RoleIdstr) > 0)
                        {
                            string[] listitem = item.Role_Menu_Mapping_IDstr.Split(',');
                            //foreach (var Rolemaplst in listitem)
                            //{

                            // string Rolemapid = new String(Rolemaplst.Where(Char.IsDigit).ToArray());
                            string[] Menulist = item.MenuId.Split(',');
                            foreach (var lst in Menulist)
                            {
                                RoleList rolemappinglist = new RoleList();
                                rolemappinglist.RoleId = status;
                                rolemappinglist.Menu_Id = Convert.ToInt32(lst);
                                rolemappinglist.Status = item.Status;
                                result = _MenuService.SaveRoleMapping(rolemappinglist, userData);
                                if (result > 0 && returnresult == 0)
                                    returnresult = result;
                            }

                            //}
                        }

                        else
                        {
                            string[] Menulist = item.MenuId.Split(',');
                            foreach (var lst in Menulist)
                            {
                                RoleList rolemappinglist = new RoleList();
                                rolemappinglist.RoleId = status;
                                rolemappinglist.Menu_Id = Convert.ToInt32(lst);
                                rolemappinglist.Status = item.Status;
                                result = _MenuService.SaveRoleMapping(rolemappinglist, userData);
                                if (result > 0 && returnresult == 0)
                                    returnresult = result;
                            }
                        }
                    }
                }


                result = returnresult;
                //var result = "";
                var tempresult = TempData["MasterErrorMsg"];
                var pageresult = JsonConvert.DeserializeObject<List<MasterErrorMessage>>(tempresult.ToString());
                TempData.Keep();
                if (result == 0 && pageresult != null && pageresult.Count > 0)
                {
                    _responseData.Id = result;
                    _responseData.Message = pageresult.Where(m => m.Code == PageErrorCode.RoleNameisalreayexists).Select(m => m.Message).FirstOrDefault();
                }
                else if (RolesIds == "" && result != 0 && pageresult != null && pageresult.Count > 0)
                {
                    _responseData.Id = result;
                    _responseData.Message = pageresult.Where(m => m.Code == PageErrorCode.RoleAddedsuccessfully).Select(m => m.Message).FirstOrDefault();
                }
                else if (RolesIds != "" && result != 0 && pageresult != null && pageresult.Count > 0)
                {
                    _responseData.Id = result;
                    _responseData.Message = pageresult.Where(m => m.Code == PageErrorCode.RoleUpdatedsuccessfully).Select(m => m.Message).FirstOrDefault();
                }
                else
                {
                    if (RolesIds != "")
                    {
                        _responseData.Id = result;
                        _responseData.Message = pageresult.Where(m => m.Code == PageErrorCode.RoleUpdatedFailed).Select(m => m.Message).FirstOrDefault();

                    }
                    else
                    {
                        _responseData.Id = result;
                        _responseData.Message = pageresult.Where(m => m.Code == PageErrorCode.RoleAddedFailed).Select(m => m.Message).FirstOrDefault();

                    }
                }
                TempData.Remove("MasterErrorMsg");
            }
            catch (Exception ex)
            {
                _loggerService.LogError(ex, ex.Message);
            }
            return Content(JsonConvert.SerializeObject(_responseData), "application/json");
        }

        //[HttpGet]
        //public async Task<ActionResult> GetbyRoleId(string RoleList)
        //{
        //    var result = "";
        //    return Content(JsonConvert.SerializeObject(result), "application/json");
        //}
        [HttpGet]
        public RoleList GetbyRoleId(int RoleId)
        {
            // string MenuId = RoleId;
            var result = new RoleList();
            try
            {
                RoleList roleInfo = new RoleList();
                roleInfo.RoleId = RoleId;

                List<RoleList> losTypes = _MenuService.GetbyRoleId(roleInfo).Result;
                List<RoleList> menulst = new List<RoleList>();
                RoleList dr = new RoleList();
                dr.LOS_Code_List = new List<string>();
                dr.LOS_Name_List = new List<string>();
                dr.SBU_Code_List = new List<string>();
                dr.SBU_Name_List = new List<string>();
                dr.SBU_Name_List = new List<string>();
                dr.RoleName = "";
                dr.RoleId = 0;
                dr.IsLosTrue = "";
                dr.IsuperAdminTrue = "";
                dr.IsSbUTrue = "";
                dr.Status = "";
                dr.RoleMenuMapping_List = new List<string>();

                foreach (var item in losTypes)
                {
                    dr.LOS_Code_List.Add(Convert.ToString(item.MenuId));
                    dr.LOS_Name_List.Add(Convert.ToString(item.MenuName));
                    dr.SBU_Code_List.Add(Convert.ToString(item.SubMenuId));
                    dr.SBU_Name_List.Add(Convert.ToString(item.SubMenuName));
                    dr.RoleId = item.RoleId;
                    dr.RoleName = item.RoleName;
                    dr.IsLosTrue = Convert.ToString(item.IsLosTrue);
                    dr.IsuperAdminTrue = Convert.ToString(item.IsuperAdminTrue);
                    dr.IsSbUTrue = Convert.ToString(item.IsSbUTrue);
                    dr.Status = Convert.ToString(item.Status);

                    dr.RoleMenuMapping_List.Add(Convert.ToString(item.RoleMenuMappingID));

                    // dr.LOS_Code_List.Add()
                    //  dr.LOS_Code_List =con item.Menu_Id;
                    //dr.LOS_Code_List.Add("string");

                    //string Menucode = Convert.ToString(item.Menu_Id);
                    //LOS_Code_List.Add(Menucode);
                    //dr.LOS_Code_List.Add(Convert.ToString(item.Menu_Id));
                    //dr.LOS_Code_List.Add("v");
                    //dr.LOS_Name_List.Add(item.Menu_Name);
                    //string SubMenuCode = Convert.ToString(item.SubMenu_Id);
                    //dr.SBU_Code_List.Add(SubMenuCode);
                    //dr.SBU_Name_List.Add(item.Submenu_Name);
                    //menulst.Add(dr.LOS_Code_List.Add())
                    //menulst.Add(dr);

                }
                result = dr;
            }
            catch (Exception ex)
            {
                _loggerService.LogError(ex, ex.Message);
            }
            return result;
        }



        [HttpGet]
        public UserList GetbyUserId(int User_ID)
        {
            try
            {
                //RoleList roleInfo = new RoleList();
                UserList userInfo = new UserList();
                //roleInfo.RoleId = RoleId;
                userInfo.User_ID = User_ID;

                //List<RoleList> losTypes = _MenuService.GetbyRoleId(roleInfo).Result;
                List<UserList> losTypes = _MenuService.GetbyUserId(userInfo).Result;


                List<UserList> menudetails = new List<UserList>();
                //List<RoleList> menulst = new List<RoleList>();
                //RoleList dr = new RoleList();
                List<UserList> menulst = new List<UserList>();
                List<UserPermission> menulist = new List<UserPermission>();
                UserList dr = new UserList();
                dr.LOS_Code_List = new List<string>();
                dr.LOS_Name_List = new List<string>();
                dr.SBU_Code_List = new List<string>();
                dr.SBU_Name_List = new List<string>();

                dr.MENU_Code_List = new List<string>();
                dr.MENU_Name_List = new List<string>();
                dr.SUBMENU_Code_List = new List<string>();
                dr.SUBMENU_Name_List = new List<string>();
                dr.Has_Write_Permissions = new List<string>();
                dr.userPermissiondetails = new List<UserPermissiondetails>();
                dr.RoleName = "";
                dr.RoleId = 0;
                dr.Employee_Name = "";
                dr.Employee_Id = "";
                dr.Status = "";


                List<UserList> losType = _MenuService.GetMenubyUserId(userInfo).Result;
                //int count = losTypes.Where(y => y.SubMenu_Id > 0).Count();

                var distinctLos = from c in losTypes
                                  group c by new
                                  {
                                      c.LosId,
                                      c.LosName,
                                      c.SbuLosId,
                                      c.SbuLosName
                                  } into gcs
                                  select new LOSSBUDetails()
                                  {
                                      LosId = gcs.Key.LosId,
                                      LosName = gcs.Key.LosName,
                                      SbuLosId = gcs.Key.SbuLosId,
                                      SbuLosName = gcs.Key.SbuLosName,
                                      List = gcs.FirstOrDefault(),
                                  };
                foreach (var item in distinctLos)
                {
                    dr.LOS_Code_List.Add(item.LosId);
                    dr.LOS_Name_List.Add(item.LosName);
                    dr.SBU_Code_List.Add(item.SbuLosId);
                    dr.SBU_Name_List.Add(item.SbuLosName);
                    dr.RoleId = item.List.RoleId;
                    dr.RoleName = item.List.RoleName;
                    dr.Employee_Id = item.List.Employee_Id;
                    dr.Employee_Name = item.List.EmployeeName;
                    dr.Status_ID = item.List.Status_ID;
                    dr.User_ID = item.List.UserID != null ? Convert.ToInt32(item.List.UserID) : item.List.User_ID;

                }
                foreach (var item in losType)
                {

                    UserPermissiondetails obj = new UserPermissiondetails();
                    obj.menuid = Convert.ToString(item.Menu_Id);
                    //obj.submenuid = Convert.ToString(item.SubMenu_Id);
                    obj.permission = Convert.ToString(item.Has_Write_Permission);
                    //if (item.SubMenu_Id == 0)
                    //{
                    //    obj.listID = "" + item.Menu_Id + "_" + item.Menu_Id + "_" + 0;
                    //}
                    //else
                    //{
                    //    obj.listID = "" + item.Menu_Id + "_" + item.SubMenu_Id;
                    //}

                    dr.MENU_Code_List.Add(Convert.ToString(item.Menu_Id));
                    dr.MENU_Name_List.Add(Convert.ToString(item.Menu_Name));
                    //dr.SUBMENU_Code_List.Add(Convert.ToString(item.SubMenu_Id));
                    //dr.SUBMENU_Name_List.Add(item.Submenu_Name);
                    dr.userPermissiondetails.Add(obj);

                }
                var result = dr;
                return result;
            }
            catch (Exception ex)
            {
                _loggerService.LogError(ex, ex.Message);
            }
            return null;
        }







        public IActionResult Index()
        {
            var resultMasterErrorMsg = _MenuService.GetMasterErrorMessagesByPageId((int)Pages.Menu);
            ViewBag.MasterErrorMsg = resultMasterErrorMsg;
            TempData["MasterErrorMsg"] = JsonConvert.SerializeObject(resultMasterErrorMsg);

            return View();
        }
       
        public IActionResult Roles()
        {
            try
            {
                var resultMasterErrorMsg = _MenuService.GetMasterErrorMessagesByPageId((int)Pages.Roles);
                TempData["MasterErrorMsg"] = JsonConvert.SerializeObject(resultMasterErrorMsg);
            }
            catch (Exception ex)
            {
                _loggerService.LogError(ex, ex.Message);
            }
            return View();
        }
        public IActionResult Users()
        {
            try
            {
                var resultMasterErrorMsg = _MenuService.GetMasterErrorMessagesByPageId((int)Pages.Users);
                TempData["MasterErrorMsg"] = JsonConvert.SerializeObject(resultMasterErrorMsg);
            }
            catch (Exception ex)
            {
                _loggerService.LogError(ex, ex.Message);
            }
            return View();
        }



        //public IActionResult SubMenu()
        //{
        //    SubMenuInfo adminViewModel = new SubMenuInfo();
        //    List<SelectListItem> MENUTypesLists = new List<SelectListItem>();
        //    List<MenuList> losTypes = _MenuService.GetMenuTypes().Result;
        //    foreach (dynamic item in losTypes)
        //    {
        //        MENUTypesLists.Add(new SelectListItem { Value = item.Id.ToString(), Text = item.Name });
        //    }
        //    adminViewModel.MenuList = MENUTypesLists;
        //    return View(adminViewModel);
        //}


        public IActionResult SubMenu()
        {
            //SubMenuInfo adminViewModel = new SubMenuInfo();
            //List<SelectListItem> MENUTypesLists = new List<SelectListItem>();
            //List<MenuList> losTypes = _MenuService.GetMenuTypes().Result;
            //foreach (dynamic item in losTypes)
            //{
            //    MENUTypesLists.Add(new SelectListItem { Value = item.Id.ToString(), Text = item.Name });
            //}
            //adminViewModel.MenuList = MENUTypesLists;
            //return View(adminViewModel);

            try
            {
                var resultMasterErrorMsg = _MenuService.GetMasterErrorMessagesByPageId((int)Pages.SubMenu);
                ViewBag.MasterErrorMsg = resultMasterErrorMsg;
                TempData["MasterErrorMsg"] = JsonConvert.SerializeObject(resultMasterErrorMsg);
            }
            catch (Exception ex)
            {
                _loggerService.LogError(ex, ex.Message);
            }
            return View();
        }

        public List<MenuList> GetMenuList()
        {
            try
            {
                List<MenuList> losTypes = _MenuService.GetMenuTypes().Result;
                List<MenuList> menulst = new List<MenuList>();
                foreach (var item in losTypes)
                {
                    MenuList dr = new MenuList();
                    dr.Id = item.Id;
                    dr.Name = item.Name;

                    menulst.Add(dr);

                }
                var result = menulst.ToList();
                return result;
            }
            catch (Exception ex)
            {
                _loggerService.LogError(ex, ex.Message);
            }
            return null;
        }
        public List<UserDTO> GetRoles()
        {
            try
            {
                List<UserDTO> losTypes = _MenuService.GetRoles().Result;
                List<UserDTO> menulst = new List<UserDTO>();
                foreach (var item in losTypes)
                {
                    UserDTO dr = new UserDTO();
                    dr.Role_ID = item.Role_ID;
                    dr.Role_Description = item.Role_Description;

                    menulst.Add(dr);

                }
                var result = menulst.ToList();
                return result;
            }
            catch (Exception ex)
            {
                _loggerService.LogError(ex, ex.Message);
            }
            return null;
        }

        }
}
