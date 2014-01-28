requirejs.config({
  paths: {
    'jquery': '../components/jquery/jquery',
    'knockout': '../components/knockout.js/knockout-2.3.0.debug',
    'text': '../components/requirejs-text/text',
    'durandal': '../components/durandal/js',
    'plugins': '../components/durandal/js/plugins',
    'transitions': '../components/durandal/js/transitions',

    // additional
    'bootstrap': '../components/bootstrap/dist/js/bootstrap',
    'i18next': '../components/i18next/release/i18next.amd.withJQuery-1.7.1',
    'select2': '../components/select2/select2',
    'moment': '../components/moment/moment',
    'inflection': '../components/inflection/lib/inflection',

    // caminio stuff
    'ds': '../common/ds',
    'models': 'models',
    'caminio': '../common/caminio'
  },
  shim: {
    'jquery': {
      exports: 'jQuery'
    },
    'knockout-validation': {
      deps: [ 'knockout' ],
      exports: 'ko'
    },
    'bootstrap': {
      deps: ['jquery'],
      exports: 'jQuery'
    }
  }
});

define(function(require) {

  var app         = require('durandal/app');
  var viewLocator = require('durandal/viewLocator');
  var caminio     = require('caminio');
  var RESTAdapter = require('ds/rest_adapter');

  caminio.init( function(){

    RESTAdapter.init( window.caminioHostname );

    app.start().then(function() {

      //Replace 'viewmodels' in the moduleId with 'views' to locate the view.
      //Look for partial views in a 'views' folder in the root.
      viewLocator.useConvention();

      //Show the app by setting the root view model for our application with a transition.
      app.setRoot('viewmodels/shell', 'entrance');

    });

  });

});
