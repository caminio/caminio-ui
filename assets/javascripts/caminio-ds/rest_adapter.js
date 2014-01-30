define(function(require) {

  'use strict';
  /*jshint validthis:true */

  var store         = require('ds/store');
  var $             = require('jquery');

  /**
   * @class RESTAdapter
   */
  return {
    init: initStore,
    exec: exec,
    save: save,
    destroy: destroy
  };

  /**
   * initialize the datastore
   * with this adapter
   * 
   * @method init
   * @param {String} uri the host uri
   */
  function initStore( uri ){
    this.hostURI = uri;
  }

  /**
   * executes the query
   *
   * @method exec
   *
   * @param {String} url the url
   * @param {Query} query
   * @param {Function} callback
   * @param {Object} callback.err an error object
   * @param {Array} results
   *
   */
  function exec( url, query, cb ){
    var xhrOptions = {
      url: url,
      type: 'get',
      dataType: 'json'
    };
    if( query && Object.keys(query).length > 0 )
      xhrOptions.data = query;
    $.ajax( xhrOptions )
    .done( function(json){
      cb( null, json );
    })
    .fail( function( xhr, status, err ){ processError( xhr, status, err, cb ); });
  }

  /**
   * save a model
   *
   * @method save
   *
   * @param {Boolean} newResource
   * @param {String} url
   * @param {Object} attributes
   * @param {Function} callback
   * @param {Object} callback.err an error object
   * @param {Object} callback.resource the returned resource object from server
   *
   */
  function save( newResource, url, attrs, cb ){
    var type = newResource ? 'post' : 'put';
    $.ajax({
      url: url,
      type: type,
      data: attrs,
      dataType: 'json'
    })
    .done( function(json){
      cb( null, json );
    })
    .fail( function( xhr, status, err ){ processError( xhr, status, err, cb ); });
  }

  /**
   * destroys a model
   *
   * @method destroy
   *
   * @param {String} url
   * @param {Function} callback
   * @param {Object} callback.err an error object
   */
  function destroy( url, cb ){
    $.ajax({
      url: url,
      type: 'delete',
      dataType: 'json'
    })
    .done( function(json){
      cb( null );
    })
    .fail( function( xhr, status, err ){ processError( xhr, status, err, cb ); });
  }

  function processError( xhr, status, err, cb ){
    if( xhr.status < 1 ){ return cb('failed to communicate with server? Maybe missing Access-Control-Allow-Origin in header?'); }
    cb( xhr.status );
  }


});