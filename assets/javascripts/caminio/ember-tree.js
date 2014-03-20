( function( Ember ){
  
  Ember.Tree = Ember.Namespace.create();

  Ember.Tree.BranchView = Ember.CollectionView.extend({
    tagName: 'ul',
    classNames: ['ember-tree'],
    itemViewClass: 'Ember.Tree.NodeView',
    root: true,
    addNewItem: function(){
      var item = this.get('controller.addedItem');
      if( !item.get('parent') )
        this.get('content').content.pushObject( item );
    }.observes('controller.addedItem'),
    didInsertElement: function(){

      var self = this;
      if( !this.get('selectItem') )
        return;
        
      collectParents( [], this.get('selectItem.parent.id') );

      function collectParents( arr, parentId, cb ){
        if( !parentId )
          return loadAndOpenParentView( arr, self );
        arr.push( parentId );
        App.User.store.find('webpage', { _id: parentId }).then( function( parent ){
          collectParents( arr, parent ? parent.id : null, cb );
        });
      }

      /**
       * opens all given parent nodes, so
       * the actual item should be exposed
       */
      function loadAndOpenParentView( parentIds, view ){
        var parentId;
        var parentView = view._childViews.find( function( _view ){
          if( !('children' in _view) ){ return false; }
          parentId = parentIds.find( function( _parentId ){
            return (_parentId === _view.get('content.id'));
          });
          if( parentId ) return view;
        });
        if( parentView ){
          parentIds.splice( parentIds.indexOf( parentId ), 1 );
          parentView.set('isOpen', true );
          var children = parentView._fetchChildren();
          parentView.set('children', children);
          if( parentIds.length > 0 )
            children.then( function(){ loadAndOpenParentView( parentIds, parentView ); } );
          else
            children.then( function(){ loadAndOpenParentView( [ self.get('selectItem.id') ], parentView ); } );
        } else {
          self.get('controller').send('treeItemSelected', self.get('selectItem'), true );
        }
      }

    },
    _getRootView: function(){
      if( this.nearestWithProperty('root') )
        return this.nearestWithProperty('root')._getRootView();
      return this;
    }
  });

  Ember.Tree.NodeView = Ember.View.extend({
    isOpen: false,
    children: null,
    tagName: 'li',
    isSelected: function(){
      return this.get('controller.curSelectedItem.id') === this.get('content.id');
    }.property('controller.curSelectedItem'),
    hasChildren: function(){
      return ( this.get('children') === null || ( this.get('children.content') && this.get('children.content').content.length > 0 ) );
    }.property('children.content'),
    addNewItem: function(){
      var item = this.get('controller.addedItem');
      if( item.get('parent.id') === this.get('content.id') ){
        if( !this.get('children') ){
          this.set('children', this._fetchChildren());
          this.set('isOpen',true);
        }
        else
          this.get('children').content.pushObject( item );
      }
    }.observes('controller.addedItem'),
    classNameBindings: [':ember-tree-node', 'isOpen: tree-branch-open', 'hasChildren:tree-branch-icon:tree-node-icon'],
    didInsertElement: function(){
      var self = this;

      this.$().draggable({
        handle: '.move',
        helper: 'clone',
        revert: function( $droppableElem ){
          if( $droppableElem )
            return true;
          var oldParentView = self.get('controller.draggingNodeView.parentView.parentView');
          var child = App.User.store.getById('webpage', self.$('.item-container').attr('data-id'));
          child.set('parent', App.User.store.createRecord('webpage'));
          child.save().then(function(){
            if( oldParentView )
              oldParentView.set('children', oldParentView._fetchChildren());
            notify('info', Em.I18n.t('webpage.moved_to', { name: self.get('name'), to: Em.I18n.t('root') }));
            var rootTreeView = self.nearestWithProperty('root')._getRootView();
            rootTreeView.get('content.content').pushObject(child);
          });
        },
        start: function(){
          self.get('controller').set('draggingNodeView', self);
        },
        stop: function(){
          if( self.get('controller.draggingNodeView') )
            self.get('controller').set('draggingNodeView', null);
        }
      })
      .droppable({
        accept: '.ember-tree li',
        tolerance: 'pointer',
        greedy: true,
        hoverClass: 'droppable-candiate',
        drop: function( e, ui ){
          e.stopPropagation();
          var childId = ui.draggable.find('.item-container').attr('data-id');
          var childView = Ember.View.views[ ui.draggable.attr('id') ];
          var child = childView.get('content'); //App.User.store.getById('webpage', childId);
          child.set('parent', self.get('content'));
          if( childView && 'destroy' in childView )
            childView.destroy();
          ui.helper.remove();
          ui.draggable.remove();
          
          // clear from old parent
          var oldParentView = self.get('controller.draggingNodeView.parentView.parentView');
          if( oldParentView && '_fetchChildren' in oldParentView )
            oldParentView.set('children', null);

          child.save().then( function(){
            if( oldParentView && '_fetchChildren' in oldParentView)
              oldParentView.set('children', oldParentView._fetchChildren());
            notify('info', Em.I18n.t('webpage.moved_to', { name: child.get('name'), to: self.get('content.name') }));
            self.set('isOpen',true);
            if( self.get('children') ){
              self.get('children').content.pushObject( child );
            } else
              self.set('children', self._fetchChildren() );
          });
        }
      });
    },
    click: function(e){ this._clickView(e); },
    _clickView: function( e, forceReload ){
      if( e )
        e.stopPropagation();
      this.get('controller').send('treeItemSelected', this.get('content'), !this.get('isSelected') );
      if( !this.get('children') || forceReload )
        this.set('children', this._fetchChildren());
      this.set('isOpen', this.get('isSelected') );
    },
    _modelName: function(){
      return inflection.underscore( this.get('content').constructor.toString()).replace('app._','');
    },
    _fetchChildren: function(){
      return App.User.store.find( this._modelName(), { parent: this.get('content.id') } );
    }
  });


})( Ember );