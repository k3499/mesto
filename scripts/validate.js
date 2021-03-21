const selectorsList = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

//проверка на пустоту всех полей для изначального переключения кнопки.
const allInputsEmpty = (inputList) => {
  return !inputList.some(inputElement =>
    inputElement.value.length > 0);
};

//получает массив инпутов и прогоняя их проверяет статус атрибута валид на трушность
const hasInvalidInput = (inputList) => {
  return inputList.some(
    (inputElement) => !inputElement.validity.valid
  );
};

//переключатор состояния кнопки проверяет валидны ли все инпуты
//запускает функцию проверки валидности передав ей массив инпутов
const toggleButtonState = (inputList, buttonElement) => {

  if (hasInvalidInput(inputList) || allInputsEmpty(inputList)){
    buttonElement.setAttribute('disabled', true);
    buttonElement.classList.add(selectorsList.inactiveButtonClass);
  } else {
    buttonElement.removeAttribute('disabled');
    buttonElement.classList.remove(selectorsList.inactiveButtonClass);
  }
};

//Получает Главный элемент формы и элемент инпута
//добирается до спана с текстом ошибки
//вешаем класс появления на спан и делаем его видимым
const showInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  console.log("тут надо навестить класс цвета ошибки и сделать визибилити у спана");
  inputElement.classList.add(selectorsList.inputErrorClass);
  errorElement.textContent = inputElement.validationMessage;
  errorElement.classList.add(selectorsList.errorClass);
};
const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(selectorsList.inputErrorClass);
  console.log("тут надо убрать класс цвета ошибки и убрать визибилити у спана");
  errorElement.classList.remove(selectorsList.errorClass);
};

//Проверка на корректность. Получает Главный элемент формы и элемент инпута
//проверяет свойство валидности у инпута
//если валидно, то вызывает функцию скрытия ошибки если нет, то вызывает функцию показа ошибки
const checkInputValidity = (formElement, inputElement) => {
  if (inputElement.validity.valid){
    hideInputError(formElement, inputElement);
  } else {
    showInputError(formElement, inputElement);
  }
};

//берет одну форму из перебора и создает массив полей инпут
//создает переменную с элементом кнопки отправки формы
//перебирает массив инпутов и вешает на всех слушателя
//слушатель следит за событием Инпут и запускает функцию проверки на корректность
//переключает состояние кнопки в зависимости от валидности инпутов функцией toggleButtonState
const setInputListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll(selectorsList.inputSelector));
  const buttonElement = formElement.querySelector(selectorsList.submitButtonSelector);

  inputList.forEach(
    inputElement => {
      inputElement.addEventListener('input', () => {
        checkInputValidity(formElement, inputElement);
        toggleButtonState(inputList, buttonElement);
        console.log();
      });
      toggleButtonState(inputList, buttonElement);
    }
  );
};

//берет все формы и делает массив форм.
//перебирает формы и вешает слушателя для предотвращения поведения стандартного
//Вызывает функцию выставления слушателей для каждой формы в момент перебора
const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll(selectorsList.formSelector));
  formList.forEach(
    formElement =>{
      formElement.addEventListener('submit', (event) => {
        event.preventDefault();
      });
      setInputListeners(formElement);
    }
  );
};

enableValidation();
