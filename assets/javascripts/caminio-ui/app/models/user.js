define(function(require) {

  var ko            = require('knockout');
  var Model         = require('ds/model');
  var caminioREST   = require('adapters/camin.io.rest');
  var $             = require('jquery');

  var userSchema = {};
  userSchema.attributes = {
    firstName: 'string',
    lastName: 'string',
    fullName: 'string',
    email: { type: 'string', email: true, required: true },
    password: 'password',
    passwordConfirmation: 'passwordConfirmation',
    admin: 'boolean',
    superuser: 'boolean',
    lastLoginAt: 'date'
  };

  var User = Model.define( 'user', { adapter: caminioREST }, userSchema );

  return User;

});
