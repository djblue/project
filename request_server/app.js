/**
 * Module dependencies.
 */

var util = require('util')
  , express = require('express')
  , expressValidator = require('express-validator')
  , routes = require('./routes')
  , user = require('./routes/user')
  , courses = require('./routes/courses')
  , questions = require('./routes/questions')
  , http = require('http')
  , path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
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

app.get('/', routes.index);
app.get('/users', user.list);

app.get('/courses', courses.get);
app.post('/courses', courses.post);

app.get('/questions', questions.get);
app.post('/questions', questions.post);
app.delete('/questions/:id', questions.delete);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
