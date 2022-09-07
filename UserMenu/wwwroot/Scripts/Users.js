var user_Id = "";
var emp = "";
var roletypeval = "";
var updatestatus = "";
var role_Id = "";
var role_Menu_Mapping_ID = [];
var role_IdSet = "";
var pageSize = 1;
var order = "";
var sort = "";
var previousSort = "";
var actionBy = "";
var isSuperAdmin = "";
var losCode = "";
var los = "";
var sbuCode = "";
var sbu = "";
var userEditID = "";
var userEditStatus = 0;
var userRoleID = "";
var los_Set_List = [];
var selectPermissionlist = [];
var selectedUser = "";
var selectedUserId = "";

var los_list = [];
var los_Selection_List = [];
var selected_LOS_List = [];
var complete_LOS_List = [];
var losListCount = 0;
var selected_LOS_Code = "";
var selected_LOS_Name = "";


var sbu_list = [];
var sbu_Selection_List = [];
var selected_SBU_List = [];
var complete_SBU_List = [];
var sbuListCount = 0;
var selected_SBU_Code = "";
var selected_SBU_Name = "";
var selectedMenuCount = 0;




var menuCode = "";
var submenuCode = "";
var menuListCount = 0;
var selected_MENU_Code = "";








$(function () {

    $("select.dynamic-option-create-createTag").select2({

        minimumInputLength: 3,
        ajax: {
            url: '/Home/GetAllUsers',
            dataType: 'json',
            data: function (params) {
                return {
                    q: params.term
                };
            },
            processResults: function (data, params) {


                var resData = [];
                data.forEach(function (value) {
                    if (value.fullName.indexOf(params.term) != -1)
                        resData.push(value)
                })
                return {
                    results: $.map(resData, function (item) {
                        return {
                            text: item.name,
                            id: item.id
                        }
                    })
                };
            },
            cache: true
        },
        multiple: true,
    });
    $("#IsStatusTrue").change(function () {
        $('#IsStatusTrue').prop('checked', true);
        $('#IsStatusFalse').prop('checked', false);

    });
    $("#IsStatusFalse").change(function () {
        $('#IsStatusFalse').prop('checked', true);
        $('#IsStatusTrue').prop('checked', false);

    });


    $("#IsLosTrue").change(function () {
        $('#IsLosTrue').prop('checked', true);
        $('#IsLosFalse').prop('checked', false);

    });
    $("#IsLosFalse").change(function () {
        $('#IsLosFalse').prop('checked', true);
        $('#IsLosTrue').prop('checked', false);

    });

    $("#IsSbUTrue").change(function () {
        $('#IsSbUTrue').prop('checked', true);
        $('#IsSbUFalse').prop('checked', false);

    });
    $("#IsSbUFalse").change(function () {
        $('#IsSbUFalse').prop('checked', true);
        $('#IsSbUTrue').prop('checked', false);

    });

    $("#btnadd_Role").click(function () {
        var res = true;

        if (res == true) {
            var user = [];
            var Menu = [];
            var status = "";
            var chkIsStatusTrue = $("input[name='IsStatusTrue']:checked").val();
            if (chkIsStatusTrue == "true") {
                status = 1;

            }
            else {

                status = 0;
            }

            if (!document.getElementById('user_drop').validity.valid) {
                alert('Please Enter Employee Name');
                return;

            }
            if (!document.getElementById('roleDrp').validity.valid) {
                alert('Please select role');
                return;
            }
            if (Losshow == "True") {
                if (selected_LOS_Code == "") {
                    alert("Please Select Los");
                    return;
                }

            }
            if (selected_MENU_Code == "") {
                alert("Please Select Menu");
                return;
            }


            var userJson = {
                EmployeeId: $('#user_drop').val(),
                Role_ID: $('#roleDrp').val(),
                LosId: selected_LOS_Code,
                SubLosId: selected_SBU_Code,
                Status_ID: status,
            }
            user.push(userJson);
            var MenuJson = {
                menuid: selected_MENU_Code,
                submenuid: selected_MENU_Code,
                permission: selected_MENU_Code,

            }
            Menu.push(MenuJson);


            var userMenuPermission = [];

            for (var i = 0; i < menu_list.length; i++) {
                var permissionlist = {
                    menuid: menu_list[i],
                    permission: $('#permission_' + menu_list[i]).val(),
                };
                userMenuPermission.push(permissionlist);
            }


            var PermissionList = JSON.stringify(userMenuPermission);



            var rolelist = JSON.stringify(user);
            var menudata = JSON.stringify(Menu);


            $.ajax({
                url: "../Home/AddUser?UserList=" + rolelist + "&PermissionList=" + PermissionList + "&MenuId=" + menudata,
                type: "GET",
                dataType: "json",


                success: function (data) {
                    $("#add_User").modal('hide');
                    alert(data.Message);


                    updatestatus = "";
                    loadAdminDetails();
                    location.reload();

                },
                error: function (errormessQunatity) {

                    alert("Role has been Successfully Added!");
                    $('#add_User').modal('hide');
                }
            });
        }
    });
    $("#btnUpdate").click(function () {
        var res = true;
        if (res == true) {
            var user = [];
            var Menu = [];
            var status = "";
            var chkIsStatusTrue = $("input[name='IsStatusTrue']:checked").val();

            if (!document.getElementById('roleDrp').validity.valid) {
                alert('Please select role');
                return;
            }
            if (Losshow == "True") {
                if (selected_LOS_Code == "") {
                    alert("Please Select Los");
                    return;
                }

                if (selected_SBU_Code == "") {
                    alert("Please Select Sbu");
                    return;
                }
            }
            if (selected_MENU_Code == "") {
                alert("Please Select Menu");
                return;
            }


            if (chkIsStatusTrue == "true") {
                status = 1;

            }
            else {

                status = 0;
            }
            var userJson = {
                EmployeeId: $('#user_drop').val(),
                Role_ID: $('#roleDrp').val(),
                LosId: selected_LOS_Code,
                SubLosId: selected_SBU_Code,
                Status_ID: status,
                User_ID: user_Id
            }
            var MenuJson = {
                menuid: selected_MENU_Code,
                submenuid: selected_MENU_Code,
                permission: selected_MENU_Code,

            }
            Menu.push(MenuJson);

            var menudata = JSON.stringify(Menu);
            user.push(userJson);

            var userMenuPermission = [];

            for (var i = 0; i < menu_list.length; i++) {
                var permissionlist = {
                    menuid: menu_list[i],
                    permission: $('#permission_' + menu_list[i]).val(),
                };
                userMenuPermission.push(permissionlist);
            }


            var PermissionList = JSON.stringify(userMenuPermission);

            console.log(PermissionList);
            var rolelist = JSON.stringify(user);
            $.ajax({

                url: "../Home/AddUser?UserList=" + rolelist + "&PermissionList=" + PermissionList + "&MenuId=" + menudata,
                type: "GET",
                dataType: "json",

                success: function (data) {

                    $("#add_User").modal('hide');

                    alert(data.Message);


                    updatestatus = "";
                    loadAdminDetails();
                    location.reload();


                },
                error: function (errormessQunatity) {

                    alert("Role has been Successfully Added!");
                    $('#add_User').modal('hide');
                }
            });
        }


    });



    $(document).on('click', '.btnEditAdmin', function (e) {


        $("#add_User").modal('show');


        var grid = $("#adminListingGrid").data("kendoGrid");
        var dataItem = grid.dataItem($(this).closest('tr'));
        var User_ID = dataItem.user_ID;
        role_IdSet = dataItem.role_ID;

        getbyID(User_ID);
        $('#user_editradio_Section').show();
        $('#user_addradio_Section').hide();
    });

    var totalItemCount = 0;
    loadAdminDetails();

    function loadAdminDetails() {
        user_Id = "";
        Losshow = "";
        menustatus = "";
        $('#IsStatusTrue').prop('checked', true);
        $('#IsuperAdminTrue').prop('checked', true);
        $('#IsLosTrue').prop('checked', true);
        $('#IsSbUTrue').prop('checked', true);
        $('#user_editradio_Section').hide();
        $('#user_addradio_Section').show();

        $("#adminListingGrid").kendoGrid({
            width: 1200,
            data: [],
            dataSource: {
                transport: {
                    read: function (options) {
                        Search(options.data.page,
                            options.data.pageSize,
                            options.success);
                    }
                },
                serverPaging: true,
                schema: {
                    total: function () { return totalItemCount; }
                },
                pageSize: 10
            },
            sortable: true,
            resizable: false,
            pageable: {
                pageSize: 10,
                buttonCount: 5
            },
            columns: [
                { hidden: true, field: "user_ID", title: "User_ID", width: "120px", type: "text" },
                { field: "employeeID", title: "EmployeeID", width: "120px", type: "text" },
                { field: "employee_Name", title: "Employee Name", width: "120px", type: "text" },
                { hidden: true, field: "role_ID", title: "User_ID", width: "120px", type: "text" },
                { field: "role_Name", title: "Role Name", width: "120px", type: "text" },
                { field: "statusID", title: "Status", width: "120px", type: "text" },
                { field: "lastModifiedBy", title: "Last Modifie dBy", width: "120px", type: "text" },
                {
                    field: "lastModifiedOn", title: "Last Modified On", width: "120px", type: "date", template: "#= kendo.toString(kendo.parseDate(lastModifiedOn), 'dd/MMM/yyyy  hh:mm tt')#"
                },
                { hidden: true, field: "isActive", title: "IsActive", width: "120px", type: "text" },
                {
                    field: "Actions",
                    title: "Actions",
                    width: "80px",
                    sortable: false,
                    template:
                        "<button type='button'  class='btnIcon' ><i class='fa fa-pencil-square-o fa-6 btnEditAdmin' aria-hidden='true' style='cursor: pointer;' aria-hidden='true' data-toggle='tooltip'  data-placement='top' title='Edit Admin' ></i></button>"

                }
            ]

        }).data("kendoGrid");
    }


    function Search(pageIndex, pageSize, callback) {

        if (!pageIndex) {
            pageIndex = 1;
        }
        if (!pageSize) {
            pageSize = 10;
        }
        $.ajax(
            {
                type: "Get",
                url: "/Home/GetUserListings",
                data: {
                    pageIndex: pageIndex,
                    pageSize: pageSize

                },
                dataType: 'JSON',
                success: function (result) {
                    totalItemCount = result.totalItemCount;
                    if (callback) {
                        callback(result.value);
                    }

                },
                error: function (response) {
                    alert(response.responseText);

                },
                failure: function (response) {
                    alert(response.responseText);


                }
            });
    }
});


