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
  
  userInfoSave.classList.add('button_is-active');}
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
