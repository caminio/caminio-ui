define( function(require) {

  var $       = require('jquery');
  var util    = require('caminio/util');

  return TypePasswordConfirmation;

  function TypePasswordConfirmation( name, options, ko ){

    return ko.observable().extend({
      validation: {
        validator: function (val) {
          return !(val && val.length > 0) || util.passwordConditionsRegExp.test('' + val + '');
        },
        message: $.i18n.t('user.password_requirements')
      }      
    });

  }


});