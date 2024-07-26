$(document).ready(function () {
    notificationList();
    let userData = JSON.parse(localStorage.getItem("userData"));
    $("#username").text(userData.name);
    setChannelData();
    const socket = io(api_url);
    socket.emit("client_connect", userData.channels);
    socket.on("new_notification", (data) => {
        notificationList();
    })
})

function notificationList() {
    $url = 'users/notificationlist'
    $headers = {
        "authToken": localStorage.getItem("userToken")
    }
    CallAPI($url, {}, $headers, "GET", function (data) {
        var table = $('#tbl_user_notification').DataTable();
        table.destroy();
        table = $('#tbl_user_notification').DataTable({
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

$('#subscribeButton').on('click', function () {

    let ischk_learningChecked = $('#chk_learning').prop('checked');
    let ischk_supportChecked = $('#chk_support').prop('checked');

    if (!ischk_learningChecked && !ischk_supportChecked) {
        error('Please select at least one channel to subscribe.');
        return;
    }
    let amount = calculateAmount();

    $('#pay_amount').text(amount);
    // Open payment modal
    $('#paymentModal').modal('show');
});

$('#confirmPaymentButton').on('click', function () {

    let ischk_learningChecked = $('#chk_learning').prop('checked');
    let ischk_supportChecked = $('#chk_support').prop('checked');
    let channels = [];

    if (ischk_learningChecked) {
        channels.push(2)
    }
    if (ischk_supportChecked) {
        channels.push(3)
    }

    let amount = calculateAmount();

    const payload = {
        amount: amount,
        channels: channels
    };

    $data = JSON.stringify(payload);
    $url = 'users/subscribechannel';
    $headers = {
        "authToken": localStorage.getItem("userToken")
    }
    CallAPI($url, $data, $headers, "POST", function (data) {
        const payloadData = data.data;
        setChannelData();
        notificationList();
    }, function (errData) {
        error(errData)
    })

    // Close payment modal
    $('#paymentModal').modal('hide');
});

function calculateAmount() {
    var ischk_learningChecked = $('#chk_learning').prop('checked');
    var ischk_supportChecked = $('#chk_support').prop('checked');

    let amount = 0;
    if (ischk_learningChecked) {
        amount = amount + 150;
    }
    if (ischk_supportChecked) {
        amount = amount + 60;
    }

    return amount;
}

function setChannelData() {

    $url = 'users/userchannels'
    $headers = {
        "authToken": localStorage.getItem("userToken")
    }
    CallAPI($url, {}, $headers, "GET", function (data) {
        let payloadData = data.data;
        let learningChannel = payloadData.filter(data => data.channel_id == 2);
        let supportChannel = payloadData.filter(data => data.channel_id == 3);

        if (learningChannel.length > 0) {
            $('#chk_learning').hide();
        }
        if (supportChannel.length > 0) {
            $('#chk_support').hide();
        }
        if (learningChannel.length > 0 && supportChannel.length > 0) {
            $('#subscribeButton').hide();
        }
    }, function (errData) {
        error(errData)
    })


}

