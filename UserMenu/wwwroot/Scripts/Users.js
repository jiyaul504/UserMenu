var user_Id = "";
var menuchk = [];
var menustatus = "";
var permission = [];
var Losshow = "";
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
var form = $('#__AjaxAntiForgeryForm');
var token = $('input[name="__RequestVerificationToken"]', form).val();



//menu& submenu
var menuCode = "";
var menu = "";
var submenuCode = "";
var submenu = "";
var menu_Set_List = [];
var menu_list = [];
var menu_Selection_List = [];
var selected_MENU_List = [];
var complete_MENU_List = [];
var menuListCount = 0;
var selected_MENU_Code = "";
var selected_MENU_Name = "";
var submenu_list = [];
var submenu_Selection_List = [];
var selected_SUBMENU_List = [];
var complete_SUBMENU_List = [];
var submenuListCount = 0;
var selected_SUBMENU_Code = "";
var selected_SUBMENU_Name = "";





$(function () {

  

    $("select.dynamic-option-create-createTag").select2({
        // tags: true,
       
        minimumInputLength: 3,
        ajax: {
            url: '/Home/GetAllUsers',
            dataType: 'json',
            data: function (params) {
                return {
                    q: params.term // search term
                };
            },
            processResults: function (data, params) {
                // parse the results into the format expected by Select2
                // since we are using custom formatting functions we do not need to
                // alter the remote JSON data, except to indicate that infinite
                // scrolling can be used
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

    $("#IsuperAdminTrue").change(function () {
        $('#IsuperAdminTrue').prop('checked', true);
        $('#IsuperAdminFalse').prop('checked', false);

    });
    $("#IsuperAdminFalse").change(function () {
        $('#IsuperAdminFalse').prop('checked', true);
        $('#IsuperAdminTrue').prop('checked', false);

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

                //if (selected_SBU_Code == "") {
                //    alert("Please Select c Los");
                //    return;
                //}
            }
            if (selected_MENU_Code == "") {
                alert("Please Select Menu");
                return;
            }

            //if (selected_SUBMENU_Code == "") {
            //    alert("Please Select Sub Menu");
            //    return;
            //}
            //alert(selected_MENU_Code);
            var userJson = {
                EmployeeId : $('#user_drop').val(),
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
           // var stringsplit = selected_MENU_Code.split(',');

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
            
            //}
            //  status = 1;
            //  var data = new FormData();
            //  data.append('users', JSON.stringify(user));
            //  //data.append('losCode', selected_LOS_Code);
            //  //data.append('sbuCode', selected_SBU_Code);
            //data.append('__RequestVerificationToken', token);
            $.ajax({
                url: "../Home/AddUser?UserList=" + rolelist + "&PermissionList=" + PermissionList + "&MenuId=" + menudata,
                type: "GET",
                dataType: "json",
                //data: { RoleList: rolelist },

                success: function (data) {
                    $("#add_User").modal('hide');
                    alert(data.Message);
                    //if (data == 0) {
                    //    alert("User Name is alreay exists! ");
                    //}
                    ////  $("#adminSuccessModal").modal("show");
                  
                    //else {
                    //    alert("User Added successfully! ");
                    //}

                    updatestatus = "";
                    loadAdminDetails();
                    location.reload();
                    //$('#loaders').hide();
                    //$('#add_User').modal('hide');
                    //$('#add_success').modal('show');
                    //$('#success_msg').html(unescape(escape("User has been Successfully Added!!")));
                    //alert("Role has been Successfully Added!");

                },
                error: function (errormessQunatity) {
                    // alert(errormessQunatity.responseText);
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

                 //if (selected_SUBMENU_Code == "") {
                 //    alert("Please Select Sub Menu");
                 //    return;
                 //}
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
                   // url: "../Home/AddUser?UserList=" + rolelist + "&PermissionList=" + PermissionList,
                    url: "../Home/AddUser?UserList=" + rolelist + "&PermissionList=" + PermissionList + "&MenuId=" + menudata,
                    type: "GET",
                    dataType: "json",
                    //data: { RoleList: rolelist },

                    success: function (data) {
                       
                        $("#add_User").modal('hide');

                        alert(data.Message);

                        //if (data == 0) {
                        //    alert("Role Name is alreay exists! ");
                        //}
                        ////  $("#adminSuccessModal").modal("show");
                        //else if (updatestatus != "") {
                        //    alert("User Updated successfully! ");
                        //}
                        //else {
                        //    alert("User Added successfully! ");
                        //}

                        updatestatus = "";
                        loadAdminDetails();
                        location.reload();
                        //$('#loaders').hide();
                        //$('#add_User').modal('hide');
                        //$('#add_success').modal('show');
                        //$('#success_msg').html(unescape(escape("User has been Successfully Added!!")));
                        //alert("Role has been Successfully Added!");

                    },
                    error: function (errormessQunatity) {
                        // alert(errormessQunatity.responseText);
                        alert("Role has been Successfully Added!");
                        $('#add_User').modal('hide');
                    }
                });
            }
       
       
    });



    $(document).on('click', '.btnEditAdmin', function (e) {
        
        
        $("#add_User").modal('show');
        //$('#add_Title').hide();
        //$('#update_Title').show();
        //$('#btnAdd').show();
        //$('#btnUpdate').hide();
        //$('#user_Edit_Section').hide();
        //$('#user_Status_Section').hide();
        //$('#user_Add_Section').show();
        //$('#multiple_LOS_SBU_Selection').show();
        //$('#multiple_LOS_SBU_Info').hide();
       
        var grid = $("#adminListingGrid").data("kendoGrid");
        var dataItem = grid.dataItem($(this).closest('tr'));
        var User_ID = dataItem.user_ID;
        role_IdSet = dataItem.role_ID;

        getbyID(User_ID);
        $('#user_editradio_Section').show();
        $('#user_addradio_Section').hide();
    });

    function getbyID(User_ID) {
        $.ajax({
           // url: '/Home/GetbyRoleId?RoleId=' + Role_ID,
            url: '/Home/GetbyUserId?User_ID=' + User_ID,
            type: "GET",
            contentType: "application/json;charset=UTF-8",
            dataType: "json",
            success: function (result) {
                $('#add_User').modal('show');
                $('#add_Title').hide();
                $('#update_Title').show();
                $('#btnAdd').hide();
                $('#btnadd_Role').hide();
                $('#btnUpdate').show();
                $('#user_Add_Section').hide();
                $('#user_Edit_Section').show();
                $('#user_Status_Section').show();
                $('#EditUser_Name').val(result.employee_Name);
                $('#EditUser_Role').val(result.roleName);

                GetRoles(result.roleId, result.roleName);

                //$('#user_drop').css('border-color', 'lightgrey');
                //$('#user_drop_Label').css('color', 'Black');

                //$('#roleDrp').css('border-color', 'lightgrey');
                //$('#roleLabel').css('color', 'Black');

              

                $('#multiple_LOS_Label').css('color', 'Black');

                $('#multiple_SBU_Label').css('color', 'Black');

                $('#multiple_MENU_Label').css('color', 'Black');

                $('#multiple_SUMENU_Label').css('color', 'Black');

                if (result.status_ID==1 ) {
                    $('#IsStatusTrue').prop('checked', true);
                    $('#IsStatusFalse').prop('checked', false);
                    
                }
                else {
                    $('#IsStatusFalse').prop('checked', true);
                    $('#IsStatusTrue').prop('checked', false);
                }
                role_Id = result.roleId;
                role_IdSet = result.roleId;
                user_Id = result.user_ID;
               
               // role_Menu_Mapping_ID = JSON.stringify(result.roleMenuMapping_List);
                //$('#txtRole').val(result.roleName);
               
                if (result.loS_Code_List != 0) {
                    Losshow = "True";
                    $('#Los').val(result.los);
                    $('#sbu').val(result.sbu);
                    $('#Los').attr('disabled', true);
                    $('#sbu').attr('disabled', true);
                    $('#multiple_LOS_SBU_Selection').show();
                   
                    $('#multiple_LOS_SBU_Info').hide();


                    los_Selection_List = result.loS_Code_List;
                    sbu_Selection_List = result.sbU_Code_List;
                    selected_LOS_Code = result.loS_Code_List.join(',');
                    selected_SBU_Code = result.sbU_Code_List.join(',');
                    console.log(selected_LOS_Code);
                    GetLosList();
                    GetSBUMultiple();
                }
                else {
                    $('#multiple_LOS_SBU_Selection').hide();
                    $('#multiple_LOS_SBU_Info').hide();
                   
                }
                $('#multiple_MENU_SUBMENU_Selection').show();
                menu_Selection_List = result.menU_Code_List;
                //submenu_Selection_List = result.submenU_Code_List;
                selected_MENU_Code = result.menU_Code_List.join(',');
                //selected_SUBMENU_Code = result.submenU_Code_List.join(',');
                selectPermissionlist = result.userPermissiondetails;
                permission = selectPermissionlist;
                GetMenuList();
                //GetSUBMENUMultiple(selectPermissionlist);

                menuchk = result.userPermissiondetails;
               // PermissionCheck(result.userPermissiondetails);
              
                //if (Losshow = "True") {
                //    $('#multiple_LOS_SBU_Selection').show();
                //}
                //else
                
                //$('input[name=user_drop]').prop('disabled', true);
                //$('input[name=roleDrp]').prop('disabled', true);
                //$("#roleDrp").prop("disabled", true);
                //$('#roleDrp').attr('disabled', true);

             
            }
        });
        //$("#roleDrp").prop("disabled", true);
        //$('#roleDrp').attr('disabled', true);
        //$('#roleDrp').css('border-color', 'lightgrey');
        //$('#roleLabel').css('color', 'Black');
    }

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
                //"<button type='button' class='btnIcon'><i class='fa fa-ban btnInActiveAdmin' aria-hidden='true' style='cursor: pointer;' aria-hidden='true' data-toggle='tooltip' data-placement='top' title='InActive Admin'></i></button>&nbsp;" 
            }
        ]

    }).data("kendoGrid");
    }
    
    //function Pflog() {

    //    $('#add_User').modal('show');
    //    alert();
    //}

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

function validate(title) {
    var isValid = true;
        if (selected_LOS_Code != "" && selected_LOS_Code != null) {
            $('#multiple_LOS_Label').css('color', 'Black');
        }
        else {
            $('#multiple_LOS_Label').css('color', 'Red');
            isValid = false;
        }
        if (selected_SBU_Code != "" && selected_SBU_Code != null) {
            $('#multiple_SBU_Label').css('color', 'Black');
        }
        else {
            $('#multiple_SBU_Label').css('color', 'Red');
            isValid = false;
        }
   
    return isValid;
}
function Add() {

    var res = true;

    if (res == true) {
        var user = [];
        var status = "";
        var chkIsStatusTrue = $("input[name='IsStatusTrue']:checked").val();
        if (chkIsStatusTrue == "true") {
            status = 1;

        }
        else {

            status = 0;
        }
        var IsuperAdminTrue = "";
        var chkIsuperAdminTrue = $("input[name='IsuperAdminTrue']:checked").val();
        if (chkIsuperAdminTrue == "true") {
            IsuperAdminTrue = 1;

        }
        else {

            IsuperAdminTrue = 0;
        }
        var IsLosTrue = "";
        var chkIsLosTrue = $("input[name='IsLosTrue']:checked").val();
        if (chkIsLosTrue == "true") {
            IsLosTrue = 1;

        }
        else {

            IsLosTrue = 0;
        }
        var IsSbUTrue = "";
        var chkIsSbUTrue = $("input[name='IsSbUTrue']:checked").val();
        if (chkIsSbUTrue == "true") {
            IsSbUTrue = 1;
        }
        else {

            IsSbUTrue = 0;
        }




        var RoleName = $('#txtRole').val().trim();
        var userJson = {
            RoleName: RoleName,
            MenuId: selected_LOS_Code,
            SubMenuId: selected_SBU_Code,
            Status: status,
            IsuperAdminTrue: IsuperAdminTrue,
            IsLosTrue: IsLosTrue,
            IsSbUTrue: IsSbUTrue

        }
        user.push(userJson);
        var rolelist = JSON.stringify(user);
        //}
      //  status = 1;
      //  var data = new FormData();
      //  data.append('users', JSON.stringify(user));
      //  //data.append('losCode', selected_LOS_Code);
      //  //data.append('sbuCode', selected_SBU_Code);
      //data.append('__RequestVerificationToken', token);
        $.ajax({
            url: "../Home/AddRole?RoleList=" + rolelist,
            type: "GET",
            dataType: "json",
            //data: { RoleList: rolelist },

            success: function (data) {
                if (data == 0) {
                    alert("Menu Name is alreay exists! ");
                }
                //  $("#adminSuccessModal").modal("show");
                else if (updatestatus != "") {
                    alert("Menu Updated successfully! ");
                }
                else {
                    alert("Menu Added successfully! ");
                }

                updatestatus = "";
                loadAdminDetails();
                //$('#loaders').hide();
                //$('#add_User').modal('hide');
                //$('#add_success').modal('show');
                //$('#success_msg').html(unescape(escape("User has been Successfully Added!!")));
                alert("Role has been Successfully Added!");
                
            },
            error: function (errormessQunatity) {
               // alert(errormessQunatity.responseText);
                alert("Role has been Successfully Added!");
                 $('#add_User').modal('hide');
            }
        });
    }
}


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


    //$('#user_drop').css('border-color', 'lightgrey');
    //$('#user_drop_Label').css('color', 'Black');

    //$('#roleDrp').css('border-color', 'lightgrey');
    //$('#roleLabel').css('color', 'Black');

    $('#multiple_LOS_Label').css('color', 'Black');

    $('#multiple_SBU_Label').css('color', 'Black');

    los_Selection_List = [];
    sbu_Selection_List = [];
    selected_LOS_Code = "";
    selected_SBU_Code = "";
    GetLOSMultiple();
  // GetUsers();
    GetSBUMultiple();
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
   // GetMenuList();
    GetLOSMultiple();
  //  GetMENUMultiple();
    GetUsers();
   // GetSUBMENUMultiple();
     GetRoles("");
});

