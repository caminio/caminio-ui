define(function(require) {

  var ko          = require('knockout');
  var moment      = require('moment');
  var router      = require('plugins/router');
  var Domain      = require('models/domain');
  var app         = require('durandal/app');
  var notify      = require('caminio/notify');
  var factory     = require('caminio/factory');
  var util        = require('caminio/util');
  var ace         = require('ace/ace');

  var domainsController = require('viewmodels/domains');

  var domainController = factory.createViewModel({

    // resource
    resource: ko.observable(new Domain()),
    resources: domainsController,

    // controller
    lockDomain: lockDomain,
    genPassword: genPassword,
    toggleAutoPassword: toggleAutoPassword,
    destroyResource: destroyResource,

    // helpers
    availablePlans: ko.observableArray(['default','ticketeer','webshop']),

    // events
    activate: function( id ){
      if( id === 'new' )
        domainController.resource( new Domain() );
      else
        domainController.resource = Domain.findOne( id, function(err,domain){
          if( err ){ notify('error', err); }
        });
      setTimeout( function(){
        $('input[type=text]:first').focus();
        if( id !== 'new' ){
          $('#domain-settings-editor').css({
            height: $('.main-view').height()-300
          });
          var editor = ace.edit('domain-settings-editor');
          editor.setValue( JSON.stringify(domainController.resource().preferences(), null, 2) );
          editor.getSession().setTabSize(2);
          editor.getSession().on('change', function(e){
            if( editor.getSession().getAnnotations().length < 1 ){
              try{
                domainController.resource().preferences( JSON.parse(editor.getValue()) );
              }catch(ex){}
            }
          });
          editor.setTheme("ace/theme/chrome");
          editor.getSession().setMode("ace/mode/json");
        }
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


  function destroyResource( item, e ){
    var resource = item.resource();
    var resources = item.resources && item.resources.resources ? item.resources.resources : null;
    var yes = $.i18n.t('yes');
    var no = $.i18n.t('no');
    app.showMessage( $.i18n.t('really_delete', { name: resource.name() }), 
                      $.i18n.t('delete_name', { name: resource.name() }), 
                      [yes,no])
        .then( function( decision ){
          if( decision === no )
            return;
          resource.destroy( function( err, response ){
            if( err ){ return notify.processError(err.response); }
            notify('info', $.i18n.t( 'domain.destroyed', {name: resource.getName(), affected: response.affectedUsers } ) );
            if( resources ){
              ko.utils.arrayFirst( resources(), function(arrItem) {
                if( resource.id === arrItem.id )
                  resources.remove( arrItem );
              });
            }
            router.navigate('#domains');
          });
        });
  }

});
