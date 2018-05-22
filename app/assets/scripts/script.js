var $ = require('jquery');

let index;

class Animalia{

  constructor(animalGallery, animalNames){
    this.animalNames = animalNames;
    this.animalGallery = animalGallery;
    this.startButton = $('#start');
    this.gameArea = $('.gamearea');
    this.message = $('.message');
    this.animalShowing = $('.animal');
    this.finalMessage = $('.finalMessage');
    this.startButton.fadeTo('slow', 1);
    this.gameArrow = $('.gamearea__pointer');
    this.events();
  }

  //-------------------------------------GAME BEGINS
  events(){
    this.startButton.click(()=> {
      this.createRandomBoard();
      this.startGame();
    });
  }

  createRandomBoard(){
    let arr = this.animalNames;
    let arrSort = arr.sort(()=>Math.random() - 0.5);
    for(let i = 0; i < arr.length; i++){
      $('.board').append(`<div class="cell">
      <div class="front">${arrSort[i]}</div>
      <div class="back"><img src="assets/images/animal-${arrSort[i]}.jpg" alt="${arrSort[i]}"></div>
      </div>`);
    }
  }

  startGame (){
    this.cellToClick = $('.cell');
    this.cellFront = $('.front');
    this.startButton.hide();
    this.gameArea.fadeTo('fast', 1);
    this.getUserChoice();
  }

  //------------------------------------- user engages
  getUserChoice (){

    let userChoice;
    let that = this;
    this.showAnimal();
    this.cellToClick.one('click', function(e){

      /* one turns off click for clicked
      element, off('click') below does that for the rest of the cells */

      userChoice = $(this).children().text();
      e.stopImmediatePropagation();

      if(that.animalGallery[index].includes(userChoice) && userChoice !==""){
        $(this).addClass('cell__flipped');
        $(that.cellToClick).off('click');
        $(that.cellFront).addClass('front__non-hover');
        $(that.gameArrow).removeClass('animated bounceInLeft').addClass('rotate');
        $(that.message).addClass('animated bounceInLeft').show().text('good job!').delay(500) //needed first delay to keep message still for a sec
        .one('animationend', function(){
          $(that.cellToClick).off('click');
          $(this).addClass('animated bounceOutUp');
          $(that.animalShowing).fadeOut(700);
        }); //with on() fadeOut would fire even after else

        setTimeout(()=>{
          $(that.gameArrow).addClass('animated bounceInLeft').removeClass('rotate');
          $(that.cellFront).removeClass('front__non-hover').attr('style', "");
          $(that.message).removeClass('animated bounceInLeft bounceOutUp').text("");
          that.getUserNextChoice();
        }, 1700);

      } else {
        $(this).addClass('front__non-hover');
        $(this.cellToClick).off('click');
        $(that.message).addClass('animated bounceInLeft').show().delay(1100).text('wrong, try again!')
        .one('animationend',function(){
          $(this).removeClass('animated bounceInLeft');
          $(that.cellFront).removeClass('front__non-hover');

        });
      }
    });

  }


  getUserNextChoice (){
    this.animalGallery.splice(index,1); // to avoid repeats
    //--------------------------------------------------------------GAME ENDS
    let galleryLen = this.animalGallery.length;
    let that = this;
    if(galleryLen<1){
      $(that.gameArrow).removeClass('animated bounceInLeft')
      $(this.gameArea).fadeOut(500);
      setTimeout(function(){
        $(that.finalMessage).css({display:"flex"}).show().fadeOut(1800).queue(function(){
          location.reload();//from server, not cache
        });
      }, 1000);
    }
    this.getUserChoice();
  }

  showAnimal(){
    this.getIndex();
    this.animalShowing.attr('src',this.animalGallery[index]).fadeIn();
  }

  getIndex(){
    index = Math.floor(Math.random()*this.animalGallery.length);
  }
}

var animalia = new Animalia(['assets/images/animal-dog.jpg', 'assets/images/animal-racoon.jpg',
'assets/images/animal-cat.jpg'],['cat', 'dog', 'beaver','deer', 'goose', 'hare', 'hen', 'horse', 'lizard', 'monkey', 'pig',
'racoon', 'rat', 'seal', 'snake', 'dolphin']);
