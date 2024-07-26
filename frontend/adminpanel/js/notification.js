$(document).ready(function () {
    let adminData = JSON.parse(localStorage.getItem("adminData"));
    $("#username").text(adminData.name);
    notificationList();
})

$("#createModal").on('shown.bs.modal', function () {
    fillChannels();
});

function notificationList() {
    $headers = {
        "authToken": localStorage.getItem("adminToken")
    }
    $url = 'admin/notifications'
    CallAPI($url, {}, $headers, "GET", function (data) {
        var table = $('#tbl_notification').DataTable();
        table.destroy();
        table = $('#tbl_notification').DataTable({
            ordering: false,
            paging: true,
            searching: true
        });
        table.clear().draw();
        let payloadData = data.data;
        jQuery.each(payloadData, function (key, value) {
            table.row.add([
                value.title,
                value.description,
                value.channel,
                value.created_at
            ]).draw(false);
        })
    }, function (errData) {
        error(errData)
    })
}

function fillChannels() {
    $headers = {
        "authToken": localStorage.getItem("adminToken")
    }
    $url = 'admin/channels';
    CallAPI($url, {}, $headers, "GET", function (data) {
        $("#drp_channel").empty();
        let payloadData = data.data;
        $("#drp_channel").append("<option value=''>Select Channel</option>");
        jQuery.each(payloadData, function (key, value) {
            jQuery("#drp_channel").append('<option value="' + value.id + '">' + value.name + '</option>');
        });
    }, function (errData) {
        error(errData)
    })
}

function sendnotification() {
    const title = $('#txt_title').val();
    const description = $('#txt_description').val();
    const channel = $('#drp_channel').val();

    // Create the payload for the API call
    const payload = {
        title: title,
        description: description,
        channel_id: channel,
    };

    $headers = {
        "authToken": localStorage.getItem("adminToken")
    }
    $data = JSON.stringify(payload);
    $url = 'admin/sendnotification'
    CallAPI($url, $data, $headers, "POST", function (data) {
        $('#createModal').modal('hide');
        $('#notificationForm')[0].reset();
        success(data.message);
        notificationList();
    }, function (errData) {
        error(errData)
    })
}