define( function( require ){

  'use strict';

  var viewModelBase = require('caminio/view_model_base');

  return {
    createViewModel: createViewModel
  };

  function createViewModel( options ){
    var viewModel = viewModelBase();
    for( var i in options )
      viewModel[i] = options[i];
    return viewModel;
  }

});