function GetUsers() {
    $('#user_drop').val("");
    $('#user_Add_Section').show();
    var items = [];
    $.ajax({
        // url: '/User/GetAllUsers?UserId=' + actionBy + '&UserRoleId=' + userRoleID,
        url: '/Home/GetAllUsers',
        type: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        //beforeSend: function () {
        //    $('#loaders').show();
        //},
        success: function (result) {
            //$('#loaders').hide();
            //  los_Set_List = result.losList;
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
            // GetLOSMultiple();
        },
        error: function (errormessQunatity) {
            alert(errormessQunatity.responseText);
        }
    });
    return false;
}
function AddUsersed() {
   
    $('#add_Title').show();
    $('#update_Title').hide();
    $('#btnAdd').show();
    $('#btnUpdate').hide();
    $('#user_Edit_Section').hide();
    $('#user_Status_Section').hide();
    $('#user_Add_Section').show();
    $('#multiple_LOS_SBU_Selection').show();
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
    GetLOSMultiple();
    GetUsers();
    GetSBUMultiple();
    //GetRoles("");
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
                //if (isSuperAdmin == "Yes" && roleID != 7 && roleID != 11 && roleID != 12 && roleID != "") {
                //    html += '<option value="' + roleID + '" selected>' + role_Description + '</option>';
                //    $('#roleDrp').val(roleID).attr("disabled", true);
                //}

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
           // $('#loaders').show();
        },
        success: function (result) {
           // $('#loaders').hide();
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

function GetLOSMultiple() {
    //$.ajax({
    //    url: '/User/GetLOS',
    //    type: "GET",
    //    contentType: "application/json;charset=UTF-8",
    //    dataType: "json",
    //    beforeSend: function () {
    //        $('#loaders_1').show();
    //    },
    //success: function (result) {
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
    //},
    //error: function (errormessQunatity) {
    //    alert(errormessQunatity.responseText);
    //}
    //});
    return false;
}
function GetMENUMultiple() {
    //$.ajax({
    //    url: '/User/GetLOS',
    //    type: "GET",
    //    contentType: "application/json;charset=UTF-8",
    //    dataType: "json",
    //    beforeSend: function () {
    //        $('#loaders_1').show();
    //    },
    //success: function (result) {
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
                //dropdown += '<label><input type="radio" checked id="read_' + item.menu_Code + '" name="permission_' + item.menu_Code + '" onclick="Addpermission(' + item.submenu_Code + ',' + item.menu_Code + ',' + 0 + ')" value="CSS">Read</label><label><input type="radio" id="write_' + item.menu_Code + '" name="permission_' + item.menu_Code + '" onclick="Addpermission(' + item.submenu_Code + ',' + item.menu_Code + ',' + 1 + ')" value="CSS">Read/Write</label>'
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
                //dropdown += '<label><input type="radio" checked id="read_' + item.menu_Code + '" name="permission_' + item.menu_Code + '" onclick="Addpermission(' + item.submenu_Code + ',' + item.menu_Code + ',' + 0 + ')" value="CSS">Read</label><label><input type="radio" id="write_' + item.menu_Code + '" name="permission_' + item.menu_Code + '" onclick="Addpermission(' + item.submenu_Code + ',' + item.menu_Code + ',' + 1 + ')" value="CSS">Read/Write</label>'
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
            //submenu_Selection_List = submenu_list;
           // GetSBUMultiple(); v
        } else {
            $('.menuCheckBox').each(function () {
                this.checked = false;
                menu_list = [];
            });
            $('#selectMENUCount').html(unescape(escape("Select MENU")));
            selected_MENU_Code = "";
            //submenu_Selection_List = submenu_list;
           // GetSBUMultiple(); v
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
    //},
    //error: function (errormessQunatity) {
    //    alert(errormessQunatity.responseText);
    //}
    //});
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
            html += '<ul class="items" style="height: 170px; overflow-y: scroll;">';
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
                //$('#' + los_Checked_List[i]).prop(unescape(escape('Checked', true)));
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
        //url: '/Home/GetUserSUBMENU?menuCode=' + selected_MENU_Code,
        url: '/Home/GetUserSUBMENU?menuCode=' + selected_MENU_Code+ "&RoleId=" + role_IdSet,
        type: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        //beforeSend: function () {
        //    $('#loaders_2').show();
        //},
        success: function (result) {
            //  $('#loaders_2').hide();
            
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
           // var Ishavingsubmenu = 0;

            $.each(result, function (key, item) {
                //if (Menuid == item.menu_Code) {
                //    Ishavingsubmenu = 1;
                //}
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
                   // item.submenu_Code = item.menu_Code + '_' + item.submenu_Code;
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

                    if (menuflag == true ) {

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
                                    //if (item.submenu_Code == null) {
                                    //    item.submenu_Code = 0;
                                    //}
                                    dropdown += '<input type="radio" id="read_' + item.menu_Code + '_' + item.submenu_Code + '" name="permission_' + item.menu_Code + '_' + item.submenu_Code + '" onclick="Addpermission(' + item.submenu_Code + ',' + item.menu_Code + ',' + 0 + ')" value="CSS"><label>Read<label><input type="radio" checked id="write_' + item.menu_Code + '_' + item.submenu_Code + '" name="permission_' + item.menu_Code + '_' + item.submenu_Code + '" onclick="Addpermission(' + item.submenu_Code + ',' + item.menu_Code + ',' + 1 + ')" value="CSS"><label>Read/Write<label>'

                                }
                                else {
                                    //if (item.submenu_Code == null) {
                                    //    item.submenu_Code = 0;
                                    //}
                                    dropdown += '<input type="radio" checked id="read_' + item.menu_Code + '_' + item.submenu_Code + '" name="permission_' + item.menu_Code + '_' + item.submenu_Code + '" onclick="Addpermission(' + item.submenu_Code + ',' + item.menu_Code + ',' + 0 + ')" value="CSS"><label>Read<label><input type="radio" id="write_' + item.menu_Code + '_' + item.submenu_Code + '" name="permission_' + item.menu_Code + '_' + item.submenu_Code + '" onclick="Addpermission(' + item.submenu_Code + ',' + item.menu_Code + ',' + 1 + ')" value="CSS"><label>Read/Write<label>'

                                }
                            }
                        });
                    }
                    else {
                        //if (item.submenu_Code == null) {
                        //    item.submenu_Code = 0;
                        //}
                        dropdown += '<input type="radio"  id="read_' + item.menu_Code + '_' + item.submenu_Code + '" name="permission_' + item.menu_Code + '_' + item.submenu_Code + '" onclick="Addpermission(' + item.submenu_Code + ',' + item.menu_Code + ',' + 0 + ')" value="CSS"><label>Read<label><input type="radio" id="write_' + item.menu_Code + '_' + item.submenu_Code + '" name="permission_' + item.menu_Code + '_' + item.submenu_Code + '" onclick="Addpermission(' + item.submenu_Code + ',' + item.menu_Code + ',' + 1 + ')" value="CSS"><label>Read/Write<label>'
                    }
                    submenu_list.push(item.submenu_Code);
                    selectedCount += 1;
                    submenuMappingCount += 1;

                }
                else {
                    var checkboxisShown = false;
                    if (Ishavesubmenu != false) {
                   //if (menuflag == false) {
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
                        //if (item.submenu_Code == null) {
                        //    item.submenu_Code = 0;
                        //}
                        dropdown += '<input type="radio"  id="read_' + item.menu_Code + '_' + item.submenu_Code + '" name="permission_' + item.menu_Code + '_' + item.submenu_Code + '" onclick="Addpermission(' + item.submenu_Code + ',' + item.menu_Code + ',' + Ishavesubmenu + ')" value="CSS"><label>Read<label><input type="radio" id="write_' + item.menu_Code + '_' + item.submenu_Code + '" name="permission_' + item.menu_Code + '_' + item.submenu_Code + '" onclick="Addpermission(' + item.submenu_Code + ',' + item.menu_Code + ',' + Ishavesubmenu + ')" value="CSS"><label>Read/Write<label>'
                    }
                    //if (item.submenu_Code == null) {
                    //    item.submenu_Code = 0;
                    //}
                    //dropdown += '<input type="radio" id="read_' + item.menu_Code + '_' + item.submenu_Code + '" name="permission_' + item.menu_Code + '_' + item.submenu_Code + '" onclick="Addpermission(' + item.submenu_Code + ',' + item.menu_Code + ',' + Ishavesubmenu + ')" value="CSS"><label>Read<label><input type="radio" id="write_' + item.menu_Code + '_' + item.submenu_Code + '" name="permission_' + item.menu_Code + '_' + item.submenu_Code + '" onclick="Addpermission(' + item.submenu_Code + ',' + item.menu_Code + ',' + Ishavesubmenu + ')" value="CSS"><label>Read/Write<label>'
                }
               
            });
            //if (Ishavingsubmenu == 0 && Isfrommenu==1) {
            //    var permissionlist = {
            //        menuid: Menuid,
            //        submenuid: 0,
            //        permission: 1,
            //    };

            //    permission.push(permissionlist);
            //}
            if (selectedCount == 0) {
                html += '<span class="anchor" id="selectSUBMENUCount">Select sub menu</span>';
            }
            else {
                html += '<span class="anchor" id="selectSUBMENUCount">' + selectedCount + ' - submenu Selected</span>';
            }
            html += '<ul class="items" style="height: 170px;width: 400px; overflow-y: scroll;">';
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
                //$('#' + los_Checked_List[i]).prop(unescape(escape('Checked', true)));
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
           // PermissionCheck(item.userPermissiondetails);
        },
        error: function (errormessQunatity) {
            alert(errormessQunatity.responseText);
        }
    });
    return false;
}







