'use strict';

// setup express application
var express             = require('express')
  , app                 = express()
  , server              = require('http').createServer(app)
  , io                  = require('socket.io').listen(server)
  , path                = require('path')
  , mongoose            = require('mongoose')

  , compression         = require('compression')
  , morgan              = require('morgan')
  , bodyParser          = require('body-parser')
  //, session             = require('express-session')
  //, MongoStore          = require('connect-mongo')(session)
  ;

// setup database connection
mongoose.connect('mongodb://localhost/questions');

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

if (process.env.NODE_ENV === 'production') {
  app.use(morgan('common'));
}

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('tiny'));
}

app.use(compression());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

/*
app.use(session({
  resave: false,
  secret:'97e0089deda4f396f7e3a85c8aa62e37',
  cookie: { maxAge: null },
  store: new MongoStore({ db: 'sessions' })
}));*/

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('/admin', path.join(__dirname, 'public/admin')));

// development only
if (app.get('env') === 'development') {
}

app.get('/queue', function (req, res) {
  res.render('dynamic', {
    socket: true,
    title: 'question queue',
    style: 'queue',
    production: 'production' === app.get('env'),
    main: 'queue'
  });
});


// synchronously load all api end points in api directory
require('fs').readdirSync('./api').forEach(function (file) {
  // check file is javascript file
  if (file.match(/\.js$/)) {
    var api = require('./api/' + file);
    if (typeof api.setup === 'function') {
      console.log('> exports.setup() in api/' + file);
      api.setup(app, io);
    }
  }
});

// finally export application to be run as server or testing.
exports.app = app;

exports.listen = function () {
  server.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
  });
};
