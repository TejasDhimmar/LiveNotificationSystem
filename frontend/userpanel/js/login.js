$(document).ready(function () {
    localStorage.removeItem("userToken");
    localStorage.removeItem("userData");
    $('#loginForm').on('submit', function (e) {
        e.preventDefault(); // Prevent the default form submission

        // Get the email and password values from the form
        const email = $('input[type="email"]').val();
        const password = $('input[type="password"]').val();

        // Create the payload for the API call
        const payload = {
            email: email,
            password: password
        };

        $data = JSON.stringify(payload);
        $url = 'users/login'
        CallAPI($url, $data, {}, "POST", function (data) {
            const payloadData = data.data;
            localStorage.setItem("userToken", payloadData.token)
            localStorage.setItem("userData", JSON.stringify(payloadData))
            window.location.href = "notification.html";
        }, function (errData) {
            error(errData)
        })
   });
});
