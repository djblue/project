// make api requests to the scheduler api
// helps with integration!

var request = require('request')
  , SCHEDULER_API = 'https://scheduler.fulton.asu.edu/api/'
  ;

// async api request method
var apiRequest = function (name) {
  return function (done) {
    request(SCHEDULER_API + name, function (err, resp, body) {
      // there was an error make the request to the api server
      if (err) {
        console.log('ERROR: issue connecting to scheduler api - ' + err.message);
        done(err);
      } else {
        done(null, JSON.parse(body));
      }
    });
  };
};

var proxy = function (name) {
  return function (req, res) {
    apiRequest(name)(function (err, collection) {
      if (err) {
        res.status(500).end();
      } else {
        res.json(collection);
      }
    });
  };
};

// proxy end points to avoid CORS (cross origin)
exports.setup = function (app) {
  app.get('/api/locations', proxy('locations'));
  app.get('/api/subjects', proxy('subjects'));
  app.get('/api/courses',  proxy('courses'));
};

// expose data to other modules
exports.getSubjects = apiRequest('subjects');
exports.getCourses = apiRequest('courses');
exports.getLocations = apiRequest('locations');
