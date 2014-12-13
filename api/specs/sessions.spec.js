'use strict';

var request = require('supertest')
  , app = require('../../app').app
  ;

describe('Questions API', function () {

  describe('login failures', function () {

    var register = function (reqBody, done) {
      request.agent(app)
        .post('/api/session')
        .send(reqBody)
        .end(function (err, res) {
          expect(err).toBe(null);
          done(res);
        });
    };

    it('should error without password', function (done) {
      register({}, function (res) {
        expect(res.status).toBe(400);
        expect(res.body.message).toBe('incorrect password');
        done();
      });
    });

    it('should error without table', function (done) {
      register({ password: 'password' }, function (res) {
        expect(res.status).toBe(400);
        expect(res.body.message).toBe('missing table');
        done();
      });
    });

    it('should error with table not a number', function (done) {
      register({
        password: 'password', table: 'hello'
      }, function (res) {
        expect(res.status).toBe(400);
        expect(res.body.message).toBe('table must be a number');
        done();
      });
    });

    it('should error without location', function (done) {
      register({
        password: 'password', table: 1
      }, function (res) {
        expect(res.status).toBe(400);
        expect(res.body.message).toBe('missing location');
        done();
      });
    });
    
  });

});
