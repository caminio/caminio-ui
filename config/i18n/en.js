module.exports = function( t ){

  'use strict';
  
  t.navbar = t.navbar || {};
  t.navbar.admin = 'Administration';
  t.navbar.dashboard = 'Dashboard';

  t.email = 'Email';
  t.name = 'Name';

  // USERS
  t.user = t.user || {};
  t.user.passwords_missmatch = 'Passwords missmatch';
  t.user.password_too_short = 'too short (6 characters at least)';
  t.user.password_saved = 'New password has been saved';
  t.user.password_reset_saved = 'New password has been saved. You can now log in with your email address __email__ and the password chosen just now';
  
};