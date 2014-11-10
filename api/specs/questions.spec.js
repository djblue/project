var q = require('../questions.js'); 

describe("The questions route", function () {

    var req, res = null;

    beforeEach(function () {

        // clear array before each run
        q.clear();

        req = {
            params: { id: 0  },
            session: { id: 0 },
            body: { course_id: 0, table_id: 0 }
        };

        res = {
            json: function (o) {},
            end: function (o) {},
            send: function (o) {}
        };

        spyOn(res, 'json');
        spyOn(res, 'end');
        spyOn(res, 'send');

    });

    it('should return an id when a question is added', function (){
        q.add(req, res);
        expect(q.getQueue().length).toBe(1);  
        expect(res.json).toHaveBeenCalledWith({ _id: 0 });
    });

    it('should be able to return questions based on session', function (){
        q.add(req, res);
        q.getBySession(req, res);
        expect(res.json).toHaveBeenCalledWith(
            [{ _id: 0, course_id: 0, table_id: 0 }]);
    });

    it('should be able to confirm added questions', function () {
        q.add(req, res);
        q.confirm(req, res);
        expect(q.getQueue().length).toBe(0);  
        expect(res.end).toHaveBeenCalled();
    });

    it('should only be able to confirm added questions', function () {
        q.confirm(req, res);
        expect(res.send).toHaveBeenCalledWith(404);
    });

    it('should be able to delete added questions', function () {
        q.add(req, res);
        q.delete(req, res);
        expect(q.getQueue().length).toBe(0);  
        expect(res.end).toHaveBeenCalled();
    });

    it('should only be able to delete added questions', function () {
        q.delete(req, res);
        expect(q.getQueue().length).toBe(0);  
        expect(res.send).toHaveBeenCalledWith(404);
    });

});
