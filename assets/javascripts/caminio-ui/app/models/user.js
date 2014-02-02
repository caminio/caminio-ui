define(function(require) {

  var ko            = require('knockout');
  var Model         = require('ds/model');
  var caminioREST   = require('adapters/camin.io.rest');

  var userSchema = {};
  userSchema.attributes = {
    firstName: 'string',
    lastName: 'string',
    email: 'string',
    admin: 'boolean',
    lastLoginAt: 'date'
  };

  var User = Model.define( 'user', { adapter: caminioREST }, userSchema );

  return User;

});
