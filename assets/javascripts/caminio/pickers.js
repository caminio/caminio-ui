$.fn.caminioNumberPicker = function( options ){

  var settings = $.extend({
    decimals: 2,
    point: '.'
  }, options );

  this.on('keyup', function(e){
    var val = this.value;
    var start = getSelection.apply(this,['start']);
    var end   = getSelection.apply(this,['end']);
    val = val.replace(/,/g,'.');
    // . or ,
    if( e.keyCode === 188 || e.keyCode === 190 ){
      if( val.split('.').length > 1 )
        val = val.replace('.','');
    }
    // left, right arrow keys
    // backspace
    else if( e.keyCode === 37 || e.keyCode === 39 ||
            e.keyCode === 8 || e.keyCode === 46 )
      return;
    cleanup.apply( this, [val,start,end]);

  });

  this.on('change', function(e){
    cleanup.apply( this, [this.value]);
  });

  function roundDecimal( val ){
    return val.toFixed(settings.decimals);
  }

  /**
   * Method for selecting a range of characters in an input/textarea.
   *
   * Method taken from:
   *
   * @author  Sam Sehnert
   * @docs  http://www.teamdf.com/web/jquery-number-format-redux/196/
   *
   * @param int rangeStart      : Where we want the selection to start.
   * @param int rangeEnd        : Where we want the selection to end.
   *
   * @return void;
   */
  function setSelectionRange( rangeStart, rangeEnd ){
    // Check which way we need to define the text range.
    if( this.createTextRange ){
      var range = this.createTextRange();
        range.collapse( true );
        range.moveStart( 'character', rangeStart );
        range.moveEnd( 'character',   rangeEnd-rangeStart );
        range.select();
    }
    
    // Alternate setSelectionRange method for supporting browsers.
    else if( this.setSelectionRange ){
      this.focus();
      this.setSelectionRange( rangeStart, rangeEnd );
    }
  }
  
  /**
   * Get the selection position for the given part.
   * 
   * Method taken from:
   *
   * @author  Sam Sehnert
   * @docs  http://www.teamdf.com/web/jquery-number-format-redux/196/
   * @param string part     : Options, 'Start' or 'End'. The selection position to get.
   *
   * @return int : The index position of the selection part.
   */
  function getSelection( part ){
    var pos = this.value.length;
    
    // Work out the selection part.
    part = ( part.toLowerCase() == 'start' ? 'Start' : 'End' );
    
    if( document.selection ){
      // The current selection
      var range = document.selection.createRange(), stored_range, selectionStart, selectionEnd;
      // We'll use this as a 'dummy'
      stored_range = range.duplicate();
      // Select all text
      //stored_range.moveToElementText( this );
      stored_range.expand('textedit');
      // Now move 'dummy' end point to end point of original range
      stored_range.setEndPoint( 'EndToEnd', range );
      // Now we can calculate start and end points
      selectionStart = stored_range.text.length - range.text.length;
      selectionEnd = selectionStart + range.text.length;
      return part == 'Start' ? selectionStart : selectionEnd;
    }
    
    else if(typeof(this['selection'+part])!="undefined"){
      pos = this['selection'+part];
    }
    return pos;
  }

  function cleanup( val, start, end ){

    if( isNaN(val) )
      val = 0.0;

    val = roundDecimal(parseFloat(val))
            .replace('.',settings.point);

    $(this).val( val );

    if( start && end )
      setSelectionRange.apply(this, [start, end] );

  }

};