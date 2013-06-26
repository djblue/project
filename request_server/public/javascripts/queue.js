window.onload = function() {

    var socket = io.connect(); // Defaults to server
    var content    = document.getElementById("content");

    socket.on('questions', function (data) {

        content.innerHTML = JSON.stringify(data);

    });

};
