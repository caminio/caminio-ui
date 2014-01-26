App.IndexRoute = Ember.Route.extend({
  beforeModel: function(){
    this.transitionTo('users');
  }
});

App.UsersRoute = Ember.Route.extend({
  model: function(){
    return this.store.find('user');
  }
})