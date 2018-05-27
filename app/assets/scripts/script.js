var $ = require('jquery');

import * as Vars from './vars';

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
      //-------------------------------------------IS CHOICE GOOD OR BAD
      if(that.animalGallery[index].includes(userChoice) && userChoice !==""){
        //-------------------------------------------GOOD CHOICE

        $(this).addClass('cell__flipped');
        Vars.rightChoice(function(){
          setTimeout(()=>{
            $('.gamearea__pointer').addClass('animated bounceInLeft').removeClass('rotate');
            $('.front').removeClass('front__non-hover').attr('style', "");
            $('.message').removeClass('animated bounceInLeft bounceOutUp').text("");
            that.getNextChoice();
          }, 800);
        });
      } else {
        //-------------------------------------------BAD CHOICE
        Vars.badChoice(function(){
          $(this).removeClass('animated bounceInLeft');
        });
      }
    });
  }

  getNextChoice(){
    this.animalGallery.splice(index,1);  // to avoid repeats
    //--------------------------------------------------------------GAME ENDS
    let galleryLen = this.animalGallery.length;
    let that = this;
    if(galleryLen<1){
      Vars.gameEnds();
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
