define( function(require) {

  return TypeBoolean;

  function TypeBoolean( name, options, ko ){

    this['_'+name] = ko.observable( options.default );

    return ko.computed({
      read: function(){
        return this['_'+name]();
      },
      write: function(newValue){
        var val = newValue;
        if( typeof(newValue) === 'string' )
          val = (newValue === 'true');
        this['_'+name]( val );
      },
      owner: this
    });

  }


});