define( function(require) {

  return TypeFloat;

  function TypeFloat( name, ko ){

    this['_'+name] = ko.observable();

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