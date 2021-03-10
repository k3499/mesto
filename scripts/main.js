const editButton = document.querySelector('.profile__edit-button'),
    popupProfile = document.querySelector('.popup-profile'),
    addButton = document.querySelector('.profile__add-button'),
    popupCard = document.querySelector('.popup-card'),
    popupClose = popupProfile.querySelector('.popup__close'),
    popupCloseCard = popupCard.querySelector('.popup__close'),
    lightboxImage = document.querySelector('.popup__image'),
    lightboxCaption = document.querySelector('.popup__image-caption'),
    lightbox = document.querySelector('.lightbox'),
    closeCard = document.querySelector('#close-card-button'),
    closelightbox = lightbox.querySelector('#close-lightbox-button'),
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
function openPopup(popup) {
  popup.classList.add('popup_opened');
}
function closePopup(popup) {
  popup.classList.remove('popup_opened');
}
//Обрабатываем данные из формы профиля
function formSubmitHandler(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(popupProfile)
}
//Обрабатываем данные из формы карточки
function cardSubmitHandler(evt) {
  evt.preventDefault();
  const cardNameV = cardName.value;
  const cardLinkV = cardLink.value;
  const newCardItem = createCardNode({name: cardNameV, link: cardLinkV});
  addCardListeners(newCardItem);
  container.prepend(newCardItem);
  closePopup(popupCard);
  cardName.value = '';
  cardLink.value = '';
}
function deleteCard(evt) {
	const target = evt.target;
	const currentCard = target.closest('.element');
	currentCard.remove();
}
function likeCard(evt){
  const targetLike = evt.target;
  targetLike.classList.toggle('element__like_active');
}
//берем фото в лайтбокс
function handleCardClick(imageTarget){
  const cardImage = imageTarget.querySelector('.element__image').src;
  const nameImg = imageTarget.querySelector('.element__title');
  lightboxImage.src = cardImage;
  lightboxCaption.textContent = nameImg.textContent;
}
//Добавляем обработчики
function addCardListeners(card){
  const elementLike = card.querySelector('.element__like');
  elementLike.addEventListener('click', likeCard);

  const elementDelete = card.querySelector('.element__delete');
  elementDelete.addEventListener('click', deleteCard);

  const element = card.querySelector('.element');
  const elementImg = card.querySelector('.element__image');
  elementImg.addEventListener("click", function () {
    handleCardClick(element);
    openPopup(lightbox);
  });
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
//рендерим карточки и вешаем обрабочики
function renderList(){
  const result = initialCards.map(function(item){
  const newItem = createCardNode(item);
    addCardListeners(newItem);
    return newItem;
  });
  container.append(...result);
}

renderList();

editButton.addEventListener("click", function (evt) {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileJob.textContent;
  openPopup(popupProfile);
});
popupClose.addEventListener("click", function (evt) {
  closePopup(popupProfile);
});
popupCloseCard.addEventListener("click", function (evt) {
  closePopup(popupCard);
});
addButton.addEventListener("click", function (evt) {
  openPopup(popupCard);
});
closelightbox.addEventListener("click", function (evt) {
  closePopup(lightbox);
});
popupForm.addEventListener('submit', formSubmitHandler);
cardForm.addEventListener('submit', cardSubmitHandler);
