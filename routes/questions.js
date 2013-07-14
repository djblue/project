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
var questions = [/*{{{*/
    {_id: 0, course_id: 7, table: 12},
    {_id: 0, course_id: 2, table: 12},
    {_id: 0, course_id: 8, table: 12},
    {_id: 0, course_id: 4, table: 12},
    {_id: 0, course_id: 0, table: 12},
    {_id: 0, course_id: 23, table: 12},
    {_id: 0, course_id: 8, table: 12},
    {_id: 0, course_id: 10, table: 12},
    {_id: 0, course_id: 2, table: 12},
    {_id: 0, course_id: 1, table: 12},
    {_id: 0, course_id: 24, table: 12},
    {_id: 0, course_id: 0, table: 12},
    {_id: 0, course_id: 2, table: 12},
    {_id: 0, course_id: 15, table: 12},
    {_id: 0, course_id: 6, table: 12},
    {_id: 0, course_id: 21, table: 12},
    {_id: 0, course_id: 9, table: 12},
    {_id: 0, course_id: 4, table: 12},
    {_id: 0, course_id: 0, table: 12},
    {_id: 0, course_id: 3, table: 12},
    {_id: 0, course_id: 1, table: 12},
    {_id: 0, course_id: 0, table: 12},
    {_id: 0, course_id: 2, table: 12},
    {_id: 0, course_id: 1, table: 12},
    {_id: 0, course_id: 14, table: 12},
    {_id: 0, course_id: 10, table: 12},
    {_id: 0, course_id: 25, table: 12},
    {_id: 0, course_id: 24, table: 12},
    {_id: 0, course_id: 24, table: 12}
];/*}}}*/
var id_gen = 4;
exports.get_questions = function () {
    return questions;
};
exports.get = function(req, res) {/*{{{*/
    res.json(questions); // Return the current question queue.
};/*}}}*/
exports.post = function(req, res) {/*{{{*/

    var errors;

    // Check post arguments which are given in the body.
    req.assert('course_id', 'A Course ID is required').notEmpty(); 
    req.assert('table', 'Table number is required').notEmpty(); 

    errors = req.validationErrors();
    
    if (!errors) { // No errors were found.

        questions.push({
            _id: id_gen,
            course_id:  req.body.course_id,
            table:      req.body.table
        });
        id_gen += 1;
        res.send("Success.");
                                                           
    } else { // Report errors.
        res.send(errors);
    }
};/*}}}*/
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
