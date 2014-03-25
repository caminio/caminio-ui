(function(){

  'use strict';

  if( currentLang !== 'en' ) return;
  
  var translations = {

    'name': 'Name',
    'save': 'Save',
    'back': 'Back',
    'edit': 'Edit',
    'close': 'Close',
    'cancel': 'Cancel',
    'create': 'Create',
    'remove': 'Remove',
    'delete': 'Delete',
    'delete_selected': 'Delete selected',
    'root': 'root',

    'cut': 'Cut',
    'copy': 'Copy',
    'paste': 'Paste',

    'properties': 'properties',
    'date': 'Date',

    'select_all': 'Select all',
    'upload_file': 'Upload a file',

    'published': 'published',
    'draft': 'draft',

    'user_activity': 'User activity',
    'disk_quota': 'Disk Quota',
    'users_quota': 'Users',
    'latest_activities': 'Latest activities',
    'users_in_total': 'Users in total',
    'please_select': 'Please select...',

    'required_fields': 'Required field',

    'last_modified': 'Modified',
    'created': 'Created',
    'settings': 'Settings',

    'unsaved_data_continue': 'The opened form contains unsaved data which would be lost. Really continue?',

    
    'errors.db_field': '{{name}}: {{message}}',
    'errors.required': 'This field is required',
    'errors.invalid_email_address': 'The email address is invalid',
    'errors.duplicate_key': '{{name}} is duplicate and can\'t be saved twice',

  };

  for( var i in translations )
    Em.I18n.translations[i] = translations[i];

}).call();