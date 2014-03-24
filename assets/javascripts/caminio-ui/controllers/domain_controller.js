$(function(){

  'use strict';

  var domainControllerCommon = {

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
    }.property(),

    actions: {

      remove: function( model ) {
        model.deleteRecord();
        model.save().then( function(){
          console.log( 'meta', this.store.metadataFor('domain') );
        });
      },

    }
  };

  App.DomainEditController = Ember.Controller.extend( domainControllerCommon );
  App.DomainsNewController = Ember.Controller.extend( domainControllerCommon );
  App.DomainsController = Ember.Controller.extend( domainControllerCommon );

});