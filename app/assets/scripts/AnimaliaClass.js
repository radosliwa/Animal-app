var $ = require('jquery');

import * as Values from './Values';
import * as Choices from './Choices';



export default class Animalia{

  constructor(animalGallery, animalNames, number){
    this.animalNames = animalNames;
    this.animalGallery = animalGallery;
    
    Values.$startButton.fadeTo('slow', 1);
    this.events();
  }
  //-------------------------------------GAME BEGINS
  events(){
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
    $('.board').html(cells);

  }

  startGame (){
    this.cellToClick = $('.cell'); /*here not in constructor cause
    they dont exist until createRandomBoard*/
    this.cellFront = $('.front');
    Values.$startButton.hide();
    Values.$gameArea.fadeTo('fast', 1);
    this.getUserChoice();
  }

  //------------------------------------- user engages
  getUserChoice (){
    let userChoice;
    let that = this;
    this.showAnimal();
    this.cellToClick.one('click', function(e){
      /* one turns off click for clicked
      element, off('click') in Choices does that for the rest of the cells */
      userChoice = $(this).children().text();
      e.stopImmediatePropagation();

      //-------------------------------------------IS CHOICE RIGHT OR WRONG

      if(that.animalGallery[Values.index].includes(userChoice) && userChoice !==""){
        //-------------------------------------------RIGHT CHOICE
        $(this).addClass('cell__flipped');

        Choices.rightChoice(function(){
          setTimeout(()=>{
              Values.$gameArrow.removeClass('rotate');
            Values.$gameArrow.addClass('animated bounceInLeft');
            that.cellFront.removeClass('front__non-hover').attr('style', "");
            Values.$message.removeClass('animated bounceInLeft bounceOutUp').text("");
            that.getNextChoice();
          }, 600);
        });
      } else {

        //-------------------------------------------WRONG CHOICE

        Choices.wrongChoice();
        $(this).removeClass('cell--avoidClicks');
      }
    });
  }

  getNextChoice(){
    this.animalGallery.splice(Values.index,1);  // to avoid repeats
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
    Values.$animalShowing.attr('src',this.animalGallery[Values.index]).fadeIn();
  }

  getIndex(){
    Values.index = Math.floor(Math.random()*this.animalGallery.length);
  }
}
