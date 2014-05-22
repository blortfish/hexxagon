module.exports = function (grunt) {

    grunt.initConfig({
        sass: {                              // Task
            dist: {                            // Target
                files: {                         // Dictionary of files
                    '../../trunk/build/assets/css/styles.min.css': '../../trunk/src/assets/scss/index.scss',       // 'destination': 'source'
                }
            }
        },

        cssmin: {                              // Task
            dist: {                            // Target
                files: {                         // Dictionary of files
                    '../../trunk/build/assets/css/styles.min.css': '../../trunk/build/assets/css/styles.min.css',       // 'destination': 'source'
                }
            }
        },

        concat: {
            basic: {
                src: ['../../trunk/src/assets/js/lib/jquery-1.11.0.min.js',
                    '../../trunk/src/assets/js/lib/moment.min.js',
                    '../../trunk/src/assets/js/lib/livestamp.min.js',
                    '../../trunk/src/assets/js/lib/modernizr.min.js',
                    '../../trunk/src/assets/js/globals.js',
                    '../../trunk/src/assets/js/ajax/base-ajax.js',
                    '../../trunk/src/assets/js/modules/challenge.js',
                    '../../trunk/src/assets/js/modules/bundle-controller.js',
                    '../../trunk/src/assets/js/chat/main-chat.js',
                    '../../trunk/src/assets/js/game/game-controller.js',
                    '../../trunk/src/assets/js/game/board-rendering.js',
                    '../../trunk/src/assets/js/modules/online-players.js'
                ],
                dest: '../../trunk/src/assets/js/main.js'
            }
        },

        uglify: {
            options: {
                mangle: true
            },
            my_target: {
                files: [
                    {
                        src: '../../trunk/src/assets/js/main.js',
                        dest: '../../trunk/build/assets/js/main.min.js'
                    }
                ]
            }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');

    grunt.registerTask('default', ['sass', 'cssmin', 'concat', 'uglify']);
};