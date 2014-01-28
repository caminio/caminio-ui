define(function(require) {

  'use strict';
  /*jshint validthis:true */

  var store         = require('ds/store');

  /**
   * @class RESTAdapter
   */
  return {
    init: initStore
  };

  /**
   * initialize the datastore
   * with this adapter
   * 
   * @method init
   */
  function initStore( url ){
    console.log('initialized rest datastore with url', url);
    this.url = url;
  }

});
