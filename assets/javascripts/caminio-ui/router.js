( function(){

  window.App.Router.map( function(){

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
  window.App.DomainsIndexRoute = Ember.Route.extend({
    model: function() {
      return this.store.find('domain');
    }
  });

  window.App.DomainsNewRoute = Ember.Route.extend({
    model: function() {
      var user = this.store.createRecord('user');
      var model = this.store.createRecord('domain', { user: user });
      return model;
    }
  });

  // users
  window.App.UsersIndexRoute = Ember.Route.extend({
    model: function() {
      return this.store.find('user');
    }
  });

  window.App.UserEditRoute = Ember.Route.extend({
    model: function(prefix, options) {
      console.log('args', arguments);
      var model = this.store.find('user', options.params.id);
      return model;
    }
  });

  window.App.UsersNewRoute = Ember.Route.extend({
    model: function() {
      var model = this.store.createRecord('user');
      return model;
    }
  });

  window.App.IndexRoute = Ember.Route.extend({
    redirect: function() {
      this.transitionTo( 'users.index' );
    }
  });

  window.App.ApplicationRoute = Ember.Route.extend({
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

}).call();