define( function( require ){

  'use strict';

  var $         = require('jquery')
    , system    = require('durandal/system')
    , binder    = require('durandal/binder')
    , moment    = require('moment')
    , i18next   = require('i18next')
    , app       = require('durandal/app');

  //var caminio = window.caminio || {};

  var loader = '<div class="loader"><div class="circle" /><div class="circle" /><div class="circle" /><div class="circle" /><div class="circle" /></div>';

  //window.caminio = caminio;

  $('#toggle-side-panel').on('click', function(){
    $('#side-panel').toggle();
    $('body').toggleClass('side-panel-active');
  });

  var i18NOptions = {
    detectFromHeaders: false,
    lng: window.currentLang || 'en',
    fallbackLng: 'en',
    ns: 'caminio',
    resGetPath: '/locales/__lng__',
    useCookie: false
  };

  return {
    init: initCaminio
  };

  function initCaminio( cb ){

    //>>excludeStart("build", true);
    system.debug(true);
    //>>excludeEnd("build");

    app.configurePlugins({
      router: true,
      widget: true,
      dialog: true
    });

    moment.lang( window.currentLang || 'en' );
    
    i18next.init( i18NOptions, function(t){
      cb();
    });

    $(document).on('ajaxSend', function(elm, xhr, s){
      if (s.type.match(/POST|PUT|PATH|DELETE/) )
        xhr.setRequestHeader('X-CSRF-Token', window.csrf);
    });

  }

  

});
