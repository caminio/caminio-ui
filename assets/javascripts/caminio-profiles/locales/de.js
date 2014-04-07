(function(){

  'use strict';

  if( currentLang !== 'de' ) return;
  
  var translations = {
        
    'profile.my': 'Mein Profil',
    'profile.of': 'Profil von',
    'profile.change_password': 'Passwort ändern',

    'profile.common': 'Allgemein'

  };

  for( var i in translations )
    Em.I18n.translations[i] = translations[i];

}).call();