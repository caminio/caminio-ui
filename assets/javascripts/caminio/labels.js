(function(){

  'use strict';

  window.caminio = caminio || {};
  caminio.labels = caminio.labels || {};

  caminio.labels.getColors = function getLabelColors(){

    var str = '';
    [
      { bgc: '#428BCA', bc: '#26a', fgc: '#fff' },
      { bgc: '#F0AD4E', bc: '#c82', fgc: '#333a3a' },
      { bgc: '#1CAF9A', bc: '#087', fgc: '#fff' },
      { bgc: '#D9534F', bc: '#b32', fgc: '#fff' },
      { bgc: '#1d2939', bc: '#001', fgc: '#fff' }
    ].forEach( function( colSet ){
      str += '<span class="color" data-fg-color="'+colSet.fgc+'" data-bg-color="'+colSet.bgc+'" data-border-color="'+colSet.bc+'"'+
              'style="background-color:'+colSet.bgc+'; color:'+colSet.fgc+'; border-color: '+colSet.bc+';"></span>';
    });
    return str;
  };

  caminio.labels.getBoxes = function getLabelBoxes(){
    var str = '';
    App.User.store.all('label').content.forEach( function(label){
      str += '<span class="color" data-private="'+label.get('private')+'" data-id="'+label.id+'" title="'+label.get('name')+'" style="background-color:'+label.get('bgColor')+'; color:'+label.get('fgColor')+'; border-color: '+label.get('borderColor')+';"></span>';
    });
    return str;
  };

})();
