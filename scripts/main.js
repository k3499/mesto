let editButton = document.querySelector('.profile__edit-button'),
    popup = document.querySelector('.popup'),
    popupClose = document.querySelector('.popup__close'),
    formElement = document.querySelector('.popup__form'),
    nameInput = formElement.querySelector('.popup__input_type_name'),
    jobInput = formElement.querySelector('.popup__input_type_job'),
    profileTitle = document.querySelector('.profile__title'),
    profileJob = document.querySelector('.profile__job');


function togglePopup(){
  if (!popup.classList.contains('popup_opened')){
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileJob.textContent;
  }
  popup.classList.toggle('popup_opened');
}

function formSubmitHandler(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  popup.classList.toggle('popup_opened');
}

editButton.addEventListener("click", togglePopup);
popupClose.addEventListener("click", togglePopup);
formElement.addEventListener('submit', formSubmitHandler);
