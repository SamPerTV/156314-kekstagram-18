'use strict';

var COMMENTS = ['Всё отлично!', 'В целом всё неплохо. Но не всё.Когда вы делаете фотографию, хорошо бы убирать палец из кадра.', 'Вконце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
var USERS_NAMES = ['Василий', 'Геннадий', 'Алексей', 'Иван'];
var DESCRIPTIONS_PHOTOS = ['Новый день', 'Игра воображения', 'Песня осеннего пламени'];
var COMMENTS_COUNT = 5;
var descriptionUserCount = 25;
var descriptionListElement = document.querySelector('.pictures');
var bigpictureListElement = document.querySelector('.big-picture');
var uploadImages = document.querySelector('.img-upload__overlay');
var cancelButton = document.querySelector('.img-upload__cancel');
var cancelButtonBigPicture = document.querySelector('.big-picture__cancel');
var textHashtagsInput = document.querySelector('.text__hashtags');
var effectList = document.querySelector('.effects__list');
var getEffectElement = document.querySelector('.img-upload__preview');
var effectLevelElement = document.querySelector('.effect-level');
var textHashtagsValueSplit;
var ESC_KEYCODE = 27;

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
    url: 'photos/' + generateRandomNumber(26) + '.jpg',
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

var onPopupEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closePopup();
  }
};
textHashtagsInput.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    evt.stopPropagation();
  }
});

document.querySelector('.text__description').addEventListener('keydown', function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    evt.stopPropagation();
  }
});


var openPopup = function () {
  uploadImages.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
};

var closePopup = function () {
  uploadImages.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
};

document.querySelector('#upload-file').addEventListener('change', function () {
  openPopup();
});
cancelButton.addEventListener('click', function () {
  closePopup();
});
cancelButtonBigPicture.addEventListener('click', function () {
  bigpictureListElement.classList.add('hidden');
});
effectList.addEventListener('click', function (evt) {
  var target = evt.target;
  switch (target.value) {
    case 'chrome':
      effectLevelElement.classList.remove('hidden');
      getEffectElement.style.filter = 'grayscale(1)';
      break;
    case 'none':
      effectLevelElement.classList.add('hidden');
      getEffectElement.style.filter = '';
      break;
    case 'sepia':
      effectLevelElement.classList.remove('hidden');
      getEffectElement.style.filter = 'sepia(1)';
      break;
    case 'marvin':
      effectLevelElement.classList.remove('hidden');
      getEffectElement.style.filter = 'invert(100%)';
      break;
    case 'phobos':
      effectLevelElement.classList.remove('hidden');
      getEffectElement.style.filter = 'blur(3px)';
      break;
    case 'heat':
      effectLevelElement.classList.remove('hidden');
      getEffectElement.style.filter = 'brightness(3)';
      break;
  }
});

var renderSplitArray = function (spklitArray) {
  var splitArrayStrin = spklitArray.toString();
  return splitArrayStrin.split(' ');
};

textHashtagsInput.addEventListener('input', function () {
  var textHashtagsValue = [textHashtagsInput.value];
  textHashtagsValueSplit = renderSplitArray(textHashtagsValue);
});
var cloneArray = function (A) {
  var n = A.length;
  for (var a = 0; a < n - 1; a++) {
    for (var e = a + 1; e < n; e++) {
      if (A[a] === A[e]) {
        return true;
      }
    }
  }
  return false;
};
var arrayCheck = function (target) {
  for (var s = 0; s < textHashtagsValueSplit.length; s++) {
    if (textHashtagsValueSplit[s].length < 2) {
      target.setCustomValidity('Хэштэг должен состоять из двух символов');
    } else if (textHashtagsValueSplit[s].includes('#') - 1) {
      target.setCustomValidity('Пропущен символ #');
    } else if (cloneArray(textHashtagsValueSplit)) {
      target.setCustomValidity('Одинаковый хэш');
    } else if (textHashtagsValueSplit[s].length >= 20) {
      target.setCustomValidity('Хэштэг не может состоять больше 20-ти символов');
    } else if (textHashtagsValueSplit.length > 5) {
      target.setCustomValidity('Хэштэгов не может быть больше 5');
    } else {
      target.setCustomValidity('');

    }

  }
};
textHashtagsInput.addEventListener('input', function (evt) {
  var target = evt.target;
  arrayCheck(target);

});
descriptionListElement.addEventListener('click', function () {
  bigpictureListElement.querySelector('.big-pictures__img').src = descriptionUser[0].url;
  bigpictureListElement.querySelector('.social__caption').textContent = descriptionUser[0].description;
  bigpictureListElement.querySelector('.likes-count').textContent = descriptionUser[0].likes;
  bigpictureListElement.querySelector('.comments-count').textContent = generateRandomNumber(100);
});


