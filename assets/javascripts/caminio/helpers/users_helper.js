( function(){

  'use strict';

  Ember.Handlebars.registerHelper('currentUserName', function(){
    return window.currentUser.name.full;
  });

  Ember.Handlebars.registerHelper('isAdmin', function(val, options){
    var user = this;
    if( user.get('admin') )
      return typeof(options.fn) === 'function' ? options.fn() : true;
    return typeof(options.inverse) === 'function' ? options.inverse() : false;
  });

}).call();