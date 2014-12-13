'use strict';

var request = require('supertest')
  , app = require('../../app').app
  ;

describe('Questions API', function () {

  describe('without a session', function () {

    it('should not post without registering', function (done) {
      request(app)
        .post('/api/questions')
        .end(function (err, res) {
          if (err) {
            done(err);
          } else {
            // unauthorized
            expect(res.status).toBe(403);
            expect(res.body.message).toBe('please authenticate');
            done();
          }
        });
    });

  });

  describe('with session', function () {

    var agent, q;

    beforeEach(function (done) {
      agent = request.agent(app);
      agent
        .post('/api/session')
        .send({ password: 'password', table: 1, location: 0 })
        .end(function (err, res) {
          if (err) {
            done(err);
          } else {
            expect(err).toBe(null);
            expect(res.body.table).toBe(1);
            expect(res.body.location).toBe(0);
            expect(res.status).toBe(201);
            done();
          }
        });
    });
  
    it('should post a question after login', function (done) {
      agent
        .post('/api/questions')
        .send({})
        .end(function (err, res) {
          if (err) {
            done(err);
          } else {
            q = res.body;
            expect(res.status).toBe(201);
            done();
          }
        });
    });

    it('should post a question after login', function (done) {
      agent
        .delete('/api/questions/' + q._id)
        .end(function (err, res) {
          if (err) {
            done(err);
          } else {
            expect(res.status).toBe(200);
            done();
          }
        });
    });

  });

});
