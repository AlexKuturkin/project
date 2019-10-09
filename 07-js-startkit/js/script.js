// Переменные

const popUpNewCard = document.querySelector('.popup');
const popUpEdit = document.querySelector('.popupup');
const addButton = document.querySelector('.user-info__button');
const addButtonEdit = document.querySelector('.user-info__button-edit');
const popUpClose = document.querySelector('.popup__close');
const popUpCloseEdit = document.querySelector('.popupup__close');
const cardConteiner = document.querySelector('.places-list');
const newForm = document.forms.new;
const nameForm = document.forms.new.elements.name;
const linkForm = document.forms.new.elements.link;

const editForm = document.forms.edit;
const nickForm = document.forms.edit.elements.nick;
const aboutForm = document.forms.edit.elements.about;

const buttonPlus = document.querySelector('.popup__button');

const userName = document.querySelector('.user-info__name');
const userAbout = document.querySelector('.user-info__job');
const userInfoSave = document.querySelector('.popupup__button');

const divCard = document.querySelector('.place-card__image');
const divZoomCard = document.querySelector('.zoom__image');
const divZoom = document.querySelector('.zoom');
const divZoomCardClose = document.querySelector('.zoom__close');
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  },
  {
    name: 'Нургуш',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/khrebet-nurgush.jpg'
  },
  {
    name: 'Тулиновка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/tulinovka.jpg'
  },
  {
    name: 'Остров Желтухина',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/zheltukhin-island.jpg'
  },
  {
    name: 'Владивосток',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/vladivostok.jpg'
   }
];


// Функции
/* Функция открытия окна
function openNewCardPopUpHandler () {
  popUpNewCard.classList.add('popup_is-opened');
  
  buttonPlus.setAttribute('disabled', true);
  buttonPlus.classList.remove('button_is-active');
};
*/

/* Функция закрытия окна
function closeNewCardPopUpHandler () {
  popUpNewCard.classList.remove('popup_is-opened');    
};
*/
/* Функция открытия окна редактирования + вызов функции валидации
function openPopUpProfileHandler (event) {
  popUpEdit.classList.add('popup_is-opened');

  nickForm.value = userName.textContent;
  aboutForm.value = userAbout.textContent;

  nickForm.parentNode.classList.remove('form_is-invalid');
  aboutForm.parentNode.classList.remove('form_is-invalid');
};
*/

/* Функция закрытия окна редактирования
function closePopUpProfileHandler () {
  popUpEdit.classList.remove('popup_is-opened');
};
*/

class popup {
  
  open(name) {
    name.classList.add('popup_is-opened');
  }

  close(name) {
    name.classList.remove('popup_is-opened');
  }

}
let changePopup = new popup ();

/* Функция создания новой карточки*/     
function createCard(card) {
  const placeCard = document.createElement("div");
  placeCard.classList.add("place-card");
  placeCard.innerHTML = `
    <div class="place-card__image">
      <button class="place-card__delete-icon"></button>
    </div>
    <div class="place-card__description">
      <h3 class="place-card__name"></h3>
      <button class="place-card__like-icon"></button>
    </div>`;    

  placeCard.querySelector(".place-card__name").textContent = card.name;
  placeCard.querySelector(".place-card__image").style.backgroundImage = `url(${card.link})`;

  return placeCard; 
}  

/* Функция загрузки карточек на сайт*/
function uploadCard(array, cardsContainer) {
  array.forEach((card) => cardsContainer.appendChild(createCard(card)));
  }

/* Функция лайка и удаления карточки*/
function addLikeDeleteCard (event) {
    if (event.target.classList.contains('place-card__like-icon') )  {
    event.target.classList.toggle('place-card__like-icon_liked') 
    }
    else if (event.target.classList.contains('place-card__delete-icon')) {
      event.target.closest('.place-card').remove()
    }   
}

