var $ = require('jquery');

import {
  $startButton,
  $gameArea,
  $message,
  $animalShowing,
  $finalMessage,
  $gameArrow
} from './Values';

const rightChoice = (cb) => {
  let that = this;
  $message.addClass('message--is-visible animated bounceInLeft').text('good job!')
    .one('animationend', function() {
      $gameArrow.removeClass('animated bounceInLeft').addClass('rotate')
        .queue(function() {
          $message.addClass('bounceOutUp');
          $animalShowing.fadeOut(900);
          $(this).dequeue();
        });
      setTimeout(() => {
        $message.removeClass('animated bounceInLeft bounceOutUp').text("")
          .queue(function() {
            cb();
            $(this).dequeue();
          });

      }, 950);
    }); //with on() fadeOut would fire even after a wrong choice due to message animation!
}

const gameEnds = () => {
  $gameArea.fadeOut(200);
  $gameArrow.fadeOut(200);
  setTimeout(function() {
    $finalMessage.addClass('animated bounceInUp').delay(2000).fadeOut(1500).queue(function() {
      location.reload(); //from server, not cache
    });
  }, 200);
}



export {
  $startButton,
  $gameArea,
  $message,
  $animalShowing,
  $finalMessage,
  $gameArrow,
  rightChoice,
  gameEnds
};