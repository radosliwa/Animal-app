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
    showBoard();
    getUserChoice();
    //console.log(animalGallery[index]);
  };

  var showBoard = function (){
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
    showAnimal();
  };

  //-------------------------------------GAME BEGINS

  var getUserChoice = function(){

    $('.cell').click(function(){
      var userChoice = $(this).text();

      if(animalGallery[index].includes(userChoice)){
        $('.cell').off('click').addClass('cell__non-hover');
        $('.message').show(500).delay(800).text('good job!').hide(500);
        $(this).addClass("cell__pictureFlip");
        $(".cell__pictureFlip").css({"background":'url('+ animalGallery[index] +') no-repeat center center'});

        setTimeout(function(){
        $('.cell').removeClass('cell__non-hover cell__pictureFlip').attr('style', "");
        getUserNextChoice();}, 1850);
      } else{
        $('.message').show(500).delay(800).text('wrong, try again!').hide(500);
      }
    });
  }

  var getUserNextChoice = function(){

    animalGallery.splice(index,1) // to avoid repeats

    showAnimal();

    if(animalGallery.length<1){     //-----------------GAME ENDS
      $('.gamearea').fadeOut(1000);
      setTimeout(function(){
        $('.finalMessage').css({display:"flex"}).show().delay(2000).queue(function(){
          location.reload(true);//from server, not cache
        });
      }, 1000);
    }
    getUserChoice();
  }

  var showAnimal = function(){
    index = Math.floor(Math.random()*animalGallery.length);
    $('.animal').attr('src',animalGallery[index]);
    console.log(animalGallery[index]);
  };


});
