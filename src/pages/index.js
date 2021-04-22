import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";
import { Section } from './Section.js';
import { initialCards } from './initialCards.js';
import { PopupWithForm } from './PopupWithForm.js';
import { PopupWithImage} from './PopupWithImage.js';
import { UserInfo } from './UserInfo.js';
import '../pages/index.css';
const optionsList = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};


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

function createCard(item) {
  const card = new Card(item, '.template', () => {
    popupWithImage.open(card.title, card.img);
  });
  return card.generateCard();
}

const cardList = new Section({
  items: initialCards,
  renderer: (item) => {
    cardList.addItem(createCard(item));
    }
}, ".elements");
cardList.renderItems();


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
