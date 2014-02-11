define( function( require ){

  'use strict';

  var router        = require('plugins/router');
  var app           = require('durandal/app');
  var i18n          = require('i18next');
  var ko            = require('knockout');

  var shell = {
    router: router,
    search: function() {
      //It's really easy to show a message box.
      //You can add custom options too. Also, it returns a promise for the user's response.
      app.showMessage('Search not yet implemented...');
    },
    activate: function () {
      router.map([
        //{ route: '', title: i18n.t('navbar.overview'), moduleId: 'viewmodels/overview' },
        { route: '', title: i18n.t('navbar.users'), moduleId: 'viewmodels/users' },
        { route: 'users', title: i18n.t('navbar.users'), moduleId: 'viewmodels/users', nav: true },
        { route: 'users/:id', moduleId: 'viewmodels/user' },
        //{ route: 'api_keys', title: i18n.t('navbar.api_keys'), moduleId: 'viewmodels/api_keys', nav: true },
        { route: 'domains', title: i18n.t('navbar.domains'),
                            moduleId: 'viewmodels/domains',
                            nav: (window.currentUser.superuser ? true : false) },
        { route: 'preferences', title: i18n.t('navbar.preferences'), moduleId: 'viewmodels/preferences', nav: true },

        { route: 'domains/:id', moduleId: 'viewmodels/domain' },
      ]).buildNavigationModel();

      return router.activate();
    }
  };

  // quickfix to make parents active if child route in hash
  shell.windowHash = ko.observable(window.location.hash);
  window.onhashchange = function(){ shell.windowHash(window.location.hash); };

  return shell;

});