function AddSBUGroupList(Id) {
   
    if ($('#' + Id).is(':checked')) {
        $('.' + Id).each(function () {
            if (!$(this).is(':checked')) {
                this.checked = true;
                sbu_list.push(parseInt($(this).val()));
            }
        });
    }
    else {
        $('.' + Id).prop('checked', false);
        var values = document.getElementsByClassName('' + Id + '');
        for (var i = 0; i < values.length; i++) {
            var idValue = values[i].id;
            sbu_list = $.grep(sbu_list, function (value) {
                return value != idValue;
            });
        }
    }

    if (sbu_list.length == sbuListCount) {
        $('#selectSBUCount').html(unescape(escape("All")));
    }
    else if (sbu_list.length == 0) {
        $('#selectSBUCount').html(unescape(escape("Select Sbu")));
    }
    else {
        $('#selectSBUCount').html(unescape(escape(sbu_list.length + " - Sbu Selected")));
    }

    selected_SBU_Code = sbu_list.join(',');
    
}

function AddSUBMENUGroupList(Id) {

    if ($('#' + Id).is(':checked')) {
        $('.' + Id).each(function () {
            if (!$(this).is(':checked')) {
                this.checked = true;
                submenu_list.push(parseInt($(this).val()));
            }
        });
    }
    else {
        $('.' + Id).prop('checked', false);
        var values = document.getElementsByClassName('' + Id + '');
        for (var i = 0; i < values.length; i++) {
            var idValue = values[i].id;
            submenu_list = $.grep(submenu_list, function (value) {
                return value != idValue;
            });
        }
    }

    if (submenu_list.length == submenuListCount) {
        $('#selectSUBMENUCount').html(unescape(escape("All")));
    }
    else if (submenu_list.length == 0) {
        $('#selectSUBMENUCount').html(unescape(escape("Select submenu")));
    }
    else {
        $('#selectSUBMENUCount').html(unescape(escape(submenu_list.length + " - submenu Selected")));
    }

    selected_SUBMENU_Code = submenu_list.join(',');

}

