'use strict';

var app = angular.module('admin', ['ngRoute']);

app.config(function ($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'partials/home.html',
      controller: 'HomeCtrl'
    })
    .when('/stats/:location', {
      templateUrl: 'partials/stats.html',
      controller: 'StatsCtrl'
    })
    .when('/login', {
      templateUrl: 'partials/login.html',
      controller: 'LoginCtrl'
    });
});

app.service('storage', function ($window) {
  this.set = function (key, value) {
    $window.localStorage.setItem(key, JSON.stringify(value)); 
  };
  this.get = function (key) {
    return JSON.parse($window.localStorage.getItem(key));
  };
});

app.service('admin', function ($http, $location, storage) {
  var req = function (method) {
    return function (url, data) {
      var token = storage.get('token');
      if (token !== null) {
        return $http({
          method: method,
          url: url,
          headers: {
            'Authorization': 'Bearer ' + token
          },
          data: data
        });
      } else {
        $location.path('/login');
      }
    }; 
  };
  this.get  = req('GET');
  this.post = req('POST');
  this.put  = req('PUT');
  this.del  = req('DELETE');
});

app.service('api', function ($http, $location, admin) {
  this.login = function (user, pass) {
    return $http.post('/api/login', {
      username: user,
      password: pass
    });
  };
  this.passcode = function () {
    return admin.get('/api/passcode');
  };
  this.locations = function () {
    return $http.get('/api/locations');
  };
  this.courses = function () {
    return $http.get('/api/courses');
  };
  this.subjects = function () {
    return $http.get('/api/subjects');
  };
  this.stats = function (location) {
    return admin.get('/api/statistics/' + location);
  };
});

app.controller('HomeCtrl', function ($scope, api) {
  $scope.genPasscode = function () {
    api.passcode()
      .success(function (passcode) {
        $scope.passcode = passcode;
      });
  };
  api.locations()
    .success(function (locations) {
      $scope.locations = locations;
    });
});

app.controller('LoginCtrl', function ($scope, api, storage, $location) {
  $scope.login = function () {
    api.login($scope.user, $scope.pass)
      .success(function (token) {
        storage.set('token', token);
        $location.path('/');
      })
      .error(function (err) {
        $scope.error = err.message;
      });
  };
});

app.controller('StatsCtrl', function ($scope, $routeParams, api) {
  api.subjects()
    .success(function (subjects) {
      $scope.subjects = subjects;
    });
  api.courses()
    .success(function (courses) {
      $scope.courses = courses;
    });
  api.stats($routeParams.location)
    .success(function (stats) {
      $scope.stats = stats;
    });
});
