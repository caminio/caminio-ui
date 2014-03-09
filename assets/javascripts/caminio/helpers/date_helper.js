( function(){

  'use strict';

  Ember.Handlebars.registerBoundHelper('currentDate', function(format){
    return moment().format(format || 'LL');
  });

  Ember.Handlebars.registerBoundHelper('formatDate', function( date, options ){
    var formatter     = options.hash.format ? options.hash.format : 'LLL';
    var parsedDate    = moment(date);
    var formattedDate = parsedDate.format(formatter);

    return new Handlebars.SafeString("<time datetime=" + date +">" + formattedDate + "</time>");
  });

}).call();