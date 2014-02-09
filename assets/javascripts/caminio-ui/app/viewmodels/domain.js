define(function(require) {

  var ko          = require('knockout');
  var moment      = require('moment');
  var Domain      = require('models/domain');
  var app         = require('durandal/app');
  var notify      = require('caminio/notify');
  var factory     = require('caminio/factory');
  var util        = require('caminio/util');

  var domainsController = require('viewmodels/domains');

  var domainController = factory.createViewModel({

    // resource
    resource: ko.observable(new Domain()),
    resources: domainsController,

    // controller
    lockDomain: lockDomain,
    destroyDomain: destroyDomain,
    genPassword: genPassword,
    toggleAutoPassword: toggleAutoPassword,

    activate: function( id ){
      if( id === 'new' )
        domainController.resource( new Domain() );
      else
        Domain.findOne( id, function(err,domain){
          if( err ){ notify('error', err); }
          domainController.resource( domain );
        });
      setTimeout( function(){
        $('input[type=text]:first').focus();
      }, 500 ); // 500ms is length of animation
    }
  });

  return domainController;

  // controller
  function lockDomain( item, e ){
    item.locked.at = new Date();
  }

  /**
   * generate a password and sets it
   * in the Password field
   * @method genPassword
   */
  function genPassword( item, e ){
    e.preventDefault();
    var password = util.generatePassword(8);
    domainController.resource().password(password);
    domainController.resource().passwordConfirmation(password);
    domainController.resource().generatedPassword(password);
  }

  function toggleAutoPassword( item, e ){
    domainController.resource().autoPassword( !domainController.resource().autoPassword() );
  }

  function destroyDomain( item, e ){
    
  }

});
