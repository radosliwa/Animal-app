
$(function(){

  //-----------------------------------------GLOBAL ARRAYS


  var animalGallery = ['assets/images/animal-dog.jpg', 'assets/images/animal-racoon.jpg',
  'assets/images/animal-cat.jpg'];
  var index;
  var animalArray = ['dog','racoon', 'cat'];


  //-----------------------------------



  var gameOpens = (function(){
    $('.gamearea').hide();
    $('#start').click(function(){startGame();});
  })();


  var startGame = function(){


    $('#start').hide();
    $('.gamearea').show();
    $('.message').hide();
    showGallery();
    getUserChoice();
    //console.log(animalGallery[index]);

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

  //-------------------------------------USER ENGAGES

  var getUserChoice = function(){
    showAnimal();


    $('.cell').click(function(){
      var userChoice = $(this).text();

      if(animalGallery[index].includes(userChoice)){
        $('.cell').off('click');
        $('.message').show().text('good job!').hide(700);
        getUserNextChoice();

      } else{
        $('.message').show(900).text('wrong, try again!').hide(700);
      }
    });
  }

  var getUserNextChoice = function(){

    animalGallery.splice(index,1) //----------TO AVOID REPEATS
    showAnimal();
    if(animalGallery.length<1){
      $('.gamearea').fadeOut(1000);
      setTimeout(function(){$('.finalMessage').css({display:"flex"}).show();}, 1000);
      //$('.gamearea').css('display','hidden');
    }
    console.log(animalGallery);


    $('.cell').click(function(){
      var userChoice = $(this).text();

      if(animalGallery[index].includes(userChoice)){
        $('.cell').off('click');
        $('.message').show(900).text('good job!').hide(700);
        getUserNextChoice();

      } else{
        $('.message').show(900).text('wrong, try again!').hide(700);
      }
    });



  }









  var showAnimal = function(){
    index = Math.floor(Math.random()*animalGallery.length);
    $('.animal').attr('src',animalGallery[index]);
    console.log(animalGallery[index]);
  };


});
