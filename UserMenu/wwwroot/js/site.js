﻿function ValidateDate(str) {
    var regex = /^(?:(?:31(\/)(?:0?[13578]|1[02]|(?:Jan|Mar|May|Jul|Aug|Oct|Dec)))\1|(?:(?:29|30)(\/)(?:0?[1,3-9]|1[0-2]|(?:Jan|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec))\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/)(?:0?2|(?:Feb))\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/)(?:(?:0?[1-9]|(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep))|(?:1[0-2]|(?:Oct|Nov|Dec)))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/;
    //var str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
    if (regex.test(str)) {
        return true;
    }
    return false;
}

function ValidateTextArea(e) {
    var regex = /^[ A-Za-z0-9_./#&+-/$()@@\n\"]*$/m;
    var str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
    if (regex.test(str)) {
        return true;
    }

    e.preventDefault();
    return false;
}

$.ajaxSetup({
    beforeSend: function (xhr, settings) {
        if (settings.type == 'POST') {            
            if (settings.data?.constructor.name == "FormData") {
                var token = $('.commonForm').serializeArray()[0];
                settings.data.append(token.name, token.value)
            }
            else {
                settings.data = $('.commonForm').serialize() + '&' + settings.data
            }
        }
    }
});