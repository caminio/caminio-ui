(function( App ){

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

      sendLoginAgain: function(user){
        $.post('/caminio/accounts/'+user.get('id')+'/resend_credentials', {})
          .done( function( response ){
            if( response.user )
              notify('info', Em.I18n.t('user.sent_credentials_again'));
          });
      },

      toggleAdmin: function(){
        this.set('admin',!this.get('admin'));
      },

      toggleAPI: function(){
        if( typeof(this.get('model.apiEnabled')) === 'undefined' )
          this.get('model').set('apiEnabled', false);
        this.get('model').set('apiEnabled',!this.get('apiEnabled'));
        if( this.get('model.apiEnabled') && this.get('apiClients').content.content.length < 1 )
          setupFirstAPIClient( this.get('model'), this );
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
        setupFirstAPIClient( model, this );
        setTimeout(function(){
          $('.client-name:last').focus();
        },10);
      },

      removeUser: function() {
        var model = this.get('model');
        if( model.get('id') === currentDomain.owner )
          return bootbox.alert( Em.I18n.t('user.cannot_delete_domain_owner') );
        bootbox.prompt( Em.I18n.t('user.really_delete', { fullname: model.get('fullname') }), function( username ){
          if( username === model.get('fullname') ){
            model.deleteRecord();
            model.save().then(function(){
              notify('info', Em.I18n.t('user.removed', {name: model.get('fullname') }));
            });
          }
        });
      }

    }

  };

  function setupFirstAPIClient( model, controller ){
    var client = App.User.store.createRecord('client', { user: model.get('id') });
    controller.set('apiClients', App.User.store.all('client', { user: model.get('id') }));
  }

  App.UsersController = Ember.Controller.extend( userControllerCommon );
  App.UserEditController = Ember.ObjectController.extend( userControllerCommon );
  App.UsersNewController = Ember.ObjectController.extend( userControllerCommon );

  App.ClientController = Ember.Controller.extend({

    actions: {

      saveClient: function(){

        var client = this.get('content');
        this.get('parentController.model').set('apiEnabled', true);
        this.get('parentController.model').save();
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

})( App );