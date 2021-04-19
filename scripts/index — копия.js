import Card from "./Card.js";
import { optionsList, FormValidator } from "./FormValidator.js";
export const lightbox = document.querySelector('.lightbox');
export const lightboxImage = document.querySelector('.popup__image');
export const lightboxCaption = document.querySelector('.popup__image-caption');
const editButton = document.querySelector('.profile__edit-button'),
    popupProfile = document.querySelector('.popup-profile'),
    addButton = document.querySelector('.profile__add-button'),
    popupCard = document.querySelector('.popup-card'),
    popupClose = popupProfile.querySelector('.popup__close'),
    popupCloseCard = popupCard.querySelector('.popup__close'),
    closeLightbox = lightbox.querySelector('#close-lightbox-button'),
    popupForm = document.querySelector('#profile-form'),
    cardForm = document.querySelector('#cardForm'),
    nameInput = popupForm.querySelector('#profileName'),
    jobInput = popupForm.querySelector('#profileJob'),
    cardName = cardForm.querySelector('#cardName'),
    cardLink = cardForm.querySelector('#cardLink'),
    profileTitle = document.querySelector('.profile__title'),
    profileJob = document.querySelector('.profile__job'),
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

//функция рендера карт получает обьект который с ссылкой и названием карты и передает его в класс Card
function renderCard(item) {
  const card = new Card(item, ".template");
  //сразу возвращаем метод генерации карточки у класса кард
  return card.generateCard();

}
//пробегаем по массиву с карточками и вызываем прошлую функцию для создания элемента класса.
initialCards.forEach((item) => {
  const newCard = renderCard(item);
  //сразу добавляем на страницу в .elements
  container.append(newCard);
});

const handleEscPress = (evt) => {
  if (evt.key === "Escape") {
    const popupOpened = document.querySelector(".popup_opened");
    closePopup(popupOpened);
  }
}
const closePopupOnOverlay = (evt) => {
  if (evt.target.classList.contains("popup")) {
    const popupOpened = document.querySelector(".popup_opened");
    closePopup(popupOpened);
  }
}

export function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener("keydown", handleEscPress);
  document.addEventListener("click", closePopupOnOverlay);
}
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener("keydown", handleEscPress);
  document.removeEventListener("click", closePopupOnOverlay);
}
//Обрабатываем данные из формы профиля
function submitFormHandler(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(popupProfile)
}
//Обрабатываем данные из формы карточки
function submitCardHandler(evt) {
  evt.preventDefault();
  const card = {
    name: cardName.value,
    link: cardLink.value
  };
  const newCard = renderCard(card);
  container.prepend(newCard);
  closePopup(popupCard);
}

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
function addCard() {
  cardName.value = "";
  cardLink.value = "";
  placeValidator.clearForm();
  openPopup(popupCard);
}
addButton.addEventListener("click", addCard);
closeLightbox.addEventListener("click", function (evt) {
  closePopup(lightbox);
});

popupForm.addEventListener('submit', submitFormHandler);
cardForm.addEventListener('submit', submitCardHandler);

//создаем экземпляр валидатора попапа профиля
const profileValidator = new FormValidator(optionsList, popupProfile);
profileValidator.enableValidation();

//создаем экземпляр валидатора попапа карточки
const placeValidator = new FormValidator(optionsList, popupCard);
placeValidator.enableValidation();
