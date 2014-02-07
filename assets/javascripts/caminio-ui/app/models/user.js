define(function(require) {

  var ko            = require('knockout');
  var Model         = require('ds/model');
  var caminioREST   = require('adapters/camin.io.rest');
  var $             = require('jquery');

  var userSchema = {};
  userSchema.attributes = {
    name: {
      first: 'string',
      last: 'string',
      full: 'string'
    },
    email: { type: 'string', email: true, required: true },
    password: 'password',
    passwordConfirmation: 'passwordConfirmation',
    autoPassword: { type: 'boolean', default: true },
    generatedPassword: 'string',
    admin: { type: 'boolean', default: false },
    superuser: 'boolean',
    lastLoginAt: 'date',
    locked: {
      at: 'date'
    }
  };

  userSchema.methods = {
    getName: function(){ return this.name.full(); }
  };

  var User = Model.define( 'user', { adapter: caminioREST }, userSchema );

  return User;

});
