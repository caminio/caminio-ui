/**
 * CaminioAPI v1.0
 *
 * written by thorsten zerha (thorsten.zerha@tastenwerk.com)
 *
 * (2014) by TASTENWERK http://tastenwerk.com
 */
(function(){

  'use strict';
  /*global marked: true, CLDR: true */

  var App;
  var currentUser;
  var currentDomain;

  var options = {
    rootElement: '#caminio-api-root',
    lang: 'en'
  };

  /**
   * @class CaminioAPI
   * @constructor
   */
  var CaminioAPI = window.CaminioAPI = Ember.Namespace.create({ VERSION: '1.0'}); 

  /**
   * initialize the caminio API
   * @method init
   * @param options {Object} a hash of options
   *
   * available options
   * - host (required) e.g.: https://camin.io
   * - apiKey (required) e.g.: '12345...XZZ' (generate the API key inside a caminio user form
   * - lang (default: 'en') a language attribute (wherever translations are available, they will be used)
   * - rootElement (default: '#caminio-api-root') e.g.: '#my-container'
   */
  CaminioAPI.init = function initCaminioAPI( customOptions ){
  
    for( var i in customOptions )
      options[i] = customOptions[i];

    if( !options.apiKey )
      throw new Error('no apiKey option present');
    if( !options.host )
      throw new Error('no host option present');

    CLDR.defaultLanguage = options.lang;

    App = Em.Application.create({
      rootElement: options.rootElement
    });

    App.options = options;

    $.ajaxSetup({
      headers: {
        Authorization: 'API-KEY '+options.apiKey
      }
    });

    App.ApplicationRoute = Em.Route.extend({
      beforeModel: function(){

        return new Promise( getUser );

        function getUser( response, reject ){
          $.getJSON( options.host+'/caminio/accounts/mine' )
            .done( function( user ){
              currentUser = user;
              currentDomain = user.camDomains[0];
              response();
            })
            .fail( reject );
        }

      }
    });

    App.ApplicationView = Em.View.extend();
    App.ApplicationController = Em.Controller.extend();

    return App;

  };

  /**
   * @class CaminioAPIModel
   * @constructor
   * @private
   */
  var CaminioAPIModel = Ember.Object.extend( Ember.Copyable, {
    init: function(){
    },
    copy: function(){
      // copy method is used by the PhotoEditRoute to create a clone of the model
      // we create a clone to preserve the original incase Cancel button is clicked
      return Em.run( this.constructor, 'create', this.serialize() );
    },
    serialize: function(){
      // Our presistance layer doesn't know about the fields that custom models need to preserve
      // for this reason, we need a serialize function that will return a version of this model
      // that can be saved to localStorage
      throw new Error(Ember.String.fmt('%@ has to implement serialize() method which is required to convert it to JSON.', [this]));
    }
  });

  CaminioAPIModel.reopenClass({
    storageKey: '_id',
    _cache: Em.A(),
    createFromProperties: function( attrs ){
      return this.create( parseTranslations( attrs ) );
    },

  });


  /**
   * @class ShopOrder
   * @module CaminioAPI
   * @constructor
   */
  CaminioAPI.ShopOrder = CaminioAPIModel.extend({
    order_items: Em.A(),
    shop_customer: null
  });

  /**
   * @class OrderItem
   * @module CaminioAPI
   * @constructor
   */
  CaminioAPI.OrderItem = CaminioAPIModel.extend({
    item: null,
    price: null,
    amount: null
  });

  /**
   * @class ShopItem
   * @module CaminioAPI
   * @constructor
   */
  CaminioAPI.ShopItem = CaminioAPIModel.extend({
    title: null,
    mediafiles: Em.A(),
    serialize: function() {
      return this.getProperties([ 'id', 'title' ]);
    }
  });

  CaminioAPI.ShopItem.reopenClass({

    getCategories: function(){
      var cats = Em.A();
      this._cache.forEach(function(item){
        if( !item.get('categories') )
          return;
        item.get('categories').forEach(function(cat){
          var c = cats.findBy('name',cat);
          if( c )
            return c.count += 1;
          cats.pushObject({ name: cat, count: 1 });
        });
      });
      return cats;
    }

  });

  /**
   * @class ShopItem
   * @module CaminioAPI
   * @method find
   * @param conditions {Object} a hash of conditions for fetching
   *
   * loads one or many ShopItems
   */
  CaminioAPI.ShopItem.find = function findShopItem( id, conditions ){

    if( typeof(id) === 'object' )
      conditions = id;

    conditions = conditions || {};

    if( typeof(id) === 'string' && this._cache.get('length') > 0 )
      return this._cache.findBy('_id', id );

    var defaultsNoOverride = { status: 'published' };
    for( var i in defaultsNoOverride )
      conditions[i] = defaultsNoOverride[i];

    return new Promise( getAndInitShopItems );

    function getAndInitShopItems( response, reject ){
      $.getJSON( options.host+'/caminio/shop_items', conditions )
      .done(function( items ){
        items = Ember.A( items.map( function( item ){
          var i = CaminioAPI.ShopItem.createFromProperties( item );
          CaminioAPI.ShopItem._cache.pushObject( i );
          return i;
        }) );
        loadMediafiles( items, continueCache, reject );
      })
      .fail(function(){
        reject();
      });

      function continueCache( result ){
        if( id && typeof(id) === 'string' )
          return response( result[0] );
        response( result );
      }
    }


  };

  function parseTranslations( attrs ){
    var parsedAttrs = attrs;
    if( !('translations' in attrs) || attrs.translations.length < 1 )
      return parsedAttrs;

    var curTranslation = attrs.translations.find(function(tr){ if( tr.locale === options.lang ) return tr; });

    // use 'en' if no translation found
    if( !curTranslation )
      curTranslation = attrs.translations.find(function(tr){ if( tr.locale === 'en' ) return tr; });

    // use first if no translation found
    if( !curTranslation )
      curTranslation = attrs.translations[0];

    for( var i in curTranslation ){
      if( i.match(/title|subtitle|metaDescription|metaKeywords|categories/) )
        parsedAttrs[i] = curTranslation[i];
      if( i.match(/content|aside/) )
        parsedAttrs[i] = (curTranslation[i] ? marked( curTranslation[i] ) : '');
    }

    return parsedAttrs;
  }

  function loadMediafiles( items, response, reject ){
    $.getJSON( options.host+'/caminio/mediafiles', { parent: 'in('+items.mapBy('_id').join(',')+')' })
      .done(function( mediafiles ){
        mediafiles.forEach(function(mediafile){
          mediafile.url = options.host+'/caminio/domains/'+currentDomain._id+'/preview/'+mediafile.relPath;
          var item = items.findBy('_id',mediafile.parent);
          item.mediafiles.pushObject( mediafile );
          item.teaser = item.mediafiles.get('firstObject');
        });
        response( items );
      })
      .fail( reject );
  }

})();
