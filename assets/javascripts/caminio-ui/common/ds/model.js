define( function(require) {

  'use strict';
  /*jshint validthis:true */

  var ko                = require('knockout');
  var inflection        = require('inflection');

  return {
    define: defineModel
  };

  /**
   * define a new model and optionally pass
   * a schema the model attributes should match
   *
   * @method define
   * @param {String} name
   * @param {Object} options
   * @param {DS.Adapter} options.adapter an already iniatialized DS.Adapter
   * @param {String} options.url [optional] if the url differs from the model name
   * @param {Object} schema [optional]
   * @return {Model} a DS.Model object
   */
  function defineModel( name, options, schema ){
    var Model = function( attrs ){
      var i;
      if( schema && schema.attributes ){
        for( i in schema.attributes )
          this[i] = schema.attributes[i];
        for( i in attrs ){
          if( i in this )
            this[i]( attrs[i] );
        }
      } else {
        for( i in attrs )
          this[i] = attrs[i];
      }
    };
    if( schema ){
      Model.prototype = schema.methods || {};
      Model.constructor = Model;
    }
    Model.find = find;
    Model.findOne = find;
    Model.adapter = options.adapter;
    Model.url = options.url || '/'+inflection.pluralize(inflection.underscore(name));
    Model.modelName = inflection.classify(name);
    return Model;
  }

  /**
   * find items matching given query. If query is empty or undefined
   * all items will be returned to promies
   *
   * @method find
   * @param {Query} a query object
   * @param {Function} callback [optional] a callback to be executed when query is finished
   * @param {Object} callback.err an error will be passed to the callback function if any
   * @return {ko.observableArray} an empty observable array which will be filled with data, as soon as data is available
   *
   */
  function find( query, cb ){
    var Model = this;
    var array = ko.observableArray();
    Model.adapter
      .exec( query || {}, function( err, res ){
        if( err ){ return cb(err); }
        if( !(res instanceof Array) ){ return('wrong response. expected array'); }
        res.forEach( function( item ){
          array.push( new Model(item) );
        });
        if( typeof(cb) === 'function' )
          cb( null, array );
      });
    return array;
  }

});