function AddUser() {
    $('#add_Title').show();
    $('#update_Title').hide();
    $('#btnAdd').show();
    $('#btnUpdate').hide();
    $('#user_Edit_Section').hide();
    $('#user_Status_Section').hide();
    $('#user_Add_Section').show();
    $('#multiple_LOS_SBU_Selection').show();
    $('#multiple_MENU_SUBMENU_Selection').show();

    $('#multiple_LOS_SBU_Info').hide();
    $('#multiple_LOS_Label').css('color', 'Black');
    $('#multiple_SBU_Label').css('color', 'Black');
    $('#multiple_MENU_Label').css('color', 'Black');

    los_Selection_List = [];
    sbu_Selection_List = [];
    selected_LOS_Code = "";
    selected_SBU_Code = "";
    GetLOSMultiple();
    GetSBUMultiple();
    GetMENUMultiple();
    GetRoles("");
}
$("#btnCancel_Role").click(function () {
    location.reload();
});
$("#btnadd_User").click(function () {

    $("#add_User").modal('show');
    $('#add_Title').show();
    $('#update_Title').hide();
    $('#btnAdd').show();
    $('#btnUpdate').hide();
    $('#user_Edit_Section').hide();
    $('#user_Status_Section').show();
    $('#user_Add_Section').show();
    $('#multiple_LOS_SBU_Selection').show();
    $('#multiple_MENU_SUBMENU_Selection').show();
    $('#multiple_LOS_SBU_Info').hide();
    $('#user_drop').css('border-color', 'lightgrey');
    $('#user_drop_Label').css('color', 'Black');
    $('#roleDrp').css('border-color', 'lightgrey');
    $('#roleLabel').css('color', 'Black');
    $('#multiple_LOS_Label').css('color', 'Black');
    $('#multiple_SBU_Label').css('color', 'Black');

    los_Selection_List = [];
    sbu_Selection_List = [];
    selected_LOS_Code = "";
    selected_SBU_Code = "";
    GetLosList();
    GetMenuList();
    GetSbuList();
    GetSubMenuList();

    /*GetLOSMultiple();*/
    GetUsers();
    GetRoles("");
});

