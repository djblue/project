// enables statistical tracking using mongodb

// setup database client and server connections
var Server = require('mongodb').Server
  , Client = require('mongodb').MongoClient

  , dbname = 'statistics'

  , server = new Server('localhost', 27017, {auto_reconnect: true})
  , client = new Client(server)

  , db;

// attempt to connect to the database
client.open(function(err, client) {
    if (!err) { db = client.db(dbname); } 
    else {
        console.error(err);
        console.error('Statistical tracking will not be enabled.');
    }
});

// function to approximate the week of the year
Date.prototype.getWeek = function () {
    var onejan = new Date(this.getFullYear(),0,1);
    return Math.ceil((((this - onejan) / 86400000) + onejan.getDay()+1)/7);
};

// function to approximate the current semester
Date.prototype.getSemester = function () {

    var semester;

    if (this.getMonth() <=5 && this.getDate() <= 11) {
        semester = "SP";
    } else if (this.getMonth() <=8 && this.getDate() <= 15) {
        semester = "SU";
    } else {
        semester = "FA";
    }   

    // append the year to approximated term
    return semester + this.getFullYear();
};

// save update to database
var save = function (span, id, update) {
    
    // connect to collection to make appropriate updates
    if (!!db) {
         db.collection(span, function (err, collection) {
            
            // find the collection and upsert the updates
            collection.update( { _id: id },

                { $inc: update }, {upsert: true}, 
                    function (err, result) {
                        if (!err) { 
                            console.log('SUCCESS: updated '+id); 
                        } else { 
                            console.log('ERROR: unable to update '+id); 
                        }
                    }
            );
        });
    }
};

// update statistical data
var update = function (span, question) {
    
    var date = new Date(question.begin)
      , update = {}
      , id
      , d_id;

    // the id for each span is nested to allow for easier querying
    if (span === "semesters") {
        id = ','+date.getSemester();
        d_id = date.getWeek();
        
    } else if (span === "weeks") {
        id = ','+date.getSemester()+','+date.getWeek();
        d_id = date.getDay();

    } else if (span === "days") {
        id = ','+date.getSemester()+','+date.getWeek()+','+date.getDay();
        d_id = date.getHours();

    //  unsupported time span
    } else { throw "unsupported span"; }

    // update totals for: questions, time, per course
    update["data."+d_id+".time"] = Math.floor(question.diff/1000);
    update["data."+d_id+".total"] = 1;
    update["data."+d_id+".questions."+question.course_id] = 1;

    // save update to database 
    save(span, id, update);
};

// update statistics questions with respect to all time spans
exports.update = function (question, status) {
    update('days', question);
    update('weeks', question);
    update('semesters', question);
};

// allows users to query statistics database by time spans
exports.get = function(req, res) {

     var q = req.query
       , collection
       , constraints = "";

    // map valid spans to collections
    var spans = {
        'weekly': 'semesters',
        'daily':  'weeks',
        'hourly': 'days'
    };

    // validate constraints
    if (!!q.term) {
        constraints += "," + q.term;
        collection = spans.weekly;
        if (!!q.week) {
            constraints += "," + q.week;
            collection = spans.daily;
            if (!!q.day) {
                constraints += "," + q.day;
                collection = spans.hourly;
            }
        }

    // default to the current semester 
    } else { 
        var date = new Date();
        constraints += "," + date.getSemester();
        collection = 'semesters';
    }

    // validate span
    if ( !!spans[q.span] ) { collection = spans[q.span]; }

    // check database connection
    if (!!db) {

        // make query and send result
        db.collection(collection, function (err, collection) {

            var data = [];

            collection.find({ _id: RegExp(constraints) })
                .each(function (err, item) {
                    if ( !!item ) {
                        for (var key in item.data) {
                            item.data[key].label = key;
                            data.push(item.data[key]); 
                        }

                    } else { res.json(data); }
                });
        });

    } else { res.send(500); }
};
