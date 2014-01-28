define(function(require) {

  var Model         = require('ds/model');
  var RESTAdapter   = require('ds/rest_adapter');

  var User = Model.define( 'user', { adapter: RESTAdapter } );

  return User;

});