function GetUsers() {
    $('#user_drop').val("");
    $('#user_Add_Section').show();
    var items = [];
    $.ajax({

        url: '/Home/GetAllUsers',
        type: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",

        success: function (result) {

            $.each(result, function (key, item) {
                items[key] = item.name;
            });
            $('#user_drop').autocomplete({
                source: items,
                minLength: 3,
                select: function (event, ui) {
                    var value = ui.item.value;
                    var id = '';
                    for (var i = 0; i < result.length; i++) {
                        if (value == result[i].name) {
                            id = result[i].id;
                            $('#user_drop').val(result[i].name);
                            selectedUser = result[i].fullName;
                            selectedUserId = result[i].id;
                            break;
                        }
                    }
                }
            }
            );

        },
        error: function (errormessQunatity) {
            alert(errormessQunatity.responseText);
        }
    });
    return false;
}

function GetRoles(roleID, role_Description) {

    $.ajax({
        url: '/Home/GetRoles',
        type: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            var html = '<option value= "" selected>Select Role</option>';
            $('#roleDrp').val("").attr("disabled", false);

            $.each(result, function (key, item) {

                if (item.role_ID == roleID) {
                    html += '<option value="' + item.role_ID + '" selected>' + item.role_Description + '</option>';
                    $('#roleDrp').val(roleID).attr("disabled", false);
                }
                else {
                    html += '<option value="' + item.role_ID + '">' + item.role_Description + '</option>';
                    $('#roleDrp').val(roleID).attr("disabled", false);
                }
            });
            $('#roleDrp').html(unescape(escape(html)));
        },
        error: function (errormessQunatity) {
            alert(errormessQunatity.responseText);
        }
    });
    return false;
}

function GetUsers() {

    debugger;
    $('#user_drop').val("");
    $('#user_Add_Section').show();
    var items = [];
    $.ajax({
        url: '/Home/GetLOS',
        type: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        beforeSend: function () {

        },
        success: function (result) {

            los_Set_List = result;


            GetLOSMultiple();
        },
        error: function (errormessQunatity) {
            alert(errormessQunatity.responseText);
        }
    });
    return false;
}

function GetLosList() {
    $.ajax({
        url: '/Home/GetUserLOS',
        type: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            los_Set_List = result;
            GetLOSMultiple();
        },
        error: function (errormessQunatity) {
            alert(errormessQunatity.responseText);
        }
    });
    return false;
}

function GetSbuList() {
    $.ajax({

        url: '/Home/GetUserSBU',
        type: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            los_Set_List = result;
            GetSBUMultiple();
        },
        error: function (errormessQunatity) {
            alert(errormessQunatity.responseText);
        }
    });
    return false;
}


function GetMenuList() {
    $.ajax({

        url: '/Home/GetUserMENUList?RoleId=' + role_IdSet,
        type: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            menu_Set_List = result;
            GetMENUMultiple();
        },
        error: function (errormessQunatity) {
            alert(errormessQunatity.responseText);
        }
    });
    return false;
}

