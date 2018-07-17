var $ = require('jquery');

import * as Choices from './Choices';


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
    let cells ='';
    for(let i = 0; i < arr.length; i++){
      cells +=`<div class="cell">
      <div class="front"><p>${arrSort[i]}</p></div>
      <div class="back"><img src="assets/images/animal-${arrSort[i]}.jpg" alt="${arrSort[i]}"></div>
      </div>`;
    }
    $('.board').html(cells);
  }

  startGame (){
    this.cellToClick = $('.cell'); /*here not in constructor cause
    they dont exist until createRandomBoard*/
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

        Choices.rightChoice(function(){
          setTimeout(()=>{
            that.gameArrow.addClass('animated bounceInLeft').removeClass('rotate');
            that.cellFront.removeClass('front__non-hover').attr('style', "");
            that.message.removeClass('animated bounceInLeft bounceOutUp').text("");
            that.getNextChoice();
          }, 600);
        });
      } else {
        //-------------------------------------------BAD CHOICE
        console.log(this);
        Choices.badChoice();
      }
    });
  }

  getNextChoice(){
    this.animalGallery.splice(index,1);  // to avoid repeats
    //--------------------------------------------------------------GAME ENDS
    let galleryLen = this.animalGallery.length;
    let that = this;
    if(galleryLen<1){
      Choices.gameEnds();
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