function AddSBUList(Id, losID) {
   
    if ($('#' + Id).is(':checked')) {
        sbu_list.push(Id);
    }
    else {
        $('.' + losID).prop('checked', false);
        sbu_list = $.grep(sbu_list, function (value) {
            return value != Id;
        });
    }

    if (sbu_list.length == sbuListCount) {
        $('#selectSBUCount').html(unescape(escape("All")));
    }
    else if (sbu_list.length == 0) {
        $('#selectSBUCount').html(unescape(escape("Select Sbu")));
    }
    else {
        $('#selectSBUCount').html(unescape(escape(sbu_list.length + " - Sbu Selected")));
    }

    selected_SBU_Code = sbu_list.join(',');
    
}





function AddSUBMENUList(Id, menuID) {

    if ($('#submenu_' + Id).is(':checked')) {
        submenu_list.push(Id);
    }
    else {
        var permissionlstID = '';
        $('.' + menuID).prop('checked', false);
        submenu_list = $.grep(submenu_list, function (value) {
            return value != Id;
        });
        if ($('#read_' + menuID + '_' + Id ).is(':checked')) {
            $('#read_' + menuID + '_' + Id).prop('checked', false);
            permissionlstID = '' + menuID + '_' + Id;
        }
        if ($('#write_' + menuID + '_' + Id).is(':checked')) {
            $('#write_' + menuID + '_' + Id).prop('checked', false);
            permissionlstID = '' + menuID + '_' + Id;
        }
        var permissionlistIDArray = []

        permissionlistIDArray.push(permissionlstID);

        permission = permission.filter(item => !permissionlistIDArray.includes(item.listID));
        selectPermissionlist = selectPermissionlist.filter(item => !permissionlistIDArray.includes(item.listID));
    }

    if (submenu_list.length == submenuListCount) {
        $('#selectSUBMENUCount').html(unescape(escape("All")));
    }
    else if (submenu_list.length == 0) {
        $('#selectSUBMENUCount').html(unescape(escape("Select Sub Menu")));
    }
    else {
        $('#selectSUBMENUCount').html(unescape(escape(submenu_list.length + " - Sub Selected")));
    }

    selected_SUBMENU_Code = submenu_list.join(',');

}

