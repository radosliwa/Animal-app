var $ = require('jquery');

// let gallery = ['assets/images/animal-dog.jpg', 'assets/images/animal-racoon.jpg',
// 'assets/images/animal-cat.jpg'];

let rightChoice = (cb) =>{

  $('.cell').off('click');
  $('.front').addClass('front__non-hover');
  $('.gamearea__pointer').removeClass('animated bounceInLeft').addClass('rotate');
  $('.message').addClass('animated bounceInLeft').show().text('good job!').delay(1500) //needed first delay to keep message still for a sec
  .one('animationend', function(){
    //$(that.cellToClick).off('click');
    $('.message').addClass('animated bounceOutUp');
    $('.animal').fadeOut(700);
    cb();
  }); //with on() fadeOut would fire even after else
}


let badChoice = ()=>{
  //console.log(this);
  $('.front').addClass('front__non-hover');
  $('.message').addClass('animated bounceInLeft').show().delay(1100).text('wrong, try again!')
  .one('animationend',function(){
    $(this).removeClass('animated bounceInLeft');
    $('.front').removeClass('front__non-hover');
  });
}

// let intervalAfterChoice = (cb) =>{
//   // setTimeout(()=>{
//   //   $('.gamearea__pointer').addClass('animated bounceInLeft').removeClass('rotate');
//   //   $('.front').removeClass('front__non-hover').attr('style', "");
//   //   $('.message').removeClass('animated bounceInLeft bounceOutUp').text("");
//   //   cb();
//   // }, 800);
// }

let gameEnds = ()=>{
  $('.gamearea__pointer').removeClass('animated bounceInLeft')
  $('.gamearea').fadeOut(500);
  setTimeout(function(){
    $('.finalMessage').css({display:"flex"}).show().fadeOut(1800).queue(function(){
      location.reload();//from server, not cache
    });
  }, 1000);
}





export {rightChoice, badChoice, gameEnds};