/* Функция зума карточки*/
function zoomCard (event) {
  if (event.target.classList.contains('place-card__image'))  
  { divZoom.classList.add('zoom_is-opened')
  divZoomCard.src = event.target.style.backgroundImage.slice(5, event.target.style.backgroundImage.length - 2);
  }
}
/* Функция закрытия зума карточки*/
function closeZoomCard () {
  divZoom.classList.remove('zoom_is-opened')
}

/* Функция проверки валидации в инпутах*/
  function handleValidate (event) {
    event.target.parentNode.classList.remove('form_is-invalid');
    event.target.textContent = '';
    validate(event.target);
    }

/* Функция валидации */
  function validate(element) {
    const errorElement = document.querySelector(`#error-${element.id}`);
    
      if (element.value.length == 0) {
        errorElement.textContent = 'Это обязательное поле';
        element.parentNode.classList.add('form_is-invalid');
        return false
      } else if (element.value.length < 2) {
        errorElement.textContent = 'Должно быть от 2 до 30 символов';
        element.parentNode.classList.add('form_is-invalid');
        return false
      }
      return true
    }


// Обработчики
/* Обработчик открытия окна добавления карточки*/
addButton.addEventListener('click', function () {
  changePopup.open(popUpNewCard);

  buttonPlus.setAttribute('disabled', true);
  buttonPlus.classList.remove('button_is-active');
});

/* Обработчик открытия окна редактирования*/
addButtonEdit.addEventListener('click', function () {
  changePopup.open(popUpEdit);

  nickForm.value = userName.textContent;
  aboutForm.value = userAbout.textContent;

  nickForm.parentNode.classList.remove('form_is-invalid');
  aboutForm.parentNode.classList.remove('form_is-invalid');
});

/* Обработчик закрытия окна добавления карточки*/
popUpClose.addEventListener('click', function () {
  changePopup.close(popUpNewCard);
});
/* Обработчик закрытия окна редактирования*/
popUpCloseEdit.addEventListener('click', function () {
  changePopup.close(popUpEdit);
});

/* Обработчик лайка и удаления карточки*/
cardConteiner.addEventListener('click', addLikeDeleteCard)
/* Обработчик зума карточки*/
cardConteiner.addEventListener('click', zoomCard)
/* Обработчик закрытия зума карточки*/
divZoomCardClose.addEventListener('click', closeZoomCard)
/* Обработчик редактирования карточки*/
editForm.addEventListener('submit', function (event) {
  event.preventDefault();
  userName.textContent = nickForm.value;
  userAbout.textContent = aboutForm.value;
  changePopup.close(popUpEdit);
});

/* Обработчик валидации*/
nickForm.addEventListener('input', handleValidate);
aboutForm.addEventListener('input', handleValidate);

/* Обработчик добавления карточки*/
newForm.addEventListener('submit', function (event) {
  event.preventDefault();

  /* Можно лучше: лучше вынести код создания карточки в функцию и вызывать её для создания карточки
  иначе сейчас есть два разных места в программе отвечающие за создание карточек */
  cardConteiner.appendChild(createCard({  
    name: nameForm.value,   // <- создаем объект карточки и сразу передаем его в функцию createCard
    link: linkForm.value    //
  }));
  
  changePopup.close(popUpNewCard);
  newForm.reset();
  
});

/* Обработчик работы кнопок + и Сохранить*/
newForm.addEventListener('input', function (event) {
if (nameForm.value.length < 2 || linkForm.value.length < 2) {
    buttonPlus.setAttribute('disabled', true);
    buttonPlus.classList.remove('button_is-active'); }
    else {
      buttonPlus.removeAttribute('disabled');
      buttonPlus.classList.add('button_is-active');}
  });

editForm.addEventListener('input', function (event) {
  if (nickForm.value.length < 2 || aboutForm.value.length < 2) {
    userInfoSave.setAttribute('disabled', true);
    userInfoSave.classList.remove('button_is-active'); }
    else {
      userInfoSave.removeAttribute('disabled'); 
      userInfoSave.classList.add('button_is-active');}
  }); 


