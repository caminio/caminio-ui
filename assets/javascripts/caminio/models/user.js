( function( App ){

  'use strict';

  App.User = DS.Model.extend({
    firstname: DS.attr('string'),
    lastname: DS.attr('string'),
    email: DS.attr('string'),
    admin: DS.attr('boolean'),
    lang: DS.attr('string', { defaultValue: currentDomain.lang || 'en' }),
    description: DS.attr('string'),
    superuser: DS.attr('boolean'),
    password: DS.attr(),
    passwordConfirmation: DS.attr(),
    camDomains: DS.attr('array'),
    apiEnabled: DS.attr('boolean'),
    clients: DS.hasMany('client'),
    remotePicUrl: DS.attr('string'),
    mediafiles: DS.hasMany('mediafile', { embedded: 'always' }),
    picUrl: function(){
      if( this.get('mediafiles.length') > 0 )
        return '/caminio/domains/'+currentDomain._id+'/preview/'+this.get('mediafiles.firstObject').get('name');
      if( this.get('remotePicUrl') )
        return this.get('remotePicUrl');
      //default:
      return '/images/bot_128x128.png';
    }.property('remotePicUrl', 'mediafiles.@each'),
    mailto: function(){
      return 'mailto:'+this.get('email');
    }.property('email'),
    inCurrentDomain: function(){
      return this.get('camDomains').indexOf(currentDomain._id) >= 0;
    }.property('camDomains'),
    fullname: function(){
      var name = '';
      if( this.get('firstname') && this.get('firstname').length > 0 )
        name += this.get('firstname');
      if( name.length > 0 && this.get('lastname') && this.get('lastname').length > 0 )
        name += ' ';
      if( this.get('lastname') && this.get('lastname').length > 0 )
        name += this.get('lastname');
      if( name.length < 2 )
        name += this.get('email');
      return name;
    }.property('firstname', 'lastname'),
    name: function(name){
      return this.get('fullname');
    }.property('firstname','lastname')
  });

})( App );