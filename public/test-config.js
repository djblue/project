// special require.js configuration for karma test runner.
// include base config for app, then overwrite certain options.
require(['/base/config.js'], function (config) {

  var tests = [];

  for (var file in window.__karma__.files) {
    if (window.__karma__.files.hasOwnProperty(file)) {
      if (/\.spec\.js$/.test(file)) {
        tests.push(file);
      }
    }
  }

  requirejs.config({
    baseUrl: '/base',
    deps: tests,
    callback: window.__karma__.start
  });

});
