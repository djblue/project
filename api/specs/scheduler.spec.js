'use strict';

var request = require('supertest')
  , app = require('../../app').app
  ;

describe('Scheduler API', function () {

  it('should get all courses', function (done) {
    request(app)
      .get('/api/courses')
      .end(function (err, res) {
        if (err) {
          done(err);
        } else {
          expect(res.body.length).toBeGreaterThan(0);
          done();
        }
      });
  });

  it('should get all subjects', function (done) {
    request(app)
      .get('/api/subjects')
      .end(function (err, res) {
        if (err) {
          done(err);
        } else {
          expect(res.body.length).toBeGreaterThan(0);
          done();
        }
      });
  });

  it('should get all locations', function (done) {
    request(app)
      .get('/api/locations')
      .end(function (err, res) {
        if (err) {
          done(err);
        } else {
          expect(res.body.length).toBeGreaterThan(0);
          done();
        }
      });
  });

});
