'use strict';

// setup express application
var express             = require('express')
  , app                 = express()
  , server              = require('http').createServer(app)
  , io                  = require('socket.io').listen(server)
  , path                = require('path')

  , compression         = require('compression')
  //, morgan              = require('morgan')   
  , bodyParser          = require('body-parser')
  , session             = require('express-session')
  , MongoStore          = require('connect-mongo')(session)

  , scheduler           = require('./api/scheduler')
  , sessions            = require('./api/sessions')
  , questions           = require('./api/questions')
  , statistics          = require('./api/statistics')
  ;

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

//app.use(morgan('tiny'));
app.use(compression());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(session({
  resave: false,
  secret:'97e0089deda4f396f7e3a85c8aa62e37',
  store: new MongoStore({ db: 'sessions' })
}));

app.use(express.static(path.join(__dirname, 'public')));

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

sessions.setup(app);
questions.setup(app, io);
scheduler.setup(app);
statistics.setup(app);

// finally export application to be run as server or testing.
exports.app = app;

exports.listen = function () {
  server.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
  });
};
