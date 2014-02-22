( function(){

  window.App.Router.map( function(){
    this.resource( 'users', { path: '/users' }, function(){
      this.route( 'new' );
      this.resource('user.edit', { 'path' : '/:id' });
    });
  });

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
      edit: function( model ) {
        this.transitionTo( 'user.edit', model.copy() );
      },
      create: function( model ) {
        var self = this;
        //return notify('error', Ember.I18n.t('user.errors.prohibited_save'));
        model.save().then(function(){
          self.transitionTo( 'users' );
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