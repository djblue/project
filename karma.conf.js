module.exports = function(config) {

  config.set({

    files: [
      'test-config.js', // custom requirejs config for karma
      { pattern: '**/*.js', included: false },
      { pattern: '**/*.html', included: false },
    ],

    basePath: 'public/',
    exclude: [],
    frameworks: ['jasmine', 'requirejs'],
    browsers: ['PhantomJS'],

    reporters: ['progress'],

    port: 9876,
    logLevel: config.LOG_INFO,
    colors: true,
    autoWatch: true

  });

};
