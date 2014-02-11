define(function(require) {

  var ko            = require('knockout');
  var Model         = require('ds/model');
  var User          = require('models/user');
  var caminioREST   = require('adapters/camin.io.rest');
  var $             = require('jquery');

  var domainSchema = {};
  domainSchema.attributes = {
    name: { type: 'string', 
            required: true, 
            pattern: {
              params: /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9]\.[a-zA-Z]{2,}$/,
              message: $.i18n.t('domain.errors.not_a_valid_domainname')
            }
    },
    owner: { type: 'object', default: new(User)(), skip: ['update'] },
    selectedApps: 'object',
    planPrice: 'float',
    title: 'string',
    description: 'string',
    preferences: { type: 'object', default: {} },
    updated: 'object',
    created: 'object',
    locked: 'object',
    totalPrice: function(){
      return ko.computed( function(){
        return 0.0;
      },this);
    }
  };

  domainSchema.skipAttrs = {owner: ['update']};

  var Domain = Model.define( 'domain', { adapter: caminioREST }, domainSchema );

  return Domain;

});
