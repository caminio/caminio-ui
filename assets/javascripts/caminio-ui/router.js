( function( App ){

  'use strict';

  App.Enums = {};
  App.Enums.availableAppNames = [ 'dashboard', 'admin','contacts','shop','lineup', 'websites', 'calendar', 'projects', 'social-networks'];

  App.Router.map( function(){

    // domains
    this.resource( 'domains', { path: '/domains' }, function(){
      this.route( 'new' );
      this.resource('domain.edit', { 'path' : '/:id' });
    });

    this.resource('settings');

    this.resource( 'users', { path: '/users' }, function(){
      this.route( 'new' );
      this.resource('user.edit', { 'path' : '/:id' });
    });

  });

  // domains
  App.DomainsIndexRoute = Ember.Route.extend({
    setupController: function( controller, model ) {
      controller.set('domains', this.store.find('domain'));
    }
  });

  App.SettingsRoute = Ember.Route.extend({
    setupController: function(controller, model){
      if( this.store.getById('domain', currentDomain._id ) ){
        controller.set('domain', this.store.getById('domain', currentDomain._id));
      } else
        this.store.find('domain', { _id: currentDomain._id }).then( function( domain ){
          controller.set('domain', domain.content[0]);
          $('#domain-settings').val( JSON.stringify( controller.get('domain.preferences'), null, 2 ) );
        });
        
    }
  });

  App.DomainsNewRoute = Ember.Route.extend({
    setupController: function( controller, model ){
      var user = this.store.createRecord('user', { admin: true });
      controller.set('user', user);
      controller.set('domain', this.store.createRecord('domain', { user: user }));
    },
    actions: {
      create: function( model ) {
        var self = this;
        model.save().then(function(){
          self.transitionTo( 'domains' );
          notify('info', Ember.I18n.t('domain.created', {name: model.get('name')}) );
        }).catch(function(err){
          console.error(err);
          var errors = err.responseJSON.errors;
          for( var i in errors )
            errors[i] = Ember.I18n.t('errors.'+errors[i]);
          model.set('errors', errors );
          notify.processError( err.responseJSON );
        });
      }
    }
  });

  App.DomainEditRoute = Ember.Route.extend({
    model: function( prefix, options ){
      return this.store.find('domain', options.params.id);
    },
    setupController: function( controller, model ){
      controller.set('domain', this.store.find('domain', model.id));
    },
    actions: {
      save: function() {
        var self = this;
        var model = this.get('controller.domain.content');
        model.save().then(function(){
          self.transitionTo( 'domains' );
          notify('info', Ember.I18n.t('domain.saved', {name: model.get('name')}) );
        }).catch(function(err){
          notify.processError( err.responseJSON );
        });
      },
    }
  });

  // users
  App.UsersIndexRoute = Ember.Route.extend({
    setupController: function( controller, model ) {
      controller.set('users', this.store.find('user') );
    }
  });

  App.UserEditRoute = Ember.Route.extend({
    model: function(prefix, options){
      var model = this.store.find('user', options.params.id);
      return model;
    }
  });

  App.UsersNewRoute = Ember.Route.extend({
    model: function() {
      var model = this.store.createRecord('user');
      return model;
    }
  });

  App.IndexRoute = Ember.Route.extend({
    redirect: function() {
      this.transitionTo( 'users' );
    }
  });

  App.ApplicationController = Ember.Controller.extend({

    isSuperUser: function(){
      return currentUser.superuser;
    }.property()

  });

  App.ApplicationRoute = Ember.Route.extend({
    actions: {
      goToUsers: function () {
        this.transitionTo( 'users' );
      },
      goToUser: function( model ) {
        this.transitionTo( 'user.edit', model );
      },
      goToDomains: function () {
        this.transitionTo( 'domains' );
      },
      goToDomain: function( model ) {
        this.transitionTo( 'domain.edit', model );
      },
      switchDomainId: function( model ){
        location.href = "/caminio/admin?camDomainId="+model.get('id');
      },
      edit: function( model ) {
        this.transitionTo( 'user.edit', model.copy() );
      },
      cancel: function( model ) {
        Ember.run( model, "destroy" );
        this.store.refresh(App.User);
        this.transitionTo( 'users' );      
      }
    }
  });

  App.ApplicationView = Em.View.extend({
    didInsertElement: function(){
      setupCaminio(this.$());
    }
  });


})( App );
