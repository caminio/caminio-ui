( function( App ){

  'use strict';

  App.Label = DS.Model.extend({
    name: DS.attr('string'),
    type: DS.attr('string'),
    bgColor: DS.attr('string', { defaultValue: '#548EE5' }),
    fgColor: DS.attr('string', { defaultValue: '#fff' }),
    usersAccess: DS.hasMany('user', { async: true }),
    private: function(){
      if( this.get('usersAccess').isFullfilled )
        return this.get('usersAccess').content.length > 0;
      return true;
    }.property('usersAccess'),
    borderColor: DS.attr('string', { defaultValue: '#637dd4' }),
    styleAttrs: function(){
      return 'background-color: '+this.get('bgColor') + '; color: '+this.get('fgColor')+'; border-color: '+this.get('borderColor');
    }.property('bgColor')
  });

})( App );