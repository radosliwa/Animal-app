

let index;
class Animalia{

  constructor(animalGallery){
    this.animalGallery = animalGallery;
    this.animalArray = ['dog','racoon', 'cat'];
    this.startButton = $('#start');
    this.gameArea = $('.gamearea');
    this.cellToClick = $('.cell');
    this.cellFront = $('.front');
    this.message = $('.message');
    this.animalShowing = $('.animal');
    this.finalMessage = $('.finalMessage');
    this.startButton.fadeTo('slow', 1);
    this.events();

  }

  //-------------------------------------GAME BEGINS
  startGame (){
    this.startButton.hide();
    this.gameArea.fadeTo('fast', 1);
    this.showAnimal();


    //this.getUserChoice();
  }
  events(){
    var self = this;
    this.startButton.click(()=> {this.startGame();});
    this.cellToClick.click(this.getUserChoice.bind(this));

  }
  //------------------------------------- user engages
  getUserChoice (){

    let userChoice = $(this.cellToClick).children().text();
    console.log(userChoice);
    if(this.animalGallery[index].includes(userChoice)){
      $(this).addClass('cell__flipped');
      this.cellToClick.off('click');

      $(this.cellFront).addClass('front__non-hover');
      $(this.message).addClass('animated bounceInLeft').show().delay(600).text('good job!').delay(500) //needed first delay to keep message still for a sec
      .one('animationend', function(){

        $(this).addClass('animated bounceOutUp');
        $('.animal').fadeOut(800);

      }); //with on() fadeOut would fire even after else

      setTimeout(()=>{
        $(this).removeClass('cell__flipped');
        $(this.cellFront).removeClass('front__non-hover').attr('style', "");
        $(this.message).removeClass('animated bounceInLeft bounceOutUp').text("");
        this.getUserNextChoice();
      }, 2000);

    } else{

      $(this.cellFront).addClass('front__non-hover');
      $(this.message).addClass('animated bounceInLeft').show().delay(1100).text('wrong, try again!').hide(600)
      .one('animationend',function(){
        $(this).removeClass('animated bounceInLeft');
        $(this.cellFront).removeClass('front__non-hover');

      });
    }
  }


  getUserNextChoice (){

    this.animalGallery.splice(index,1) // to avoid repeats

    this.showAnimal();
    //--------------------------------------------------------------GAME ENDS

    if(this.animalGallery.length<1){
      $('.gamearea').fadeOut(1000);
      setTimeout(function(){
        $('.finalMessage').css({display:"flex"}).show().fadeOut(1800).queue(function(){
          location.reload();//from server, not cache
        });
      }, 1000);
    }
    this.getUserChoice();
  }

  showAnimal(){
    this.getIndex();

    this.animalShowing.attr('src',this.animalGallery[index]).fadeIn();

    //console.log(this.animalGallery);
  }

  getIndex(){

    index = Math.floor(Math.random()*this.animalGallery.length);
  }
}

var animalia = new Animalia(['assets/images/animal-dog.jpg', 'assets/images/animal-racoon.jpg',
'assets/images/animal-cat.jpg']);
