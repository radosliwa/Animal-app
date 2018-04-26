


let index;
class Animalia{

  constructor(animalGallery){

    this.animalGallery = animalGallery;
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
  events(){
    this.startButton.click(()=> {this.startGame();});
  }

  startGame (){
    this.startButton.hide();
    this.gameArea.fadeTo('fast', 1);
    this.showAnimal();
    this.getUserChoice();
  }

  //------------------------------------- user engages
  getUserChoice (){

    let userChoice;
    let that = this;
    this.cellToClick.on('click', function(e){
      userChoice = e.target.innerText;

      //let userChoice = $(this).children().text();
      console.log(that.animalGallery);

      if(that.animalGallery[index].includes(userChoice)){
        $(this).addClass('cell__flipped').off('click');

        $(that.cellFront).addClass('front__non-hover');
        $(that.message).addClass('animated bounceInLeft').show().delay(600).text('good job!').delay(500) //needed first delay to keep message still for a sec
        .one('animationend', function(){

          $(this).addClass('animated bounceOutUp');
          $('.animal').fadeOut(800);

        }); //with on() fadeOut would fire even after else

        setTimeout(()=>{
          $(this).removeClass('cell__flipped');
          $(that.cellFront).removeClass('front__non-hover').attr('style', "");
          $(that.message).removeClass('animated bounceInLeft bounceOutUp').text("");
          that.getUserNextChoice();
        }, 2000);

      } else {

        $(this).addClass('front__non-hover');
        $(that.message).addClass('animated bounceInLeft').show().delay(1100).text('wrong, try again!').hide(600)
        .one('animationend',function(){
          $(this).removeClass('animated bounceInLeft');
          $(that.cellFront).removeClass('front__non-hover');

        });
      }
    });

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
  }

  getIndex(){
    index = Math.floor(Math.random()*this.animalGallery.length);
  }
}

var animalia = new Animalia(['assets/images/animal-dog.jpg', 'assets/images/animal-racoon.jpg',
'assets/images/animal-cat.jpg']);
