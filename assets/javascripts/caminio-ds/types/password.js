define( function(require) {

  var $       = require('jquery');

  return TypePasswordConfirmation;

  function TypePasswordConfirmation( name, ko ){

    return ko.observable().extend({
      validation: {
        validator: function (val) {
          return !(val && val.length > 0) || /(?=^[^\s]{6,128}$)((?=.*?\d)(?=.*?[A-Z])(?=.*?[a-z])|(?=.*?\d)(?=.*?[^\w\d\s])(?=.*?[a-z])|(?=.*?[^\w\d\s])(?=.*?[A-Z])(?=.*?[a-z])|(?=.*?\d)(?=.*?[A-Z])(?=.*?[^\w\d\s]))^.*/.test('' + val + '');
        },
        message: $.i18n.t('user.password_requirements')
      }      
    });

  }


});