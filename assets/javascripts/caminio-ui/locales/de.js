(function(){

  'use strict';

  if( currentLang !== 'de' ) return;
  
  var translations = {

    'nav.users': 'Benutzerkonten',
    'nav.domains': 'Domänen',
    'nav.settings': 'Einstellungen',

    'unknown': 'Unbekannt',

    'user.name': 'Name',
    'user.save': 'Speichern',
    'user.created': '{{name}} wurde erfolgreich gespeichert',
    'user.saved': '{{name}} wurde gespeichert',
    'user.create': 'Konto erstellen',
    'user.new': 'Neues Benutzerkonto',
    'user.edit': 'BenutzerIn bearbeiten',
    'user.email': 'Email',
    'user.phone': 'Telefon',
    'user.firstname': 'Vorname',
    'user.lastname': 'Nachname',
    'user.tabs.general': 'Allgemein',
    'user.tabs.settings': 'Einstellungen',
    'user.tabs.history': 'Protokoll',

    'user.password': 'Passwort',
    'user.password_confirmation': 'Wiederholen',

    'user.admin': 'Administrator',

    'user.lang': 'Sprache',
    'user.photo': 'Photo',
    'user.danger': 'Gefahrenzone',

    'user.errors.prohibited_save': 'Mindestens ein Fehler hinderte das Formular gespeichert zu werden',

    'user.security': 'Sicherheit',

    'invalid_email': 'Die Emailadresse {{value}} ist ungültig',

    'domain.name': 'Name',
    'domain.owner': 'Besitzer',
    'domain.fqdn': 'FQDN',
    'domain.new': 'Neue Domäne',
    'domain.edit': 'Domäne bearbeiten',
    'domain.save': 'Domäne speichern',
    'domain.saved': '{{name}} wurde gespeichert',
    'domain.created': '{{name}} wurde erfolgreich erstellt',
    'domain.allowed_apps': 'Erlaubte Anwendungen',
    'domain.default_lang': 'Standardsprache für Benutzerkonten',
    'domain.available_langs': 'Verfügbare Sprachen',
    'domain.thumbs': 'Thumbnailgrößen',

    'domain.switch': 'Auf diese Domäne wechseln',

    'domain.description': 'Beschreibung',
    'domain.create': 'Domäne erstellen',

    'errors.invalid_domain_name': 'Ungültiger Domänenname'

  };

  for( var i in translations )
    Em.I18n.translations[i] = translations[i];

})();