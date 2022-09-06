
var emp = "";
var roletypeval = "";
var updatestatus = "";
var role_Id = "";
var role_Menu_Mapping_ID = [];

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
var removableChild = [];
var selectedCount = 0;
var form = $('#__AjaxAntiForgeryForm');
var token = $('input[name="__RequestVerificationToken"]', form).val();

$(function () {
    $("#IsStatusTrue").change(function () {
        $('#IsStatusTrue').prop('checked', true);
        $('#IsStatusFalse').prop('checked', false);

    });
    $("#IsStatusFalse").change(function () {
        $('#IsStatusFalse').prop('checked', true);
        $('#IsStatusTrue').prop('checked', false);

    });



    $("#IsuperAdminTrue").change(function () {
        $('input[name=IsLosTrue]').prop('disabled', true);
        $('input[name=IsSbUTrue]').prop('disabled', true);
        $('input[name=IsLosFalse]').prop('disabled', true);
        $('input[name=IsSbUFalse]').prop('disabled', true);

    });

    $("#IsuperAdminFalse").change(function () {
        $('input[name=IsLosTrue]').prop('disabled', false);
        $('input[name=IsSbUTrue]').prop('disabled', true);
        $('input[name=IsLosFalse]').prop('disabled', false);
        $('input[name=IsSbUFalse]').prop('disabled', true);

    });



    $("#IsLosTrue").change(function () {
        $('#IsLosTrue').prop('checked', true);

        $('#IsLosFalse').prop('checked', false);
        $('#IsSbUFalse').prop('checked', false);
        $('#IsSbUTrue').prop('checked', true);
        $('input[name=IsSbUTrue]').prop('disabled', true);
        $('input[name=IsSbUFalse]').prop('disabled', true);

    });
    $("#IsLosFalse").change(function () {
        $('#IsLosFalse').prop('checked', true);
        $('#IsLosTrue').prop('checked', false);
        $('#IsSbUFalse').prop('checked', true);
        $('#IsSbUTrue').prop('checked', false);
        $('input[name=IsSbUTrue]').prop('disabled', true);
        $('input[name=IsSbUFalse]').prop('disabled', true);


    });

    $("#IsSbUTrue").change(function () {

        if ($('#IsLosTrue').is(':checked')) {
            $('#IsSbUTrue').prop('checked', true);

        }
        else {
            $('#IsSbUFalse').prop('checked', false);
        }
        //$('#IsSbUTrue').prop('checked', true);
       

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
            if (RoleName == "") {
                alert("Please Enter Role Name");
                return;
            }
            if (selected_LOS_Code == "" ) {
                alert("Please Select Menu");
                return;
            }
            
            //if (selected_SBU_Code == "") {
            //    alert("Please Select Sub Menu");
            //    return;
            //}

            var userJson = {
                RoleName: RoleName,
                MenuId: selected_LOS_Code,
                SubMenuId: selected_SBU_Code,
                Status: status,
                IsuperAdminTrue: IsuperAdminTrue,
                IsLosTrue: IsLosTrue,
                IsSbUTrue: IsSbUTrue,
                //RoleIdstr: role_Id,
                //Role_Menu_Mapping_IDstr: role_Menu_Mapping_ID
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
                    $("#add_User").modal('hide');
                    alert(data.Message);
                    //if (data == 0) {
                    //    alert("Role Name is alreay exists! ");
                    //}
                    ////  $("#adminSuccessModal").modal("show");
                    //else if (updatestatus != "") {
                    //    alert("Role Updated successfully! ");
                    //}
                    //else {
                    //    alert("Role Added successfully! ");
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
                    //alert("Role has been Successfully Added!");
                    $('#add_User').modal('hide');
                }
            });
        }
    });
    $("#btnUpdate").click(function () {
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
            if (RoleName == "") {
                alert("Please Enter Role Name");
                return;
            }
            if (selected_LOS_Code == "") {
                alert("Please Select Menu");
                return;
            }

            if (selected_SBU_Code == "") {
                alert("Please Select Sub Menu");
                return;
            }
            var userJson = {
                RoleName: RoleName,
                MenuId: selected_LOS_Code,
                SubMenuId: selected_SBU_Code,
                Status: status,
                IsuperAdminTrue: IsuperAdminTrue,
                IsLosTrue: IsLosTrue,
                IsSbUTrue: IsSbUTrue,
                RoleIdstr: role_Id,
                Role_Menu_Mapping_IDstr: role_Menu_Mapping_ID
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
                    $("#add_User").modal('hide');
                    //if (data == 0) {
                    //    alert("Role Name is alreay exists! ");
                    //}
                    ////  $("#adminSuccessModal").modal("show");
                    //else if (updatestatus != "") {
                    //    alert("Role Updated successfully! ");
                    //}
                    //else {
                    //    alert("Role Updated successfully! ");
                    //}
                    alert(data.Message);

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
        var Role_ID = dataItem.role_ID;
        getbyID(Role_ID);
    });

    function getbyID(Role_ID) {
        $.ajax({
            url: '/Home/GetbyRoleId?RoleId=' + Role_ID,
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
                $('#user_Add_Section').show();
                $('#user_Edit_Section').hide();
                $('#user_Status_Section').show();
                $('#EditUser_Name').val(result.employee_Name);
                $('#EditUser_Role').val(result.role_Description);
                //GetRoles(result.role_ID, result.role_Description);

                //$('#user_drop').css('border-color', 'lightgrey');
                //$('#user_drop_Label').css('color', 'Black');

                //$('#roleDrp').css('border-color', 'lightgrey');
                //$('#roleLabel').css('color', 'Black');

                $('#multiple_LOS_Label').css('color', 'Black');

                $('#multiple_SBU_Label').css('color', 'Black');

                if (result.status=="1" ) {
                    $('#IsStatusTrue').prop('checked', true);
                    $('#IsStatusFalse').prop('checked', false);
                    
                }
                else {
                    $('#IsStatusFalse').prop('checked', true);
                    $('#IsStatusTrue').prop('checked', false);
                }

                if (result.isLosTrue == "True") {
                    $('#IsLosTrue').prop('checked', true);
                    $('#IsLosFalse').prop('checked', false);
                    
                }
                else {
                    $('#IsLosFalse').prop('checked', true);
                    $('#IsLosTrue').prop('checked', false);
                }
                if (result.isSbUTrue =="True") {
                    $('#IsSbUTrue').prop('checked', true);
                    $('#IsSbUFalse').prop('checked', false);
                }
                else {
                    $('#IsSbUFalse').prop('checked', true);
                    $('#IsSbUTrue').prop('checked', false);
                }
                if (result.isuperAdminTrue == "True") {
                    $('#IsuperAdminTrue').prop('checked', true);
                    $('#IsuperAdminFalse').prop('checked', false);
                    $('input[name=IsLosTrue]').prop('disabled', true);
                    $('input[name=IsLosFalse]').prop('disabled', true);
                }
                else {
                    $('#IsuperAdminFalse').prop('checked', true);
                    $('#IsuperAdminTrue').prop('checked', false);
                    $('input[name=IsLosTrue]').prop('disabled', false);
                    $('input[name=IsLosFalse]').prop('disabled', false);
                    $('input[name=IsSbUTrue]').prop('disabled', true);
                    $('input[name=IsSbUFalse]').prop('disabled', true);
                }
                //userEditStatus = result.status_ID;
                role_Id = result.roleId;
                //JSON.stringify(user);
               // role_Menu_Mapping_ID = result.roleMenuMapping_List;
                role_Menu_Mapping_ID = JSON.stringify(result.roleMenuMapping_List);
                
                //$('#Los').val(result.RoleName);
                $('#txtRole').val(result.roleName);
                $('input[name=txtRole]').prop('disabled', true);
                $('#Los').val(result.los);
                $('#sbu').val(result.sbu);

                $('#Los').attr('disabled', true);
                $('#sbu').attr('disabled', true);

                //if (result.role_ID == 11) {
                //    $('#multiple_LOS_SBU_Selection').hide();
                //    $('#multiple_LOS_SBU_Info').show();
                //    GetLosList();
                //    GetSBUMultiple();
                //}
                //else if (result.role_ID == 12) {
                //    $('#multiple_LOS_SBU_Selection').hide();
                //    $('#multiple_LOS_SBU_Info').hide();
                //    GetLosList();
                //    GetSBUMultiple();
                //}
                //else {
                //    if (result.role_ID != 7 && userRoleID == 11) {
                //        $('#multiple_LOS_SBU_Selection').hide();
                //        $('#multiple_LOS_SBU_Info').hide();
                //        los_Selection_List = result.loS_Code_List;
                //        sbu_Selection_List = result.sbU_Code_List;
                //        selected_LOS_Code = result.loS_Code_List.join(',');
                //        selected_SBU_Code = result.sbU_Code_List.join(',');
                //    }
                //    else {
                        $('#multiple_LOS_SBU_Selection').show();
                        $('#multiple_LOS_SBU_Info').hide();
                        los_Selection_List = result.loS_Code_List;
                        sbu_Selection_List = result.sbU_Code_List;
                        selected_LOS_Code = result.loS_Code_List.join(',');
                        selected_SBU_Code = result.sbU_Code_List.join(',');
                        GetLosList();
                        GetSBUMultiple();
                  //  }
                //}
            }
        });
    }

