define( function(require) {

  var $                  = require('jquery');

  return TypePasswordConfirmation;

  function TypePasswordConfirmation( name, options, ko ){

    var self = this;

    return ko.observable().extend({
      validation: {
        validator: function(confirmedPwd){ 
          return confirmedPwd === self.password(); 
        },
        message: $.i18n.t('user.passwords_missmatch')
      }
    });

  }


});