var fs = require('fs');

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    bower: {
      target: {
        rjsConfig: 'assets/javascripts/config.js',
        options: {
          baseUrl: './'
        }
      }
    },

    copy: {
      main: {
        src: 'assets/stylesheets/*',
        dest: 'public/stylesheets/caminio-ui/',
        flatten: true,
        expand: true
      }
    },

    clean: {
      build: ['public']
    },

    requirejs: {
      compile: {
        options: {
          name: "config",
          baseUrl: "assets/javascripts",
          mainConfigFile: "assets/javascripts/config.js",
          //out: "public/javascripts/caminio-ui/config.js",
          fileExclusionRegExp: /^\.|node_modules|Gruntfile|\.md|package.json|bower.json|component.json|composer.json/,
          dir: 'public/javascripts/caminio-ui/',
          optimize: 'none'
        }
      }
    },

    watch: {
      files: ['assets/javascripts/**/*.js'],
      tasks: [ 'build' ],
      options: {
        interrupt: true
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-clean');
  
  grunt.loadNpmTasks('grunt-bower-requirejs');

  grunt.registerTask('build', ['clean', 'bower', 'requirejs']);
  grunt.registerTask('default', ['build']);

  grunt.registerTask('production', 'lint requirejs:production');
  grunt.registerTask('development', 'lint requirejs:development');

};