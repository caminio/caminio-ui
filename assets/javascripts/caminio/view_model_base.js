define( function( require ){

  'use strict';
  /*jshint validthis: true */

  var moment        = require('moment');
  var inflection    = require('inflection');
  var router        = require('plugins/router');
  var notify        = require('caminio/notify');
  var $             = require('jquery');

  return viewModelBase;

  function viewModelBase(){

    return {

      // controller actions
      saveResource: saveResource,
      destroyResource: destroyResource,

      // helpers
      date: renderDate
    };

  }

  // ----------------------------- controller actions
  function saveResource( form ){
    var resource = this.resource();
    var self = this;
    resource.save( function(err){
      if( err ){ return notify.processError(err.response); }
      notify('info', $.i18n.t( inflection.underscore(resource.constructor.modelName+'.saved'), {name: resource.getName()} ) );
      if( resource.justCreated && self.resources && self.resources.insert ){
        delete resource.justCreated;
        self.resources.insert( resource );
      }
      router.navigateBack();
    });
  }

  function destroyResource( item, e ){
    console.log('destroy');
  }

  // ----------------------------- helpers
  function renderDate(dateStr, format){
    dateStr = typeof(dateStr) === 'function' ? dateStr() : dateStr;
    if( !( dateStr && moment(dateStr).isValid() ) )
      return '';
    format = format || 'DD. MM. YYYY HH:mm';
    var d = moment(dateStr);
    return d.format(format);
  }

});