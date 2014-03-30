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

      removeDomain: function() {
       var model = this.get('domain');
        bootbox.prompt( Em.I18n.t('domain.really_delete', { name: model.get('name') }), function( name ){
          if( name === model.get('name') ){
            model.deleteRecord();
            model.save().then(function(){
              notify('info', Em.I18n.t('domain.removed', {name: model.get('name') }));
            });
          }
        });
      },

    }
  };

  App.DomainEditController = Ember.Controller.extend( domainControllerCommon );
  App.DomainsNewController = Ember.Controller.extend( domainControllerCommon );
  App.DomainsController = Ember.Controller.extend( domainControllerCommon );

});