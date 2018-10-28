var $ = require('jquery');

import Animalia from './AnimaliaClass';

var animalia = new Animalia(['assets/images/animal-dog.jpg', 'assets/images/animal-racoon.jpg',
'assets/images/animal-cat.jpg'],['cat', 'dog', 'beaver','deer', 'goose', 'hare', 'hen', 'horse', 'lizard', 'monkey', 'pig',
'racoon', 'rat', 'seal', 'snake', 'dolphin']);


// var person =(function(){
//   var name = "Radek";
//   function giveName(){
//     alert(name);
//   };
//   return{
//     giveName: giveName
//   }
// })();
// console.log(person.giveName());
// // person.name = 'Tomek';