var totalItemCount = 0;
loadAdminDetails();
    
    function loadAdminDetails() {
    
        $('#IsStatusTrue').prop('checked', true);
        $('#IsuperAdminTrue').prop('checked', true);
        $('#IsLosTrue').prop('checked', true);
        $('#IsSbUTrue').prop('checked', true);
        $('input[name=IsLosTrue]').prop('disabled', true);
        $('input[name=IsSbUTrue]').prop('disabled', true);
        $('input[name=IsLosFalse]').prop('disabled', true);
        $('input[name=IsSbUFalse]').prop('disabled', true);

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
            { hidden: true, field: "role_ID", title: "Role_ID", width: "120px", type: "text" },
            { field: "role_Name", title: "Role Name", width: "120px", type: "text" },
            { field: "status", title: "Status", width: "120px", type: "text" },
            { field: "issuperdmin", title: "Issuperdmin", width: "120px", type: "text" },
            { field: "isLosreq", title: "IsLosreq", width: "120px", type: "text" },
            { field: "isSbUreq", title: "isSbUreq", width: "120px", type: "text" },
            
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
            url: "/Home/GetRoleListings",
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
            //SubMenuId: selected_SBU_Code,
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


//function AddUser() {
//    $('#add_Title').show();
//    $('#btnAdd').show();
//    $('#multiple_LOS_Label').css('color', 'Black');
//    $('#user_Add_Section').show();
//    $('#multiple_LOS_SBU_Selection').show();
//    $('#multiple_LOS_Label').css('color', 'Black');

  

//    los_Selection_List = [];
//    sbu_Selection_List = [];
//    selected_LOS_Code = "";
//    selected_SBU_Code = "";
//    GetLOSMultiple();
//    GetUsers();
//}
function AddUser() {
    $('#add_Title').show();
    $('#update_Title').hide();
    $('#btnAdd').show();
    $('#btnUpdate').hide();
    $('#user_Edit_Section').hide();
    $('#user_Status_Section').hide();
    $('#user_Add_Section').show();
    $('#multiple_LOS_SBU_Selection').show();
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
   // GetRoles("");
}

$("#btnCancel_Role").click(function () {
    location.reload();
});

$("#btnadd_User").click(function () {
   // location.reload();
    //alert();
    $("#add_User").modal('show');
    $('#add_Title').show();
    $('#update_Title').hide();
    $('#btnAdd').show();
    $('#btnUpdate').hide();
    $('#user_Edit_Section').hide();
    $('#user_Status_Section').show();
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
});
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



function GetUsers() {
   
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
        url: '/Home/GetLOS',
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
    selectedCount = 0;
    los_list = [];
    selected_LOS_List = [];
    complete_LOS_List = [];
    losListCount = los_Set_List.length;

    $.each(los_Set_List, function (key, item) {
        complete_LOS_List.push(item.loS_Code);
        if (item.parent_Menu_Code == "0") {
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
            var losParamName = ("'").concat(item.loS_Name).concat("'");
            if (flag == true) {
                dropdown += '<label class="custom_container" id="parent_' + item.loS_Code + '"><input type="checkbox" class = "checkbox" name="' + item.loS_Name + '" id="' + item.loS_Code + '" value="' + item.loS_Code + '" onclick="AddList(' + item.loS_Code + ',' + losParamName + ')" checked/>' + item.loS_Name + '<span class="custom_checkmark"></span>';
                los_list.push(item.loS_Code);
                selectedCount += 1;
                dropdown += BindChildMenu(item.loS_Code, losParamName);
                dropdown += '</label>';
            }
            else {
                dropdown += '<label class="custom_container" id="parent_' + item.loS_Code + '"><input type="checkbox" class = "checkbox" name="' + item.loS_Name + '" id="' + item.loS_Code + '" value="' + item.loS_Code + '" onclick="AddList(' + item.loS_Code + ',' + losParamName + ')"/>' + item.loS_Name + '<span class="custom_checkmark"></span></label>';
            }
        }
    });

    if (selectedCount == 0) {
        html += '<span class="anchor" id="selectLOSCount">Select Menu</span>';
    }
    else {
        html += '<span class="anchor" id="selectLOSCount">' + selectedCount + ' Menu Selected</span>';
    }
    html += '<ul class="items" style="height: 170px; overflow-y: scroll;">';
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
                SelectAllChildMenu(parseInt($(this).val()), document.getElementById($(this).val()).name);
            });
            $('#selectLOSCount').html(unescape(escape("All")));
            selected_LOS_Code = los_list.join(',');
            sbu_Selection_List = sbu_list;
           // GetSBUMultiple();
        } else {
            $('.checkbox').each(function () {
                this.checked = false;
                los_list = [];
            });
            $('#selectLOSCount').html(unescape(escape("Select Menu")));
            selected_LOS_Code = "";
            sbu_Selection_List = sbu_list;
            //GetSBUMultiple();
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
function GetSBUMultiple() {
    $.ajax({
        url: '/Home/GetSBU?losCode=' + selected_LOS_Code,
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
                html += '<span class="anchor" id="selectSBUCount">Select Sub Menu</span>';
            }
            else {
                html += '<span class="anchor" id="selectSBUCount">' + selectedCount + ' - Sub Menu Selected</span>';
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
                    $('#selectSBUCount').html(unescape(escape("Select Sub Menu")));
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
        $('#selectSBUCount').html(unescape(escape("Select Sub Menu")));
    }
    else {
        $('#selectSBUCount').html(unescape(escape(sbu_list.length + " - Sub Menu Selected")));
    }

    selected_SBU_Code = sbu_list.join(',');
    
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
        $('#selectSBUCount').html(unescape(escape("Select Sub Menu")));
    }
    else {
        $('#selectSBUCount').html(unescape(escape(sbu_list.length + " - Sub Menu Selected")));
    }

    selected_SBU_Code = sbu_list.join(',');
    
}
function AddList(Id, Name) {
    var childMenu = "";
    var ParamName = ("'").concat(Name).concat("'");
    if ($('#' + Id).is(':checked')) {
        childMenu = '<input type="checkbox" class = "checkbox" name="' + Name + '" id="' + Id + '" value="' + Id + '" onclick="AddList(' + Id + ',' + ParamName + ')" checked/>' + Name + '<span class="custom_checkmark"></span>';
        los_list.push(Id);

        $.each(los_Set_List, function (key, item) {
            complete_LOS_List.push(item.loS_Code);
            if (item.parent_Menu_Code == Id) {
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
                var losParamName = ("'").concat(item.loS_Name).concat("'");
                if (flag == true) {
                    childMenu += '<label class="custom_container" name="' + item.loS_Name + '" id="parent_' + item.loS_Code + '"><input type="checkbox" class = "checkbox" id="' + item.loS_Code + '" value="' + item.loS_Code + '" onclick="AddList(' + item.loS_Code + ',' + losParamName + ')" checked/>' + item.loS_Name + '<span class="custom_checkmark"></span></label>';
                    los_list.push(item.loS_Code);
                    selectedCount += 1;
                }
                else {
                    childMenu += '<label class="custom_container" name="' + item.loS_Name + '" id="parent_' + item.loS_Code + '"><input type="checkbox" class = "checkbox" id="' + item.loS_Code + '" value="' + item.loS_Code + '" onclick="AddList(' + item.loS_Code + ',' + losParamName + ')"/>' + item.loS_Name + '<span class="custom_checkmark"></span></label>';
                }
            }
        });
        $('#parent_' + Id).html(childMenu);
    }
    else {
        childMenu = '<input type="checkbox" class = "checkbox" name="' + Name + '" id="' + Id + '" value="' + Id + '" onclick="AddList(' + Id + ',' + ParamName + ')"/>' + Name + '<span class="custom_checkmark"></span>';
        los_list = $.grep(los_list, function (value) {
            return value != Id;
        });
        //$.each(los_Set_List, function (key, item) {
        //    if (item.parent_Menu_Code == Id) {
        //        los_list = $.grep(los_list, function (value) {
        //            return value != item.loS_Code;
        //        });
        //    }
        //});
        RemoveChildInList(Id);
        $('#parent_' + Id).html(childMenu);
    }
    if (los_list.length == losListCount) {
        $('#selectLOSCount').html(unescape(escape("All")));
    }
    else if (los_list.length == 0) {
        $('#selectLOSCount').html(unescape(escape("Select Menu")));
    }
    else {
        $('#selectLOSCount').html(unescape(escape(los_list.length + " - Menu Selected")));
    }

    selected_LOS_Code = los_list.join(',');
    sbu_Selection_List = sbu_list;
    //GetSBUMultiple();
}

function BindChildMenu(Id, Name) {

    var childMenu = '';

    $.each(los_Set_List, function (key, item) {
        complete_LOS_List.push(item.loS_Code);
        if (item.parent_Menu_Code == Id) {
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
            var losParamName = ("'").concat(item.loS_Name).concat("'");
            if (flag == true) {
                childMenu += '<label class="custom_container" id="parent_' + item.loS_Code + '"><input type="checkbox" class = "checkbox" id="' + item.loS_Code + '" value="' + item.loS_Code + '" onclick="AddList(' + item.loS_Code + ',' + losParamName + ')" checked/>' + item.loS_Name + '<span class="custom_checkmark"></span>';
                los_list.push(item.loS_Code);
                selectedCount += 1;
                childMenu += BindChildMenu(item.loS_Code, losParamName);
                childMenu += '</label>';
            }
            else {
                childMenu += '<label class="custom_container" id="parent_' + item.loS_Code + '"><input type="checkbox" class = "checkbox" id="' + item.loS_Code + '" value="' + item.loS_Code + '" onclick="AddList(' + item.loS_Code + ',' + losParamName + ')"/>' + item.loS_Name + '<span class="custom_checkmark"></span></label>';
            }
        }
    });

    return childMenu;

}

function RemoveChildInList(Id) {
    $.each(los_Set_List, function (key, item) {
        if (item.parent_Menu_Code == Id) {
            los_list = $.grep(los_list, function (value) {
                return value != item.loS_Code;
            });
            RemoveChildInList(item.loS_Code);
        }
    });
}

function SelectAllChildMenu(Id, Name) {

    var childMenu = '';
    var ParamName = ("'").concat(Name).concat("'");
    childMenu = '<input type="checkbox" class = "checkbox" name="' + Name + '" id="' + Id + '" value="' + Id + '" onclick="AddList(' + Id + ',' + ParamName + ')" checked/>' + Name + '<span class="custom_checkmark"></span>';

    $.each(los_Set_List, function (key, item) {
        if (item.parent_Menu_Code == Id) {
            complete_LOS_List.push(item.loS_Code);
            var losParamName = ("'").concat(item.loS_Name).concat("'");
            childMenu += '<label class="custom_container" id="parent_' + item.loS_Code + '"><input type="checkbox" class = "checkbox" name="' + item.loS_Name + '" id="' + item.loS_Code + '" value="' + item.loS_Code + '" onclick="AddList(' + item.loS_Code + ',' + losParamName + ')" checked/>' + item.loS_Name + '<span class="custom_checkmark"></span>';
            los_list.push(item.loS_Code);
            selectedCount += 1;
            childMenu += '</label>';
            $('#parent_' + Id).html(childMenu);
            SelectAllChildMenu(item.loS_Code, item.loS_Name);
        }
    });
}

