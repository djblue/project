/*
 * Courses API
 * ================================================================
 * URL          Method  Result
 * ================================================================
 * /courses     GET     Return all of the courses.
 * /courses     POST    Add a new class.
 *
 */


exports.get = function(req, res) {
    var courses = [1,2,3]; // simple data
    res.json(courses);
};

exports.post = function(req, res) {

    var errors;

    // Check post arguments which are given in the body.
    req.assert('subject', 'Subject is required').notEmpty(); 
    req.assert('class', 'Class is required').notEmpty(); 

    errors = req.validationErrors();

    
    if (!errors) { // No errors were found.
        res.render('index', { 
            title: 'Form Validation Example',
            message: 'Passed Validation!',
            errors: {}
        });
                                                           
    } else {     // Report errors.
        res.render('index', { 
            title: 'Form Validation Example',
            message: 'Errors',
            errors: errors
        });

    }
};
