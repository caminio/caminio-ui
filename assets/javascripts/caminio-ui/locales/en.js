(function(){

  'use strict';

  if( currentLang !== 'en' ) return;
  
  var translations = {

    'nav.users': 'Users',
    'nav.domains': 'Domains',
    'nav.settings': 'Settings',

    'unknown': 'Unknown',

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

    'user.api': 'API',
    'user.remote_clients': 'Remote clients',

    'user.cannot_delete_domain_owner': 'The domain administration account cannot be deleted!',
    'user.remove_desc': 'If you remove this account, all comments will be removed, all items shared with others will be nullified (ownership will be set to the domain owner',
    'user.remove': 'Remove this user account',
    'user.really_delete': 'Really delete this user? This action cannot be undone. Please type the user\'s name <strong>{{fullname}}</strong> into the field below to continue.',
    'user.removed': 'User {{name}} has been removed',

    'user.errors.prohibited_save': 'Errors prohibited this form to be saved',

    'user.security': 'Security',

    'invalid_email': 'The email address entered is not valid: {{value}}',
    'required_fields': 'Required fields',

    'domain.name': 'Domainname',
    'domain.owner': 'Owner',
    'domain.fqdn': 'FQDN',
    'domain.new': 'New domain',
    'domain.edit': 'Edit domain',
    'domain.save': 'Save domain',
    'domain.saved': 'Domain {{name}} has been saved',
    'domain.created': 'Domain {{name}} has been created successfully',
    'domain.allowed_apps': 'Allowed applications',
    'domain.default_lang': 'Default language for users',
    'domain.available_langs': 'Available languages',
    'domain.thumbs': 'Thumbnail sizes',
    'domain.disk_quota_m': 'Disk quota (MB)',
    'domain.upload_limit_m': 'Upload size limit (MB)',
    'domain.user_quota': 'Users quota',

    'domain.danger': 'Danger zone',
    'domain.remove': 'Remove this domain',
    'domain.remove_desc': 'Removing this domain will delete all useres and all data permanently. There is no way to undo this action',
    'domain.removed': 'Domain {{name}} has been removed',
    'domain.really_delete': 'Do you really want to delete this domain including all user accounts? Enter the domain name {{name}} to proceed',

    'domain.switch': 'Switch to this domain',

    'domain.description': 'Description',
    'domain.create': 'Create domain',

    'errors.invalid_domain_name': 'The entered value is not a valid domain name',

    'client.create': 'Add new client id',
    'client.saved': 'Client {{name}} has been saved',
    'client.really_delete': 'Really delete client {{name}}? This might have unexpected impact on other sites accessing through this client',
    'client.removed': '{{name}} has been removed',
    'client.domain': 'Domain name',

    'client.name': 'Domain name',
    'client.id': 'Consumer key',
    'client.secret': 'Consumer secret'

  };

  for( var i in translations )
    Em.I18n.translations[i] = translations[i];

})();