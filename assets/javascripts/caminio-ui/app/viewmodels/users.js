define(function(require) {

  var ko          = require('knockout');
  var moment      = require('moment');
  var User        = require('models/user');
  var app         = require('durandal/app');
  var notify      = require('caminio/notify');
  var factory     = require('caminio/factory');
  var router      = require('plugins/router');

  var usersController = factory.createViewModel({
    users: User.find(),
    destroyUser: destroyUser,
    showForm: showForm,
    lockUser: lockUser
  });

  return usersController;

  function lockUser( item, e ){

  }

  function showForm( item, e ){
    router.navigate('#users/'+item.id);
  }

  /**
   * destroys a user after confirmed
   *
   * @method destroy
   */
  function destroyUser( item, e ){
    var yes = $.i18n.t('yes');
    var no = $.i18n.t('no');
    app.showMessage( $.i18n.t('user.really_delete', { name: item.fullName }), $.i18n.t('user.delete_user'), [yes, no])
      .then( function( decision ){
        if( decision === yes ){
          item.destroy( function( err ){
            if( err ){ notify('error', err ); }
            var itemId = item.id;
            usersController.users.remove( item );
            notify('info', $.i18n.t('user.deleted',{name: item.fullName}), { undo: function(){ undoDestroyUser( itemId ); } });
          });
        }
      });
  }

  /**
   * @method undoDestroyUser
   * @private
   */
  function undoDestroyUser( id ){
    console.log('restoring', id);
  }

});
