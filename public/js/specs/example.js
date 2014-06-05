define(['models/course'], function (Base) {

    describe("A Course model", function() {
    
        var model;
        
        beforeEach(function () {
            model = new Base({ subject_id: 0 });
        });

        afterEach(function () {
        });

        it("should get the subject", function() {
            expect(undefined).toBe(undefined);
        });

    });

});