function AddList(Id) {
    if ($('#' + Id).is(':checked')) {
        los_list.push(Id);
    }
    else {
        los_list = $.grep(los_list, function (value) {
            return value != Id;
        });
    }
    if (los_list.length == losListCount) {
        $('#selectLOSCount').html(unescape(escape("All")));
    }
    else if (los_list.length == 0) {
        $('#selectLOSCount').html(unescape(escape("Select Los")));
    }
    else {
        $('#selectLOSCount').html(unescape(escape(los_list.length + " - Los Selected")));
    }

    selected_LOS_Code = los_list.join(',');
    sbu_Selection_List = sbu_list;
    GetSBUMultiple();
}

function AddMenuList(Id, Name) {
    var childMenu = "";
    var ParamName = ("'").concat(Name).concat("'");
    if ($('#' + Id).is(':checked')) {
        childMenu = '<input type="checkbox" class = "menuCheckBox" name="' + Name + '" id="' + Id + '" value="' + Id + '" onclick="AddMenuList(' + Id + ',' + ParamName + ')" checked/>' + Name + '<span class="custom_checkmark"></span>';
        childMenu += '<select id="permission_' + Id + '" style="height:40px;width:35%;" class="form-control pwc_dropdown_ctrl">';
        childMenu += '<option value="0">Read</option>';
        childMenu += '<option value="1">Read/Write</option>';
        childMenu += '</select>';
        menu_list.push(Id);

        $.each(menu_Set_List, function (key, item) {
            complete_MENU_List.push(item.menu_Code);
            if (item.parent_Menu_Code == Id) {
                var flag = false;
                var losParamName = ("'").concat(item.menu_Name).concat("'");
                childMenu += '<label class="custom_container" id="parent_' + item.menu_Code + '"><input type="checkbox" class = "menuCheckBox" id="' + item.menu_Code + '" name="' + item.menu_Name + '" value="' + item.menu_Code + '" onclick="AddMenuList(' + item.menu_Code + ',' + losParamName + ')"/>' + item.menu_Name + '<span class="custom_checkmark"></span>';
                childMenu += '<select id="permission_' + item.menu_Code + '" style="height:40px;width:35%;" class="form-control pwc_dropdown_ctrl">';
                childMenu += '<option value="0">Read</option>';
                childMenu += '<option value="1">Read/Write</option>';
                childMenu += '</select>';
                childMenu += '</label>';
            }
        });

        $('#parent_' + Id).html(childMenu);

    }
    else {
        childMenu = '<input type="checkbox" class = "menuCheckBox" name="' + Name + '" id="' + Id + '" value="' + Id + '" onclick="AddMenuList(' + Id + ',' + ParamName + ')"/>' + Name + '<span class="custom_checkmark"></span>';
        childMenu += '<select id="permission_' + Id + '" style="height:40px;width:35%;" class="form-control pwc_dropdown_ctrl">';
        childMenu += '<option value="0">Read</option>';
        childMenu += '<option value="1">Read/Write</option>';
        childMenu += '</select>';

        menu_list = $.grep(menu_list, function (value) {
            return value != Id;
        });

        menu_Selection_List = menu_list;

        RemoveChildInList(Id);
        $('#parent_' + Id).html(childMenu);

        //var permissionlistIDArray = []

        //permissionlistIDArray.push(Id.toString());

        //permission = permission.filter(item => !permissionlistIDArray.includes(item.menuid));
        //selectPermissionlist = selectPermissionlist.filter(item => !permissionlistIDArray.includes(item.menuid));

    }
    if (menu_list.length == menuListCount) {
        $('#selectMENUCount').html(unescape(escape("All")));
    }
    else if (menu_list.length == 0) {
        $('#selectMENUCount').html(unescape(escape("Select Menu")));
    }
    else {
        $('#selectMENUCount').html(unescape(escape(menu_list.length + " - Menu Selected")));
    }

    selected_MENU_Code = menu_list.join(',');
    submenu_Selection_List = submenu_list;
    //GetSUBMENUMultiple(selectPermissionlist);
}

