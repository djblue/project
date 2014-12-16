'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      files: [
        'Gruntfile.js',
        'app.js',
        'server.js',
        'api/**/*.js',
        'public/js/**/*.js'
      ],
      options: {
        ignores: [
          'public/js/lib/**/*.js'
        ],
        globals: {
          io: true,
          confirm: true
        },
        predef: [
          'expect',
          'define',
          'require'
        ],
        unused: true,
        undef: true,
        curly: true,
        indent: 2,
        maxdepth: 4,
        camelcase: true,
        eqeqeq: true,
        quotmark: 'single',
        strict: true,
        laxcomma: true,
        node: true,
        mocha: true
      }
    },
    express: {
      options: {
      },
      dev: {
        options: {
          script: 'server.js',
          // jshint camelcase: false
          node_env: 'development',
        }
      },
      prod: {
        options: {
          script: 'server.js',
          // jshint camelcase: false
          node_env: 'production',
          background: false,
          debug: false
        }
      }
    },
    shell: {
      mongo: {
        command: './shell/db.sh',
        options: {
          async: true,
        }
      },
      options: {
        stdout: true,
        stderr: true,
        failOnError: true
      }
    },
    watch: {
      express: {
        files: ['routes/*.js'],
        tasks: ['express:dev'],
        options: {
          nospawn: true
        }
      },
      reload: {
        files: [
          'public/stylesheets/*.css',
          'public/js/**/*.js',
          'public/js/**/*.ejs',
          'public/js/**/*.html'
        ],
        options: {
          livereload: true
        }
      }
    },
    open: {
      req:   { path: 'http://127.0.0.1:3000' },
      stats: { path: 'http://127.0.0.1:3000/stats' }
    },
    karma: {
      unit: {
        configFile: 'karma.conf.js',
        reporters: 'dots',
        singleRun: true,
        browsers: ['PhantomJS']
      }
    },
    jasmine_node: {
      projectRoot: './api/specs',
      specNameMatcher: '*',
      forceExit: true,
      verbose: false
    }
  });

  // Load the plugins
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-express-server');
  grunt.loadNpmTasks('grunt-shell-spawn');
  grunt.loadNpmTasks('grunt-open');
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-jasmine-node');

  // register all of the grunt tasks
  grunt.registerTask('default', [
    'shell:mongo',
    'express:prod'
  ]);

  grunt.registerTask('server', [
    'shell:mongo',
    'express:dev',
    'open:req',
    'watch'
  ]);

  grunt.registerTask('test', [
    'jshint',
    'karma:unit',
    'shell:mongo',
    'jasmine_node'
  ]);
};
