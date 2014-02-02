define(function(require) {

  var Model         = require('ds/model');
  var RESTAdapter   = require('ds/rest_adapter');

  return new RESTAdapter( window.caminioHostname );

});
