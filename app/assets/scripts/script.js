
$(function(){

  //----------------GLOBAL ARRAYS

  var animalGallery = ['assets/images/animal-dog.jpg', 'assets/images/animal-racoon.jpg', 'assets/images/animal-cat.jpg'];
  var indexFirst = Math.floor(Math.random() * animalGallery.length);
  var animalArray = ['dog','racoon', 'cat'];

  //-----------------------------------



  var gameOpens = (function(){
    $('.gamearea').hide();
    $('#start').click(function(){startGame();});
  })();


  var startGame = function(){

    showGallery();
    getUserChoice();
    $('#start').hide();
    $('.gamearea').show();
    $('.animal').attr('src', animalGallery[indexFirst]);
    $('#message').hide();
    console.log(indexFirst);

  };

  var showGallery = function (){
    var animalNames = animalArray.sort();
    var i = 0;
    var x = 4;
    var html = '';

    for(row = 0; row<x; row++){
      html += '<div class= row>';
      for(cell=0; cell<x; cell++){
        html += '<div class= cell>' + animalNames[i] +'</div>';
        i++;
      }
      html += '</div>';
    }
    $('.board').html(html);
  };

  var getUserChoice = function(){
    $('.cell').click(function(){

      var userChoice = $(this).text();
      //var index = Math.floor(Math.random() * animalGallery.length);
      if(animalGallery[indexFirst].includes(userChoice)){
        $('#message').show().text('good job!');
        setTimeout(function (){$('#message').hide(1500)}, 500);
        getUserNextChoice();
      } else{
        $('#message').show().text('wrong, try again!');
        setTimeout(function (){$('#message').hide(1500)}, 500);

      }
    });
  }

  var getUserNextChoice = function(){
    var index = Math.floor(Math.random() * animalGallery.length);
    $('.animal').attr('src', animalGallery[index])
    $('.cell').click(function(){

      var userChoice = $(this).text();
      //var index = Math.floor(Math.random() * animalGallery.length);
      if(animalGallery[index].includes(userChoice)){
        $('#message').show().text('good job!');
        setTimeout(function (){$('#message').hide(1500)}, 500);

        getUserNextChoice();

      } else{
        $('#message').show().text('wrong, try again!');
        setTimeout(function (){$('#message').hide(1500)}, 500);



      }

    });
  }

  /* var getNextChoice = function(){

  $('.cell').click(function(){
  var userChoice = $(this).data('id');

  if(animalGallery[index].includes(userChoice)){
  $('#message').show().text('good job!');
  $('#message').hide(3000);

  getUserNextChoice();
} else{
$('#message').show().text('wrong, try again!');
}

});
}*/

});
