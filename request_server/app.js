/**
 * Module dependencies.
 */

var util                = require('util')
  , express             = require('express')
  , expressValidator    = require('express-validator')
  , app                 = express()
  , server              = require('http').createServer(app)
  , io                  = require('socket.io').listen(server)
  , path                = require('path')

  , routes              = require('./routes')
  , user                = require('./routes/user')
  , courses             = require('./routes/courses')
  , questions           = require('./routes/questions');

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
//app.set('view engine', 'jade');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
// Validator must be used directly after bodyParser.
app.use(expressValidator());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

io.sockets.on('connection', function (socket) {
    socket.emit('questions', questions.get_questions());
});

app.get('/', function (req, res) {
    res.sendfile(path.join( __dirname, 'views/request.html'));    
});

app.get('/queue', function (req, res) {
    res.render("queue");
});

app.get('/courses', courses.get);
app.post('/courses', courses.post);

app.get('/questions', questions.get);
app.post('/questions', function (req, res) {
    questions.post(req, res);
    io.sockets.emit('questions', questions.get_questions());
});
app.delete('/questions/:id', function(req, res) {
    questions.delete(req, res);
    io.sockets.emit('questions', questions.get_questions());
});

server.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
