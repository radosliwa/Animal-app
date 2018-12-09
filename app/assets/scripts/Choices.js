var $ = require('jquery');
import * as Values from './Values';


const rightChoice = (cb) =>{
  let that = this;
  Values.$cell.off('click');
  Values.$front.addClass('front__non-hover');
  Values.$message.addClass('message--is-visible animated bounceInLeft').text('good job!')
  .one('animationend', function(){
    Values.$gameArrow.removeClass('animated bounceInLeft').addClass('rotate')
    .queue(function(){
      Values.$message.addClass('bounceOutUp');
      Values.$animalShowing.fadeOut(900);
      $(this).dequeue();
    });
        setTimeout(()=>{
          Values.$message.removeClass('animated bounceInLeft bounceOutUp').text("")
          .queue(function(){
            cb();
            $(this).dequeue();
          });
          Values.$front.removeClass('front__non-hover');
        }, 950);
  }); //with on() fadeOut would fire even after a wrong choice due to message animation!
}


const wrongChoice = ()=>{
  Values.$cell.addClass('cell--avoidClicks');
  Values.$front.addClass('front__non-hover');
  Values.$message.addClass('message--is-visible animated bounceInLeft').text('wrong, try again!')
  .one('animationend',function(){
     $(this).removeClass('animated bounceInLeft');
    Values.$front.removeClass('front__non-hover');
    Values.$cell.removeClass('cell--avoidClicks');
  });
}


const gameEnds = ()=>{
  Values.$gameArea.fadeOut(200);
  Values.$gameArrow.fadeOut(200);
  setTimeout(function(){
  Values.$finalMessage.addClass('animated bounceInUp').delay(2000).fadeOut(1500).queue(function(){
      location.reload();//from server, not cache
    });
  }, 200);
}


export {rightChoice, wrongChoice, gameEnds};
