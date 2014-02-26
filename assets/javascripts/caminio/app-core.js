( function(){

  'use strict';

  Ember.View.reopen(Em.I18n.TranslateableAttributes);

  window.App = Ember.Application.create();
  
  window.App.ApplicationAdapter = DS.RESTAdapter.extend({
    host: 'http://localhost:4000/caminio',
    headers: {
      'X-CSRF-Token': window.csrf,
      'sideload': true,
      'namespaced': true
    }
  });

  window.App.ApplicationSerializer = DS.RESTSerializer.extend({
    serializeHasMany: function(record, json, relationship) {
      json[relationship.key] = record.get(relationship.key).map( function(item){
        return item.toJSON();
      });
    },
    serializeBelongsTo: function(record, json, relationship) {
      json[relationship.key] = record.get(relationship.key).toJSON();
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
      if (type == 'array') {
          return deserialized;
      } else if (type == 'string') {
          return deserialized.split(',').map(function(item) {
              return jQuery.trim(item);
          });
      } else {
          return [];
      }
    } 
  });

  window.App.register("transform:array", DS.ArrayTransform);

  caminio.translateDataFields();

  $('#toggle-side-panel').on('click', function(){
    $('body').toggleClass('side-panel-active');
  });

  window.App.Select2SelectView = Ember.Select.extend({

    prompt: Em.I18n.t('please_select'),
    classNames: ['input-xlarge'],

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
    }
  });

  App.Select2TagView = Ember.TextField.extend({

    didInsertElement: function() {
      Ember.run.scheduleOnce('afterRender', this, 'processChildElements');
    },

    processChildElements: function() {
      var options = {};
      options.placeholder   = 'Please select...';
      options.allowClear    = true;
      options.closeOnSelect = true;
      options.width         = '100%';
      options.tags          = this.get('tags') || [];

      this.$().select2(options);
    },

    willDestroyElement: function () {
      this.$().select2("destroy");
    },

    selectedDidChange : function(){
      var val = this.get('value');
      if( typeof(val) === 'string' )
        val = val.split(',')
      this.$().select2('val', val);
    }.observes('value')

  });

}).call();