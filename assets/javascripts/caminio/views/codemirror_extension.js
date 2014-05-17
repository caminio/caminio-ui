( function( App ){

  'use strict';

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

  })( App );
