$( function(){

  'use strict';

  window.App.User = DS.Model.extend({
    description: DS.attr('string'),
    firstname: DS.attr('string'),
    lastname: DS.attr('string'),
    lang: DS.attr('string', { defaultValue: currentDomain.lang || 'en' }),
    email: DS.attr('string'),
    admin: DS.attr('boolean'),
    password: DS.attr(),
    passwordConfirmation: DS.attr(),
    superuser: DS.attr('boolean'),
    fullname: function(){
      var name = '';
      if( this.get('firstname') && this.get('firstname').length > 0 )
        name += this.get('firstname');
      if( name.length > 0 && this.get('lastname') && this.get('lastname').length > 0 )
        name += ' ';
      if( this.get('lastname') && this.get('lastname').length > 0 )
        name += this.get('lastname');
      if( name.length < 1 )
        name += Ember.I18n.t('unknown');
      return name;
    }.property('firstname', 'lastname')
  });

});