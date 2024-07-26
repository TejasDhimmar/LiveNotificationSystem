var api_url = 'http://localhost:8000';

$(document).ready(function () {
    toastr.options = {
        "closeButton": true,
        "debug": false,
        "newestOnTop": true,
        "progressBar": true,
        "positionClass": "toast-top-right",
        "preventDuplicates": false,
        "onclick": null,
        "showDuration": "300",
        "hideDuration": "1000",
        "timeOut": "5000",
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
    };
});

function CallAPI($url, $data, $headers, $type = 'POST', successCallback, errorCallback) {
    $.ajax({
        type: $type,
        url: `${api_url}/api/${$url}`,
        data: $data,
        dataType: 'json',
        cache: false,
        contentType: false,
        processData: false,
        beforeSend: function (request) {
            request.setRequestHeader("Content-Type", "application/json");
            if ($headers.authToken)
                request.setRequestHeader("Authorization", "Bearer" + " " + $headers.authToken);
        },
        error: function (data) {
            if (typeof errorCallback != 'undefined') {
                var errors = data.responseJSON;
                if (typeof errors == 'string') {
                    errors = JSON.parse(errors);
                }
                if (typeof errors != 'undefined' && typeof errors.message != 'undefined' && typeof errors.message == 'string') {
                    errorCallback(errors.message);
                } else if (typeof errors != 'undefined' && typeof errors.message != 'undefined') {
                    jQuery.each(errors.message, function (key, value) {
                        errorCallback(value);
                    });
                }
                else if (data.status == 400) {
                    window.location.href = "index.html"
                }
                else if (data.status == 401) {
                    window.location.href = "index.html"
                }
            }
        },
        success: function (data) {
            successCallback(data);
        },
    });
}

function success(message) {
    toastr.success(message);
}

function error(message) {
    toastr.error(message);
}

function userLogout() {
    localStorage.removeItem("userToken");
    localStorage.removeItem("userData");
    window.location.href = "index.html";
}

function adminLogout() {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminData");
    window.location.href = "index.html";
}