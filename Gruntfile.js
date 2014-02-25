var _         = require('lodash');
var async     = require('async');

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    clean: {
      build: ['build']
    },

    cssmin: {
      add_banner: {
        options: {
          banner: '/* camin.io */'
        },
      },
      combine: {
        files: {
          'build/stylesheets/caminio-ui.min.css': [ 'assets/stylesheets/**/*.css' ],
          'build/stylesheets/caminio-auth.min.css': [ 'assets/stylesheets/caminio-ui/authorization.css' ]
        }
      }
    },

    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> \n' +
            '* Copyright (c) <%= grunt.template.today("yyyy") %> TASTENWERK \n' +
            '* Available via the MIT license.\n' +
            '* see: http://opensource.org/licenses/MIT for blueprint.\n' +
            '*/\n'
      },
      build: {
        files: {
          'build/javascripts/caminio.min.js': [
            'assets/javascripts/caminio/**/*.js'
          ],
          'build/javascripts/caminio-ui.min.js': [
            'assets/javascripts/caminio-ui/**/*.js'
          ],
          'build/javascripts/3rdparties.min.js': [
            'assets/javascripts/3rdparty/**/*.js'
          ]
        }
      }
    },

    copy: {
      img: {
        files: [
          { 
            expand: true,
            cwd: 'assets/images',
            src: ['**/*'], 
            dest: 'build/images/'
          }
        ]
      },
      fonts: {
        files: [
          { 
            expand: true,
            cwd: 'assets/fonts/',
            src: ['**/*'], 
            dest: 'build/fonts/'
          }
        ]
      }
    },

    mocha_phantomjs: {
      all: ['test/browser/unit/**/*.html']
    },

    jshint: {
      all: ['Gruntfile.js', 'api/**/*.js', 'config/**/*.js', 'assets/javascripts/caminio-ui/app'],
      options: {
        "laxcomma": true
      }
    },

  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // tests
  grunt.loadNpmTasks('grunt-mocha-phantomjs');
  
  grunt.registerTask('build', [
    'jshint',
    'clean',
    'cssmin',
    'copy:img',
    'copy:fonts',
    'uglify'
  ]);

  grunt.registerTask('startServer', function(){
    process.env.NODE_ENV = 'test';
    
    var done = this.async();    
    
    var caminio = require('caminio');
    var Gear = require('caminio/gear');
    require('caminio-auth'); // require this gear
    require('./'); // require this gear
    new Gear({ api: true, absolutePath: __dirname+'/test/support/app' });

    caminio.init({ 
      config: { 
        root: __dirname+'/test/support/app',
        log: {
          filename: process.cwd()+'/test.log'
        }
      }
    });

    // clean up database;
    caminio.on('ready', function(){
      async.each( Object.keys(caminio.models), function(modelName, next){
        caminio.models[modelName].remove({}, function(err){
          if( err ) console.log(err);
          next();
        });
      }, done );
    });

  });

  grunt.registerTask('default', ['build']);
  grunt.registerTask('test', [
    'jshint',
    'startServer',
    'mocha_phantomjs'
    ]);

};