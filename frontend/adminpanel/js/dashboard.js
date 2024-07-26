$(document).ready(function () {
    let adminData = JSON.parse(localStorage.getItem("adminData"));
    $("#username").text(adminData.name);
    $headers = {
        "authToken": localStorage.getItem("adminToken")
    }

    $url = 'admin/dashboard'
    CallAPI($url, {}, $headers, "GET", function (data) {
        // Bar Chart
        let payloadData = data.data;
        let notificationChannels = []
        let notificationChannelData = [];

        let notificationData = payloadData.notificationData;
        for (let i = 0; i < notificationData.length; i++) {
            notificationChannels.push(notificationData[i].channel)
            notificationChannelData.push(notificationData[i].notification_count)
        }
        var barChartCanvas = $('#barChart').get(0).getContext('2d');
        var barChartData = {
            labels: notificationChannels,
            datasets: [
                {
                    label: 'Notifications',
                    backgroundColor: 'rgba(60,141,188,0.9)',
                    borderColor: 'rgba(60,141,188,0.8)',
                    pointRadius: false,
                    pointColor: '#3b8bba',
                    pointStrokeColor: 'rgba(60,141,188,1)',
                    pointHighlightFill: '#fff',
                    pointHighlightStroke: 'rgba(60,141,188,1)',
                    data: notificationChannelData
                }
            ]
        };
        var barChartOptions = {
            responsive: true,
            maintainAspectRatio: false,
            datasetFill: false
        };
        new Chart(barChartCanvas, {
            type: 'bar',
            data: barChartData,
            options: barChartOptions
        });


        let userChannels = [];
        let userChannelData = [];

        let userChannelCount = payloadData.channelData;
        for (let i = 0; i < userChannelCount.length; i++) {
            userChannels.push(userChannelCount[i].channel);
            userChannelData.push(userChannelCount[i].user_count);
        }

        var donutChartCanvas = $('#donutChart').get(0).getContext('2d');
        var donutData = {
            labels: userChannels,
            datasets: [
                {
                    data: userChannelData,
                    backgroundColor: ['#f56954', '#00a65a', '#f39c12'],
                }
            ]
        };
        var donutOptions = {
            maintainAspectRatio: false,
            responsive: true,
            plugins: {
                tooltip: {
                    callbacks: {
                        label: function (context) {
                            let dataset = context.dataset;
                            let total = dataset.data.reduce((previousValue, currentValue) => previousValue + currentValue, 0);
                            let currentValue = dataset.data[context.dataIndex];
                            let percentage = Math.floor(((currentValue / total) * 100) + 0.5);
                            return `${context.label}: ${percentage}%`;
                        }
                    }
                },
                datalabels: {
                    formatter: (value, context) => {
                        let sum = context.chart.data.datasets[0].data.reduce((a, b) => a + b, 0);
                        let percentage = (value * 100 / sum).toFixed(2) + "%";
                        return percentage;
                    },
                    color: '#fff',
                }
            }
        };

        new Chart(donutChartCanvas, {
            type: 'doughnut',
            data: donutData,
            options: donutOptions
        });



    }, function (errData) {
        error(errData)
    })

})