function MappingFunction() {

    role_IdSet = $('#roleDrp').val();
   

    $.ajax({
        url: '/Home/CheckRoleTypeId?RoleId=' + role_IdSet,
        type: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        
        success: function (result) {
            if (result[0].isuperAdminTrue == "True") {
                $('#multiple_LOS_SBU_Selection').hide();
                $('#multiple_LOS_SBU_Selection').hide();
            }
           else if (result[0].isLosTrue == "True") {
                $('#multiple_LOS_SBU_Selection').show();
              //  $('#multiple_LOS_SBU_Info').show();
               
                 Losshow = "True";
            }
            else {
                $('#multiple_LOS_SBU_Selection').hide();
                Losshow = "";
               
            }
        }
    });
    GetMenuList();
    GetMENUMultiple();

    //if ($('#roleDrp').val() == 11) {
    //    $('#multiple_LOS_SBU_Selection').hide();
    //    $('#multiple_LOS_SBU_Info').show();
    //}
    //else if ($('#roleDrp').val() == 12) {
    //    $('#multiple_LOS_SBU_Selection').hide();
    //    $('#multiple_LOS_SBU_Info').hide();
    //}
    //else {
    //    $('#multiple_LOS_SBU_Selection').show();
    //    $('#multiple_LOS_SBU_Info').hide();
    //}
}




