define(function(require) {

  var ko          = require('knockout');
  var moment      = require('moment');
  var User        = require('models/user');
  var app         = require('durandal/app');
  var notify      = require('caminio/notify');
  var factory     = require('caminio/factory');

  var userController = factory.createViewModel({

    // resource
    resource: ko.observable(),

    // controller
    lockUser: lockUser,
    destroyUser: destroyUser,

    activate: function( id ){
      User.findOne( id, function(err,user){
        if( err ){ notify('error', err); }
        userController.resource( user );
      });
    }
  });

  return userController;

  // controller
  function lockUser( item, e ){
    console.log('lock');
  }

  function destroyUser( item, e ){
    
  }

});
