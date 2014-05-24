// the question queue api

var _           = require('underscore')
  , statistics  = require('./statistics')

    // the question queue and id generator
  , questions = []
  , tables = {} // hash of sessions to table id
  , table_ids = []
  , id_gen = 0;

for (var i = 0; i < 20; i++)
    table_ids.push(i+1);

exports.clear = function () {
    questions = []; 
    id_gen = 0;
};

// get the current question queue
var getQueue = function () { return questions; };

// return questions to user based on their session _id_
var getBySession = function (req, res) {

    // search questions queue by id
    var q = _(questions)
        .where({ user_id:  tables[req.session.id] }) 
        .map(function (obj) { return _.omit(obj,'user_id', 'begin'); });

    // send questions
    res.json(q); 
};

// add a question to the end of the queue
var add = function (req, res) {

    var date = new Date();

    questions.push({
        _id:        id_gen,
        user_id:    tables[req.session.id],
        course_id:  req.body.course_id,
        table_id:   tables[req.session.id],
        begin:      date.getTime()
    });

    // return the question id to the user
    res.json({ _id: id_gen });

    id_gen += 1;
};

// confirm that a question has been completed
var confirm = function (req, res) {

    var q = _(questions).findWhere({ _id: Number(req.params.id) })
      , i = questions.indexOf(q)
      , date = new Date();

    // questions not found
    if (i === -1) { 
        res.send(404);

    } else { 

        // remove question from queue
        q = questions.splice(i, 1)[0];

        // update stats
        q.diff = date.getTime() - q.begin;
        statistics.update(q);

        res.end();
    }
};

// delete question from queue
var del = function (req, res) {

    var q = _(questions).findWhere({ _id: Number(req.params.id) })
      , i = questions.indexOf(q);

    if (i == -1) { 
        res.send(404);

    } else { 
        // remove question from queue
        q = questions.splice(i, 1);

        res.end();
    }
};

exports.mount = function (app, io) {

    // update connected sockets
    var sockets = function (res, res, next) {
        io.sockets.emit('questions', questions);
    };

    app.get('/', function (req, res, next) {

        if (!!tables[req.session.id]) {
            next();
        } else {
            res.render('login', {
                message: '',
                available: table_ids
            });
        }

    }, function (req, res) {
        res.render('dynamic', {
            title: 'Request',
            style: 'request',
            production: 'production' === app.get('env'),
            main: 'request'
        });
    });

    app.post('/', function (req, res) {

        var i = Number(req.body.table);

        if (req.body.password != 'password') {
            res.render('login', {
                message: 'incorrect password',
                available: table_ids
            });
        } else if (table_ids.indexOf(i) == -1) {
            res.render('login', {
                message: 'table # not available',
                available: table_ids
            });
        } else {
            tables[req.session.id] = req.body.table;
            res.redirect('/');
        }

    });

    app.post('/questions', function (req, res) {
        add(req, res);
        sockets();
    });

    app.put('/questions/:id', function(req, res) {
        confirm(req, res);
        sockets();
    });
    app.delete('/questions/:id', function(req, res) {
        del(req, res);
        sockets();
    });

    app.get('/squestions', getBySession);


    io.sockets.on('connection', function (socket) {
        sockets();
    });
    
};
