module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jshint: {
            files: [
                'Gruntfile.js',
                'public/javascripts/*.js', 
                'public/javascripts/**/*.js',
                'routes/*.js'
            ],
            options: {
                laxcomma: true
            }
        },
        express: {
            options: {
            },
            dev: {
                options: {
                    script: 'app.js'
                }
            },
            prod: {
                options: {
                    script: 'app.js',
                    node_env: 'production',
                    debug: true 
                }
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
                    'public/javascripts/*.js',
                    'public/javascripts/**/*.js'
                ],   
                options: {
                     livereload: true
                }
            }
        }
    });

    // Load the plugins 
    // validate files with JSHint.
    grunt.loadNpmTasks('grunt-contrib-jshint');
    // Run tasks whenever watched files change
    grunt.loadNpmTasks('grunt-contrib-watch');
    // Grunt task for running an Express Server
    grunt.loadNpmTasks('grunt-express-server');

    // register all of the grunt tasks
    grunt.registerTask('default', ['jshint']); // default task
    grunt.registerTask('server', [ 'express:dev', 'watch' ]);

};
