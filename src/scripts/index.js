import { Card } from "./Card.js";
import { optionsList, FormValidator } from "./FormValidator.js";
import { Section } from './Section.js';
import { initialCards } from './initialCards.js';
import { PopupWithForm } from './PopupWithForm.js';
import { PopupWithImage} from './PopupWithImage.js';
import { UserInfo } from './UserInfo.js';
import '../pages/index.css';

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
  userInfo.setUserInfo({name: inputsData.uInput, descr: inputsData.dInput});
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
  jobInput.value = profileData.descr;
  editFormValidator.enableValidation();
  popupWithEditForm.open();
});
