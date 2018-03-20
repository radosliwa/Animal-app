/*
setTimeout(function(){
location.reload();
},1500);
*/

$(document).ready(function(){
  $('#gamearea').hide();
  $('#start').click(startGame);


  function startGame(){
    showGallery();
    //randomPick();
    $('#start').hide();
    $('#gamearea').show();
  }

  function showGallery(){
    var x = 4;
    var html = '';
    for(row = 0; row<x; row++){
      html += '<div class= row>';
      for(cell=0; cell<x; cell++){
        html += '<div class= cell>0</div>';
      }
      html += '</div>';
    }
    $('#output').html(html);
  };
  function randomPick(){

  }
});
