( function(){

  'use strict';

  Ember.Handlebars.registerBoundHelper('currentUserName', function(option){
    return window.currentUser.name.full;
  });

  Ember.Handlebars.registerBoundHelper('isAdmin', function(option){
    return option.user.admin;
  });

}).call();