/* Вызовы функций */
uploadCard(initialCards, cardConteiner);



/*
  Хорошая работа, проблемы исправлены, замечаний по валидации больше не нашел. Будет
  очень здорово если у Вас будет свободное время и сделаете лайв валидацию также в форме добавления карточки
  Для проверки, что в поле введена ссылка можно использовать нативную валидацию
  https://developer.mozilla.org/ru/docs/Learn/HTML/Forms/%D0%92%D0%B0%D0%BB%D0%B8%D0%B4%D0%B0%D1%86%D0%B8%D1%8F_%D1%84%D0%BE%D1%80%D0%BC%D1%8B#%D0%9F%D1%80%D0%BE%D0%B2%D0%B5%D1%80%D0%BA%D0%B0_%D1%84%D0%BE%D1%80%D0%BC_%D1%81_%D0%B8%D1%81%D0%BF%D0%BE%D0%BB%D1%8C%D0%B7%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D0%B5%D0%BC_JavaScript
  задать полю ссылки type="url" и проверять валидность поля с помощью атрибута поля ввода validity.typeMismatch

  Также дал более развернутый пример как вынести создание карточки в отдельную функцию, надеюсь 
  Вы разберетесь и избавитесь от дублирования кода создания карточки

  Постарайтесь также всетаки настроить автоматическое форматирование кода в среде разработки, 
  во многих местах сейчас проблемы с отступами

*/



/*
  Замечания по 7 работе:
  В целом неплохая рабта, большая часть задания работает верно, но есть ряд замечаний которые нужно поправить

  Надо исправить:
  - в попапе профиля если в одном поле есть ошибка, а потом начать редактировать второе поле и
  ввести корректные данные, то ошибка с первого поля пропадает http://prntscr.com/pc1qt5 +

  - при открытии попапа профиля очищать ошибки которые могли остаться с прошлого открытия +

  - если добавить одну карточку, а затем повторно открыть попап, то кнопка добавления
  карточки остается активной и можно добавить пустую карточку http://prntscr.com/pc1q5r
  По заданию кнопка добавления должна быть неактивная когда поля пустые поэтому
  после того как мы делаем newForm.reset(); нужно также сделать неактивной кнопку +

  - опработчики на поля ввода формы редактирования профила навешиваются при каждом открытии попапа
  достаточно повесить их один раз при старте программы +

  - испарвить падение ошибки при вызове addLikeDeleteCard и zoomCard в конце программы +

  Можно лучше: 
  - поменять имена переменных и функций, так чтобы они полностью описывали за что отвечают - например
  popUpNewCard, openNewCardPopUpHandler и т.д. +

  - исправить добавление данных карточки через innerHTML +
  
  и избавиться от дублирования кода создания 
  карточки вынеся его в отдельную функцию. По правилам я не могу не принять 7 работу, 
  если есть замечания по 6 работе, поэтому пишу это в можно лучше +

  В некоторых местах есть замечания по форматированию кода. Об оформлении кода можно почитать здесь
  https://learn.javascript.ru/coding-style
  Практически все современные редакторы умеют автоматически форматировать код. 
  Постарайтесь настроить его, это сильно экономит время, а Ваш код будет всегда красив.
  Одно из наиболее популярных дополнений для форматирования кода - Prettier (https://prettier.io/)


  Также желательно не оставлять в программе куски закомментированного кода и комментарии с прошлых ревью +
*/












/*Задание принято. Стоит поработать над форматированием кода. Вложенные части кода необходимо делать с отступами для лучшего восприятия. 
Не забываем про точку с запятой после вызовов функций.
Рекомендую поправить код согласно оставшимся комментариям. Это поможет в решении следующих заданий.
* Успехов в дальнейшем прохождении курса. */