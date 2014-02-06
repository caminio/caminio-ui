// Protect from barfs
console = window.console || function() {};
 
// Don't track
window.notrack = true;

// mocha is not loaded through requirejs
mocha.setup('bdd');
mocha.reporter('html');

requirejs.config({
  baseUrl: './',
  paths: {
    'jquery': '../../../assets/javascripts/caminio-ui/components/jquery/jquery',
    'knockout': '../../../assets/javascripts/caminio-ui/components/knockout.js/knockout-2.3.0.debug',
    'knockout.validation': '../../../assets/javascripts/caminio-ui/components/knockout.validation/Dist/knockout.validation',
    'text': '../../../assets/javascripts/caminio-ui/components/requirejs-text/text',
    'durandal': '../../../assets/javascripts/caminio-ui/components/durandal/js',
    'plugins': '../../../assets/javascripts/caminio-ui/components/durandal/js/plugins',
    'transitions': '../../../assets/javascripts/caminio-ui/components/durandal/js/transitions',

    // additional
    'bootstrap': '../../../assets/javascripts/caminio-ui/components/bootstrap/dist/js/bootstrap',
    'i18next': '../../../assets/javascripts/caminio-ui/components/i18next/release/i18next.amd.withJQuery-1.7.1',
    'select2': '../../../assets/javascripts/caminio-ui/components/select2/select2',
    'moment': '../../../assets/javascripts/caminio-ui/components/moment/moment',
    'inflection': '../../../assets/javascripts/caminio-ui/components/inflection/lib/inflection',

    // caminio stuff
    'ds': '../../../assets/javascripts/caminio-ds',
    'models': '../../../assets/javascripts/caminio-ui/app/models',
    'caminio': '../../../assets/javascripts/caminio-ui/common/caminio'
  }
});

define( function(require) {

  require('ds.spec');
  require('model.spec');
  require('model.schema.spec');
  require('model.validations.spec');

  if (window.mochaPhantomJS) { mochaPhantomJS.run(); }
  else { mocha.run(); }

});