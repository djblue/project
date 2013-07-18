/**
 * Module dependencies.
 */

var util                = require('util')
  , express             = require('express')
  , app                 = express()
  , server              = require('http').createServer(app)
  , io                  = require('socket.io').listen(server)
  , path                = require('path')

  , subjects            = require('./routes/subjects')
  , courses             = require('./routes/courses')
  , questions           = require('./routes/questions');

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
//app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
// Validator must be used directly after bodyParser.
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

app.get('/questions_queue', function (req, res) {
    res.sendfile(path.join( __dirname, 'views/queue.html'));    
});

app.get('/subjects', subjects.findAll);
/*
app.get('/subjects/:id', subjects.findById);
app.post('/subjects', subjects.addSubject);
app.put('/subjects/:id', subjects.updateSubject);
app.delete('/subjects/:id', subjects.deleteSubject);
*/

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

server.listen(3000, function(){
  console.log('Express server listening on port ' + app.get('port'));
});
