define(function(require) {

  'use strict';
  /*jshint validthis:true */

  var store         = require('ds/store');
  var $             = require('jquery');

  /**
   * @class RESTAdapter
   * @method init
   * @param {String} uri the host uri
   */
  function RESTAdapter( uri, options ){
    this.hostURI = uri;
    options = options || {};
    if( options.csrf )
      this.csrf = csrf;
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
  RESTAdapter.prototype.exec = function exec( url, query, cb ){
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
  };

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
  RESTAdapter.prototype.save = function save( newResource, url, attrs, cb ){
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
  };

  /**
   * destroys a model
   *
   * @method destroy
   *
   * @param {String} url
   * @param {Function} callback
   * @param {Object} callback.err an error object
   */
  RESTAdapter.prototype.destroy = function destroy( url, cb ){
    $.ajax({
      url: url,
      type: 'delete',
      dataType: 'json'
    })
    .done( function(json){
      cb( null, json );
    })
    .fail( function( xhr, status, err ){ processError( xhr, status, err, cb ); });
  };

  function processError( xhr, status, err, cb ){
    if( xhr.status < 1 ){ return cb('failed to communicate with server? Maybe missing Access-Control-Allow-Origin in header?'); }
    cb( { status: xhr.status, response: JSON.parse(xhr.responseText) } );
  }

  return RESTAdapter;

});