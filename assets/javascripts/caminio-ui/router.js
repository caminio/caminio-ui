( function(){

  App.Router.map( function(){

    // domains
    this.resource( 'domains', { path: '/domains' }, function(){
      this.route( 'new' );
      this.resource('domain.edit', { 'path' : '/:id' });
    });

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

  App.DomainsNewRoute = Ember.Route.extend({
    model: function() {
      var user = this.store.createRecord('user');
      var model = this.store.createRecord('domain', { user: user });
      return model;
    }
  });

  App.DomainEditRoute = Ember.Route.extend({
    model: function(prefix, options){
      var model = this.store.find('domain', options.params.id);
      return model;
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
      remove: function( model ) {
        model.deleteRecord();
        model.save();
      },
      cancel: function( model ) {
        Ember.run( model, "destroy" );
        this.store.refresh(App.User);
        this.transitionTo( 'users' );      
      }
    }
  });

})();