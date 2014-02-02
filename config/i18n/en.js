module.exports = function( t ){

  'use strict';
  
  t.navbar = t.navbar || {};
  t.navbar.admin = 'Administration';
  t.navbar.users = 'Users';
  t.navbar.domains = 'Domains';

  t.initializing_application = 'Initializing Application';
  
  t.email = 'Email';
  t.name = 'Name';
  t.email = 'Email';

  t.nr = 'No.';
  t.yes = 'Yes';
  t.no = 'No';

  t.actions = 'Actions';
  t.create = 'Create';
  t.close = 'Close';
  t.undo = 'Undo';
  t.back = 'back';

  // USERS
  t.users = t.users || {};
  t.users.edit = 'Edit user';
  t.users.lock = 'Lock user';
  t.users.delete = 'Delete user';
  t.users.new = 'New user';
  
  // USER
  t.user = t.user || {};
  t.user.settings = 'Account settings'; 
  t.user.editing_as_admin = 'You are editing this settings with <span class="lbl danger">administrator</span> privileges';
  t.user.firstname = 'Firstname';
  t.user.lastname = 'Lastname';
  t.user.last_login = 'Last login';
  t.user.email_desc = 'We will contact you through this email address';
  t.user.security = 'Security';
  t.user.password = 'Password';
  t.user.password_confirm = 'Repeat password';
  t.user.password_requirements = 'The password must have at least 6 characters and contain at least one uppercase, one lowercase character and one digit';
  t.user.password_exmpl = 'at least 6 characters';
  t.user.password_res = 'Password is:';
  t.user.send_link_to_set_pwd = 'Generate a link';
  t.user.suggest_pwd = 'Suggest';
  t.user.created = 'User has been created!';
  t.user.creation_failed = 'User failed to create!';
  t.user.saved = 'User has been saved';
  t.user.saving_failed = 'Failed to save user';
  t.user.admin = 'Administrative privileges';
  t.user.passwords_missmatch = 'Passwords missmatch';
  t.user.password_too_short = 'The given password is too short (6 charachters required)';
  t.user.lang = 'Language';
  t.user.edit_profile = 'Edit profile';
  t.user.danger_zone = 'Danger zone';
  t.user.lock = 'Lock this account';
  t.user.lock_desc = 'The user will not be able to log into the system any more.';
  t.user.destroy = 'Delete this account';
  t.user.destroy_desc = 'This will permanently delete the user anything private to the user (like profile photos, comments and messages).';
  t.user.general = 'General';

};