module.exports = function( t ){

  'use strict';
  
  t.navbar = t.navbar || {};
  t.navbar.admin = 'Administration';
  t.navbar.users = 'Users';
  t.navbar.domains = 'Domains';
  t.navbar.preferences = 'Preferences';

  t.initializing_application = 'Loading data';
  
  t.email = 'Email';
  t.name = 'Name';
  t.title = 'Title';
  t.description = 'Description';
  t.email = 'Email';

  t.nr = 'No.';
  t.yes = 'Yes';
  t.no = 'No';

  t.actions = 'Actions';
  t.create = 'Create';
  t.edit = 'Edit';
  t.close = 'Close';
  t.undo = 'Undo';
  t.back = 'back';

  t.created_at = 'Created at';
  t.updated_at = 'Updated at';

  t.really_delete = 'Do you really want to delete __name__?';
  t.delete_name = 'Delete __name__';

  // GENERAL ERRORS
  t.errors = t.errors || {};
  t.errors.duplicate_key = 'An entry named __name__ already exists';
  t.errors.db_field = 'Field __name__: __message__';

  // USERS
  t.users = t.users || {};
  t.users.edit = 'Edit user';
  t.users.lock = 'Lock user';
  t.users.delete = 'Delete user';
  t.users.new = 'New user';
  t.users.listing = 'User accounts';
  
  // USER
  t.user = t.user || {};
  t.user.create_new = 'Create a new account';
  t.user.settings = 'Account settings'; 
  t.user.editing_as_admin = 'You are editing this settings with <span class="lbl danger">administrator</span> privileges';
  t.user.firstname = 'Firstname';
  t.user.lastname = 'Lastname';
  t.user.email_desc = 'We will contact you through this email address';
  t.user.security = 'Security';
  t.user.password = 'Password';
  t.user.password_confirm = 'Repeat password';
  t.user.password_requirements = 'The password must have at least 6 characters and contain at least one uppercase, one lowercase character and one digit';
  t.user.password_exmpl = 'at least 6 characters';
  t.user.password_res = 'Password is:';
  t.user.send_link_to_set_password = 'Send a link to set password';
  t.user.send_link_to_set_password_again = 'Send a link to set password once more';
  t.user.send_link_desc = 'The user will get an email containing a link where they an set their password on their own.';
  t.user.generate_password = 'Generate';
  t.user.suggest_pwd = 'Suggest';
  t.user.created = 'User has been created!';
  t.user.creation_failed = 'User failed to create!';
  t.user.saved = 'User __name__ has been saved';
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
  t.user.password_saved = 'Your new password has been saved';
  t.user.really_delete = 'Really delete __name__?';
  t.user.last_login = 'Last seen';
  t.user.deleted = '__name__ has been deleted';
  t.user.errors = t.user.errors || {};
  t.user.errors.too_short = 'The entered password is too short (6 characters at least)';
  t.user.errors.requirements_not_met = 'The password must contain at least one digit, at least one lower case character, at least one uppercase character';

  t.domains = t.domains || {};
  t.domains.new = 'New domain';

  t.domain = t.domain || {};
  t.domain.create_new = 'Create a new domain';
  t.domain.last_activity = 'Last activity';
  t.domain.edit = 'Edit this domain';
  t.domain.owner = 'Owner';
  t.domain.apps = 'Applications';
  t.domain.danger_zone = 'Danger zone';
  t.domain.really_delete = 'Do you really want to delete <strong>__name__</strong>? This action cannot be undone!';
  t.domain.current_plan = 'Current plan';
  t.domain.settings = 'Domain settings';
  t.domain.name_exmpl = 'example.com';

  t.domain.errors = t.domain.errors || {};
  t.domain.errors.not_a_valid_domainname = 'Not a valid domain name';
  t.domain.saved = 'Domain __name__ has been saved';
  t.domain.destroy = 'Delete __name__';
  t.domain.destroy_desc = 'This will permanently delete this domain and all its users (apart if they are registered to other domains as well';
  t.domain.destroyed = 'Domain __name__ has been deleted (__affected__ related users have been deleted)';

  t.domain.general = 'General';
  t.domain.settings = 'Settings';

  t.domain.switch_to = 'Switch to';
  t.domain.current = 'Current';

  t.preferences = t.preferences || {};
  t.preferences.global = 'Global preferences';
  t.preferences.global_desc = 'Configure your domain here';
  t.preferences.your_plan = 'Your current plan';
  t.preferences.monthly_price = 'Monthly price';

};