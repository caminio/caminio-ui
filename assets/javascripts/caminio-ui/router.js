( function(){

  window.App.Router.map( function(){
    this.resource( 'users', { path: '/users' }, function(){
      this.route( 'new' );
    });
  });

  window.App.UsersIndexRoute = Ember.Route.extend({
    model: function() {
      return this.store.find('user');
    }
  });

  window.App.UserRoute = Ember.Route.extend({
    model: function(params) {
      var model = this.store.find('user', params.id);
      var history = this.store.createRecord('history', { type: 'note', createdAt: new(Date)() });
      model.then( function(){
        model.get('history').unshiftObject( history );
      });
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
        this.transitionTo( 'user', model );
      },
      edit: function( model ) {
        this.transitionTo( 'user.edit', model.copy() );
      },
      create: function( model ) {
        var self = this;
        model.save().then(function(){
          self.transitionTo( 'users' );
          notify('info', Ember.I18n.t('user.created', {name: model.get('fullname')}) );
        }).catch(function(err){
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