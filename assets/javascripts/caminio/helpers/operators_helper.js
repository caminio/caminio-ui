(function(){

  Handlebars.registerHelper( 'equal', function(lvalue, rvalue, options ){
    if( arguments.length < 3 )
      throw new Error("Handlebars Helper equal needs 2 parameters");
    if( lvalue === this.get(rvalue) )
      return options.fn(this);
    if(  typeof(options.inverse) === 'function' )
      return options.inverse(this);
  });

  Ember.Handlebars.helper('dynamicPartial', function(name, options) {
    return Ember.Handlebars.helpers.partial.apply(this, arguments);
  });

  Ember.Handlebars.registerHelper( 'tKey', function( key, options ){
    return Em.I18n.t(options.hash.prefix+'.'+this.get(key));
  });

})();