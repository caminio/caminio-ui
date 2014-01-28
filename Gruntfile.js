var _ = require('lodash');

module.exports = function(grunt) {
  
  var requireConfig = {
    baseUrl: 'assets/javascripts/caminio-ui/app/',
    paths: {
      'jquery': '../components/jquery/jquery.min',
      'knockout': '../components/knockout.js/knockout-2.3.0.debug',
      'text': '../components/requirejs-text/text',
      'durandal': '../components/durandal/js',
      'plugins': '../components/durandal/js/plugins',
      'transitions': '../components/durandal/js/transitions',
      'bootstrap': '../components/bootstrap/dist/js',
      'i18next': '../components/i18next/release/i18next.amd-1.7.1.min',
      'inflection': '../components/inflection/lib/inflection',
      //'select2': '../components/select2/select2',
      'moment': '../components/moment/moment',
      'caminio': '../common/caminio',
      'ds': '../common/ds',
      'models': 'models',
      'almond': '../components/durandal-almond/almond'
    }
  };

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
          'public/stylesheets/caminio-ui.min.css': [ 'assets/stylesheets/caminio-ui-static/*.css', 
                                                      'assets/stylesheets/caminio-ui/*.css' ]
        }
      }
    },
    
    // inspired by:
    // https://github.com/RainerAtSpirit/HTMLStarterKitPro/blob/master/Gruntfile.js
    //
    durandal: {
      main: {
        src: [ 'assets/javascripts/caminio-ui/app/**/*.*', 
               'assets/javascripts/caminio-ui/components/durandal/**/*.js' ],
        options: {
          name: '../components/durandal-almond/almond',
          baseUrl: requireConfig.baseUrl,
          mainPath: 'assets/javascripts/caminio-ui/app/main',
          paths: requireConfig.paths,
          exclude: [],
          optimize: 'none',
          out: 'public/javascripts/caminio-ui/app/main.js'
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
        src: 'public/javascripts/caminio-ui/app/main.js',
        dest: 'public/javascripts/caminio-ui/app/main.min.js'
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

      // bowerComponents: {
      //   files: [
      //     {
      //       expand: true,
      //       cwd: 'assets/javascripts/components/',
      //       src: ['**/*'],
      //       dest: 'public/javascripts/components/'
      //     }
      //   ]
      // }
    },

/*
    'bower-install': {
      target: {
        src: ['api/views/dashboard/index.html.jade','api/views/admin/index.html.jade'],
        exclude: ['jquery','bootstrap'],
        ignorePath: 'assets/',
        fileTypes: {
          jade: {
            block: /(([\s\t]*)\/\/\s*bower:*(\S*)\s*)(|\r|\n|.)*?(\/\/\s*endbower\s*)/gi,
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
*/


    // concat: {
    //   options: {
    //     stripBanners: true,
    //     banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
    //       '<%= grunt.template.today("yyyy-mm-dd") %> */'
    //   },
    //   dist: {
    //     src: ['/assets/javascripts/caminio-ui/**/*.js'],
    //     dest: 'public/javascripts/caminio-ui.js'
    //   }
    // },

    jshint: {
      all: ['Gruntfile.js', 'api/**/*.js', 'config/**/*.js', 'assets/javascripts/caminio-ui/app'],
      options: {
        "laxcomma": true
      }
    },

    // requirejs: {
    //   compile: {
    //     options: {
    //       baseUrl: "path/to/base",
    //       mainConfigFile: "path/to/config.js",
    //       name: "path/to/almond", // assumes a production build using almond
    //       out: "path/to/optimized.js"
    //     }
    //   }
    // }

  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-durandal');
  //grunt.loadNpmTasks('grunt-contrib-concat');
  //grunt.loadNpmTasks('grunt-bower-install');
  //grunt.loadNpmTasks('grunt-contrib-requirejs');
  
  grunt.registerTask('build', [
    'jshint',
    'clean',
    'cssmin',
    //'concat',
    'copy:img',
    'copy:fonts',
    //'copy:bowerComponents',
    'durandal',
    'uglify'
    //'bower-install'
  ]);

  grunt.registerTask('default', ['build']);

};