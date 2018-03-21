/*
setTimeout(function(){
location.reload();
},1500);
*/

$(document).ready(function(){

  var gameBegins = (function(){
    $('.gamearea').hide();
    $('#start').click(function(){startGame();});
  })();


  var startGame = function(){
    showGallery();
    randomPicture();
    $('#start').hide();
    $('.gamearea').show();
    $('#message').hide();
  };

  var showGallery = function (){
    var animalNames = ['dog','racoon', 'cat'];
    var i = 0;
    var x = 4;
    var html = '';

    for(row = 0; row<x; row++){
      html += '<div class= row>';
      for(cell=0; cell<x; cell++){
        html += '<div class= cell>' + animalNames[i] + '</div>';
        i++;
      }
      html += '</div>';
    }
    $('.board').html(html);
  };

  var randomPicture = function (){
    var animalGallery = ['assets/images/animal-dog.jpg', 'assets/images/animal-racoon.jpg', 'assets/images/animal-cat.jpg'];
    var index = Math.floor(Math.random() * animalGallery.length);
    $('.animal').attr('src', animalGallery[index]);
  }
});
