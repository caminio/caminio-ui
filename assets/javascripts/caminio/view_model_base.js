define( function( require ){

  'use strict';

  var moment = require('moment');

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
    console.log( this.resource() );
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