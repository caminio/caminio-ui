(function(){

  'use strict';

  if( currentLang !== 'de' ) return;
  
  var translations = {

    'de': 'Deutsch',
    'en': 'Englisch',
    
    'hi': 'Hi',
    'or': 'oder',
    'sign_out': 'Abmelden',
    'edit_profile': 'Profil bearbeiten',
    'change_password': 'Passwort ändern',

    'go_to_dashboard': 'zum Dashboard gehen',
    'go_to_calendar': 'zum Kalendar gehen',
    'apps.settings': 'Settings',
    'apps.lineup': 'Spielplan',
    'apps.webmaker': 'WebMaker',
    'apps.shop': 'Shop',
    'apps.people': 'Personen',
    'apps.calendar': 'Kalender',
    'apps.open_app_bar': 'Anwendungsleiste öffnen, auch: Taste [c]',
    'apps.profile': 'Profil',

    'today_is': 'Heute ist',
    'today': 'Heute',
    'tomorrow': 'Morgen',
    'last_login': 'Letztes Mal online',
    'live_ticker': 'Live Ticker',
    'live_ticker.post': 'Abschicken',
    'live_ticker.something_to_say': 'Notiz oder Nachricht schreiben',
    'live_ticker.message': 'Nachricht',
    'live_ticker.media': 'Fotos / Dateien',
    'name': 'Name',
    'title': 'Titel',
    'filename': 'Dateiname',
    'save': 'Speichern',
    'back': 'Zurück',
    'edit': 'Bearbeiten',
    'close': 'Schließen',
    'done': 'Fertig',
    'cancel': 'Abbrechen',
    'create': 'Erstellen',
    'remove': 'Löschen',
    'delete': 'Löschen',
    'delete_selected': 'Ausgewählte löschen',
    'root': 'Wurzel',
    'actions': 'Aktionen',
    'preview': 'Vorschau',
    'more': 'mehr',
    'perc_completed': 'Prozent abgeschlossen',
    'status': 'Status',
    'total': 'Gesamt',
    'adv_search': 'Erweiterte Suche',

    'email': 'Email',
    'phone': 'Telefon',
    'address': 'Adresse',
    'street': 'Straße',
    'zip': 'PLZ',
    'state': 'Bundesland',
    'country': 'Land',
    'city': 'Stadt',

    'cut': 'Ausschneiden',
    'copy': 'Bearbeiten',
    'paste': 'Einfügen',

    'properties': 'Eigenschaften',
    'date': 'Datum',

    'select_all': 'Alle auswählen',
    'upload_file': 'Hochladen',

    'published': 'veröffentlicht',
    'draft': 'Entwurf',
    'published_click_to_change': 'veröffentlicht - klicken, um den Status zu ändern',
    'draft_click_to_change': 'Entwurf - klicken, um den Status zu ändern',

    'user_activity': 'Aktivität',
    'disk_quota': 'Festplatte',
    'users_quota': 'Benutzerkonten',
    'latest_activities': 'Letzte Aktivitäten',
    'users_in_total': 'BenutzerInnen gesamt',
    'please_select': 'Bitte auswählen...',
    'select_country': 'Land auswählen...',

    'settings': 'Einstellungen',

    'required_fields': 'Erfordert Eingabe',

    'last_modified': 'geändert',
    'created': 'erstellt',
    'created_by': 'erstellt von',
    'created_at': 'erstellt am',
    'updated': 'aktualisiert',
    'updated_by': 'aktualisiert von',
    'updated_at': 'aktualisiert am',
    

    'unsaved_data_continue': 'Das Formular enthält ungespeicherte Daten. Wirklich fortfahren?',

    'labels': 'Labels',
    'labels.title': 'Labels',
    'labels.new': 'Neues Label',
    'labels.select_entries_then_click_on_label': 'Zuerst Einträge auswählen, um sie mit einem Label zu markieren',
    'labels.items_selected': '{{count}} Einträge zu Label hinzufügen',

    'label.created': 'Label {{name}} wurde erfolgreich angelegt',
    'label.saved': 'Einstellungen {{name}} wurden gespeichert',
    'label.delete': 'Dieses Label löschen',
    'label.really_delete': '{{name}} wirklich löschen',
    'label.deleted': 'Label {{name}} wurde gelöscht',
    'label.private': 'Privat',

    'label.select_color': 'Farbe wählen',

    'translation.title': 'Sprache',

    'content_here': 'Hier sollte noch Text eingetragen werden!',
    
    'errors.db_field': '{{name}}: {{message}}',
    'errors.required': 'Eingabe erforderlich',
    'errors.invalid_email_address': 'Ungültige Email Adresse',
    'errors.duplicate_key': '{{name}} existiert bereits und darf nicht doppelt vorkommen',

    'really_delete': '{{name}} wirklich löschen',

    'pic.drop_here': 'Hochladen'
  };

  for( var i in translations )
    Em.I18n.translations[i] = translations[i];

}).call();
