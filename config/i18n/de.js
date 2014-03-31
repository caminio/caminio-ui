module.exports = function( t ){

  'use strict';

  t.navbar = t.navbar || {};
  t.navbar.admin = 'Administration';
  
  t.email = 'Email';
  t.name = 'Name';
  t.email = 'Email';

  // USERS
  t.user = t.user || {};
  t.user.passwords_missmatch = 'Passwörter stimmen nicht überein';
  t.user.password_too_short = 'Das gewählte Passwort ist zu kurz (mind. 6 Zeichen)';
  t.user.password_saved = 'Neues Passwort wurde gespeichert';
  t.user.password_reset_saved = 'Neues Passwort wurde gespeichert. Du kannst dich jetzt mit deiner Email Adresse __email__ und deinem eben gewählten Passwort anmelden.';
  
};
