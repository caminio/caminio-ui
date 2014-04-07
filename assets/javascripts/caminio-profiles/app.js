( function( App ){

  App.Router.map( function(){
  });

  // users
  App.IndexRoute = Ember.Route.extend({
    setupController: function(controller){
      this.store.find('user', { _id: profileId }).then(function(users){
        if( users && users.get('length') > 0 )
          controller.set('user', users.content[0]);
        console.log( controller.get('user'));
      });
    }
  });

  App.IndexController = Ember.ObjectController.extend({
    user: null,
    actions: {
      
    }
  });


})( App );