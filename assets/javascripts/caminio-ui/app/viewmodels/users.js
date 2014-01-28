define(function(require) {

  var ko          = require('knockout');
  var moment      = require('moment');
  var User        = require('models/user');

  var usersController = {
    items: User.find(),
    activate: function(){
    }
  };

  return usersController;

});
