import { Card } from "../scripts/Card.js";
import { FormValidator } from "../scripts/FormValidator.js";
import { Section } from '../scripts/Section.js';
import { initialCards } from '../scripts/initialCards.js';
import { PopupWithForm } from '../scripts/PopupWithForm.js';
import { PopupWithImage} from '../scripts/PopupWithImage.js';
import { UserInfo } from '../scripts/UserInfo.js';
import { Api } from '../scripts/Api.js';
import { PopupWithConfirm } from '../scripts/PopupWithConfirm.js'
import '../pages/index.css';

const optionsList = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

//// Всплывающее окно подтверждения
// const popupWithConfirm = new PopupWithConfirm(".confirm-popup", (cardElement) => {
//   cardElement._cardElement.remove();
//   cardElement._cardElement = null;
// });
// popupWithConfirm.setEventListeners();

const editButton = document.querySelector('.profile__edit-button'),
    addButton = document.querySelector('.profile__add-button'),
    popupForm = document.querySelector('#profile-form'),
    cardForm = document.querySelector('#cardForm'),
    nameInput = popupForm.querySelector('#profileName'),
    jobInput = popupForm.querySelector('#profileJob');

//подключаем апи
const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-23/',
  headers: {
    authorization: '64388478-85d7-41e7-ab69-a698cc4b7b2e',
    'content-type': 'application/json'
  }});

  function createCard(item) {
    const card = new Card(item, '.template', () => {
      popupWithImage.open(card.title, card.img);
    });
    return card;
  }

  let cardList = {};

  //получаем карточки с сервера
api.getInitialCards((cardArray) => {
  const cardList = new Section({
    items: cardArray,
    renderer: (item) => {
      const card = createCard(item);
      cardList.addItem(card.generateCard());
      card._element.querySelector('.element__delete').classList.add('element__delete_disable');
      }
  }, ".elements");
  cardList.renderItems();
});

  const userInfo = new UserInfo(".profile__title", ".profile__job" , ".profile__avatar");
  //Получаем информацию о пользователе
api.getUserInfo((data) => {
  debugger
  userInfo.setUserInfo(data);
})


const popupWithImage = new PopupWithImage(".lightbox", ".popup__image", ".popup__image-caption");
popupWithImage.setEventListeners();
//const userInfo = new UserInfo(".profile__title", ".profile__job");
const cardFormValidator = new FormValidator(optionsList, cardForm);
const editFormValidator = new FormValidator(optionsList, popupForm);
cardFormValidator.enableValidation();
editFormValidator.enableValidation();



// const cardList = new Section({
//   items: initialCards,
//   renderer: (item) => {
//     cardList.addItem(createCard(item));
//     }
// }, ".elements");
// cardList.renderItems();


const popupWithEditForm = new PopupWithForm(".popup-profile", (inputsData) => {
  userInfo.setUserInfo({name: inputsData.uInput, descr: inputsData.dInput});
  popupWithEditForm.close();
});
popupWithEditForm.setEventListeners();


const popupWithAddForm = new PopupWithForm(".popup-card", (inputsData) => {
  cardList.addItem(createCard(inputsData));
  popupWithAddForm.close();
});
popupWithAddForm.setEventListeners();

addButton.addEventListener('click', () => {
  cardFormValidator.clearForm();
  popupWithAddForm.open();
});

editButton.addEventListener('click', () => {
  FormValidator.р
  const profileData = userInfo.getUserInfo();
  nameInput.value = profileData.name;
  jobInput.value = profileData.descr;
  popupWithEditForm.open();
});

