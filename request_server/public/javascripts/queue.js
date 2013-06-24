window.onload = function() {

    var socket = io.connect('http://localhost:3000');
    var content    = document.getElementById("content");

    socket.on('questions', function (data) {

        content.innerHTML = JSON.stringify(data);

    });

};
