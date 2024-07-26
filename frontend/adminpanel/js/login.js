$(document).ready(function () {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminData");
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
        $url = 'admin/login'
        CallAPI($url, $data, {}, "POST", function (data) {
            const payloadData = data.data;
            localStorage.setItem("adminToken", payloadData.token)
            localStorage.setItem("adminData", JSON.stringify(payloadData))
            window.location.href = "dashboard.html";
            
        }, function (errData) {
            error(errData)
        })
    });
});
