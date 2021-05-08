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


const editButton = document.querySelector('.profile__edit-button'),
    addButton = document.querySelector('.profile__add-button'),
    popupForm = document.querySelector('#profile-form'),
    cardForm = document.querySelector('#cardForm'),
    nameInput = popupForm.querySelector('#profileName'),
    jobInput = popupForm.querySelector('#profileJob'),
    popupButton = popupForm.querySelector('#profileJob'),
    avaForm = document.querySelector('.upd-ava-popup').querySelector("#upd-ava-form");


//подключаем апи
const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-23/',
  headers: {
    authorization: '64388478-85d7-41e7-ab69-a698cc4b7b2e',
    'content-type': 'application/json'
  }});

  function createCard(item) {
    const card = new Card(userInfo.id ,item, '.template', () => {
      popupWithImage.open(card.title, card.img);
    }, (element) => {
      popupWithConfirm.open(element);
    }, (element, isLiked) => {
      if (isLiked){
        api.removeLike(element.id, (data) => {
          card.likesStatus( data);
        })
      } else{
        api.like(element.id, (data) =>{
          card.likesStatus(data);
        }
        )
      }
    }
    );

    return card;
  }

  let cardList = {};

  function handleCard(cardArray){
    cardList = new Section({
      items: cardArray,
      renderer: (item) => {
        const card = createCard(item);
        cardList.addItem(card.generateCard());
      }
    }, ".elements");
    cardList.renderItems();

  };

const userInfo = new UserInfo(".profile__title", ".profile__job" , ".profile__avatar");
//Получаем информацию о пользователе
function handleUserInfo(data){
  userInfo.setUserInfo(data);
  userInfo.setAvatarLink(data.avatar);
  userInfo.id = data._id;
}

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([ userData, cards ]) => { handleUserInfo(userData), handleCard(cards)})
  .catch((err) => {console.log(err);});

const cardFormValidator = new FormValidator(optionsList, cardForm);
const editFormValidator = new FormValidator(optionsList, popupForm);
const updateFormValidator = new FormValidator(optionsList, avaForm);

//валидация аватара
updateFormValidator.enableValidation();
cardFormValidator.enableValidation();
editFormValidator.enableValidation();

// Всплывающее окно подтверждения


const popupWithConfirm = new PopupWithConfirm(".confirm-popup", (element) => {
  function handleRemoveCard(element){
    popupWithConfirm.removeCard(element);
    popupWithConfirm.close();
  }
  api.removeCard(element.id).then((res) => handleRemoveCard(element)).catch((err) => {console.log(err);});

});
popupWithConfirm.setEventListeners();




//экземпляр попапа с лайтбокс картинкой
const popupWithImage = new PopupWithImage(".lightbox", ".popup__image", ".popup__image-caption");
popupWithImage.setEventListeners();


//ожидание прогрузки на кнопке
function renderLoading(isLoading){
  isLoading ? popupButton.innerHTML = "Сохранение..." : (
    popupButton.innerHTML = "Сохранить",
    popupWithEditForm.close()
  );
}

//экземпляр попапа с формой редактирования профиля
const popupWithEditForm = new PopupWithForm(".popup-profile", (inputsData) => {
  renderLoading(true);
  function HandleUserInfoSet(data){
  userInfo.setUserInfo(data);
  }
api.setUserInfo(inputsData).then((res) => HandleUserInfoSet(res)).catch((err) => {console.log(err)}).finally(() => {renderLoading(false);});

});


popupWithEditForm.setEventListeners();


//экземаляр формы с добавление карточки
const popupWithAddForm = new PopupWithForm(".popup-card", (inputsData) => {
  renderLoading(true);
  function handleCardAdd(item){
    const card = createCard(item);
    cardList.addItem(card.generateCard());
    popupWithAddForm.close();
  }
  api.addCard(inputsData).then((res) => handleCardAdd(res)).catch((err) => {console.log(err)}).finally(() => {renderLoading(false);});

});

popupWithAddForm.setEventListeners();

//экземпляр редактирования аватара

const popupWithUpdateForm = new PopupWithForm(".upd-ava-popup", (inputsData) => {
  function handleAvatarUpl(item){
    userInfo.setAvatarLink(item.avatar);
  }
  api.avatarUpl(inputsData.avalink).then((res) => handleAvatarUpl(res)).catch((err) => {console.log(err)}).finally(() => {renderLoading(false);});
  popupWithUpdateForm.close()
});

popupWithUpdateForm.setEventListeners();

//слушатель на аватарку
document.querySelector('.profile__avatar-area').addEventListener('click', () =>{
  updateFormValidator.clearForm();
  popupWithUpdateForm.open()
})

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

