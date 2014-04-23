(function(){

  'use strict';

  if( currentLang !== 'en' ) return;
  
  var translations = {
        
    'profile.my': 'My profile',
    'profile.of': 'Profile of {{name}}',
    'profile.change_password': 'Change password',
    'profile.change_lang': 'Language',
    'profile.lang_saved': 'Your profile language is now "{{lang}}". Please reload this page to make changes effect',
    'profile.old_password': 'Old password',
    'profile.new_password': 'New password',
    'profile.your_name': 'Your name',
    'profile.email': 'Email',
    'profile.phone': 'Phone',
    'profile.your_saved': 'Your profile has been saved',
    'profile.saved': 'Profile of {{name}} has been saved',
    'profile.name_placeholder': 'e.g.: John Smith',
    'profile.will_be_exposed_to_others': 'This name will be exposed to other users',
    'profile.password_saved': 'Your new password has been saved',
    'missing_old_password': 'Old password does not match',
    'password_criteria': 'The password must have at least 6 characters, at least one digit, at least one uppercase and at least one lowercase character'

  };

  for( var i in translations )
    Em.I18n.translations[i] = translations[i];

}).call();