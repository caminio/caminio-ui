var fs = require('fs');

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    clean: {
      build: ['public']
    },

    cssmin: {
      add_banner: {
        options: {
          banner: '/* camin.io */'
        },
      },
      combine: {
        files: {
          'public/stylesheets/caminio-3rdparty.min.css': ['assets/stylesheets/components/*.css'],
          'public/stylesheets/caminio-ui.min.css': ['assets/stylesheets/caminio-ui/*.css']
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
            dest: 'public/images/'
          }
        ]
      },
      fonts: {
        files: [
          { 
            expand: true,
            cwd: 'assets/fonts/',
            src: ['**/*'], 
            dest: 'public/fonts/'
          }
        ]
      },
      cssSrc: {
        files: [
          {
            expand: true,
            cwd: 'assets/stylesheets/',
            src: ['**/*'],
            dest: 'public/stylesheets/src/'
          }
        ]
      },
      jsSrc: {
        files: [
          {
            expand: true,
            cwd: 'assets/javascripts/',
            src: ['**/*'],
            dest: 'public/javascripts/src/'
          }
        ]
      },
      bowerComponents: {
        files: [
          {
            expand: true,
            cwd: 'assets/javascripts/components/',
            src: ['**/*'],
            dest: 'public/javascripts/components/'
          }
        ]
      }
    },

    'bower-install': {
      target: {
        src: ['api/views/dashboard/index.html.jade','api/views/admin/index.html.jade'],
        exclude: ['jquery','bootstrap'],
        ignorePath: 'assets/',
        fileTypes: {
          jade: {
            block: /(([\s\t]*)\/\/\s*bower:*(\S*)\s*)(|\r|.)*?(\/\/\s*endbower\s*)/gi,
            detect: {
              js: /script\(.*src=['"](.+)['"]/gi,
              css: /link\(.*href=['"](.+)['"]/gi
            },
            replace: {
              js: 'script(type="text/javascript", src="/{{filePath}}")',
              css: 'link(rel="stylesheet", href="/{{filePath}}")'
            }
          }
        }
      }
    },

    concat: {
      options: {
        stripBanners: true,
        banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
          '<%= grunt.template.today("yyyy-mm-dd") %> */'
      },
      dist: {
        src: ['/assets/javascripts/caminio-ui/**/*.js'],
        dest: 'public/javascripts/caminio-ui.js'
      }
    },

    jshint: {
      all: ['Gruntfile.js', 'api/**/*.js', 'config/**/*.js'],
      options: {
        "laxcomma": true
      }
    },

  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-bower-install');
  
  grunt.registerTask('build', [
    'jshint',
    'clean',
    'cssmin',
    'concat',
    'copy:img',
    'copy:jsSrc',
    'copy:fonts',
    'copy:cssSrc',
    'copy:bowerComponents',
    'bower-install'
  ]);
  grunt.registerTask('default', ['build']);

};