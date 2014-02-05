define( function( require ){

  /**
   * @class Validation
   * @constructor
   * @param {String} name
   * @param {Function} fn
   * @param {String} msg
   */
  function Validation( name, fn, msg ){
    this.name = name;
    this.validate = fn;
    this.msg = msg;
  }

  Validation.run = function( validations, model ){
    console.log('validations', validations);
    model.errors = {};
    validations.forEach( function(validation){
      if( typeof(validation.validate) === 'function' ){
        if( validation.name in attrs ){
          if( !validation.validate( attrs[validation.name] ) )
            model.errors[validation.name] = validation.msg;
        } else
          model.errors[validation.name] = 'required_field';
      }
    });
    if( Object.keys(model.errors).length < 1 )
      model.errors = null;
  };

  return Validation;

});