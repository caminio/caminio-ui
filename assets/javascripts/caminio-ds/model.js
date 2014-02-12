define( function(require) {

  'use strict';
  /*jshint validthis:true */

  var ko                = require('knockout');
  var validation        = require('knockout.validation');
  var inflection        = require('inflection');

  var createTypeNumber  = require('ds/types/number');
  var createTypeFloat  = require('ds/types/float');
  var createTypeDate  = require('ds/types/date');
  var createTypeBoolean  = require('ds/types/boolean');
  var createTypePasswordConfirmation  = require('ds/types/password_confirmation');
  var createTypePassword  = require('ds/types/password');

  ko.validation.configure({
    decorateElement: true,
    parseInputAttributes: true,
    errorClass: 'field-with-error',
    registerExtenders: true
  });

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
    function Model( attrs ){
      this.constructor = Model;
      var i;
      this._definedAttributes = schema && schema.attributes ? Object.keys(schema.attributes) : [];
      if( schema && schema.attributes ){
        for( i in schema.attributes )
          parseType.call(this, i, schema.attributes[i] );
        for( i in attrs )
          parseAttrs.call(this, i, attrs[i]);
      }
      for( i in attrs ){
        if( !(i in this) ){
          this[i] = attrs[i];
          this._definedAttributes.push(i);
        }
      }
      this.errors = ko.validation.group(this);
      this.getName = this.getName || function(){ return this.name(); };
      if( schema && schema.skipAttrs )
        this.skipAttrs = schema.skipAttrs;
      if( schema && typeof(schema.afterBuild) === 'function' )
        schema.afterBuild.call(this);
    }
    if( schema )
      Model.prototype = schema.methods || {};
    Model.prototype.save = save;
    Model.prototype.destroy = destroy;
    Model.prototype.isNew = isNew;
    Model.prototype.toJS = function(){
      return JSON.parse(ko.toJSON(this, this._definedAttributes));
    };
    //Model.prototype.isValid = function(){ console.log('e',this.errors(),this.name()); return (Object.keys(this.errors()).length === 0); }
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
    return Model;
  }

  /**
   * return if this resource is new or has been saved
   * to the database already. This does not tell you, if
   * the model ist currently in a persisted state or not.
   *
   * @method isNew
   * @return {Boolean} if the record is new or not
   */
  function isNew(){
    return !(this.id && this.id.length > 0 );
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
          if( resource ){
            var m = new Model(resource);
            Model.cache[m.id] = m;
            array.push( m );
          }
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
    preparedAttrs[ inflection.underscore(Model.modelName) ] = attrs;
    Model.adapter
      .save( true, Model.url(), preparedAttrs, function( err, res ){
        if( err ){ return cb(err); }
        if( !res ){ return('failed to create resource'); }
        var newModel = new Model(res);
        newModel.justCreated = true;
        cb( null, newModel );
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
    var action = this.isNew() ? 'create' : 'update';
    var Model = this.constructor;
    var self = this;
    var preparedAttrs = {};
    var modelName = inflection.underscore(Model.modelName);
    preparedAttrs[modelName] = {};
    self._definedAttributes.forEach( function( attr ){
      if( attr === 'id' ) return;
      if( self.skipAttrs && attr in self.skipAttrs && self.skipAttrs[attr].indexOf(action) >= 0 )
        return;
      if( typeof(self[attr]) === 'function' && 
          typeof(self[attr]()) === 'object' && 
          ('_definedAttributes' in self[attr]()) )
        preparedAttrs[modelName][attr] = self[attr]().toJS();
      else
        preparedAttrs[modelName][attr] = typeof(self[attr]) === 'function' ? self[attr]() : self[attr];
    });
    if( !this.isValid() ){
      this.errors.showAllMessages();
      return;
    }
    var url = Model.url()+'/';
    if( self.id )
      url += typeof(self.id) === 'function' ? self.id() : self.id;
    Model.adapter
      .save( (typeof(self.id) === 'undefined'), url, preparedAttrs, function( err, res ){
        if( err ){ return cb(err); }
        if( !res ){ return('failed to save resource'); }
        updateAttributes( self, res );
        if( self.id in self.constructor.cache )
          Model.cache[ self.id ] = self;
        if( action === 'create' )
          self.justCreated = true;
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
    this.constructor.adapter.destroy( url, function( err, response ){
      if( err ){ return cb(err); }
      if( self.id in self.constructor.cache )
        delete self.constructor.cache[ self.id ];
      cb( null, response );
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

  /**
   * parses a field for types
   * if type is object
   * a.) checks if type has a 'type' key and considers it as a fine definition
   * b.) if no 'type', considers it as nested datastructure and recursively parses children
   */
  function parseType( name, type, ns ){
    var dataType = type;
    if( typeof(dataType) === 'object' ){
      if( 'type' in dataType )
        dataType = type.type;
      else{
        for( var i in dataType )
          parseType.call(this, i, dataType[i], (ns ? ns+'.' : '')+name );
        return;
      }
    }
    var computedType = createType.call(this, dataType, name, type );
    if( typeof(dataType) === 'function' )
      computedType = dataType.call(this);

    if( ns ){
      if( !this[ns] )
        this[ns] = {};
      this[ns][name] = computedType;
    } else
      this[name] = computedType;

    // still required?
    if(typeof(type) === 'object'){
      if( type.required ){
        this[name].extend({ required: true });
      }
    }

  }

  function parseAttrs( key, val, ns ){
    if( typeof(val) === 'object' )
      for( var i in val )
        parseAttrs.call(this, i, val[i], key);

    if( ns ){
      if( !this[ns] )
        this[ns] = {};
      if( key in this[ns] && typeof(this[ns][key]) === 'function' )
        this[ns][key](val);
    }
    else{
      if( key in this && typeof(this[key]) === 'function' )
        this[key]( val );
    }

  }

  function createType( type, name, options ){
    options = typeof(options) === 'object' ? options : {};
    switch( type ){
      case 'number':
        return createTypeNumber.call(this, name, options, ko);
      case 'float':
        return createTypeFloat.call(this, name, options, ko);
      case 'date':
        return createTypeDate.call(this, name, options, ko);
      case 'boolean':
        return createTypeBoolean.call(this, name, options, ko);
      case 'passwordConfirmation':
        return createTypePasswordConfirmation.call(this,name,options,ko);
      case 'password':
        return createTypePassword.call(this,name, options, ko);
      case 'array':
        return ko.observableArray( options.default );
      default:
        var ret = ko.observable( options.default );
        if( options.type )
          ret.extend( getPattern( options ) );
        return ret;
    }
  }

  function getPattern( options ){
    var pattern = {};
    if( typeof(options.onlyIf) === 'function' )
      pattern.onlyIf = options.onlyIf;
    if( options.validator )
      pattern.validation = { validator: options.validator };
    if( options.pattern )
      pattern.pattern = options.pattern;
    if( options.required )
      pattern.required = true;
    if( options.email )
      pattern.email = true;
    pattern.message = (options && options.message ? options.message : 'Does not match pattern');
    return pattern;
  }

  function updateAttributes( field, attrs ){
    for( var i in attrs ){
      if( typeof(field[i]) === 'function' ){
        if( typeof(field[i]()) === 'object' )
          updateAttributes(field[i], attrs[i]);
        else
          field[i]( attrs[i] );
      } else {
        field[i] = attrs[i];
      }
    }
  }

});