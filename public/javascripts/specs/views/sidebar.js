define(['views/sidebar'], function (sidebar) {

    describe("A Course model", function() {
    
        var model;
        
        beforeEach(function () {
            model = new Course({ subject_id: 0 });
        });

        afterEach(function () { model = null; });

        it("should be able get the subject", function() {
            expect(model.get('subject')).not.toBe(undefined);
        });

    });

});
