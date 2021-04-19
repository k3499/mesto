import { Card } from "./Card.js";
import { optionsList, FormValidator } from "./FormValidator.js";
import { Section } from './Section.js';
import { initialCards } from './initialCards.js';
import { PopupWithForm } from './PopupWithForm.js';
import { PopupWithImage} from './PopupWithImage.js';
import { UserInfo } from './UserInfo.js';


const editButton = document.querySelector('.profile__edit-button'),
    addButton = document.querySelector('.profile__add-button'),
    popupForm = document.querySelector('#profile-form'),
    cardForm = document.querySelector('#cardForm'),
    nameInput = popupForm.querySelector('#profileName'),
    jobInput = popupForm.querySelector('#profileJob');

const popupWithImage = new PopupWithImage(".lightbox", ".popup__image", ".popup__image-caption");
popupWithImage.setEventListeners();
const userInfo = new UserInfo(".profile__title", ".profile__job");
const cardFormValidator = new FormValidator(optionsList, cardForm);
const editFormValidator = new FormValidator(optionsList, popupForm);
cardFormValidator.enableValidation();
editFormValidator.enableValidation();
const cardList = new Section({
  items: initialCards,
  renderer: (item) => {
    const card = new Card(item, '.template', () => {
      popupWithImage.open(card.title, card.img);
    });
    cardList.addItem(card.generateCard());
    }
}, ".elements");
cardList.renderItems();


const popupWithEditForm = new PopupWithForm(".popup-profile", (inputsData) => {
  userInfo.setUserInfo({name: inputsData.uInput, description: inputsData.dInput});
  popupWithEditForm.close();
});
popupWithEditForm.setEventListeners();


const popupWithAddForm = new PopupWithForm(".popup-card", (inputsData) => {
  const card = new Card({name: inputsData.uInput, link: inputsData.dInput}, '.template', () => {
    popupWithImage.open(card.name, card.link);
  });
  cardList.addItem(card.generateCard());
  popupWithAddForm.close();
});
popupWithAddForm.setEventListeners();

addButton.addEventListener('click', () => {
  cardFormValidator.enableValidation();
  popupWithAddForm.open();
});

editButton.addEventListener('click', () => {
  const profileData = userInfo.getUserInfo();
  nameInput.value = profileData.name;
  jobInput.value = profileData.description;
  editFormValidator.enableValidation();
  popupWithEditForm.open();
});


// //функция рендера карт получает обьект который с ссылкой и названием карты и передает его в класс Card
// function renderCard(item) {
//   const card = new Card(item, ".template");
//   //сразу возвращаем метод генерации карточки у класса кард
//   return card.generateCard();

// }
// //пробегаем по массиву с карточками и вызываем прошлую функцию для создания элемента класса.
// initialCards.forEach((item) => {
//   const newCard = renderCard(item);
//   //сразу добавляем на страницу в .elements
//   container.append(newCard);
// });

//const handleEscPress = (evt) => {
//  if (evt.key === "Escape") {
//   const popupOpened = document.querySelector(".popup_opened");
//    closePopup(popupOpened);
//  }
//}
//const closePopupOnOverlay = (evt) => {
// if (evt.target.classList.contains("popup")) {
//    const popupOpened = document.querySelector(".popup_opened");
//    closePopup(popupOpened);
//  }
//}

//export function openPopup(popup) {
//  popup.classList.add('popup_opened');
//  document.addEventListener("keydown", handleEscPress);
//  document.addEventListener("click", closePopupOnOverlay);
//}
//function closePopup(popup) {
//  popup.classList.remove('popup_opened');
//  document.removeEventListener("keydown", handleEscPress);
//  document.removeEventListener("click", closePopupOnOverlay);
//}
//Обрабатываем данные из формы профиля
// function submitFormHandler(evt) {
//   evt.preventDefault();
//   profileTitle.textContent = nameInput.value;
//   profileJob.textContent = jobInput.value;
//   closePopup(popupProfile)
// }
//Обрабатываем данные из формы карточки
// function submitCardHandler(evt) {
//   evt.preventDefault();
//   const card = {
//     name: cardName.value,
//     link: cardLink.value
//   };
//   const newCard = renderCard(card);
//   container.prepend(newCard);
//   closePopup(popupCard);
// }

// editButton.addEventListener("click", function (evt) {
//   nameInput.value = profileTitle.textContent;
//   jobInput.value = profileJob.textContent;
//   openPopup(popupProfile);
// });
// popupClose.addEventListener("click", function (evt) {
//   closePopup(popupProfile);
// });
// popupCloseCard.addEventListener("click", function (evt) {
//   closePopup(popupCard);
// });
// function addCard() {
//   cardName.value = "";
//   cardLink.value = "";
//   placeValidator.clearForm();
//   openPopup(popupCard);
// }
// addButton.addEventListener("click", addCard);
// //closeLightbox.addEventListener("click", function (evt) {
// //  closePopup(lightbox);
// //});

// popupForm.addEventListener('submit', submitFormHandler);
// cardForm.addEventListener('submit', submitCardHandler);

// //создаем экземпляр валидатора попапа профиля
// const profileValidator = new FormValidator(optionsList, popupProfile);
// profileValidator.enableValidation();

// //создаем экземпляр валидатора попапа карточки
// const placeValidator = new FormValidator(optionsList, popupCard);
// placeValidator.enableValidation();
