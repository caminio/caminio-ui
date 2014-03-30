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

    'user.api': 'API',
    'user.remote_clients': 'Fernzugriffe',

    'user.cannot_delete_domain_owner': 'Das Domänenadministrationskonto kann nicht gelöscht werden!',
    'user.remove_desc': 'Wenn dieses Benutzerkonto gelöscht wird, werden alle Kommentare und Nachrichten, die von diesem Konto aus erstellt wurden, ebenfalls gelöscht. Webseiten und andere geteilte Inhalte werden anulliert; die Besitzerschaft auf den Domänenadministrator übertragen',
    'user.remove': 'Dieses Benutzerkonto löschen',
    'user.really_delete': 'Dieses Benutzerkonto wirklich löschen? Diese Aktion kann nicht rückgängig gemacht werden. Um fortzufahren, gib den vollen Namen des Benutzerkontos <strong>{{fullname}}</strong> in das Feld unterhalb ein',
    'user.removed': 'Das Benutzerkonto {{name}} wurde gelöscht',

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

    'domain.danger': 'Gefahrenzone',
    'domain.remove': 'Diese Domäne löschen',
    'domain.remove_desc': 'Wenn du diese Domäne löscht, werden alle Benutzerkonten und Daten unwiderruflich gelöscht.',
    'domain.removed': 'Domäne {{name}} wurde gelöscht',
    'domain.really_delete': 'Möchtest du die Domäne {{name}} unwiderruflich löschen? Um fortzufahren, gib bitte den Namen der Domäne <strong>{{name}}</strong> hier ein',

    'domain.disk_quota_m': 'Festplatten Quota (MB)',
    'domain.upload_limit_m': 'Upload limit (MB)',
    'domain.user_quota': 'Benutzerkonten Quota',

    'domain.switch': 'Auf diese Domäne wechseln',

    'domain.description': 'Beschreibung',
    'domain.create': 'Domäne erstellen',

    'errors.invalid_domain_name': 'Ungültiger Domänenname',

    'client.create': 'Neuen API Key erstellen',
    'client.saved': 'API Key {{name}} wurde gespeichert',
    'client.really_delete': 'Soll {{name}} wirklich gelöscht werden? Das könnte negative Auswirkungen auf andere Seiten haben',
    'client.removed': '{{name}} wurde gelöscht',

    'client.domain': 'Domäne',

    'client.name': 'Domänenname',
    'client.id': 'Consumer key',
    'client.secret': 'Consumer secret'

  };

  for( var i in translations )
    Em.I18n.translations[i] = translations[i];

})();