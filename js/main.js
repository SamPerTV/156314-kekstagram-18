'use strict';

var COMMENTS = ['Всё отлично!', 'В целом всё неплохо. Но не всё.Когда вы делаете фотографию, хорошо бы убирать палец из кадра.', 'Вконце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
var USERS_NAMES = ['Василий', 'Геннадий', 'Алексей', 'Иван'];
var DESCRIPTIONS_PHOTOS = ['Новый день', 'Игра воображения', 'Песня осеннего пламени'];
var COMMENTS_COUNT = 5;
var descriptionUserCount = 25;
var descriptionListElement = document.querySelector('.pictures');
var bigpictureListElement = document.querySelector('.big-picture');

var generateRandomNumber = function (userNumber) {
  var randomNumber = Math.floor(Math.random() * userNumber);
  if (randomNumber === 0) {
    randomNumber++;
  }
  return randomNumber;
};


var randomArrayElement = function (array) {
  var index = Math.floor(Math.random() * array.length);
  return array[index];
};
var descriptionUser = [];
for (var i = 0; i < descriptionUserCount; i++) {
  var descriptionUsers = {
    url: 'photos/' + generateRandomNumber(25) + '.jpg',
    description: randomArrayElement(DESCRIPTIONS_PHOTOS),
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
//======
bigpictureListElement.querySelector('.big-pictures__img').src = descriptionUser[0].url;
bigpictureListElement.querySelector('.social__caption').textContent = descriptionUser[0].description;
bigpictureListElement.querySelector('.likes-count').textContent = descriptionUser[0].likes;
bigpictureListElement.querySelector('.comments-count').textContent = generateRandomNumber(100);
//======

var commentsUsersTemplate = document.querySelector('.social__comment');
var commentsListElement = document.querySelector('.social__comments');

var renderCommentsUser = function (descriptionUserComments) {
  var commentsUserElement = commentsUsersTemplate.cloneNode(true);
  commentsUserElement.querySelector('.social__picture').src = descriptionUserComments.comments[0].avatar;
  commentsUserElement.querySelector('.social__picture').alt = descriptionUserComments.comments[0].name;
  commentsUserElement.querySelector('.social__text').textContent = descriptionUserComments.comments[0].message;
  return commentsUserElement;
};

var fragmentComments = document.createDocumentFragment();
for (var q = 0; q < COMMENTS_COUNT; q++) {
  fragmentComments.appendChild(renderCommentsUser(descriptionUser[q]));
}

commentsListElement.appendChild(fragmentComments);
document.querySelector('.social__comment-count').classList.add('visually-hidden');
document.querySelector('.comments-loader').classList.add('visually-hidden');
