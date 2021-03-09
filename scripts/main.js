let editButton = document.querySelector('.profile__edit-button'),
    popupProfile = document.querySelector('.popup-profile'),
    addButton = document.querySelector('.profile__add-button'),
    popupCard = document.querySelector('.popup-card'),
    popupClose = document.querySelector('.popup__close'),
    lightboxImage = document.querySelector('.popup__image'),
    lightboxCaption = document.querySelector('.popup__image-caption'),
    lightbox = document.querySelector('.lightbox'),
    closeCard = document.querySelector('#close-card-button'),
    popupForm = document.querySelector('#profile-form'),
    cardForm = document.querySelector('#cardForm'),
    nameInput = popupForm.querySelector('#profileName'),
    jobInput = popupForm.querySelector('#profileJob'),
    cardName = cardForm.querySelector('#cardName'),
    cardLink = cardForm.querySelector('#cardLink'),
    profileTitle = document.querySelector('.profile__title'),
    profileJob = document.querySelector('.profile__job'),
    templateElement = document.querySelector('.template'),
    container = document.querySelector('.elements');

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
  }
];

function openPopup(evt){
  if(evt.target.id === 'edit-profile-button'){
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileJob.textContent;
    popupProfile.classList.add('popup_opened');
  }else if(evt.target.id === 'add-card-button'){
    popupCard.classList.add('popup_opened');
  }else if(evt.srcElement.className === 'element__image'){
    const targetLightbox = evt.target;
    const cardImage = targetLightbox.closest('.element__image').src;
    const nameImg = evt.target.nextElementSibling.firstElementChild.textContent;
    lightboxImage.src = cardImage;
    lightboxCaption.textContent = nameImg;
    lightbox.classList.add('popup_opened');
  }
}
function closePopup(evt){
  if(evt.target.id === 'close-profile-button'){
    popupProfile.classList.remove('popup_opened');
  }else if(evt.target.id === 'close-card-button'){
    popupCard.classList.remove('popup_opened');
  }else if(evt.target.id === 'close-lightbox-button'){
    lightbox.classList.remove('popup_opened');
  }
}
//обрабатываем данные из формы профиля
function formSubmitHandler(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  popupProfile.classList.toggle('popup_opened');
}
//обрабатываем данные из формы карточки
function cardSubmitHandler(evt) {
  evt.preventDefault();
  cardNameV = cardName.value;
  cardLinkV = cardLink.value;
  const newCardItem = createCardNode({name: cardNameV, link: cardLinkV});
  addCardListeners(newCardItem);
  container.prepend(newCardItem);
  popupCard.classList.toggle('popup_opened');
  cardName.value = '';
  cardLink.value = '';
  console.log(newCardItem);
}
function Delete(evt) {
	const target = evt.target;
	const currentCard = target.closest('.element');

	currentCard.remove();
}
//вешаем класс при лайке
function like(evt){
  const target = evt.target;
  target.classList.toggle('element__like_active');;
}
//добавляем обработчики
function addCardListeners(card){
  const elementLike = card.querySelector('.element__like');
  elementLike.addEventListener('click', like);

  const elementDelete = card.querySelector('.element__delete');
  elementDelete.addEventListener('click', Delete);

  const element = card.querySelector('.element');
  element.addEventListener("click", openPopup);

  const closelightbox = document.querySelector('#close-lightbox-button');
  closelightbox.addEventListener("click", closePopup);
};
//клонируем темплейт и добавляем инфу из полей
function createCardNode(item){
  const newCard = templateElement.content.cloneNode(true),
        elementTitle = newCard.querySelector('.element__title'),
        elementImage = newCard.querySelector('.element__image');
  elementTitle.textContent = item.name;
  elementImage.src = item.link;
  elementImage.alt = item.name;
  return newCard;
};
//рендерим первы карточки и вешаем обрабочики
function renderList(){
  const result = initialCards.map(function(item){
        const newItem = createCardNode(item);
        addCardListeners(newItem);
        return newItem;
  });
  container.append(...result);
}

renderList();
editButton.addEventListener("click", openPopup);
addButton.addEventListener("click", openPopup);
popupClose.addEventListener("click", closePopup);
closeCard.addEventListener("click", closePopup);
popupForm.addEventListener('submit', formSubmitHandler);
cardForm.addEventListener('submit', cardSubmitHandler);
