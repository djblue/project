module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jshint: {
            files: [
                'app.js',
                'Gruntfile.js',
                'public/javascripts/*.js', 
                'public/javascripts/**/*.js',
                'routes/*.js'
            ],
            options: {
                laxcomma: true,
                ignores: [
                    'public/javascripts/components/**/*.js'
                ]
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
            deploy: {
                command: 'rsync -vcrz --progress ./build/* djblue.us.to:/home/chris/project'
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
                    'public/javascripts/**/*.js',
                    'public/javascripts/**/*.ejs',
                    'public/javascripts/**/*.html'
                ],   
                options: {
                     livereload: true
                }
            }
        },
        cssmin: {
            request: {
                expand: true,
                cwd: 'public/stylesheets',
                src: ['*.css', '!jasmine.css'],
                dest: 'build/public/stylesheets'
            }
        },
        htmlmin: {
            prod: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true,
                    removeRedundantAttributes: true,
                    removeAttributeQuotes: true
                },
                files: {
                    'build/views/dynamic.ejs': 'views/dynamic.ejs',
                }
            }
        },
        requirejs: {
            options: {
                almond: true,
                include: "components/almond/almond",
                optimize: "uglify2",
                generateSourceMaps: false,
                baseUrl: "./public/javascripts/",
                preserveLicenseComments: false
            },
            request: {
                options: {
                    name: "request",
                    mainConfigFile: "public/javascripts/request.js",
                    out: "build/public/javascripts/request.js",
                }
            },
            stats: {
                options: {
                    name: "stats",
                    mainConfigFile: "public/javascripts/stats.js",
                    out: "build/public/javascripts/stats.js",
                }
            },
            queue: {
                options: {
                    name: "queue",
                    mainConfigFile: "public/javascripts/queue.js",
                    out: "build/public/javascripts/queue.js",
                }
            }
        },
        open: {
            req:   { path: 'http://127.0.0.1:3000' },
            stats: { path: 'http://127.0.0.1:3000/stats' }
        },
        connect: {
            test: {
                port: 8000,
                options: {
                    base: [".", "public"]
                }
            }
        },
        jasmine: {
            browser: {
                options: {
                    specs: './public/javascripts/specs/example.js',
                    host: 'http://127.0.0.1:8000/',
                    template: require('grunt-template-jasmine-requirejs'),
                    templateOptions: {
                        requireConfigFile: 'public/javascripts/config.js'
                    }
                }
            }
        },
        jasmine_node: {
            projectRoot: "./routes/specs",
            specNameMatcher: "*",
            forceExit: true,
            verbose: false
        },
        copy: {
            build: {
                cwd: '.',
                src: [
                    'app.js', 
                    'routes/*.js', 
                    'views/*.html', 
                    '*.json', 
                    'public/images/*'
                ],
                dest: 'build',
                expand: true
            }
        },
        clean: {
            build: {
                src: ['build']
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
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    // Grunt task for minimizing js 
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    // Grunt task to open things like a web browser
    grunt.loadNpmTasks('grunt-open');

    grunt.loadNpmTasks('grunt-contrib-jasmine');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-jasmine-node');

    // register all of the grunt tasks
    grunt.registerTask('default', ['shell:mongo','express:prod']);
    grunt.registerTask('server', [ 'shell:mongo','express:dev',
        'open:req','open:stats','watch']);
    grunt.registerTask('deploy', [ 'clean', 'copy', 'cssmin', 'htmlmin',
        'requirejs:request', 'requirejs:stats', 'requirejs:queue',
        'shell:deploy' ]);
    grunt.registerTask('test', [
        'jasmine_node', 'connect:test', 'jasmine:browser', 'jshint']);
};
