
var emp = "";
var roletypeval = "";
var updatestatus = "";
$(function () {

    $("#btnSubmit").click(function () {
        debugger;
        //var result = TempData["MasterErrorMsg"];
        var menuId = "";
        if (updatestatus != "") {
            menuId = updatestatus;
        }

        var Menu = $('#txtMenu').val().trim();
        var DisplayMenu = $('#txtDisMenu').val().trim();

        var Priority = $('#txtPriority').val().trim();
        var PageUrl = $('#txtPageUrl').val().trim();
        var ParentID = $('#ddlmenu').val().trim();
       
        if (Menu == "") {
            var val = GetPageErrorMsgByPageId(1, "003");
            
            return;
        }
        if (DisplayMenu == "") {
            var val = GetPageErrorMsgByPageId(1, "031");

            return;
        }
        if (Priority == "") {
           //alert("Please Enter Priority");
            var val = GetPageErrorMsgByPageId(1, "004");
            alert(val);
            return;
        }
        if (PageUrl == "") {
            //alert("Please Enter PageUrl");
            var val = GetPageErrorMsgByPageId(1, "005");
            alert(val);
            return;
        }
        var chk1 = $("input[name='IsStatusTrue']:checked").val();
        var chk2 = $("input[name='IsStatusFalse']:checked").val();
        if (chk1 == "true") {
            status = true;

        }
        else {

            status = false;
        }

        debugger;
        $.ajax({
            url: "../Home/SaveMenu",
            type: "GET",
            dataType: "json",
            data: { menuId: menuId, Menu: Menu, DisplayName: DisplayMenu, sequenceNumber: Priority, PageUrl: PageUrl, parentId: ParentID, status: status },
            success: function (data) {
                debugger;
                alert(data.Message);
              //  if (data.Id == 0) {
              //      alert("Menu Name is alreay exists! ");
              //  }
              ////  $("#adminSuccessModal").modal("show");
              // else if (updatestatus != "") {
              //      alert("Menu Updated successfully! ");
              //  }
              //  else {
              //      alert("Menu Added successfully! ");
              //  }
                location.reload();
                updatestatus = "";
                loadAdminDetails();
                $("#txtMenu").val("");
                $("#txtDisMenu").val("");
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

    function GetMenu(id, name) {

        $.ajax({
            url: '/Home/GetMenuList',
            type: "GET",
            contentType: "application/json;charset=UTF-8",
            dataType: "json",
            success: function (result) {
                var html = '<option value= 0 selected>Select Parent Menu</option>';
                $('#ddlmenu').val("").attr("disabled", false);

                $.each(result, function (key, item) {


                    if (item.id == id) {
                        html += '<option value="' + item.id + '" selected>' + item.name + '</option>';
                        $('#ddlmenu').val(id).attr("disabled", false);
                    }
                    else {
                        html += '<option value="' + item.id + '">' + item.name + '</option>';
                        $('#ddlmenu').val(id).attr("disabled", false);
                    }
                });
                $('#ddlmenu').html(unescape(escape(html)));
            },
            error: function (errormessQunatity) {
                alert(errormessQunatity.responseText);
            }
        });
        return false;
    }

    var totalItemCount = 0;
    loadAdminDetails();

    function loadAdminDetails() {
        GetMenu("");
        $('input[name=txtMenu]').prop('disabled', false);
        $('#IsStatusTrue').prop('checked', true);
        $("#adminListingGrid").kendoGrid({
            width: 1350,
            
            //headerStyle: "{'font-size' : '14px'}",
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
                { hidden: true, field: "menuID", title: "Menu_ID", width: "120px", type: "text" },
                { field: "menuName", title: "Menu", width: "120px", type: "text" },
                { hidden: true, field: "parentMenuID", title: "Parent_ID", width: "120px", type: "text" },
                { field: "parentMenuName", title: "Parent Menu", width: "120px", type: "text" },
                { field: "displayMenuName", title: "Display Name", width: "120px", type: "text" },
                { field: "sequenceNumber", title: "Sequence No.", width: "120px", type: "text" },
                { field: "pageURL", title: "Page URL", width: "120px", type: "text" },
                { hidden: true, field: "statusID", title: "Status", width: "120px", type: "text" },
                { field: "status", title: "Status", width: "120px", type: "text" },
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
                url: "/Home/GetMenuListings",
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
       
       // $("#errEditLOSId").hide();
        var grid = $("#adminListingGrid").data("kendoGrid");
        var dataItem = grid.dataItem($(this).closest('tr'));
        GetMenu(dataItem.parentMenuID, dataItem.parentMenuName);
        updatestatus = dataItem.menuID;
      
        $("#txtMenu").val(dataItem.menuName);
        $("#txtDisMenu").val(dataItem.displayMenuName);
        $("#txtPageUrl").val(dataItem.pageURL);
        $("#txtPriority").val(dataItem.sequenceNumber);
        $('input[name=txtMenu]').prop('disabled', true);
       
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

function GetPageErrorMsgByPageId(pageId, errorCode) {
    var returnval = "";
    $.ajax({
        url: "../Home/GetPageErrorMsgByPageId",
        type: "GET",
        dataType: "json",
        data: { PageId: pageId, ErrorCode: errorCode },
        success: function (data) {
            returnval = data.Message;
            alert(returnval);
        },
        error: function (data) {
           
        }
    });
    return returnval;
}