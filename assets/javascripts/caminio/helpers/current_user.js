( function(){

  'use strict';

  Ember.Handlebars.registerBoundHelper('currentUserName', function(option){
    return window.currentUser.name.full;
  });

}).call();