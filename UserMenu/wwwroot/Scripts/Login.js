
var emp = "";
var roletypeval = "";
var updatestatus = "";
var MenuId = "";














$(function () {

    $("#btnSubmit").click(function () {
        //if (MenuId == "") {
        //    var menuId = $("#ddlmenu").val();
        //}
        //else {
        //    var menuId = MenuId;
        //}
       
        //var SubmenuId = "";
        //if (updatestatus != "") {
        //    SubmenuId = updatestatus;
        //}
        
            

        var SubMenu = $('#txtSubMenu').val().trim();
        
       
       
        //var Priority = $('#txtPriority').val().trim();
        //var PageUrl = $('#txtPageUrl').val().trim();
        //var chk1 = $("input[name='IsStatusTrue']:checked").val();
        //var chk2 = $("input[name='IsStatusFalse']:checked").val();
        //if (chk1 == "true") {
        //    status = true;

        //}
        //else {

        //    status = false;
        //}
      

        debugger;
        $.ajax({
            url: "../Home/SubSaveMenu",
            type: "GET",
            dataType: "json",
            data: {  subMenu: SubMenu },
            success: function (data) {
              //  $("#adminSuccessModal").modal("show");
                if (data == 0) {
                    alert("Sub Menu Name is alreay exists! ");
                }
                //  $("#adminSuccessModal").modal("show");
                else if (updatestatus != "") {
                    alert("Sub Menu Updated successfully! ");
                }
                else {
                    alert("Sub Menu Added successfully! ");
                }

               
                updatestatus = "";
                MenuId = "";

                loadAdminDetails();
                $("#ddlmenu").val("");
                $("#txtSubMenu").val("");
                $("#txtPageUrl").val("");
                $("#txtPriority").val("");
                $('#IsStatusTrue').prop('checked', false);
                $('#IsStatusFalse').prop('checked', false);
            }, error: function (xhr) {
                //debugger;  
              //  notificationWidget.error("Something went wrong!!");
            }
        })

    });


    $("#IsStatusTrue").change(function () {
        $('#IsStatusFalse').prop('checked', false);
    });
    $("#IsStatusFalse").change(function () {
        $('#IsStatusTrue').prop('checked', false);
    });



































    var totalItemCount = 0;
    loadAdminDetails();

    function loadAdminDetails() {
        $('#IsStatusTrue').prop('checked', true);
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
                { hidden: true, field: "submenuID", title: "SubMenu_ID", width: "120px", type: "text" },
                { field: "submenuName", title: "Sub Menu Name", width: "120px", type: "text" },
                { hidden: true, field: "menuID", title: "Menu_ID", width: "120px", type: "text" },
                { field: "menuName", title: "Menu Name", width: "120px", type: "text" },
                { field: "priority", title: "Priority", width: "40px", type: "text" },
                { field: "pageURL", title: "Page URL", width: "120px", type: "text" },
                { hidden: true,field: "statusID", title: "Status", width: "120px", type: "text" },
                {field: "status", title: "Status", width: "120px", type: "text" },
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
                        "<button type='button' class='btnIcon'><i class='fa fa-pencil-square-o fa-6 btnEditAdmin' aria-hidden='true' style='cursor: pointer;' aria-hidden='true' data-toggle='tooltip' data-placement='top' title='Edit Admin'></i></button>"
                    //"<button type='button' class='btnIcon'><i class='fa fa-ban btnInActiveAdmin' aria-hidden='true' style='cursor: pointer;' aria-hidden='true' data-toggle='tooltip' data-placement='top' title='InActive Admin'></i></button>&nbsp;" 
                }
            ]

        }).data("kendoGrid");
    }



    function editAdmin(e) {
        e.preventDefault();
        //    var dataItem = this.dataItem($(e.currentTarget).cRoleest("tr"));
        //    var employeeId = dataItem.employeeId;
        //    var RoleId = dataItem.RoleId;
        //    var isActive = dataItem.isActive;

        //    $("#txtEditEmployeeId").val(employeeId);
        //    if (isActive) {
        //        $('#chkAdminIsActive').prop('checked', true);
        //    }
        //    else {
        //        $('#chkAdminIsActive').prop('checked', false);
        //    }

        //    var selectedOptions = RoleId.split(",");
        //    for (var i in selectedOptions) {
        //        var optionVal = selectedOptions[i];
        //        $("#listEditRole").find("option[value=" + optionVal + "]").prop("selected", "selected");
        //    }
        //    $("#listEditRole").multiselect('reload');
        //    $("#divEditAdmin").modal('show');
    }

    function toggleScrollbar(e) {
        //$.each($('table[role="grid"]'), function (index, value) {
        //    $(value).addClass('table table-bordered')

        //});
    }

    $("#errEmployeeId").hide();
    $("#errRoleId").hide();
    $("#errEditRoleId").hide();

    $('#userRole_EmployeeId').keypress(function () {
        $("#errEmployeeId").hide();
    });

    $('.selectListBox').change(function () {
        $("#errLOSId").hide();
    });

    $('#listEditRole').change(function () {
        $("#errEditRoleId").hide();
    });
    //$('#ddlRole').change(function () {
    //    $("#errEditRoleId").hide();
    //});

    $("#btnAdminSearch").click(function () {
        loadAdminDetails();
    });

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
                url: "/Home/GetSubListings",
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

    $("#btnAddAdmin").click(function () {

        $("#errEmployeeId").hide();
        $("#errLOSId").hide();
        $("#divlos").hide();
        $("#divAddAdmin").modal('show');
        $("#userLOS_EmployeeId").val("");
        $("#ddlRole").val("");
        $("#hdnEmployeeId").val("");
        $("#hdnEnEmployeeId").val("");
        $("#hdnEmployeeName").val("");
        $(".selectListBox").multiselect('reset');
    });

    $(document).on('click', '.btnEditAdmin', function (e) {
        debugger;
       // $("#errEditLOSId").hide();
        var grid = $("#adminListingGrid").data("kendoGrid");
        var dataItem = grid.dataItem($(this).closest('tr'));
        updatestatus = dataItem.submenuID;
        MenuId = dataItem.menuID;
        //if (dataItem.menuName == "Admin") {
            $("#ddlmenu").val($("#ddlmenu option").eq(dataItem.menuID).val());
        //}
        //else if (dataItem.menuName == "Dashboard") {
        //    $("#ddlmenu").val($("#ddlmenu option").eq(2).val());
        //}
        //else if (dataItem.menuName == "Report") {
        //    $("#ddlmenu").val($("#ddlmenu option").eq(3).val());
        //}
        $("#txtSubMenu").val(dataItem.submenuName);
        $("#txtMenu").val(dataItem.menuName);
        $("#txtPageUrl").val(dataItem.pageURL);
        $("#txtPriority").val(dataItem.priority);
       
        if (dataItem.statusID==true) {
            $('#IsStatusTrue').prop('checked', true);
        }
        else {
            $('#IsStatusFalse').prop('checked', true);
        }
        //if (Role == "Admin") {
        //    $("#ddlRoleedit").val($("#ddlRoleedit option").eq(1).val());
        //    var selectedOptions = LOSId.split(",");
        //    for (var i in selectedOptions) {
        //        var optionVal = selectedOptions[i];
        //        $("#listEditLOS").find("option[value=" + optionVal + "]").prop("selected", "selected");
        //    }
        //    $("#listEditLOS").multiselect('reload');
        //}
        //else {
        //    $("#ddlRoleedit").val($("#ddlRoleedit option").eq(0).val());
        //    $("#divlsteditlos").hide();

        //}
        //$("#divEditAdmin").modal('show');
    });

    $("#ddlRole").on("change", function () {
        $("#errRoleId").hide();
        if ($("#ddlRole").val() == 2)
            $("#divlos").show();
        else
            $("#divlos").hide();
    });

    $("#ddlRoleedit").on("change", function () {


        if (roletypeval == "Admin") {
            if ($("#ddlRoleedit").val() == 2) {
                $("#divlsteditlos").show();
            }
            else {
                $("#divlsteditlos").hide();
            }
        }

        else {
            $("#divlsteditlos").hide();

            if ($("#ddlRoleedit").val() == 2) {
                $("#diveditlos").show();
            }
            else {
                $("#diveditlos").hide();
            }

        }

        //alert(roletypeval);
        //if ($("#ddlRoleedit").val() == 1) {
        //    $("#divlsteditlos").show();
        //}
        //else {
        //    $("#divlsteditlos").hide();
        //}
        //if (roletypeval != "Admin") {
        //    if ($("#ddlRoleedit").val() == 2)
        //        $("#diveditlos").show();
        //    else
        //        $("#diveditlos").hide();
        //}
    });

    $('#userLOS_EmployeeId').keypress(function () {
        $("#errEmployeeId").hide();
    });
    $("#btnUploadAdmin").click(function () {
        $("#divUploadAdmin").modal('show');
    });

    $("#userRole_EmployeeId").change(function () {
        if ($("#hdnEmployeeName").val() != $("#userRole_EmployeeId").val()) {
            $("#hdnEmployeeId").val("");
            $("#hdnEmployeeName").val("");
        }
        if ($("#hdnEmployeeId").val() == "") {
            $("#userRole_EmployeeId").val("");
            return false;
        }
    });

    $("#btnSave").click(function () {
        ShowLoader();
        var Role = $("#ddlRole").val();


        var LOSId = "";

        if ($("#userLOS_EmployeeId").val() == "" || $("#hdnEmployeeName").val() != $("#userLOS_EmployeeId").val()) {
            if ($("#userLOS_EmployeeId").val() == "" || $("#hdnEmployeeName").val() != $("#userLOS_EmployeeId").val()) {
                $("#errEmployeeId").show();
                $("#hdnEmployeeId").val("");
                $("#hdnEnEmployeeId").val("");
                $("#hdnEmployeeName").val("");
            }

            HideLoader();
            return false;
        }

        if (Role == "") {
            $("#errRoleId").show();
            HideLoader();
            return false;
        }

        if (Role == 2) {
            var LOSId = $("#userLOS_LOSId :selected").map((_, e) => e.value).get().toString();
            if ($("#userLOS_EmployeeId").val() == "" || LOSId == "" || $("#hdnEmployeeName").val() != $("#userLOS_EmployeeId").val()) {
                if ($("#userLOS_EmployeeId").val() == "" || $("#hdnEmployeeName").val() != $("#userLOS_EmployeeId").val()) {
                    $("#errEmployeeId").show();
                    $("#hdnEmployeeId").val("");
                    $("#hdnEnEmployeeId").val("");
                    $("#hdnEmployeeName").val("");
                }
                if (LOSId == "") {
                    $("#errLOSId").show()
                }
                HideLoader();
                return false;
            }
        }

        //if ($("#userLOS_EmployeeId").val() == ""  || $("#hdnEmployeeName").val() != $("#userLOS_EmployeeId").val()) {
        //    if ($("#userLOS_EmployeeId").val() == "" || $("#hdnEmployeeName").val() != $("#userLOS_EmployeeId").val()) {
        //        $("#errEmployeeId").show();
        //        $("#hdnEmployeeId").val("");
        //        $("#hdnEnEmployeeId").val("");
        //        $("#hdnEmployeeName").val("");
        //    }
        //    if (LOSId == "") {
        //        $("#errLOSId").show()
        //    }
        //    HideLoader();
        //}
        //else {

        $.ajax({
            url: '/Admin/CheckEmployeeName',
            type: 'GET',
            data: {
                employeeId: $("#hdnEmployeeId").val()
            },
            dataType: 'JSON',
            success: function (data) {
                if (data == true) {
                    var errMessage = "Admin already exists !!!";
                    $('#errMsg').text(errMessage);
                    $('#adminErrorModal').modal('show');
                    HideLoader();
                    return false;
                }
                else {
                    $.ajax({
                        type: "GET",
                        url: "/Admin/AddAdminDetails",
                        dataType: "json",
                        data: {
                            employeeId: $("#hdnEmployeeId").val(),
                            LOSId: LOSId,
                            Role: Role

                        },
                        statusCode: {
                            200: function () {
                                HideLoader();
                                $("#adminSuccessModal").modal("show");
                                loadAdminDetails();
                                $("#divAddAdmin").modal('hide');
                            }
                        }
                    })
                }
            },
            error: function (response) {
                //alert(response.responseText);
            },
            failure: function (response) {
                //alert(response.responseText);
            }
        })

        //}
    });

    $("#btnUpdate").click(function () {
        var LOSId = "";
        ShowLoader();
        var Role = $("#ddlRoleedit").val();

        $.ajax({
            url: '/Admin/DeleteEmployeeName',
            type: 'GET',
            data: {

                employeeId: emp
            },
            dataType: 'JSON',
            success: function (data) {
                if (data == true) {

                }
                else {
                    if (Role == 2) {
                        LOSId = $("#listEditLOS :selected").map((_, e) => e.value).get().toString();
                        if (LOSId == "") {
                            $("#errEditLOSId").show();
                            HideLoader();
                        }
                    }
                    var IsActive = true;
                    if ($('#chkAdminIsActive').is(':checked')) {
                        IsActive = true;
                    }
                    else {
                        IsActive = false;
                    }
                    $.ajax({
                        type: "GET",
                        url: "/Admin/UpdateAdminDetails",
                        dataType: "json",
                        data: {
                            employeeId: $("#hdnEditEnEmployeeId").val(),
                            LOSId: LOSId,
                            isActive: IsActive,
                            roleId: Role
                        },
                        statusCode: {
                            200: function () {
                                $("#divEditAdmin").modal("hide");
                                $("#lblMessage").text("Admin detail updated successfully");
                                loadAdminDetails();
                                $("#adminSuccessModal").modal("show");
                                HideLoader();
                            }
                        }
                    })

                }


            },
            error: function (response) {
                //alert(response.responseText);
            },
            failure: function (response) {
                //alert(response.responseText);
            }
        })




    });

    $("#btnEditAdminModal").click(function () {
        loadAdminDetails();
        $("#divEditAdmin").modal('hide');
        $('.modal-backdrop').remove();
        $("#listEditRole").multiselect('reset');
    });



    $("#btnAdminSearchClear").click(function () {
        $("#employeeIdSearch").val("");
        $("#ddlLOS").val("");
        loadAdminDetails();
    });

    $("#btnReset").click(function () {
        $("#divAddAdmin").modal('hide');
    });

    $("#btnUpdateReset").click(function () {
        loadAdminDetails();
        $("#divEditAdmin").modal('hide');
        $("#ddlRoleedit").val("");
        $("#hdnEditEnEmployeeId").val("");
        $(".selectListBox").multiselect('reset');
        //if (roletypeval != "Admin") {
        //    if ($("#ddlRoleedit").val() == 2)
        //        $("#diveditlos").show();
        //    else
        //        $("#diveditlos").hide();
        //}
    });

    $(document).on('click', '.btnInActiveAdmin', function (e) {
        var grid = $("#adminListingGrid").data("kendoGrid");
        var dataItem = grid.dataItem($(this).closest('tr'));
        $("#txtDeleteAdmin").val(dataItem.employeeId);
        $("#divDeleteAdmin").modal('show');
    });

    $("#btnInActiveAdminConfirm").click(function () {
        $.ajax({
            type: "GET",
            url: "/Admin/DeleteAdminDetails",
            dataType: "json",
            data: {
                employeeId: $("#txtDeleteAdmin").val()
            },
            statusCode: {
                200: function () {
                    $("#divDeleteAdmin").modal('hide');
                    $('.modal-backdrop').remove();
                    loadAdminDetails();
                }
            }
        })
    });

    $("#btnDeleteAdminCancel").click(function () {
        $("#divDeleteAdmin").modal('hide');
    });
});