/*
 * Statistic API
 */

var Server = require('mongodb').Server
  , Db     = require('mongodb').Db;

var dbname = 'statistics';

var server = new Server('localhost', 27017, {auto_reconnect: true});
var db     = new Db('statistics', server);

Date.prototype.getWeek = function() {
    var onejan = new Date(this.getFullYear(),0,1);
    return Math.ceil((((this - onejan) / 86400000) + onejan.getDay()+1)/7);
} 


db.open(function (err, db) {
    if (!err) {
        console.log("Connected to '" + dbname + "' database.");
        db.collection('weeks', {strict: true}, function (err, collection) {
            if (err) {
                console.log("The 'weeks' collection doesn't exist. Creating.");
            }
        });
    }
});

exports.updateWeeks = function addQuestion(question) {

    db.collection('weeks', function (err, collection) {

        var date = new Date(question.begin);
        var course_id = question.course_id;
        var year = date.getFullYear();
        var week = date.getWeek();
        var day  = date.getDay();
        var hour = date.getHours();
        var id   = '' + week + '-' + year;

        var weeks = "questions."            + course_id;
        var days  = "days."+day+".questions."       + course_id;
        var hours = "days."+day+".hours."+hour+".questions." + course_id;

        var obj = {};
        obj[weeks] = 1;
        obj[days]  = 1;
        obj[hours] = 1;

        var update = {$inc: obj };

        collection.update( { _id: id }, update, {upsert: true, safe: true}, function (err, result) {
            if (err) {
                console.log(err);
            } else {
                console.log('' + result + ' document(s) updated.');
            }
            
        });
    });
}

/*
 * How to do the statistics:
 *
 * Find the objects you want to update
 *
 *      db.statistics.update({ "time": "span" }, { 
 * 
 * Increment the course_id; if it doesn't exist create questions starting
 * at 1.
 *
 *          $inc: { "questions.course_id" : 1 } }, {
 *
 * Update all objects that are matched.
 *
 *              multi: true, 
 *
 * If there are no matched objects, create one.
 *
 *              upsert: true
 *      });
 *
 * This snippet is dense by concise and efficient.
 *
 */
