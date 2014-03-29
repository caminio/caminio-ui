$(function(){

  'use strict';

  var userControllerCommon = {
    isAdminToggled: function(){
      return this.get('admin');
    }.property('admin'),

    emailError: function(){
      if( this.get('errors') )
        return ('email' in this.get('errors'));
    }.property('errors'),

    langError: function(){
      if( this.get('errors') )
        return ('lang' in this.get('errors'));
    }.property('errors'),

    actions: {
      toggleAdmin: function(){
        this.set('admin',!this.get('admin'));
      },
      toggleAPI: function(){
        if( typeof(this.get('model.apiEnabled')) === 'undefined' )
          this.get('model').set('apiEnabled', false);
        this.get('model').set('apiEnabled',!this.get('apiEnabled'));
        console.log('api', this.get('model'), this.get('model.apiEnabled'));
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
      },
      addClient: function( model ){
        var client = this.store.createRecord('client', { user: model.get('id') });
        this.set('apiClients', this.store.all('client', { user: model.get('id') }));
        setTimeout(function(){
          $('.client-name:last').focus();
        },10);
      }
    }

  };

  App.UsersController = Ember.ObjectController.extend( userControllerCommon );
  App.UserEditController = Ember.ObjectController.extend( userControllerCommon );
  App.UsersNewController = Ember.ObjectController.extend( userControllerCommon );

  App.ClientController = Ember.Controller.extend({

    actions: {

      saveClient: function(){

        var client = this.get('content');
        client.save().then(function(){
          notify('info', Em.I18n.t('client.saved', { name: client.get('name') }));
        });

      },

      removeClient: function(){
        var client = this.get('content');
        var self = this;
        bootbox.confirm(Em.I18n.t('client.really_delete', {name: client.get('name')}), function(result){
          if( result ){
            client.deleteRecord();
            client.save().then(function(){
              notify('info', Em.I18n.t('client.removed', { name: client.get('name')}));
              self.get('parentController').set('apiClients',
                self.get('parentController').store.all('client', { user: self.get('parentController.model.id')})
              );
            });  
          }
        });
      }

    }

  });

});