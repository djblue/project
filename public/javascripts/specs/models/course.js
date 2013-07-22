define(['models/course'], function (Course) {

    describe("A Course model", function() {
    
        var model;
        
        beforeEach(function () {
            model = new Course({ subject_id: 0 });
        });

        afterEach(function () {
            delete model;
        });

        it("should be able get the subject", function() {
            expect(model.get('subject')).not.toBe(undefined);
        });

    });

});
