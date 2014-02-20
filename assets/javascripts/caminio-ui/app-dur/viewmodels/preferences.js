define(function(require) {

  var app         = require('durandal/app');
  var notify      = require('caminio/notify');
  var factory     = require('caminio/factory');
  var router      = require('plugins/router');
  var Domain      = require('models/domain');

  var preferencesController = factory.createViewModel({
    resource: Domain.findOne( currentDomain.id )
  });

  return preferencesController;

});
