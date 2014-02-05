define( function(require) {

  'use strict';
  /*jshint validthis:true */

  var ko                = require('knockout');
  var inflection        = require('inflection');
  var Validation        = require('ds/validation');

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
      this._definedAttributes = schema && schema.attributes ? Object.keys(schema.attributes) : [];
      if( schema && schema.attributes ){
        for( i in schema.attributes )
          this[i] = this.createType( i, schema.attributes[i] );
        for( i in attrs ){
          if( i in this && typeof(this[i]) === 'function' )
            this[i]( attrs[i] );
        }
      }
      for( i in attrs ){
        if( !(i in this) ){
          this[i] = attrs[i];
          this._definedAttributes.push(i);
        }
      }
      this.constructor = Model;
    };
    if( schema ){
      Model.prototype = schema.methods || {};
    }
    Model.prototype.save = save;
    Model.prototype.destroy = destroy;
    Model.prototype.createType = createType;
    Model.prototype.isValid = function(){
      return Validation.run( Model.validations, this ) === null;
    };
    Model.cache = {};
    Model.url = function modelUrl(){
      var url = Model.adapter ? Model.adapter.hostURI : '';
      return url+'/'+inflection.pluralize(inflection.underscore(name));
    };
    Model.find = find;
    Model.create = create;
    Model.findOne = findOne;
    Model.adapter = options.adapter;
    Model.modelName = inflection.classify(name);
    Model.validations = [];
    Model.hooks = { before: [], after: [] };
    return Model;
  }

  /**
   * find items matching given query. If query is empty or undefined
   * all items will be returned to promies
   *
   * @method find
   * @param {Query} query a query object
   * @param {Function} callback [optional] a callback to be executed when query is finished
   * @param {Object} callback.err an error will be passed to the callback function if any
   * @return {ko.observableArray} an empty observable array which will be filled with data, as soon as data is available
   *
   */
  function find( query, cb ){
    if( arguments.length < 2 ){
      cb = query;
      query = {};
    } else if( !query ){
      query = {};
    }
    var Model = this;
    var array = ko.observableArray();
    var url = processUrl( Model.url(), query );
    Model.adapter
      .exec( url, processQuery(query), function( err, res ){
        if( err ){ return cb(err); }
        if( !(res instanceof Array) ){ throw new Error('wrong response. expected array'); }
        res.forEach( function( resource ){
          if( resource )
            array.push( new Model(resource) );
        });
        if( typeof(cb) === 'function' )
          cb( null, array );
      });
    return array;
  }

  /**
   * find one model
   *
   * @method findOne
   * @param {Query|Id} query a query object or the ide of the model
   * @Param {Function} callback [optional] a callback to be executed when query is finished
   */
  function findOne( query, cb ){
    if( arguments.length < 2 ){
      cb = query;
      query = {};
    } else if( !query ){
      query = {};
    }
    if( typeof(query) === 'string' )
      query = { id: query };
    var Model = this;
    // return immediately if Model is in cache
    if( query.id && Model.cache[query.id] )
      return cb( null, Model.cache[query.id] );

    var url = processUrl( Model.url(), query );
    Model.adapter
      .exec( url, processQuery(query), function( err, res ){
        if( err ){ return cb(err); }
        if( typeof(cb) === 'function' ){
          var m = ( res ? new(Model)(res) : null);
          if( m )
            Model.cache[m.id] = m;
            cb( null, m );
        }
      });
  }

  /**
   * create a model and post it to the server
   *
   * @method create
   * @param {Object} attrs
   * @param {Function} callback
   * @param {Object} callback.err an error object
   * @param {Document} an instantiated Model if operation was successful
   */
  function create( attrs, cb ){
    var Model = this;
    if( Object.keys(attrs).length < 1 )
      throw new Error('cannot create new resource without any attributes');
    var preparedAttrs = {};
    //if( !this.isValid() ){ return cb( err ); }
    preparedAttrs[ inflection.underscore(Model.modelName) ] = attrs;
    Model.adapter
      .save( true, Model.url(), preparedAttrs, function( err, res ){
        if( err ){ return cb(err); }
        if( !res ){ return('failed to create resource'); }
        cb( null, new Model(res) );
      });
  }

  /**
   * save a model and put it to the server
   *
   * @method save
   * @param {Function} callback
   * @param {Object} callback.err an error object
   */
  function save( cb ){
    var Model = this.constructor;
    var self = this;
    var preparedAttrs = {};
    var modelName = inflection.underscore(Model.modelName);
    //if( !this.isValid() ){ return cb(this.errors); }
    if( err ){ return cb( err ); }
    preparedAttrs[modelName] = {};
    self._definedAttributes.forEach( function( attr ){
      if( attr === 'id' ) return;
      preparedAttrs[modelName][attr] = typeof(self[attr]) === 'function' ? self[attr]() : self[attr];
    });
    var url = Model.url()+'/';
    url += typeof(self.id) === 'function' ? self.id() : self.id;
    Model.adapter
      .save( (typeof(self.id) === 'undefined'), url, preparedAttrs, function( err, res ){
        if( err ){ return cb(err); }
        if( !res ){ return('failed to save resource'); }
        if( self.id in self.constructor.cache )
          self.contructor.cache[ self.id ] = self;
        cb( null, self );
      });
  }

  /**
   * destroys a model and deletes it from the database
   *
   * @method destroy
   * @param {Function} callback
   * @param {Object} callback.err an error object
   *
   */
  function destroy( cb ){
    var self = this;
    var url = this.constructor.url()+'/';
    url += typeof(this.id) === 'function' ? this.id() : this.id;
    this.constructor.adapter.destroy( url, function( err ){
      if( err ){ return cb(err); }
      if( self.id in self.constructor.cache )
        delete self.constructor.cache[ self.id ];
      cb( null );
    });
  }

  /**
   * processes the url
   *
   * @method processUrl
   * @param {String} url
   * @param {Object} query
   * @return {String} url
   * @private
   *
   */
  function processUrl( url, query ){

    if( query.id ){
      url = url+'/'+query.id;
      delete query.id;
      return url;
    }

    if( Object.keys(query).length > 0 )
      url = url + '/find';

    return url;

  }

  /**
   * processes the query 
   *
   * @method processQuery
   * @param {Object} query
   * @return {Object} processedQuery
   * @private
   *
   */
  function processQuery( query ){
    return query;
  }

  function createType( name, type ){
    if( typeof(type) === 'object' ){
      if( type.required )
        this.constructor.validations.push( new Validation( name, function(val){ 
            if( this[name]() && this[name]().length > 0 )
              return true;
            return false; 
            }, 'required') );
    }
    return ko.observable();
  }

});