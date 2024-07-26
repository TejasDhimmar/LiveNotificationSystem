$(document).ready(function () {

    $('#registerForm').on('submit', function (e) {
        e.preventDefault(); // Prevent the default form submission

        // Get the form values
        const name = $('#txt_name').val();
        const email = $('#txt_email').val();
        const mobile = $('#txt_mobileno').val();
        const password = $('#txt_password').val();

        // Create the payload for the API call
        const payload = {
            name: name,
            email: email,
            mobileno: mobile,
            password: password
        };

        $data = JSON.stringify(payload);
        $url = 'users/register'
        CallAPI($url, $data, {}, "POST", function (data) {
            success(data.message);
            // Redirect to the login page after a short delay
            setTimeout(function () {
                window.location.href = 'index.html';
            }, 1500);
        }, function (errData) {
            error(errData)
        })
    });
});
