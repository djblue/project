// the question queue api

var _           = require('underscore')
  , statistics  = require('./statistics')

    // the question queue and id generator
  , questions = []
  , id_gen = 0;

exports.clear = function () {
    questions = []; 
    id_gen = 0;
};

// get the current question queue
exports.getQueue = function () { return questions; };

// return questions to user based on their session _id_
exports.getBySession = function (req, res) {

    // search questions queue by id
    var q = _(questions)
        .where({ user_id:  req.session.id }) 
        .map(function (obj) { return _.omit(obj,'user_id', 'begin'); });

    // send questions
    res.json(q); 
};

// add a question to the end of the queue
exports.add = function (req, res) {

    var date = new Date();

    questions.push({
        _id: id_gen,
        user_id: req.session.id, 
        course_id:  req.body.course_id,
        table_id:  req.body.table_id,
        begin: date.getTime()
    });

    // return the question id to the user
    res.json({ _id: id_gen });

    id_gen += 1;
};

// confirm that a question has been completed
exports.confirm = function (req, res) {

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
exports.delete = function (req, res) {

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
