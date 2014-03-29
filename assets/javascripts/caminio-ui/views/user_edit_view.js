(function(App){

  App.UserEditView = Ember.View.extend({

    didInsertElement: function(){

      this.get('controller').set('apiClients',
        this.get('controller.store').find('client', { user: this.get('controller.model.id')})
      );


    }

  });

})(App);