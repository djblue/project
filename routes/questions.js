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

 // The question queue; module scope.
var questions = [];

var id_gen = 4;

exports.get_questions = function () {
    return questions;
};

exports.get = function(req, res) {

    res.json(questions); // Return the current question queue.

};

exports.post = function(req, res) {/*{{{*/

    questions.push({
        _id: id_gen,
        course_id:  req.body.course_id,
        table:      req.body.table
    });

    res.json({ _id: id_gen });

    id_gen += 1;
};

exports.delete = function(req, res) {/*{{{*/

    var id = req.params.id;

    var i = 0, len = questions.length;

    for (; i < len; i++) {
        if (questions[i]._id == id) break; 
    }

    if (i == len) { 
        res.send("Not Found");// Error Not Found.
    } else { 
        console.log("deleteing at" + i)
        var obj = questions.splice(i, 1); // Deleting entry
        res.send(obj); // return deleted entry.
    }

};/*}}}*/
