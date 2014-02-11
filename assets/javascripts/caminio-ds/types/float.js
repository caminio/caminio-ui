define( function(require) {

  return TypeFloat;

  function TypeFloat( name, options, ko ){

    this['_'+name] = ko.observable( options.default );

    return ko.computed({
      read: function(){
        return this['_'+name]();
      },
      write: function(newValue){
        if( typeof(newValue) === 'string' )
          newValue = newValue.replace(',','.');
        if( isNaN(newValue) )
          return;
        this['_'+name](parseFloat(newValue));
      },
      owner: this
    });

  }


});