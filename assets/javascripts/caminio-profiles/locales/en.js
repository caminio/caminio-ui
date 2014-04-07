(function(){

  'use strict';

  if( currentLang !== 'en' ) return;
  
  var translations = {
        
    'profile.my': 'My profile',
    'profile.of': 'Profile of {{name}}',
    'profile.change_password': 'Change password',
    'profile.common': 'Common'

  };

  for( var i in translations )
    Em.I18n.translations[i] = translations[i];

}).call();