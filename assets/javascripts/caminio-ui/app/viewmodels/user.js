define(function(require) {

  var ko          = require('knockout');
  var moment      = require('moment');
  var User        = require('models/user');
  var app         = require('durandal/app');
  var notify      = require('caminio/notify');
  var factory     = require('caminio/factory');
  var util        = require('caminio/util');

  var userController = factory.createViewModel({

    // resource
    resource: ko.observable(new User()),

    // controller
    lockUser: lockUser,
    destroyUser: destroyUser,
    genPassword: genPassword,
    toggleAutoPassword: toggleAutoPassword,

    activate: function( id ){
      if( id === 'new' )
        userController.resource( new User() );
      else
        userController.resource = User.findOne( id, function(err,user){
          if( err ){ notify('error', err); }
        });
      setTimeout( function(){
        $('input[type=text]:first').focus();
      }, 500 ); // 500ms is length of animation
    }
  });

  return userController;

  // controller
  function lockUser( item, e ){
    item.locked.at = new Date();
  }

  /**
   * generate a password and sets it
   * in the Password field
   * @method genPassword
   */
  function genPassword( item, e ){
    e.preventDefault();
    var password = util.generatePassword(8);
    userController.resource().password(password);
    userController.resource().passwordConfirmation(password);
    userController.resource().generatedPassword(password);
  }

  function toggleAutoPassword( item, e ){
    userController.resource().autoPassword( !userController.resource().autoPassword() );
  }

  function destroyUser( item, e ){
    
  }

});