function Addpermission(Id, menuID, Ishavesubmenu) {
    
    var haspermission = false;
    var listIDArray = [];
    var listID = '';
    if ($('#read_' + menuID + '_' + menuID + '_' + 0).is(':checked')) {
        haspermission = 0;
        listID = '' + menuID + '_' + menuID + '_' + 0;
        Ishavesubmenu = false;
    }
    if ($('#write_' + menuID + '_' + menuID + '_' + 0).is(':checked')) {
        haspermission = 1;
        listID = '' + menuID + '_' + menuID + '_' + 0;
        Ishavesubmenu = false;
    }

    if ($('#read_' + menuID + '_' + Id).is(':checked')) {
        haspermission = 0;
        listID = '' + menuID + '_' + Id;
        Ishavesubmenu = true;
    }
    if ($('#write_' + menuID + '_' + Id).is(':checked')) {
        haspermission = 1;
        listID = '' + menuID + '_' + Id;
        Ishavesubmenu = true;

    }
    if (Ishavesubmenu == false) {
        var permissionlist = {
            listID: listID,
            menuid: menuID,
            submenuid: 0,
            permission: haspermission,
        };
    }
    else {
        var permissionlist = {
            listID: listID,
            menuid: menuID,
            submenuid: Id,
            permission: haspermission,
        };
    }

    listIDArray.push(listID);

    permission = permission.filter(item => !listIDArray.includes(item.listID));
    selectPermissionlist = selectPermissionlist.filter(item => !listIDArray.includes(item.listID));

    permission.push(permissionlist);
    selectPermissionlist.push(permissionlist);
        if (Ishavesubmenu==true) {
        if ($('#submenu_' + Id).is(':checked')) {
        }
        else {
            $('#submenu_' + Id).prop('checked', true);
            AddSUBMENUList(Id, menuID);
        }
    }
    else {
        $('.' + menuID).prop('checked', true);
        submenu_list.push(Id);

    }
    console.log(permission);
    menustatus = "True";
}

