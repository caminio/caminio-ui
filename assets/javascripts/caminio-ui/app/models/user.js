define(function(require) {

  var ko            = require('knockout');
  var Model         = require('ds/model');
  var caminioREST   = require('adapters/camin.io.rest');

  var userSchema = {};
  userSchema.attributes = {
    firstName: 'string',
    lastName: 'string',
    fullName: 'string',
    email: { type: 'string', required: true },
    password: 'string',
    password_confirm: 'string',
    admin: 'boolean',
    superuser: 'boolean',
    lastLoginAt: 'date'
  };

  var User = Model.define( 'user', { adapter: caminioREST }, userSchema );

  return User;

});
