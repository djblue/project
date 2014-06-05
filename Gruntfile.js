module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jshint: {
            files: [
                'app.js',
                'Gruntfile.js',
                'public/js/*.js',
                'public/javascripts/**/*.js',
                'routes/*.js'
            ],
            options: {
                laxcomma: true,
                ignores: [
                    'public/js/lib/**/*.js'
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
                command: './shell/db.sh',
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
                    'public/js/**/*.js',
                    'public/js/**/*.ejs',
                    'public/js/**/*.html'
                ],
                options: {
                     livereload: true
                }
            }
        },
        cssmin: {
            request: {
                expand: true,
                cwd: 'public/css',
                src: ['*.css', '!jasmine.css'],
                dest: 'build/public/css'
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
                    'build/views/login.ejs': 'views/login.ejs'
                }
            }
        },
        requirejs: {
            options: {
                almond: true,
                include: "lib/almond/almond",
                optimize: "uglify2",
                generateSourceMaps: false,
                baseUrl: "./public/",
                preserveLicenseComments: false,
                findNestedDependencies: true,
                mainConfigFile: "public/config.js"
            },
            request: {
                options: {
                    name: "js/request",
                    out: "build/public/js/request.js",
                }
            },
            stats: {
                options: {
                    name: "js/stats",
                    out: "build/public/js/stats.js",
                }
            },
            queue: {
                options: {
                    name: "js/queue",
                    out: "build/public/js/queue.js",
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
                    specs: './public/js/specs/**/*.js',
                    host: 'http://127.0.0.1:8000/',
                    template: require('grunt-template-jasmine-requirejs'),
                    templateOptions: {
                        requireConfigFile: 'public/config.js'
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
                    'data/*.json',
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
    grunt.registerTask('default', [
        'shell:mongo',
        'express:prod'
    ]);

    grunt.registerTask('server', [
        'shell:mongo',
        'express:dev',
        'watch'
    ]);

    grunt.registerTask('build', [
        'clean',
        'copy',
        'cssmin',
        'htmlmin',
        'requirejs:request',
        'requirejs:stats',
        'requirejs:queue'
    ]);

    grunt.registerTask('test', [
        'jshint',
        'jasmine_node',
        'connect:test',
        'jasmine:browser'
    ]);
};
