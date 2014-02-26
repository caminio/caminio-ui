( function(){

  'use strict';

  window.App.Domain = DS.Model.extend({
    name: DS.attr('string'),
    description: DS.attr('string'),
    allowedAppNames: DS.attr('array'),
    user: DS.belongsTo('user', { embedded: 'always' })
  });

  window.App.Enums = {};
  window.App.Enums.availableAppNames = ['admin','contacts','shop'];

}).call();