'use strict';

var COMMENTS = ['Всё отлично!', 'В целом всё неплохо. Но не всё.Когда вы делаете фотографию, хорошо бы убирать палец из кадра.', 'Вконце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
var USERS_NAMES = ['Василий', 'Геннадий', 'Алексей', 'Иван'];
var descriptionUserCount = 25;
var generateRandomNumber = function (userNumber) {
  var randomNumber = Math.floor(Math.random() * userNumber);
  if (randomNumber === 0) {
    randomNumber++;
  }
  return randomNumber;
};
var descriptionListElement = document.querySelector('.pictures');


var randomArrayElement = function (array) {
  var index = Math.floor(Math.random() * array.length);
  return array[index];
};
var descriptionUser = [];
for (var i = 0; i < descriptionUserCount; i++) {
  var descriptionUsers = {
    url: 'photos/' + generateRandomNumber(25) + '.jpg',
    description: 'Описание',
    likes: generateRandomNumber(600),
    comments: [
      {
        avatar: 'img/avatar-' + generateRandomNumber(6) + '.svg',
        message: randomArrayElement(COMMENTS),
        name: randomArrayElement(USERS_NAMES)
      }
    ]

  };
  descriptionUser.push(descriptionUsers);
}
var descriptionUsersTemplate = document.querySelector('#picture')
.content
.querySelector('.picture');


var renderDescriptionUser = function (DescriptionUserObject) {
  var descriptionUserElement = descriptionUsersTemplate.cloneNode(true);
  descriptionUserElement.querySelector('.picture__img').src = DescriptionUserObject.url;
  descriptionUserElement.querySelector('.picture__likes').textContent = DescriptionUserObject.likes;
  descriptionUserElement.querySelector('.picture__comments').textContent = generateRandomNumber(100);
  return descriptionUserElement;
};

var fragment = document.createDocumentFragment();
for (var j = 0; j < descriptionUser.length; j++) {
  fragment.appendChild(renderDescriptionUser(descriptionUser[j]));
}

descriptionListElement.appendChild(fragment);