function GetSubMenuList() {
    $.ajax({

        url: '/Home/GetUserSUBMENU',
        type: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            menu_Set_List = result;
            GetSUBMENUMultiple();
        },
        error: function (errormessQunatity) {
            alert(errormessQunatity.responseText);
        }
    });
    return false;
}


function GetLOSMultiple() {

    $('#loaders_1').hide();
    var html = '';
    var dropdown = '';
    var selectedCount = 0;
    los_list = [];
    selected_LOS_List = [];
    complete_LOS_List = [];
    losListCount = los_Set_List.length;

    $.each(los_Set_List, function (key, item) {
        complete_LOS_List.push(item.loS_Code);
        var flag = false
        for (var i = 0; i < los_Selection_List.length; i++) {
            if (item.loS_Code == los_Selection_List[i]) {
                flag = true;
                break;
            }
            if (flag == true) {
                break;
            }
        }
        if (flag == true) {
            dropdown += '<label class="custom_container"><input type="checkbox" class = "checkbox" id="' + item.loS_Code + '" value="' + item.loS_Code + '" onclick="AddList(' + item.loS_Code + ')" checked/>' + item.loS_Name + '<span class="custom_checkmark"></span></label>';
            los_list.push(item.loS_Code);
            selectedCount += 1;
        }
        else {
            dropdown += '<label class="custom_container"><input type="checkbox" class = "checkbox" id="' + item.loS_Code + '" value="' + item.loS_Code + '" onclick="AddList(' + item.loS_Code + ')"/>' + item.loS_Name + '<span class="custom_checkmark"></span></label>';
        }
    });

    if (selectedCount == 0) {
        html += '<span class="anchor" id="selectLOSCount">Select Los</span>';
    }
    else {
        html += '<span class="anchor" id="selectLOSCount">' + selectedCount + ' Los Selected</span>';
    }
    html += '<ul class="items">';
    if (los_Set_List.length == selectedCount) {
        html += '<label class="custom_container"><input type="checkbox" id = "select_all" checked /> Select All<span class="custom_checkmark"></span></label>';
    }
    else {
        html += '<label class="custom_container"><input type="checkbox" id = "select_all"/> Select All<span class="custom_checkmark"></span></label>';
    }
    html += dropdown;
    html += '</ul>';

    $('#list1').html(unescape(escape(html)));

    var checkList = document.getElementById('list1');
    checkList.getElementsByClassName('anchor')[0].onclick = function (evt) {
        if (checkList.classList.contains('visible'))
            checkList.classList.remove('visible');
        else
            checkList.classList.add('visible');
    }

    $('#select_all').on('click', function () {
        if (this.checked) {
            los_list = [];
            $('.checkbox').each(function () {
                this.checked = true;
                los_list.push(parseInt($(this).val()));
            });
            $('#selectLOSCount').html(unescape(escape("All")));
            selected_LOS_Code = los_list.join(',');
            sbu_Selection_List = sbu_list;
            GetSBUMultiple();
        } else {
            $('.checkbox').each(function () {
                this.checked = false;
                los_list = [];
            });
            $('#selectLOSCount').html(unescape(escape("Select Los")));
            selected_LOS_Code = "";
            sbu_Selection_List = sbu_list;
            GetSBUMultiple();
        }
    });

    $('.checkbox').on('click', function () {
        if ($('.checkbox:checked').length == $('.checkbox').length) {
            $('#select_all').prop('checked', true);
        } else {
            $('#select_all').prop('checked', false);
        }
    });
    selected_LOS_List = los_list;

    return false;
}
function GetMENUMultiple() {

    $('#loaders_1').hide();
    var html = '';
    var dropdown = '';
    selectedMenuCount = 0;
    menu_list = [];
    selected_MENU_List = [];
    complete_MENU_List = [];
    menuListCount = menu_Set_List.length;

    $.each(menu_Set_List, function (key, item) {
        complete_MENU_List.push(item.menu_Code);
        if (item.parent_Menu_Code == "0") {
            var flag = false
            var permissionFlag = false;
            for (var i = 0; i < menu_Selection_List.length; i++) {
                if (item.menu_Code == menu_Selection_List[i]) {
                    flag = true;
                    break;
                }
                if (flag == true) {
                    break;
                }
            }
            var selectedPermissionFormenu = 0;
            for (var i = 0; i < selectPermissionlist.length; i++) {
                if (item.menu_Code == selectPermissionlist[i].menuid) {
                    permissionFlag = true;
                    selectedPermissionFormenu = selectPermissionlist[i].permission;
                    break;
                }
                if (permissionFlag == true) {
                    break;
                }
            }
            var losParamName = ("'").concat(item.menu_Name).concat("'");
            if (flag == true) {
                dropdown += '<label class="custom_container" id="parent_' + item.menu_Code + '"><input type="checkbox" class = "menuCheckBox" id="' + item.menu_Code + '" name="' + item.menu_Name + '" value="' + item.menu_Code + '" onclick="AddMenuList(' + item.menu_Code + ',' + losParamName + ')" checked/>' + item.menu_Name + '<span class="custom_checkmark"></span>';
                menu_list.push(item.menu_Code);
                selectedMenuCount += 1;

                dropdown += '<select id="permission_' + item.menu_Code + '" style="height:30px;width:35%;" class="form-control pwc_dropdown_ctrl">';

                if (permissionFlag == true) {
                    if (selectedPermissionFormenu == 0) {
                        dropdown += '<option value="0" selected>Read</option>';
                        dropdown += '<option value="1">Read/Write</option>';
                    }
                    else {
                        dropdown += '<option value="0">Read</option>';
                        dropdown += '<option value="1" selected>Read/Write</option>';
                    }
                }
                else {
                    dropdown += '<option value="0">Read</option>';
                    dropdown += '<option value="1">Read/Write</option>';
                }

                dropdown += '</select>';
                dropdown += BindChildMenu(item.menu_Code, losParamName);
                dropdown += '</label>';
            }
            else {
                dropdown += '<label class="custom_container" id="parent_' + item.menu_Code + '"><input type="checkbox" class = "menuCheckBox" id="' + item.menu_Code + '" name="' + item.menu_Name + '" value="' + item.menu_Code + '" onclick="AddMenuList(' + item.menu_Code + ',' + losParamName + ')"/>' + item.menu_Name + '<span class="custom_checkmark"></span>';

                dropdown += '<select id="permission_' + item.menu_Code + '" style="height:30px;width:35%;" class="form-control pwc_dropdown_ctrl">';
                dropdown += '<option value="0">Read</option>';
                dropdown += '<option value="1">Read/Write</option>';
                dropdown += '</select>';
                dropdown += '</label>';
            }
        }
    });

    if (selectedMenuCount == 0) {
        html += '<span class="anchor" id="selectMENUCount">Select Menu</span>';
    }
    else {
        html += '<span class="anchor" id="selectMENUCount">' + selectedMenuCount + ' Menu Selected</span>';
    }
    html += '<ul class="items">';
    if (menu_Set_List.length == selectedMenuCount) {
        html += '<label class="custom_container"><input type="checkbox" id = "select_all_menu" checked /> Select All<span class="custom_checkmark"></span></label>';
    }
    else {
        html += '<label class="custom_container"><input type="checkbox" id = "select_all_menu"/> Select All<span class="custom_checkmark"></span></label>';
    }
    html += dropdown;
    html += '</ul>';

    $('#list3').html(unescape(escape(html)));

    var checkList = document.getElementById('list3');
    checkList.getElementsByClassName('anchor')[0].onclick = function (evt) {
        if (checkList.classList.contains('visible'))
            checkList.classList.remove('visible');
        else
            checkList.classList.add('visible');
    }

    $('#select_all_menu').on('click', function () {
        if (this.checked) {
            menu_list = [];
            $('.menuCheckBox').each(function () {
                this.checked = true;
                menu_list.push(parseInt($(this).val()));
                SelectAllChildMenu(parseInt($(this).val()), document.getElementById($(this).val()).name);
            });
            $('#selectMENUCount').html(unescape(escape("All")));
            selected_MENU_Code = menu_list.join(',');

        } else {
            $('.menuCheckBox').each(function () {
                this.checked = false;
                menu_list = [];
            });
            $('#selectMENUCount').html(unescape(escape("Select MENU")));
            selected_MENU_Code = "";

        }
    });

    $('.menuCheckBox').on('click', function () {
        if ($('.menuCheckBox:checked').length == $('.menuCheckBox').length) {
            $('#select_all_menu').prop('checked', true);
        } else {
            $('#select_all_menu').prop('checked', false);
        }
    });

    selected_MENU_List = menu_list;

    return false;
}