function PermissionCheck(userPermissiondetails) {
    $.each(userPermissiondetails, function (key, item) {
       
        if (item.permission == "1") {
            $('#write_' + item.menuid + '_' + item.submenuid).prop('checked', true);
        }
        else {
            $('#Read_' + item.menuid+'_'+ item.submenuid).prop('checked', true);
        }
    });
}


function BindChildMenu(Id, Name) {

    var childMenu = '';

    $.each(menu_Set_List, function (key, item) {
        complete_MENU_List.push(item.menu_Code);
        if (item.parent_Menu_Code == Id) {
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
            var losParamName = ("'").concat(item.menu_Name).concat("'");
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
            if (flag == true) {
                childMenu += '<label class="custom_container" id="parent_' + item.menu_Code + '"><input type="checkbox" class = "menuCheckBox" id="' + item.menu_Code + '" name="' + item.menu_Name + '" value="' + item.menu_Code + '" onclick="AddMenuList(' + item.menu_Code + ',' + losParamName + ')" checked/>' + item.menu_Name + '<span class="custom_checkmark"></span>';
                menu_list.push(item.menu_Code);
                selectedMenuCount += 1;
                childMenu += '<select id="permission_' + item.menu_Code + '" style="height:30px;width:35%;" class="form-control pwc_dropdown_ctrl">';

                if (permissionFlag == true) {
                    if (selectedPermissionFormenu == 0) {
                        childMenu += '<option value="0" selected>Read</option>';
                        childMenu += '<option value="1">Read/Write</option>';
                    }
                    else {
                        childMenu += '<option value="0">Read</option>';
                        childMenu += '<option value="1" selected>Read/Write</option>';
                    }
                }
                else {
                    childMenu += '<option value="0">Read</option>';
                    childMenu += '<option value="1">Read/Write</option>';
                }

                childMenu += '</select>';
                childMenu += BindChildMenu(item.menu_Code, losParamName);
                childMenu += '</label>';
            }
            else {
                childMenu += '<label class="custom_container" id="parent_' + item.menu_Code + '"><input type="checkbox" class = "menuCheckBox" id="' + item.menu_Code + '" name="' + item.menu_Name + '" value="' + item.menu_Code + '" onclick="AddMenuList(' + item.menu_Code + ',' + losParamName + ')"/>' + item.menu_Name + '<span class="custom_checkmark"></span>';
                childMenu += '<select id="permission_' + item.menu_Code + '" style="height:40px;width:35%;" class="form-control pwc_dropdown_ctrl">';
                childMenu += '<option value="0">Read</option>';
                childMenu += '<option value="1">Read/Write</option>';
                childMenu += '</select>';
                childMenu += '</label>';
            }
        }
    });

    return childMenu;

}

function RemoveChildInList(Id) {
    $.each(menu_Set_List, function (key, item) {
        if (item.parent_Menu_Code == Id) {
            menu_list = $.grep(menu_list, function (value) {
                return value != item.menu_Code;
            });
            RemoveChildInList(item.menu_Code);
        }
    });
}

function SelectAllChildMenu(Id, Name) {

    var childMenu = '';
    var ParamName = ("'").concat(Name).concat("'");
    childMenu = '<input type="checkbox" class = "menuCheckBox" name="' + Name + '" id="' + Id + '" value="' + Id + '" onclick="AddMenuList(' + Id + ',' + ParamName + ')" checked/>' + Name + '<span class="custom_checkmark"></span>';
    childMenu += '<select id="permission_' + Id + '" style="height:40px;width:35%;" class="form-control pwc_dropdown_ctrl">';
    childMenu += '<option value="0">Read</option>';
    childMenu += '<option value="1">Read/Write</option>';
    childMenu += '</select>';

    $.each(menu_Set_List, function (key, item) {
        if (item.parent_Menu_Code == Id) {
            complete_MENU_List.push(item.menu_Code);
            var losParamName = ("'").concat(item.menu_Name).concat("'");
            childMenu += '<label class="custom_container" id="parent_' + item.menu_Code + '"><input type="checkbox" class = "menuCheckBox" name="' + item.menu_Name + '" id="' + item.menu_Code + '" name="' + item.menu_Name + '" value="' + item.menu_Code + '" onclick="AddMenuList(' + item.menu_Code + ',' + losParamName + ')" checked/>' + item.menu_Name + '<span class="custom_checkmark"></span>';
            menu_list.push(item.menu_Code);
            selectedMenuCount += 1;
            childMenu += '<select id="permission_' + item.menu_Code + '" style="height:40px;width:35%;" class="form-control pwc_dropdown_ctrl">';
            childMenu += '<option value="0">Read</option>';
            childMenu += '<option value="1">Read/Write</option>';
            childMenu += '</select>';
            childMenu += '</label>';
            $('#parent_' + Id).html(childMenu);
            SelectAllChildMenu(item.menu_Code, item.menu_Name);
        }
    });
}




