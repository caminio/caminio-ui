define(function(require) {

  var ko          = require('knockout');
  var moment      = require('moment');
  var Domain      = require('models/domain');
  var app         = require('durandal/app');
  var notify      = require('caminio/notify');
  var factory     = require('caminio/factory');
  var router      = require('plugins/router');

  var domainsController = factory.createViewModel({
    resources: Domain.find(),
    showForm: showForm,
    lockDomain: lockDomain,
    insert: insertDomain
  });

  return domainsController;

  function lockDomain( item, e ){

  }

  function showForm( item, e ){
    router.navigate('#domains/'+item.id);
  }

  /**
   * @method undoDestroyDomain
   * @private
   */
  function undoDestroyDomain( id ){
    console.log('restoring', id);
  }

  /**
   * @method insertDomain
   * @private
   */
  function insertDomain( domain ){
    domainsController.resources.push( domain );
  }

});
