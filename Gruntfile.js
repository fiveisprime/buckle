module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json')
  , jshint: {
      files: [
        'server/index.js servers/controllers/*.js server/routes/*.js'
      , 'client/js/application/views/*.js'
      , 'client/js/application/models/*.js'
      , 'client/js/pages/*.js'
      ]
    , options: {
        curly: true
      , eqeqeq: true
      , eqnull: true
      , laxcomma: true
      , expr: true
      , curly: false
      , browser: true
      , node: true
      , globals: {
          jQuery: true
        }
      }
    }
  , concat: {
      dist: {
        src: [
          'client/js/vendor/underscore.js'
        , 'client/js/vendor/jquery.js'
        , 'client/js/vendor/backbone.js'
        , 'client/js/application/application.js'
        , 'client/js/application/views/*.js'
        , 'client/js/application/models/*.js'
        ]
      , dest: 'client/js/app.js'
      }
    }
  , uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= pkg.version %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      }
    , build: {
        src: 'client/js/app.js'
      , dest: 'client/js/app.min.js'
      }
    }
  , compass: {
      dist: {
        options: {
          config: 'config.rb'
        }
      }
    }
  , watch: {
      scripts: {
        files: ['client/js/application/**/*.js']
      , tasks: ['jshint', 'concat', 'uglify']
      , options: {
          spawn: true
        }
      }
    , css: {
        files: ['client/styles/**/*.scss']
      , tasks: ['compass']
      , options: {
          spawn: true
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-compass');

  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['jshint', 'concat', 'uglify', 'compass']);
  grunt.registerTask('test', ['jshint']);

};
