(function(){

  'use strict';

  if( currentLang !== 'en' ) return;
  
  var translations = {

    'de': 'Deutsch',
    'en': 'English',

    'hi': 'Hi',
    'or': 'or',
    'sign_out': 'Sign out',
    'edit_profile': 'Edit profile',
    'change_password': 'Change password',

    'go_to_dashboard': 'go to dashboard',
    'go_to_calendar': 'go to calendar',
    'apps.settings': 'Settings',
    'apps.lineup': 'Line-up',
    'apps.webmaker': 'WebMaker',
    'apps.shop': 'Shop',
    'apps.people': 'People',
    'apps.calendar': 'Calendar',
    'apps.open_app_bar': 'Open app panel',

    'today_is': 'Today is',
    'today': 'today',
    'tomorrow': 'tomorrow',
    'last_login': 'Last login',
    'live_ticker': 'Live ticker',
    'live_ticker.post': 'Post',
    'live_ticker.something_to_say': 'Write a note or message',
    'live_ticker.message': 'Message',
    'live_ticker.media': 'Pictures / files',
    'name': 'Name',
    'title': 'Title',
    'filename': 'Filename',
    'save': 'Save',
    'back': 'Back',
    'edit': 'Edit',
    'close': 'Close',
    'done': 'Done',
    'cancel': 'Cancel',
    'create': 'Create',
    'remove': 'Remove',
    'delete': 'Delete',
    'delete_selected': 'Delete selected',
    'root': 'root',
    'actions': 'Actions',
    'preview': 'Preview',
    'more': 'more',
    'perc_completed': 'percent completed',
    'system_status': 'System status',

    'cut': 'Cut',
    'copy': 'Copy',
    'paste': 'Paste',

    'email': 'Email',
    'phone': 'Phone',
    'address': 'Address',
    'street': 'Street',
    'zip': 'Zip',
    'state': 'State',
    'country': 'Country',
    'city': 'City',

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

    'content_here': 'Here should go some text!',

    'translation.title': 'Language',

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
    
    'really_delete': 'Really delete label {{name}}',

    'pic.drop_here': 'Upload'

  };

  for( var i in translations )
    Em.I18n.translations[i] = translations[i];

}).call();
