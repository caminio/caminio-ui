( function(){

  'use strict';

  Ember.View.reopen(Em.I18n.TranslateableAttributes);

  window.App = Ember.Application.create({
    // LOG_TRANSITIONS: true,
    // LOG_TRANSITIONS_INTERNAL: true,
    // LOG_VIEW_LOOKUPS: true,
    // LOG_ACTIVE_GENERATION: true
  });
  
  window.App.ApplicationAdapter = DS.RESTAdapter.extend({
    host: caminioHostname+'/caminio',
    headers: {
      'X-CSRF-Token': window.csrf,
      'sideload': true,
      'namespaced': true
    }
  });

  window.App.ApplicationSerializer = DS.RESTSerializer.extend({
    serializeHasMany: function(record, json, relationship) {
      // only apply if embedded option is set in record with
      // DS.hasMany( 'fieldname', { embedded: 'always' } )
      if( relationship.options.embedded && relationship.options.embedded === 'always' )
        json[relationship.key] = record.get(relationship.key).map( function(item){
          return item.toJSON();
        });
    },
    serializeBelongsTo: function(record, json, relationship){
      if( relationship.options.embedded && relationship.options.embedded === 'always' )
        json[relationship.key] = record.get(relationship.key).toJSON();
      // added for label/webpage parent keys to be set
      else if( record.get(relationship.key) )
        json[relationship.key] = record.get(relationship.key).id;
    },
    serializeIntoHash: function(data, type, record, options) {
      var self = this;
      var root = Ember.String.decamelize(type.typeKey);
      data[root] = this.serialize(record, options);
      if( record._relationships ){
        for( var i in record._relationships){
          data[root][i] = [];
          if( record._relationships[i] )
            record._relationships[i].forEach( function( rel ){
              var obj = rel.serialize( rel, options );
              if( rel.id ) // do not make null _ids
                obj._id = rel.id;
              data[root][i].push( obj );
            });
        }
      }
    }, 
    typeForRoot: function(root) {
      var camelized = Ember.String.camelize(root);
      return Ember.String.singularize(camelized);
    },
    primaryKey: '_id'
  });

  /**
   *  Creates an array type for the ember model
   *  Strings are seperated via ','
   */
  window.DS.ArrayTransform = DS.Transform.extend({
    deserialize: function(serialized) {
      return (Ember.typeOf(serialized) == "array") ? serialized : [];
    },

    serialize: function(deserialized) {
      var type = Ember.typeOf(deserialized);
      if (type == 'array')
        return deserialized;
      else if (type == 'string')
        return deserialized.split(',').map(function(item) {
          return jQuery.trim(item);
        });
      else
        return [];
    } 
  });

  /**
   *  Creates an object for the ember model
   *  Strings are seperated via ','
   */
  window.DS.ObjectTransform = DS.Transform.extend({
    deserialize: function(serialized) {
      return Em.isNone(serialized) ? {} : serialized;
    },
    serialize: function(deserialized) {
      return Em.isNone(deserialized) ? {} : deserialized;
    } 
  });

  window.App.register("transform:array", DS.ArrayTransform);
  window.App.register("transform:object", DS.ObjectTransform);

  caminio.translateDataFields();

  $(document).ready(function(){
    
    $('#toggle-side-panel').on('click', function(){
      $('body').toggleClass('side-panel-active');
    });

    // $('.main-view').css({ height: $(window).height() - 80 });
    // $(window).on('resize', function(){
    //   $('.main-view').css({ height: $(window).height() - 80 });
    // })

    bootbox.setDefaults({ locale: currentLang });
    moment.lang( currentLang );

  });

  $.ajaxSetup({
    beforeSend: function(xhr, settings) {
      if( settings.type.match(/POST|PUT|PATCH|DELETE/) )
        xhr.setRequestHeader('X-CSRF-Token', csrf);
    }
  });

  /**
   * example:
   * {{view App.Select2SelectView
        id="mySelect"
        contentBinding="App.staticData"
        optionValuePath="content.id"
        optionLabelPath="content.label"
        selectionBinding="controller.selectedId"}}

    {{view App.Select2SelectView
        class="pull-right select-num-rows"
        contentBinding="availableRows"
        valueBinding="numRows"}}

   *
   * advanced
   *    promptTranslation='my.translation' // will be translated using Em.I18n
   *    createAction='actionName' // action must be present in current controller
   *    createTranslation='my.create.translation' // same as promptTranslation
   *
   * the createAction gets:
   * @param {String} name (the entered name)
   * @param {JQuery} the jquery object of this select2 instance
   * 
   */
  window.App.Select2SelectView = Ember.Select.extend({

    prompt: Em.I18n.t('please_select'),
    classNames: ['input-xlarge'],

    willInsertElement: function(){
      if( this.get('noPrompt') )
        this.set('prompt','');
      if( this.get('promptTranslation') )
        this.set('prompt', Em.I18n.t(this.get('promptTranslation')));
    },

    didInsertElement: function() {
      Ember.run.scheduleOnce('afterRender', this, 'processChildElements');
    },

    processChildElements: function() {
      var self = this;
      var options = {};

      if( this.get('noSearch') )
        options.minimumResultsForSearch = -1;

      this.$().select2( options ).on('select2-open', function(){
        if( !self.get('createAction') )
          return;
        $('#select2-drop .select2-input').off().on('keyup', function(e){
          if( $('#select2-drop .select2-results').length < 2 && this.value.length > 0 )
            $('#select2-drop .select2-result-label:first').text( Em.I18n.t(self.get('createTranslation')));
          else
            $('#select2-drop .select2-result-label:first').text( Em.I18n.t(self.get('promptTranslation')));
          if( e.keyCode !== 13 )
            return;
          self.get('controller').send(self.get('createAction'), this.value, self.$() );
          self.$().select2('close');
        });
      });
    },

    willDestroyElement: function () {
      this.$().select2("destroy");
    },

    selectedDidChange : function(){
      var self = this;
      setTimeout(function(){
        self.$().select2('val', self.get('value'));
      },100);
    }.observes('selection.@each')

  });

  window.App.Select2TagView = Ember.TextField.extend({

    didInsertElement: function() {
      Ember.run.scheduleOnce('afterRender', this, 'processChildElements');
    },

    processChildElements: function() {
      var options = {};
      options.placeholder   = Em.I18n.t('please_select');
      options.allowClear    = true;
      options.closeOnSelect = true;
      options.tokenSeparators = [','];
      options.width         = '100%';
      options.tags          = this.get('tags') || [];

      var $elem = this.$().select2(options);

      $elem.prev('div').find('ul.select2-choices').sortable({
        containment: 'parent',
        start: function() { $elem.select2('onSortStart'); },
        update: function() { $elem.select2('onSortEnd'); }
      });

    },

    willDestroyElement: function () {
      this.$().select2("destroy");
    },

    selectedDidChange : function(){
      var val = this.get('value');
      if( typeof(val) === 'string' )
        val = val.split(',');
      this.$().select2('val', val);
    }.observes('value')

  });


  window.App.Select2CountryView = Ember.Select.extend({

    prompt: Em.I18n.t('select_country'),
    classNames: ['input-xlarge'],

    willInsertElement: function(){

      var self = this;
      this.set('optionLabelPath', 'content.text');
      this.set('optionValuePath', 'content.id');

      var dfd = $.getJSON('/caminio/util/countries?lang='+currentLang);
      dfd.done( function( response ){
        var countries = [];
        for( var code in response )
          countries.push({ id: code, text: response[code] });
        countries.sort(function(a,b){
          if( a.text.toLowerCase() < b.text.toLowerCase() ) return -1;
          if( a.text.toLowerCase() > b.text.toLowerCase() ) return 1;
          if( a.text.toLowerCase() === b.text.toLowerCase() ) return 0;
        });
        self.set('content', countries);
        setTimeout(function(){
          self.$().select2('val', self.get('value'));
        },100);
      });
      return dfd;
    },

    didInsertElement: function() {
      Ember.run.scheduleOnce('afterRender', this, 'processChildElements');
    },

    processChildElements: function() {
      this.$().select2({
          // do here any configuration of the
          // select2 component
      });
    },

    willDestroyElement: function () {
      this.$().select2("destroy");
    },

    selectedDidChange : function(){
      var self = this;
      setTimeout(function(){
        self.$().select2('val', self.get('value'));
      },100);
    }.observes('value')

  });

  window.App.CodeMirrorView = Ember.TextArea.extend({

    classNames: ['CodeMirror'],

    didInsertElement: function() {
      Ember.run.scheduleOnce('afterRender', this, 'processChildElements');
    },

    processChildElements: function() {
      this._codeMirror = CodeMirror.fromTextArea( this.$()[0], {
          mode: 'markdown',
          tabMode: 'indent',
          lineWrapping: true
      });
      var self = this;
      this._codeMirror.on('change', function(){
        self._preventLoop = true;
        self.set('value', self._codeMirror.getValue());
      });
    },

    willDestroyElement: function () {
      this.$().select2("destroy");
    },

    selectedDidChange : function(){
      var self = this;
      if( self._preventLoop ){
        self._preventLoop = false;
        return;
      }
      self._codeMirror.setValue(self.get('value'));
    }.observes('value')

  });

  window.App.setupCtrlS = function( content, msg ){
    $(document).on('keydown', function(e){
      if( !( e.keyCode === 83 && ( e.metaKey || e.ctrlKey ) ) )
        return;
      e.preventDefault();
      content.save().then(function(){
        notify('info', msg);
      });
    })
  }


})();