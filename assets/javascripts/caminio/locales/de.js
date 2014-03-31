(function(){

  'use strict';

  if( currentLang !== 'de' ) return;
  
  var translations = {

    'name': 'Name',
    'save': 'Speichern',
    'back': 'Zurück',
    'edit': 'Bearbeiten',
    'close': 'Schließen',
    'cancel': 'Abbrechen',
    'create': 'Erstellen',
    'remove': 'Löschen',
    'delete': 'Löschen',
    'delete_selected': 'Ausgewählte löschen',
    'root': 'Wurzel',

    'cut': 'Ausschneiden',
    'copy': 'Bearbeiten',
    'paste': 'Einfügen',

    'properties': 'Eigenschaften',
    'date': 'Datum',

    'select_all': 'Alle auswählen',
    'upload_file': 'Hochladen',

    'published': 'veröffentlicht',
    'draft': 'Entwurf',

    'user_activity': 'Aktivität',
    'disk_quota': 'Festplatte',
    'users_quota': 'Benutzerkonten',
    'latest_activities': 'Letzte Aktivitäten',
    'users_in_total': 'BenutzerInnen gesamt',
    'please_select': 'Bitte auswählen...',

    'settings': 'Einstellungen',

    'required_fields': 'Erfordert Eingabe',

    'last_modified': 'geändert',
    'created': 'erstellt',

    'unsaved_data_continue': 'Das Formular enthält ungespeicherte Daten. Wirklich fortfahren?',

    'labels.title': 'Labels',
    'labels.new': 'Neues Label',

    'label.created': 'Label {{name}} wurde erfolgreich angelegt',
    'label.saved': 'Einstellungen {{name}} wurden gespeichert',
    'label.delete': 'Dieses Label löschen',
    'label.really_delete': '{{name}} wirklich löschen',
    'label.deleted': 'Label {{name}} wurde gelöscht',
    'label.private': 'Privat',

    'label.select_color': 'Farbe wählen',
    
    'errors.db_field': '{{name}}: {{message}}',
    'errors.required': 'Eingabe erforderlich',
    'errors.invalid_email_address': 'Ungültige Email Adresse',
    'errors.duplicate_key': '{{name}} existiert bereits und darf nicht doppelt vorkommen',

  };

  for( var i in translations )
    Em.I18n.translations[i] = translations[i];

}).call();