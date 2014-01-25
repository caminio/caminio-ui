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
            flatten: true,
            src: ['assets/images/*'], 
            dest: 'public/images/'
          }
        ]
      },
      fonts: {
        files: [
          { 
            expand: true,
            flatten: true,
            src: ['assets/fonts/*'], 
            dest: 'public/fonts/'
          }
        ]
      }
    },

    'bower-install': {
      target: {
        src: ['api/views/dashboard/index.html.hbs','api/views/admin/index.html.hbs'],
        fileTypes: {
          hbs: {
            block: /(([\s\t]*)<!--\s*bower:*(\S*)\s*-->)(\n|\r|.)*?(<!--\s*endbower\s*-->)/gi,
            detect: {
              js: /<script.*src=['"](.+)['"]>/gi,
              css: /<link.*href=['"](.+)['"]/gi
            },
            replace: {
              js: '<script src="{{filePath}}"></script>',
              css: '<link rel="stylesheet" href="{{filePath}}" />'
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
        dest: 'public/javascripts/caminio-ui.min.js'
      }
    },

    jshint: {
      all: ['Gruntfile.js', 'api/**/*.js', 'config/**/*.js'],
      options: {
        "laxcomma": true
      }
    },

    bower_concat: {
      all: {
        dest: 'public/javascripts/caminio-ui-bower.min.js',
        exclude: [
            'jquery',
            'modernizr'
        ],
        mainFiles: {
          //'jquery': 'jquery.js'
        }
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-bower-install');
  grunt.loadNpmTasks('grunt-bower-concat');
  
  grunt.registerTask('build', ['jshint', 'clean','cssmin','concat','copy:img','copy:fonts','bower-install']);
  grunt.registerTask('default', ['build']);

};