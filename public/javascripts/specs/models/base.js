define(['models/base'], function (Base) {

    describe("A Base model", function() {
    
        var model;
        
        beforeEach(function () {
            model = new Base();
            model.get_attr = function () { return true; }
        });

        afterEach(function () { delete model; });

        it("should have dynamic getters", function() {
            expect(model.get('attr')).toBe(true);
        });

    });

});
