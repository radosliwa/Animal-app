var $ = require('jquery');

let rightChoice = (cb) =>{

  $('.cell').off('click');
  $('.front').addClass('front__non-hover');
  $('.gamearea__pointer').removeClass('animated bounceInLeft').addClass('rotate');
  $('.message').addClass('animated bounceInLeft').show().text('good job!').delay(1500) //needed first delay to keep message still for a sec
  .one('animationend', function(){

    $('.message').addClass('animated bounceOutUp');
    $('.animal').fadeOut(700);
    cb();
  }); //with on() fadeOut would fire even after else
}


let badChoice = ()=>{



  $('.front').addClass('front__non-hover');
  $('.message').addClass('animated bounceInLeft').show().text('wrong, try again!').delay(1200).hide(100)
  .one('animationend',function(){
    $(this).removeClass('animated bounceInLeft');
    setTimeout(function(){

      $('.front').removeClass('front__non-hover');
    }, 500)
  });
}


let gameEnds = ()=>{
  $('.gamearea__pointer').removeClass('animated bounceInLeft');
  $('.gamearea').fadeOut(500);
  setTimeout(function(){
    $('.finalMessage').css({display:"flex"}).show().fadeOut(1800).queue(function(){
      location.reload();//from server, not cache
    });
  }, 1000);
}


export {rightChoice, badChoice, gameEnds};
