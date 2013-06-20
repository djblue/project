var http     = require('http');
var express  = require('express');
var mongo       = require('mongodb');

var port   = 8080;
var queue  = [];
var app = express();
app.use(express.bodyParser());

app.post('/', function (req, res) {
    console.dir(req.body);
    res.send("test");
});

app.listen(port);
console.log("Listening on port " + port);