function GetSBUMultiple() {
    $.ajax({
        url: '/Home/GetUserSBU?losCode=' + selected_LOS_Code,
        type: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        beforeSend: function () {
            $('#loaders_2').show();
        },
        success: function (result) {
            $('#loaders_2').hide();
            var html = '';
            var dropdown = '';
            var selectedCount = 0;
            sbu_list = [];
            selected_SBU_List = [];
            complete_SBU_List = [];
            sbuListCount = result.length;
            currentLOS = "";
            previousLOS = "";
            los_Checked_List = [];
            LOSShown = false;
            var losCount = 0;
            var sbuMappingCount = 0;

            $.each(result, function (key, item) {
                complete_SBU_List.push(item.sbU_Code);
                if (currentLOS != item.loS_Name) {
                    previousLOS = currentLOS;
                    currentLOS = item.loS_Name;
                    LOSShown = true;
                }
                else {
                    LOSShown = false;
                }
                var flag = false
                for (var i = 0; i < sbu_Selection_List.length; i++) {
                    if (item.sbU_Code == sbu_Selection_List[i]) {
                        flag = true;
                        break;
                    }
                    if (flag == true) {
                        break;
                    }
                }
                var trimmedLos = item.loS_Name.split(" ")[0];
                var currentlosName = "'".concat(trimmedLos);
                var losName = currentlosName.concat("'");
                if (LOSShown) {
                    if (losCount == sbuMappingCount && sbuMappingCount != 0) {
                        los_Checked_List.push(previousLOS);
                    }
                    losCount = 1;
                    sbuMappingCount = 0;

                    dropdown += '<label class="custom_container"><input type="checkbox" class = "checkbox losCheckBox ' + item.loS_Code + '" id="' + trimmedLos + '" value="' + item.loS_Code + '" onclick="AddSBUGroupList(' + losName + ')"/>' + currentLOS + '<span class="custom_checkmark"></span></label>';
                }
                else {
                    losCount += 1;
                }
                if (flag == true) {
                    dropdown += '<label class="custom_container">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type="checkbox" class = "checkbox sbuCheckBox losBasedCheckBox ' + trimmedLos + '" id="' + item.sbU_Code + '" value="' + item.sbU_Code + '" onclick="AddSBUList(' + item.sbU_Code + ',' + item.loS_Code + ')" checked/>' + item.sbU_Name + '<span class="custom_checkmark" style="margin-left:20px"></span></label>';
                    sbu_list.push(item.sbU_Code);
                    selectedCount += 1;
                    sbuMappingCount += 1;
                }
                else {
                    dropdown += '<label class="custom_container">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type="checkbox" class = "checkbox sbuCheckBox losBasedCheckBox ' + trimmedLos + '" id="' + item.sbU_Code + '" value="' + item.sbU_Code + '" onclick="AddSBUList(' + item.sbU_Code + ',' + item.loS_Code + ')"/>' + item.sbU_Name + '<span class="custom_checkmark" style="margin-left:20px"></span></label>';
                }
            });

            if (selectedCount == 0) {
                html += '<span class="anchor" id="selectSBUCount">Select Sbu</span>';
            }
            else {
                html += '<span class="anchor" id="selectSBUCount">' + selectedCount + ' - Sbu Selected</span>';
            }
            html += '<ul class="items">';
            if (result.length == selectedCount) {
                html += '<label class="custom_container"><input type="checkbox" id = "select_all_sbu" checked /> Select All<span class="custom_checkmark"></span></label>';
            }
            else {
                html += '<label class="custom_container"><input type="checkbox" id = "select_all_sbu"/> Select All<span class="custom_checkmark"></span></label>';
            }
            html += dropdown;
            html += '</ul>';

            $('#list2').html(unescape(escape(html)));

            for (var i = 0; i < los_Checked_List.length; i++) {

            }

            var checkList = document.getElementById('list2');
            checkList.getElementsByClassName('anchor')[0].onclick = function (evt) {
                if (checkList.classList.contains('visible'))
                    checkList.classList.remove('visible');
                else
                    checkList.classList.add('visible');
            }

            $('#select_all_sbu').on('click', function () {
                if (this.checked) {
                    sbu_list = [];
                    $('.sbuCheckBox').each(function () {
                        this.checked = true;
                        sbu_list.push(parseInt($(this).val()));
                    });
                    $('.losCheckBox').each(function () {
                        this.checked = true;
                    });
                    $('#selectSBUCount').html(unescape(escape("All")));
                    selected_SBU_Code = sbu_list.join(',');
                } else {
                    $('.sbuCheckBox').each(function () {
                        this.checked = false;
                        sbu_list = [];
                    });
                    $('.losCheckBox').each(function () {
                        this.checked = false;
                    });
                    $('#selectSBUCount').html(unescape(escape("Select Sbu")));
                    selected_SBU_Code = sbu_list.join(',');
                }
            });

            $('.sbuCheckBox').on('click', function () {
                if ($('.sbuCheckBox:checked').length == $('.sbuCheckBox').length) {
                    $('#select_all_sbu').prop('checked', true);
                } else {
                    $('#select_all_sbu').prop('checked', false);
                }
            });
            $('.losCheckBox').on('click', function () {
                if ($('.losCheckBox:checked').length == $('.losCheckBox').length) {
                    $('#select_all_sbu').prop('checked', true);
                } else {
                    $('#select_all_sbu').prop('checked', false);
                }
            });
            selected_SBU_List = sbu_list;
        },
        error: function (errormessQunatity) {
            alert(errormessQunatity.responseText);
        }
    });
    return false;
}
function GetSUBMENUMultiple(userpermission) {
    $.ajax({
        
        url: '/Home/GetUserSUBMENU?menuCode=' + selected_MENU_Code + "&RoleId=" + role_IdSet,
        type: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        
        success: function (result) {
 
            var html = '';
            var dropdown = '';
            var selectedCount = 0;
            submenu_list = [];
            selected_SUBMENU_List = [];
            complete_SUBMENU_List = [];
            submenuListCount = result.length;
            currentMENU = "";
            previousMENU = "";
            menu_Checked_List = [];
            MENUShown = false;
            var menuCount = 0;
            var submenuMappingCount = 0;
           

            $.each(result, function (key, item) {
                
                complete_SUBMENU_List.push(item.submenu_Code);
                if (currentMENU != item.menu_Name) {
                    previousMENU = currentMENU;
                    currentMENU = item.menu_Name;
                    MENUShown = true;
                }
                else {
                    MENUShown = false;
                }
                var flag = false;
                var Ishavesubmenu = true;
                if (item.submenu_Code == null) {
                    
                    item.submenu_Code = item.menu_Code + '_0';
                    Ishavesubmenu = false;
                }
                for (var i = 0; i < submenu_Selection_List.length; i++) {
                    if (item.submenu_Code == submenu_Selection_List[i]) {
                        flag = true;
                        break;
                    }
                    if (flag == true) {
                        break;
                    }
                }
                var menuflag = false;
                for (var i = 0; i < menu_Selection_List.length; i++) {
                    if (item.menu_Code == menu_Selection_List[i]) {
                        menuflag = true;
                        break;
                    }
                    if (menuflag == true) {
                        break;
                    }
                }

                var trimmedmenu = item.menu_Name.split(" ")[0];
                var currentmenuName = "'".concat(trimmedmenu);
                var menuName = currentmenuName.concat("'");
                if (MENUShown) {
                    if (menuCount == submenuMappingCount && submenuMappingCount != 0) {
                        menu_Checked_List.push(previousMENU);
                    }
                    menuCount = 1;
                    submenuMappingCount = 0;

                    if (menuflag == true) {

                        dropdown += '<label class="custom_container"><input type="checkbox" class = "checkbox menuCheckBox ' + item.menu_Code + '" id="' + trimmedmenu + '" value="' + item.menu_Code + '" onclick="AddSUBMENUGroupList(' + menuName + ')" checked/>' + currentMENU + '<span class="custom_checkmark"></span></label>';

                    }
                    else {
                        dropdown += '<label class="custom_container"><input type="checkbox" class = "checkbox menuCheckBox ' + item.menu_Code + '" id="' + trimmedmenu + '" value="' + item.menu_Code + '" onclick="AddSUBMENUGroupList(' + menuName + ')"/>' + currentMENU + '<span class="custom_checkmark"></span></label>';
                    }
                }
                else {
                    menuCount += 1;
                }
                if (flag == true) {
                    if (Ishavesubmenu != false) {
                        dropdown += '<label class="custom_container">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type="checkbox" class = "checkbox submenuCheckBox losBasedCheckBox ' + trimmedmenu + '" id="submenu_' + item.submenu_Code + '" value="' + item.submenu_Code + '" onclick="AddSUBMENUList(' + item.submenu_Code + ',' + item.menu_Code + ')" checked/>' + item.submenu_Name + '<span class="custom_checkmark" style="margin-left:20px"></span></label>';
                    }


                    if (userpermission != null) {
                        $.each(userpermission, function (key, lst) {
                            if (item.submenu_Code == (lst.submenuid == 0 ? lst.menuid + '_0' : lst.submenuid) && item.menu_Code == lst.menuid) {
                                if (lst.permission == "1") {
                                    
                                    dropdown += '<input type="radio" id="read_' + item.menu_Code + '_' + item.submenu_Code + '" name="permission_' + item.menu_Code + '_' + item.submenu_Code + '" onclick="Addpermission(' + item.submenu_Code + ',' + item.menu_Code + ',' + 0 + ')" value="CSS"><label>Read<label><input type="radio" checked id="write_' + item.menu_Code + '_' + item.submenu_Code + '" name="permission_' + item.menu_Code + '_' + item.submenu_Code + '" onclick="Addpermission(' + item.submenu_Code + ',' + item.menu_Code + ',' + 1 + ')" value="CSS"><label>Read/Write<label>'

                                }
                                else {
                           
                                    dropdown += '<input type="radio" checked id="read_' + item.menu_Code + '_' + item.submenu_Code + '" name="permission_' + item.menu_Code + '_' + item.submenu_Code + '" onclick="Addpermission(' + item.submenu_Code + ',' + item.menu_Code + ',' + 0 + ')" value="CSS"><label>Read<label><input type="radio" id="write_' + item.menu_Code + '_' + item.submenu_Code + '" name="permission_' + item.menu_Code + '_' + item.submenu_Code + '" onclick="Addpermission(' + item.submenu_Code + ',' + item.menu_Code + ',' + 1 + ')" value="CSS"><label>Read/Write<label>'

                                }
                            }
                        });
                    }
                    else {
                        
                        dropdown += '<input type="radio"  id="read_' + item.menu_Code + '_' + item.submenu_Code + '" name="permission_' + item.menu_Code + '_' + item.submenu_Code + '" onclick="Addpermission(' + item.submenu_Code + ',' + item.menu_Code + ',' + 0 + ')" value="CSS"><label>Read<label><input type="radio" id="write_' + item.menu_Code + '_' + item.submenu_Code + '" name="permission_' + item.menu_Code + '_' + item.submenu_Code + '" onclick="Addpermission(' + item.submenu_Code + ',' + item.menu_Code + ',' + 1 + ')" value="CSS"><label>Read/Write<label>'
                    }
                    submenu_list.push(item.submenu_Code);
                    selectedCount += 1;
                    submenuMappingCount += 1;

                }
                else {
                    var checkboxisShown = false;
                    if (Ishavesubmenu != false) {
                       
                        dropdown += '<label class="custom_container">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type="checkbox" class = "checkbox submenuCheckBox losBasedCheckBox ' + trimmedmenu + '" id="submenu_' + item.submenu_Code + '" value="' + item.submenu_Code + '" onclick="AddSUBMENUList(' + item.submenu_Code + ',' + item.menu_Code + ')"/>' + item.submenu_Name + '<span class="custom_checkmark" style="margin-left:20px"></span></label>';
                    }
                    if (userpermission != null && menuflag == true) {
                        $.each(userpermission, function (key, lst) {
                            if (item.submenu_Code == (lst.submenuid == 0 ? lst.menuid + '_0' : lst.submenuid) && item.menu_Code == lst.menuid) {
                                if (lst.permission == "1") {

                                    dropdown += '<input type="radio" id="read_' + item.menu_Code + '_' + item.submenu_Code + '" name="permission_' + item.menu_Code + '_' + item.submenu_Code + '" onclick="Addpermission(' + item.submenu_Code + ',' + item.menu_Code + ',' + Ishavesubmenu + ')" value="CSS"><label>Read<label><input type="radio" checked id="write_' + item.menu_Code + '_' + item.submenu_Code + '" name="permission_' + item.menu_Code + '_' + item.submenu_Code + '" onclick="Addpermission(' + item.submenu_Code + ',' + item.menu_Code + ',' + Ishavesubmenu + ')" value="CSS"><label>Read/Write<label>'
                                    checkboxisShown = true;
                                }
                                else {

                                    dropdown += '<input type="radio" checked id="read_' + item.menu_Code + '_' + item.submenu_Code + '" name="permission_' + item.menu_Code + '_' + item.submenu_Code + '" onclick="Addpermission(' + item.submenu_Code + ',' + item.menu_Code + ',' + Ishavesubmenu + ')" value="CSS"><label>Read<label><input type="radio" id="write_' + item.menu_Code + '_' + item.submenu_Code + '" name="permission_' + item.menu_Code + '_' + item.submenu_Code + '" onclick="Addpermission(' + item.submenu_Code + ',' + item.menu_Code + ',' + Ishavesubmenu + ')" value="CSS"><label>Read/Write<label>'
                                    checkboxisShown = true;
                                }
                            }


                        });
                        if (checkboxisShown == false) {
                            dropdown += '<input type="radio" id="read_' + item.menu_Code + '_' + item.submenu_Code + '" name="permission_' + item.menu_Code + '_' + item.submenu_Code + '" onclick="Addpermission(' + item.submenu_Code + ',' + item.menu_Code + ',' + Ishavesubmenu + ')" value="CSS"><label>Read<label><input type="radio" id="write_' + item.menu_Code + '_' + item.submenu_Code + '" name="permission_' + item.menu_Code + '_' + item.submenu_Code + '" onclick="Addpermission(' + item.submenu_Code + ',' + item.menu_Code + ',' + Ishavesubmenu + ')" value="CSS"><label>Read/Write<label>'
                        }
                    }
                    else {
                       
                        dropdown += '<input type="radio"  id="read_' + item.menu_Code + '_' + item.submenu_Code + '" name="permission_' + item.menu_Code + '_' + item.submenu_Code + '" onclick="Addpermission(' + item.submenu_Code + ',' + item.menu_Code + ',' + Ishavesubmenu + ')" value="CSS"><label>Read<label><input type="radio" id="write_' + item.menu_Code + '_' + item.submenu_Code + '" name="permission_' + item.menu_Code + '_' + item.submenu_Code + '" onclick="Addpermission(' + item.submenu_Code + ',' + item.menu_Code + ',' + Ishavesubmenu + ')" value="CSS"><label>Read/Write<label>'
                    }
                    
                }

            });
            
            if (selectedCount == 0) {
                html += '<span class="anchor" id="selectSUBMENUCount">Select SubMenu</span>';
            }
            else {
                html += '<span class="anchor" id="selectSUBMENUCount">' + selectedCount + ' - submenu Selected</span>';
            }
            html += '<ul class="items">';
            if (result.length == selectedCount) {
                html += '<label class="custom_container"><input type="checkbox" id = "select_all_submenu" checked /> Select All<span class="custom_checkmark"></span></label>';
            }
            else {
                html += '<label class="custom_container"><input type="checkbox" id = "select_all_submenu"/> Select All<span class="custom_checkmark"></span></label>';
            }
            html += dropdown;
            html += '</ul>';

            $('#list4').html(unescape(escape(html)));

            for (var i = 0; i < menu_Checked_List.length; i++) {
                
            }

            var checkList = document.getElementById('list4');
            checkList.getElementsByClassName('anchor')[0].onclick = function (evt) {
                if (checkList.classList.contains('visible'))
                    checkList.classList.remove('visible');
                else
                    checkList.classList.add('visible');
            }

            $('#select_all_submenu').on('click', function () {
                if (this.checked) {
                    submenu_list = [];
                    $('.submenuCheckBox').each(function () {
                        this.checked = true;
                        submenu_list.push(parseInt($(this).val()));
                    });
                    $('.menuCheckBox').each(function () {
                        this.checked = true;
                    });
                    $('#selectSUBMENUCount').html(unescape(escape("All")));
                    selected_SUBMENU_Code = submenu_list.join(',');
                } else {
                    $('.submenuCheckBox').each(function () {
                        this.checked = false;
                        submenu_list = [];
                    });
                    $('.menuCheckBox').each(function () {
                        this.checked = false;
                    });
                    $('#selectSUBMENUCount').html(unescape(escape("Select Sub Menu")));
                    selected_SUBMENU_Code = submenu_list.join(',');
                }
            });

            $('.submenuCheckBox').on('click', function () {
                if ($('.submenuCheckBox:checked').length == $('.submenuCheckBox').length) {
                    $('#select_all_submenu').prop('checked', true);
                } else {
                    $('#select_all_submenu').prop('checked', false);
                }
            });
            $('.menuCheckBox').on('click', function () {
                if ($('.menuCheckBox:checked').length == $('.menuCheckBox').length) {
                    $('#select_all_submenu').prop('checked', true);
                } else {
                    $('#select_all_submenu').prop('checked', false);
                }
            });
            selected_SUBMENU_List = submenu_list;
            
        },
        error: function (errormessQunatity) {
            alert(errormessQunatity.responseText);
        }
    });
    return false;
}
