(function(){

  'use strict';

  var domainControllerCommon = {

    isCurrentDomain: function(){
      console.log('here');
    },

    emailError: function(){
      if( this.get('errors') )
        return ('email' in this.get('errors'));
    }.property('errors'),

    nameError: function(){
      if( this.get('errors') )
        return ('name' in this.get('errors'));
    }.property('errors'),

    availableAppNames: function(){
      return [
        { id: 'contacts', text: 'contacts' },
        { id: 'admin', text: 'admin'}
      ];
    },

    actions: {

      create: function( model ) {
        var self = this;
        model.save().then(function(){
          self.transitionToRoute( 'domains' );
          notify('info', Ember.I18n.t('domain.created', {name: model.get('fullname')}) );
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
          self.transitionTo( 'domains' );
          notify('info', Ember.I18n.t('domain.saved', {name: model.get('fullname')}) );
        }).catch(function(err){
          notify.processError( err.responseJSON );
        });
      },

      remove: function( model ) {
        model.deleteRecord();
        model.save().then( function(){
          console.log( 'meta', this.store.metadataFor('domain') );
        });
      },

    }
  };

  App.DomainEditController = Ember.ObjectController.extend( domainControllerCommon );
  App.DomainsNewController = Ember.ObjectController.extend( domainControllerCommon );
  App.DomainsController = Ember.ObjectController.extend( domainControllerCommon );

}).call();