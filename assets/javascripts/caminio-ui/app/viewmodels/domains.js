define(function(require) {

  var ko          = require('knockout');
  var moment      = require('moment');
  var Domain      = require('models/domain');
  var app         = require('durandal/app');
  var notify      = require('caminio/notify');
  var factory     = require('caminio/factory');
  var router      = require('plugins/router');

  var domainsController = factory.createViewModel({
    domains: Domain.find(),
    destroyDomain: destroyDomain,
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
   * destroys a domain after confirmed
   *
   * @method destroy
   */
  function destroyDomain( item, e ){
    var yes = $.i18n.t('yes');
    var no = $.i18n.t('no');
    app.showMessage( $.i18n.t('domain.really_delete', { name: item.fullName }), $.i18n.t('domain.delete_domain'), [yes, no])
      .then( function( decision ){
        if( decision === yes ){
          item.destroy( function( err ){
            if( err ){ notify('error', err ); }
            var itemId = item.id;
            domainsController.domains.remove( item );
            notify('info', $.i18n.t('domain.deleted',{name: item.fullName}), { undo: function(){ undoDestroyDomain( itemId ); } });
          });
        }
      });
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
    domainsController.domains.push( domain );
  }

});
