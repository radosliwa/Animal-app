var $ = require('jquery');

import * as Values from './Values';
import {rightChoice, wrongChoice, gameEnds} from './Choices';



class Animalia{

  constructor(animalGallery, animalNames){
    this.animalNames = animalNames;
    this.animalGallery = animalGallery;
    Values.$startButton.fadeTo('slow', 1);
    this.mainEvent();
  }

  //-------------------------------------GAME BEGINS
  mainEvent(){
    Values.$startButton.click(()=> {
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
    $('.board').css('display', 'flex').html(cells);
    /*not optimal performancewise, but with opacity 0
    cursor disappeared below start button due to cursor:none on b*/
  }

  startGame (){
    Values.$front = $('.front');
    Values.$cell = $('.cell'); /*here again cause those from Values
    dont exist until createRandomBoard*/
    Values.$startButton.hide();
    Values.$gameArea.addClass('gamearea__visible');
    this.getUserChoice();
  }

  //------------------------------------- user engages
  getUserChoice (){
    let userChoice;
    let that = this;
    this.showAnimal();
    Values.$cell.one('click', function(e){
      /* one turns off click for clicked
      element, off('click') in Choices does that for the rest of the cells */
      userChoice = $(this).children().text();
      e.stopImmediatePropagation();

//-------------------------------------------IS CHOICE RIGHT OR WRONG

  if(that.animalGallery[Values.index]=== "assets/images/animal-"+userChoice+".jpg" && userChoice !==""){
        //-------------------------------------------RIGHT CHOICE
        $(this).addClass('cell__flipped');
        Values.$front.addClass('front__non-hover');

        `${rightChoice(function(){
          that.getNextChoice();
            })}`;
      } else {

        //-------------------------------------------WRONG CHOICE

        `${wrongChoice()}`;
        Values.$cell.removeClass('cell--avoidClicks');
      }
    });
  }

  getNextChoice(){
    Values.$gameArrow.removeClass('rotate').addClass('animated bounceInLeft');
    this.animalGallery.splice(Values.index,1);  // to avoid repeats
    //--------------------------------------------------------------GAME ENDS
    let galleryLen = this.animalGallery.length;

    let that = this;
    if(galleryLen<1){
      `${gameEnds()}`;
    }
    this.getUserChoice();
  }

  showAnimal(){
    this.getIndex();
    Values.$animalShowing.attr('src',this.animalGallery[Values.index]).fadeIn();
  }

  getIndex(){
    Values.index = Math.floor(Math.random()*this.animalGallery.length);
  }
}
export const animalia = (function() {
  new Animalia(['assets/images/animal-cat.jpg','assets/images/animal-dog.jpg','assets/images/animal-beaver.jpg', 'assets/images/animal-deer.jpg','assets/images/animal-goose.jpg', 'assets/images/animal-hare.jpg','assets/images/animal-hen.jpg','assets/images/animal-horse.jpg',
  'assets/images/animal-lizard.jpg','assets/images/animal-monkey.jpg', 'assets/images/animal-pig.jpg',
  'assets/images/animal-racoon.jpg', 'assets/images/animal-rat.jpg','assets/images/animal-seal.jpg','assets/images/animal-snake.jpg',
  'assets/images/animal-dolphin.jpg'],['cat', 'dog', 'beaver','deer', 'goose', 'hare', 'hen', 'horse', 'lizard', 'monkey', 'pig',
  'racoon', 'rat', 'seal', 'snake', 'dolphin']);
})();
