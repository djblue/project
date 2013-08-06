/*
 * Questions API
 * ================================================================
 * URL              Method  Result
 * ================================================================
 * /questions       GET     Get all unanswered questions.
 * /questions       POST    Add a new question.
 * /questions/:id   PUT     Update a question, complete, etc.
 * /questions/:id   Delete  Cancel a question.
 *
 */

var _           = require('underscore')
  , statistics  = require('./statistics');

 // The question queue; module scope.
var questions = [];
//var db = [];

var id_gen = 0;

exports.get_questions = function () {
    return questions;
};

exports.get = function(req, res) {
/*
    db.collection('questions', function(err, collection) {
        collection.find().toArray(function(err, items) {
            console.log('Found items.');
            console.log(items);
            // Return the current question queue.
            res.json(items);
            //res.end(items);
        });
    });
    */
};



/*
exports.findAll = function (req, res) {
    db.collection('subjects', function(err, collection) {
        collection.find().toArray(function(err, items) {
            res.send(items);
        });
    });
};
*/

/*
exports.findById = function (req, res) {
    var id = req.params.id;
    console.log('Retrieving subject: ' + id);
    db.collection('subjects', function(err, collection) {
        collection.findOne({ _id: new BSON.ObjectID(id) }, function(err, item) {
            res.send(item); 
        }); 
    });
};

exports.addSubject = function (req, res) {
    var subject = req.body;
    console.log('Adding subject: ' + JSON.stringify(subject));
    db.collection('subjects', function (err, collection) {
        collection.insert(subject, {strict: true}, function (err, result) {
            if (err) {
                res.send({'error': 'An error has occured' + err});
            } else {
                console.log('Success: ' + JSON.stringify(result[0]));
                res.send(result[0]);
            }
        });
    });
};

exports.updateSubject = function (req, res) {
    var id      = req.params.id
      , subject = req.body;

    console.log('Updating subject: ' + id);

    db.collection('subjects', function (err, collection) {
        collection.update( { _id: new BSON.ObjectID(id) }, subject, {safe: true}, function (err, result) {
            if (err) {
                res.send({'error': 'An error has occured' + err});
            } else {
                console.log('' + result + ' document(s) updated.');
                res.send("Success");
            }
            
        });
    });
};

exports.deleteSubject = function (req, res) {
    var id = req.params.id;
    console.log('Deleting subject: ' + id);
    db.collection('subjects', function (err, collection) {
        collection.remove( { _id: new BSON.ObjectID(id) }, {safe: true}, function (err, result) {
            if (err) {
                res.send({'error': 'An error has occured' + err});
            } else {
                console.log('' + result + ' document(s) deleted.');
                res.send("Success");
            }
            
        });
    });
};

var populatedb = function () {

    var subjects = [
        { title: "Math",                                 prefix: "MAT"},
        { title: "Computer Science",                     prefix: "CSE"},
        { title: "Mechanical and Aerospace Engineering", prefix: "MAE"},
        { title: "Electrical Engineering",               prefix: "EEE"},
        { title: "Chemistry",                            prefix: "CHM"},
        { title: "Physics",                              prefix: "PHY"}
    ];

    db.collection('subjects', function (err, collection) {
        collection.insert(subjects, function (err, result) {
            console.log(result);
        });
    });
};
*/

exports.getBySession = function(req, res) {

    var q = _(questions)
        .where({ user_id:  req.session.id}) 
        .map(function (obj) { return _.omit(obj,'user_id', 'begin') });

    // Return the current question queue.
    res.json(q); 

};

exports.post = function(req, res) {

    var date = new Date();

    questions.push({
        _id: id_gen,
        user_id: req.session.id, 
        course_id:  req.body.course_id,
        table_id:  req.body.table_id,
        begin: date.getTime()
    });

    res.json({ _id: id_gen });

    id_gen += 1;
};

exports.confirm = function(req, res) {

    var id = req.params.id;

    var i = 0, len = questions.length;

    for (; i < len; i++) {
        if (questions[i]._id == id) break; 
    }

    if (i == len) { 
        res.send("Not Found");// Error Not Found.
    } else { 

        var obj = questions.splice(i, 1)[0]; // Deleting entry
        var date = new Date();
        obj.diff = date.getTime() - obj.begin;

        // db.push(_.omit(obj,'user_id', '_id'));
        var question = _.omit(obj,'user_id', '_id');/*[obj.course_id, obj.begin, end - obj.begin];*/

        statistics.updateWeeks(question);

    /*
        db.collection('questions', function (err, collection) {
            collection.insert(question, {strict: true}, function (err, result) {
                if (err) {
                    res.send({'error': 'An error has occured' + err});
                } else {
                    console.log('Success: ' + JSON.stringify(result[0]));
                    res.send(result[0]);
                }
            });
        });
    */

        res.send(obj); // return deleted entry.
    }
}

exports.delete = function(req, res) {

    var id = req.params.id;

    var i = 0, len = questions.length;

    for (; i < len; i++) {
        if (questions[i]._id == id) break; 
    }

    if (i == len) { 
        res.send("Not Found");// Error Not Found.
    } else { 
        var obj = questions.splice(i, 1); // Deleting entry
        res.send(obj); // return deleted entry.
    }

};
