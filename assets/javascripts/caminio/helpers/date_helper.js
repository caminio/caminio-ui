( function(){

  'use strict';

  Ember.Handlebars.registerBoundHelper('currentDate', function(format){
    return moment().format(format || 'LL');
  });

  Ember.Handlebars.registerBoundHelper('formatDate', function(option){
    return moment(option.date).format(option.format || 'LL');
  });

}).call();