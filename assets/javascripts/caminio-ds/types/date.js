define( function(require) {

  var moment = require('moment');

  return TypeDate;

  function TypeDate( name, ko ){

    this['_'+name] = ko.observable();

    return ko.computed({
      read: function(){
        return this['_'+name]();
      },
      write: function(newValue){
        if( !moment(newValue).isValid() )
          return;
        this['_'+name](moment(newValue).toDate());
      },
      owner: this
    });

  }


});