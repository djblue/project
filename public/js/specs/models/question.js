define(['models/question'], function (Question) {

    describe("A Question model", function() {
    
        var model;
        
        beforeEach(function () {

            model = new Question({ course_id: 0 });
        });

        afterEach(function () { model = null; });

        it("should be able get its course", function() {
            expect(model.get('title')).not.toBe(undefined);
        });

    });

});
