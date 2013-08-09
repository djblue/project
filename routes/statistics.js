// Enables statistical tracking using mongodb.

// ## Setup

// Setup database server and client.
var Server = require('mongodb').Server
  , Db     = require('mongodb').Db
  , dbname = 'statistics'
  , server = new Server('localhost', 27017, {auto_reconnect: true})
  , db     = new Db(dbname, server);

// Attempt to connect to the database.
db.open(function (err, db) {
    // __Successful__ connection.
    if (!err) { 
        console.log("Connected to '"+dbname+"' database."); 
    // __Failed__ connection.
    } else { 
        console.log("Unable to connected to '"+dbname+"' database."); 
    }
});

// ## Date Trackers

// Function to approximate the week of the year.
Date.prototype.getWeek = function () {
    var onejan = new Date(this.getFullYear(),0,1);
    return Math.ceil((((this - onejan) / 86400000) + onejan.getDay()+1)/7);
} 

// Function to approximate the current semester.
Date.prototype.getSemester = function () {

    var semester;

    if (this.getMonth() <=5 && this.getDate() <= 11) {
        semester = "SP";
    } else if (this.getMonth() <=8 && this.getDate() <= 15) {
        semester = "SU";
    } else {
        semester = "FA";
    }   

    // After the term is approximated, append the year.
    return semester + this.getFullYear();
}


// ## save(span, id, update)
//
// After an update is generated, this function saves it to the database.
//
// __span__ - the time span to save to; translates directly to a collection.
//
// __id__ - the id to of obj to update.
// 
// __update__ - actual update to apply.

var save = function (span, id, update) {
    
    // connect to collection to make appropriate updates
    db.collection(span, function (err, collection) {
        
        // find the collection and upsert the updates
        collection.update( { _id: id },

            { $inc: update }, {upsert: true, safe: true}, 
                function (err, result) {
                    if (!err) { 
                        console.log('SUCCESS: updated '+id); 
                    } else { 
                        console.log('ERROR: unable to update '+id); 
                    }
                }
        );
    });
};

// ## update(span, question)
//
// After a questions is _confirmed_, the system updates its statistical
// database with this function. There will be 1 object per time span.
//
// __span__ - the time span to update. Supported:
//
// 1. semesters
// 2. weeks
// 3. days
//
// __question__ - the actual question which was confirmed.

var update = function (span, question) {
    
    // Begin decomposing the question, by create a date object.
    var date = new Date(question.begin)
      , update = {}
      , id
      , d_id;

    // ## Supported time spans
    // The id for each span is nested. This allows for easier querying.

    if (span === "semesters") {
        id = ','+date.getSemester();
        d_id = date.getWeek();
        
    } else if (span === "weeks") {
        id = ','+date.getSemester()+','+date.getWeek();
        d_id = date.getDay();

    } else if (span === "days") {
        id = ','+date.getSemester()+','+date.getWeek()+','+date.getDay();
        d_id = date.getHours();

    //  _unsupported_ time span, throw error 
    } else { throw "unsupported span"; }

    // ## Construct the update

    // Update the specific __course__ by its __id__.
    update["data."+d_id+".questions."+question.course_id] = 1;

    // Update the total number of questions
    update["data."+d_id+".total"] = 1;

    // _Total_ time to answer all questions in seconds.
    update["data."+d_id+".time"] = Math.floor(question.diff/1000);

    // Apply update to database. 
    save(span, id, update);
};

// ## updateAll(question)
//
// Update statistics questions with respect to all time spans.

exports.updateAll = function (question) {
    update('days', question);
    update('weeks', question)
    update('semesters', question);
}

// ## get(req, res)

// Allows users to query statistics database.

// Parameters:
 
// * term [FA2013 SU2013, SP2014]
// * week [1..18]
// * day  [1..5]
// * span [weekly, daily, hourly]

// Example: get the Friday of the first week of the term Fall 2012.

//      statistics?term=FA2013&week=1&day=5&span=hourly

// Returns an array of hours on that paricular day..

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
        collection = spans["weekly"];
        if (!!q.week) {
            constraints += "," + q.week;
            collection = spans["daily"]
            if (!!q.day) {
                constraints += "," + q.day;
                collection = spans["hourly"];
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

    // make query and send result
    db.collection(collection, function (err, collection) {

        var data = [];

        collection.find({ _id: RegExp(constraints) }).each(function (err, item) {
            
            // grab data from queried time spans
            if ( !!item ) {
                for (var key in item.data) {
                    item.data[key].label = key;
                    data.push(item.data[key]); 
                }

            // finally send data, last each has a null item
            } else {
                res.json(data);
            }
        });
    });
};
