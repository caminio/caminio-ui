define(function(require) {

  var ko          = require('knockout');
  var moment      = require('moment');
  var User        = require('models/user');
  var app         = require('durandal/app');
  var notify      = require('caminio/notify');
  var factory     = require('caminio/factory');
  var router      = require('plugins/router');

  var usersController = factory.createViewModel({
    resources: User.find(),
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
   * @method undoDestroyUser
   * @private
   */
  function undoDestroyUser( id ){
    console.log('restoring', id);
  }

});
