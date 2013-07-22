define(['collections/subjects'], function (subjects) {

    describe("A subjects collection", function() {
    
        var collection;
        
        beforeEach(function () { 
            collection = subjects;
        });

        afterEach(function () {
        });
        
        it("should always fetch its data", function() {
            expect(collection.length).toBeGreaterThan(0);
        });

    });

});
