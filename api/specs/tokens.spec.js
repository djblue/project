'use strict';

var request = require('supertest')
  , app = require('../../app').app
  , admin = require('../../admin')
  ;

var getAdminToken = exports.getAdminToken = function (done) {
  request(app) 
    .post('/api/login')
    .send(admin)
    .end(function (err, res) {
      expect(err).toBe(null);
      expect(res.status).toBe(201);
      done(res.body);
    });
};

var getTabletPasscode = exports.getTabletToken = function (done) {
  getAdminToken(function (token) {
    request(app)
      .get('/api/passcode')
      .set('Authorization', 'Bearer ' + token)
      .end(function (err, res) {
        expect(err).toBe(null);
        expect(res.status).toBe(200);
        done(res.body.code);
      });
  });
};

var getTabletToken = exports.getTabletToken = function (done) {
  getTabletPasscode(function (code) {
    request(app)
      .post('/api/tablets')
      .send({
        table: 0,
        location: '0',
        code: code
      })
      .end(function (err, res) {
        expect(err).toBe(null);
        expect(res.status).toBe(201);
        done(res.body);
      });
  });
};

describe('Admin login', function () {

  it('should get admin token on login', function (done) {
    getAdminToken(function (token) {
      expect(token.split('.').length).toBe(3);
      done();
    });
  });

  it('should get tablet passcode on admin token', function (done) {
    getTabletPasscode(function (code) {
      expect(code).toMatch(/[0123456789abcdef]{8}/);
      done();
    });
  });

});

describe('Tablet login', function () {
  it('should get tablet token on passcode', function (done) {
    getTabletToken(function (token) {
      expect(token.split('.').length).toBe(3);
      done();
    });
  });
});
