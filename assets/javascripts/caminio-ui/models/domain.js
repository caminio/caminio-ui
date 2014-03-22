$( function(){

  'use strict';

  window.App.Domain = DS.Model.extend({
    name: DS.attr('string'),
    description: DS.attr('string'),
    preferences: DS.attr('object'),
    lang: DS.attr(),
    allowedAppNames: DS.attr('array'),
    user: DS.belongsTo('user', { embedded: 'always' }),
    availableLangs: function( key, value ){
      console.log(arguments);
      if( arguments.length < 2 )
        return this.get('preferences.availableLangs');
      var pref = this.get('preferences');
      pref.availableLangs = value.split(',').replace(/\ /g,'');
      this.set('preferences', pref);
    }.property('preferences')
  });

  window.App.Enums = {};
  window.App.Enums.availableAppNames = ['admin','contacts','shop'];

});