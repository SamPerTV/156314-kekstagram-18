'use strict';

var comments = ['Всё отлично!', 'В целом всё неплохо. Но не всё.Когда вы делаете фотографию, хорошо бы убирать палец из кадра.', 'Вконце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];

var descriptionUserCount = 25;
var GeneraterandomNumber = function(numberUser) {
    var numberRandom = Math.floor(Math.random() * numberUser);
    return numberRandom;
}
var descriptionListElement = document.querySelector('.pictures');


var randomArray = function (array) {
  var index = Math.floor(Math.random() * array.length);
  return array[index];
};
var descriptionUser = [];
for(var i = 0; i < descriptionUserCount; i++ ) {
  var descriptionUsers = {
    url: 'photos/' + GeneraterandomNumber(25) + '.png',
    description: 'Описание',
    likes:GeneraterandomNumber(600),
    comments: randomArray(comments)
  }
  descriptionUser.push(descriptionUsers)
}

var descriptionUsersTemplate = document.querySelector('#picture');
console.log(descriptionUser);


var renderDescriptionUser = function (DescriptionUserObject) {
  var descriptionUserElement = descriptionUsersTemplate.cloneNode(true);
  //descriptionUserElement.querySelector('picture__img').src = DescriptionUserObject.url;
  descriptionUserElement.querySelector('.picture__likes').textContent = DescriptionUserObject.likes;
  descriptionUserElement.querySelector('.picture__comments').textContent = DescriptionUserObject.comments;
  return descriptionUserElement;
};

var fragment = document.createDocumentFragment();
for (var j = 0; j < descriptionUser.length; j++) {
  fragment.appendChild(renderDescriptionUser(descriptionUser[j]));
}

descriptionListElement.appendChild(fragment);