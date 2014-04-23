( function( App ){

  App.Router.map( function(){
    this.resource('index', { path: '/:id' });
  });

  // users
  App.IndexRoute = Ember.Route.extend({
    model: function( params ){
      return this.store.find('user', params.id);
    },
    actions: {
      changePassword: function(){
        this.render('password_modal',{
          into: 'index',
          outlet: 'password-modal'
        });
      },
      closePasswordModal: function(){
        this.disconnectOutlet({
          outlet: 'password-modal',
          parentView: 'index'
        });
      },
    }
  });

  App.IndexController = Ember.ObjectController.extend({
    statName: function( name, value ){
      var content = this.get('content');
      if( arguments.length > 1 ){
        var nameParts = value.split(/\s+/);
        content.set('firstname', nameParts[0] );
        content.set('lastname', nameParts[1] );
      }
      return content.get('name');
    }.property(),

    actions: {

      save: function(){
        var user = this.get('model');
        user.save().then(function(){
          if( user.get('id') === currentUser._id )
            notify('info', Em.I18n.t('profile.your_saved'));
          else
            notify('info', Em.I18n.t('profile.saved', { name: user.get('name') }));
        });
      },
      setLang: function(lang){
        var user = this.get('model');
        user.set('lang', lang);
        user.save().then(function(){
          notify('info', Em.I18n.t('profile.lang_saved', { lang: lang }));
        });
      }
    }
  });

  App.PasswordModalView = Ember.View.extend({
    didInsertElement: function(){
      this.$('#password-modal').modal()
        .find('input[type=password]:first').focus();
    }
  });

  App.ChangePicView = Ember.View.extend({
    didInsertElement: function(){

    }
  });

  App.PasswordModalController = Ember.ObjectController.extend({
    needs: ['index'],
    oldPassword: '',
    newPassword: '',
    oldPasswordError: false,
    newPasswordError: false,
    actions: {
      close: function(){
        this.send('closePasswordModal');
      },
      savePassword: function(){
        var self = this;
        this.set('oldPasswordError',false);
        this.set('newPasswordError',false);
        var user = this.get('controllers.index.content');
        if( !this.get('oldPassword') )
          return this.set('oldPasswordError', true);
        if( !this.get('newPassword') || !this.get('newPassword').match(/((?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,60})/) )
          return this.set('newPasswordError', true);
        $.post('/caminio/accounts/'+user.get('id')+'/change_password',
          { oldPassword: this.get('oldPassword'),
            newPassword: this.get('newPassword') }).done(function(response){
              notify('info', Em.I18n.t('profile.password_saved'));
              $('#password-modal').modal('hide');
              self.send('closePasswordModal');
              self.set('oldPassword','');
              self.set('newPassword','');
            }).fail(function(xhr,textStatus,text){
              if( text === 'Forbidden' )
                return self.set('oldPasswordError',true);
            });
      }
    }
  });



})( App );