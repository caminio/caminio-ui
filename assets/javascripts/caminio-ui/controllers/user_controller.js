(function(){

  'use strict';

  var userControllerCommon = {
    isAdminToggled: function(){
      return this.get('admin');
    }.property('admin'),

    emailError: function(){
      return ('email' in this.get('errors'));
    }.property('errors'),

    actions: {
      toggleAdmin: function(){
        this.set('admin',!this.get('admin'));
      }
    }

  };

  App.UserEditController = Ember.ObjectController.extend( userControllerCommon );
  App.UsersNewController = Ember.ObjectController.extend( userControllerCommon );

}).call();