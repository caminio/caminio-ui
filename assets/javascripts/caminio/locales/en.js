(function(){

  'use strict';

  if( currentLang !== 'en' ) return;
  
  var translations = {

    'hi': 'Hi',
    'today_is': 'Today is',
    'session_started': 'Session started',
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
    'actions': 'Actions',
    'more': 'more',

    'cut': 'Cut',
    'copy': 'Copy',
    'paste': 'Paste',

    'email': 'Email',
    'phone': 'Phone',

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
    'select_country': 'Select country...',

    'required_fields': 'Required field',

    'last_modified': 'Modified',
    'created': 'Created',
    'created_by': 'Created by',
    'created_at': 'Created at',
    'updated': 'Updated',
    'updated_by': 'Updated by',
    'updated_at': 'Updated at',
    
    'settings': 'Settings',

    'unsaved_data_continue': 'The opened form contains unsaved data which would be lost. Really continue?',
    
    'labels.title': 'Labels',
    'labels.new': 'New label',

    'label.created': 'Label {{name}} has been created successfully',
    'label.saved': 'Label settings for {{name}} have been saved successfully',
    'label.delete': 'Delete this label',
    'label.really_delete': 'Really delete label {{name}}',
    'label.deleted': 'Label {{name}} has been deleted successfully',
    'label.private': 'Private',

    'label.select_color': 'Select color',

    'errors.db_field': '{{name}}: {{message}}',
    'errors.required': 'This field is required',
    'errors.invalid_email_address': 'The email address is invalid',
    'errors.duplicate_key': '{{name}} is duplicate and can\'t be saved twice',

  };

  for( var i in translations )
    Em.I18n.translations[i] = translations[i];

}).call();