(function(){

  'use strict';

  if( currentLang !== 'en' ) return;
  
  var translations = {

    'nav.users': 'Users',
    'nav.domains': 'Domains',
    'nav.settings': 'Settings',

    'unknown': 'Unknown',

    'back': 'back',
    'edit': 'edit',
    'save': 'save',
    'close': 'close',
    'remove': 'remove',
    'user.name': 'Name',
    'user.save': 'Save',
    'user.created': 'User {{name}} has been created successfully',
    'user.saved': 'User {{name}} has been saved',
    'user.create': 'Create',
    'user.new': 'Create new user',
    'user.edit': 'Edit user',
    'user.email': 'Email',
    'user.phone': 'Phone',
    'user.firstname': 'Firstname',
    'user.lastname': 'Lastname',
    'user.tabs.general': 'General',
    'user.tabs.settings': 'Settings',
    'user.tabs.history': 'History',

    'user.password': 'Password',
    'user.password_confirmation': 'Repeat password',

    'user.admin': 'Administrator',

    'user.lang': 'Language',
    'user.photo': 'Photo',
    'user.danger': 'Danger zone',

    'user.errors.prohibited_save': 'Errors prohibited this form to be saved',

    'user.security': 'Security',

    'invalid_email': 'The email address entered is not valid: {{value}}',
    'required_fields': 'Required fields',

    'domain.name': 'Domainname',
    'domain.owner': 'Owner',
    'domain.new': 'New domain',
    'domain.edit': 'Edit domain',
    'domain.save': 'Save domain',
    'domain.saved': 'Domain {{name}} has been saved',
    'domain.created': 'Domain {{name}} has been created successfully',
    'domain.allowed_apps': 'Allowed applications',
    'domain.default_lang': 'Default language for users',
    'domain.available_langs': 'Available languages',
    'domain.thumbs': 'Thumbnail sizes',

    'domain.switch': 'Switch to this domain',

    'domain.description': 'Description',
    'domain.create': 'Create domain',

    'errors.invalid_domain_name': 'The entered value is not a valid domain name'

  };

  for( var i in translations )
    Em.I18n.translations[i] = translations[i];

})();