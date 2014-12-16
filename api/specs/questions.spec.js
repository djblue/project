'use strict';

var request = require('supertest')
  , app = require('../../app').app
  , tokens = require('./tokens.spec')
  ;

describe('Questions API', function () {

  describe('without a token', function () {

    it('should not post without registering', function (done) {
      request(app)
        .post('/api/questions')
        .end(function (err, res) {
          expect(err).toBe(null);
          expect(res.status).toBe(400);
          expect(res.body.message).toBe(
            'please include \'Authroization\' token in headers');
          done();
        });
    });

  });

  describe('with token', function () {

    var token, _id;

    beforeEach(function (done) {
      tokens.getTabletToken(function (t) {
        token = t;
        done();
      });
    });

    it('should post a question with passcode', function (done) {
      request(app)
        .post('/api/questions')
        .set('Authorization', 'Bearer ' + token)
        .send({
          course: '0',
          subject: '0'
        })
        .end(function (err, res) {
          expect(err).toBe(null);
          expect(res.status).toBe(201);
          expect(res.body._id).not.toBe(undefined);
          _id = res.body._id;
          done();
        });
    });

  });

});
