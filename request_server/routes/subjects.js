/*
 * Subjects API
 * ================================================================
 * URL          Method  Result
 * ================================================================
 * /subjects    GET     Return all of the subjects.
 * /subjects    POST    Add a new subject.
 *
 */

var mongo  = require('mongodb');

var Server = mongo.Server,
    Db     = mongo.Db,
    BSON   = mongo.BSONPure;

var server = new Server('localhost', 27017, {auto_reconnect: true});
var db     = new Db('tutoringdb', server);

db.open(function (err, db) {
    if (!err) {
        console.log("Connected to 'tutoringdb' database.");
        db.collection('subjects', {strict: true}, function (err, collection) {
            if (err) {
                console.log("The 'subjects' collection doesn't exist. Creating.");
                populatedb();
            }
        });
    }
});


exports.findAll = function (req, res) {
    db.collection('subjects', function(err, collection) {
        collection.find().toArray(function(err, items) {
            res.send(items);
        });
    });
};

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

