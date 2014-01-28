define(function(require) {

  'use strict';
  /*jshint validthis:true */

  var store         = require('ds/store');

  /**
   * @class RESTAdapter
   */
  return {
    init: initStore,
    exec: exec
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

  /**
   * executes the query
   *
   * @method exec
   *
   * @param {Query} query
   * @param {Function} callback
   * @param {Object} callback.err an error object
   * @param {Array} results
   *
   */
  function exec( query, cb ){
    cb( null, [] );
  }

});
