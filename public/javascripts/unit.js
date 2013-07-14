var tests = [];

// Setup variables for tests.
tests.vars = {

    // Basic record that the widget expects.
    category:       "Subject",
    pre:         "PRE",
    class_number:   "000",
    class_title:    "Title",
                
    // Setup body element.
    $body: $('<div>'),

};

tests.push({
    description: "Creating the widget.",
    test: function () {
        var result;
        var vars = tests.vars;

        // Attach the plug-in to body the element.
        result = vars.$body.request({ 
            testing: true, // Enable testing mode.
            list: [ {
                    category: vars.category,
                    pre: vars.pre,
                    classes: [ { 
                        number: vars.class_number,
                        title:  vars.class_title 
                    } ]
            } ],
        });

        vars.plugin = result;

        return (result != undefined)? true : false;
    }
});

tests.push({
    description: "Testing Initialization Check.",
    test: function () {
        var vars = tests.vars;

        return (vars.$body.html() == "")? true : false;
    }
});

tests.push({
    description: "Main menu rendering check.",
    test: function () {
        var vars = tests.vars;

        var output = 
            "<div class=\"category\"><h2>"
                + vars.category + 
            "</h2></div><div id=\"clear\"></div>";

        vars.plugin.main_menu(); // Show main menu.
        console.log(vars.$body.html());
        return (vars.$body.html() == output)? true : false;
    }
});

tests.push({
    description: "Sub menu rendering check.",
    test: function () {
        var vars = tests.vars;

        var output = "<ul class=\"classes\"><li>Go Back</li><li>MAT 243 : Discrete Math</li></ul>"
        vars.plugin.show_menu("MAT", [{ 
            "number":"243", "title" :"Discrete Math" }]);
        return (vars.$body.html() == output)? true : false;
    }
});
