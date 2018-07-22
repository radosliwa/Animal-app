var $ = require('jquery');
import * as Values from './Values';


const rightChoice = (cb) =>{
  $('.cell').off('click');
  $('.front').addClass('front__non-hover');
  Values.$gameArrow.removeClass('animated bounceInLeft').addClass('rotate');
  Values.$message.addClass('animated bounceInLeft').show().text('good job!').delay(1500) //needed first delay to keep message still for a sec
  .one('animationend', function(){
    Values.$message.addClass('animated bounceOutUp');
    Values.$animalShowing.fadeOut(700);
    cb();
  }); //with on() fadeOut would fire even after a wrong choice due to message animation!
}


const badChoice = ()=>{
  $('.front').addClass('front__non-hover');
  Values.$message.addClass('animated bounceInLeft').show().text('wrong, try again!').delay(1200).hide(100)
  .on('animationend',function(){
    $(this).removeClass('animated bounceInLeft');
    $('.front').removeClass('front__non-hover');

  });
}


const gameEnds = ()=>{
  Values.$gameArrow.removeClass('animated bounceInLeft');
  Values.$gameArea.fadeOut(400);
  setTimeout(function(){
  Values.$finalMessage.css({display:"block"}).addClass('animated bounceInUp').delay(2000).fadeOut(1500).queue(function(){
      location.reload();//from server, not cache
    });
  }, 1000);
}


export {rightChoice, badChoice, gameEnds};
