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
                    background: false,
                    debug: false
                }
            }
        },
        shell: {
            mongo: {
                command: 'mongod --smallfiles',
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
                    'public/javascripts/*.js',
                    'public/javascripts/**/*.js'
                ],   
                options: {
                     livereload: true
                }
            }
        },
        cssmin: {
            production: {
                expand: true,
                cwd: 'css',
                src: ['public/stylesheets/*.css'],
                dest: 'public/build'
            }
        },
        requirejs: {
            request: {
                options: {
                    almond: true,
                    include: "lib/almond",
                    name: "request",
                    baseUrl: "public/javascripts/",
                    mainConfigFile: "public/javascripts/request.js",
                    out: "public/javascripts/build/request.js",
                    optimize: "uglify2",
                    generateSourceMaps: true,
                    preserveLicenseComments: false
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
    // Grunt task for running mongod
    grunt.loadNpmTasks('grunt-shell-spawn');
    // Grunt task for minimizing css 
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    // Grunt task for minimizing js 
    grunt.loadNpmTasks('grunt-contrib-requirejs');


    // register all of the grunt tasks
    grunt.registerTask('default', ['requirejs:request','express:prod']);
    grunt.registerTask('server', ['shell:mongo','express:dev', 'watch']);
    grunt.registerTask('deploy', ['requirejs:request']);

};
