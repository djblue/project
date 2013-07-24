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
app.use(express.compress());
app.use(express.bodyParser());
// Validator must be used directly after bodyParser.
app.use(express.methodOverride());
app.use(express.cookieParser());
app.use(express.session({secret: '97e0089deda4f396f7e3a85c8aa62e37'}));
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'views')));


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

app.get('/tests', function (req, res) {
    res.sendfile(path.join( __dirname, 'views/tests.html'));    
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
app.get('/squestions', questions.getBySession);
app.post('/questions', function (req, res) {
    questions.post(req, res);
    io.sockets.emit('questions', questions.get_questions());
});
app.put('/questions/:id', function(req, res) {
    questions.confirm(req, res);
    io.sockets.emit('questions', questions.get_questions());
});
app.delete('/questions/:id', function(req, res) {
    questions.delete(req, res);
    io.sockets.emit('questions', questions.get_questions());
});

server.listen(3000, function(){
  console.log('Express server listening on port ' + app.get('port'));
});
