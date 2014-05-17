(function( App ){

  'use strict';

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
  App.Select2SelectView = Ember.Select.extend({

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

  App.Select2TagView = Ember.TextField.extend({

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


  App.Select2CountryView = Ember.Select.extend({

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
        if( self.get('value') )
          self.$().select2('val', self.get('value'));
      },100);
    }.observes('value')

  });

  /**
   * Select2AjaxTextFieldView
   * example:
   * {{view App.Select2AjaxTextFieldView
        contentUrl="/caminio/get/data.json"
        optionValuePath="content.id"
        optionLabelPath="content.label"
        valueBinding="controller.selectedId"}}

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
   * @param name {String} name (the entered name)
   * @param elem {JQuery} the jquery object of this select2 instance
   *
   * the transformResultsAction gets:
   * @param data {Array}
   * @param page {JQuery} the current page if paging support is enabled
   *
   * and should return a select2 compatible result array
   *
   */
  App.Select2AjaxTextFieldView = Ember.TextField.extend({

    classNames: ['input-xlarge'],

    didInsertElement: function() {
      Ember.run.scheduleOnce('afterRender', this, 'processChildElements');
    },

    processChildElements: function() {
      var self = this;
      var sources = new Bloodhound({
        datumTokenizer: Bloodhound.tokenizers.obj.whitespace('value'),
        queryTokenizer: Bloodhound.tokenizers.whitespace,
        remote:  this.get('contentUrl')
      });

      sources.initialize();

      this.$().typeahead( null, {
        displayKey: 'value',
        source: sources.ttAdapter()
      });
    },

  });

})( App );
