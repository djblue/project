define(['collections/courses'], function (courses) {

    describe("A Courses collection", function() {
    
        var collection;
        
        beforeEach(function () {
            collection = courses;
        });

        afterEach(function () {
        });
        
        it("should always fetch its data", function() {
            expect(collection.length).toBeGreaterThan(0);
        });

    });

});
