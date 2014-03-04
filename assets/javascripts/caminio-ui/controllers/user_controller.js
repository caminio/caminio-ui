(function(){

  'use strict';

  var userControllerCommon = {
    isAdminToggled: function(){
      return this.get('admin');
    }.property('admin'),

    emailError: function(){
      return ('email' in this.get('errors'));
    }.property('errors'),

    langError: function(){
      return ('lang' in this.get('errors'));
    }.property('errors'),

    actions: {
      toggleAdmin: function(){
        this.set('admin',!this.get('admin'));
      },
      create: function( model ) {
        var self = this;
        //return notify('error', Ember.I18n.t('user.errors.prohibited_save'));
        model.save().then(function(){
          self.transitionToRoute( 'users' );
          notify('info', Ember.I18n.t('user.created', {name: model.get('fullname')}) );
        }).catch(function(err){
          var errors = err.responseJSON.errors;
          for( var i in errors )
            errors[i] = Ember.I18n.t('errors.'+errors[i]);
          model.set('errors', errors );
          notify.processError( err.responseJSON );
        });

      },
      update: function( model ) {
        var self = this;
        model.save().then(function(){
          self.transitionTo( 'users' );
          notify('info', Ember.I18n.t('user.saved', {name: model.get('fullname')}) );
        }).catch(function(err){
          notify.processError( err.responseJSON );
        });
      }
    }

  };

  App.UsersController = Ember.ObjectController.extend( userControllerCommon );
  App.UserEditController = Ember.ObjectController.extend( userControllerCommon );
  App.UsersNewController = Ember.ObjectController.extend( userControllerCommon );

}).call();