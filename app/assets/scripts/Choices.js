var $ = require('jquery');
import * as Values from './Values';

const $cell = $('.cell');
const $front = $('.front');

const rightChoice = (cb) =>{
  $cell.off('click');
  $front.addClass('front__non-hover');
  Values.$message.addClass('message--is-visible animated bounceInLeft').text('good job!')
  .one('animationend', function(){
    Values.$gameArrow.removeClass('animated bounceInLeft').addClass('rotate');
    Values.$message.addClass('bounceOutUp');
    Values.$animalShowing.fadeOut(1200);
    cb();
  }); //with on() fadeOut would fire even after a wrong choice due to message animation!
}


const wrongChoice = ()=>{
  $cell.addClass('cell--avoidClicks');
  $front.addClass('front__non-hover');
  Values.$message.addClass('message--is-visible animated bounceInLeft').text('wrong, try again!')
  .one('animationend',function(){
     $(this).removeClass('animated bounceInLeft');
    $front.removeClass('front__non-hover');
    $cell.removeClass('cell--avoidClicks');
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
