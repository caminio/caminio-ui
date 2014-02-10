define( function( require ){

  'use strict';
  /*jshint validthis: true */

  var moment        = require('moment');
  var inflection    = require('inflection');
  var app           = require('durandal/app');
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
    var resource = item.resource();
    var resources = item.resources && item.resources.resources ? item.resources.resources : null;
    var yes = $.i18n.t('yes');
    var no = $.i18n.t('no');
    var underscoreName = inflection.underscore(resource.constructor.modelName);
    app.showMessage( $.i18n.t('really_delete', { name: resource.name() }), 
                      $.i18n.t('delete_name', { name: resource.name() }), 
                      [yes,no])
        .then( function( decision ){
          if( decision === no )
            return;
          resource.destroy( function( err, response ){
            if( err ){ return notify.processError(err.response); }
            notify('info', $.i18n.t( underscoreName+'.destroyed', {name: resource.getName()} ) );
            
            if( resources )
              ko.utils.arrayFirst( resources(), function(arrItem) {
                if( resource.id === arrItem.id )
                  resources.remove( arrItem );
              });

            router.navigate('#'+inflection.pluralize(underscoreName));
          });
        });
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