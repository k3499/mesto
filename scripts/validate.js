const optionsList = {
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
const toggleButtonState = (inputList, buttonElement, options) => {

  if (hasInvalidInput(inputList) || allInputsEmpty(inputList)){
    buttonElement.setAttribute('disabled', true);
    buttonElement.classList.add(options.inactiveButtonClass);
  } else {
    buttonElement.removeAttribute('disabled');
    buttonElement.classList.remove(options.inactiveButtonClass);
  }
};

//Получает Главный элемент формы и элемент инпута
//добирается до спана с текстом ошибки
//вешаем класс появления на спан и делаем его видимым
const showInputError = (formElement, inputElement, options) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(options.inputErrorClass);
  errorElement.textContent = inputElement.validationMessage;
  errorElement.classList.add(options.errorClass);
};
const hideInputError = (formElement, inputElement, options) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(options.inputErrorClass);
  errorElement.classList.remove(options.errorClass);
};

//Проверка на корректность. Получает Главный элемент формы и элемент инпута
//проверяет свойство валидности у инпута
//если валидно, то вызывает функцию скрытия ошибки если нет, то вызывает функцию показа ошибки
const checkInputValidity = (formElement, inputElement, options) => {
  if (inputElement.validity.valid){
    hideInputError(formElement, inputElement, options);
  } else {
    showInputError(formElement, inputElement, options);
  }
};

//берет одну форму из перебора и создает массив полей инпут
//создает переменную с элементом кнопки отправки формы
//перебирает массив инпутов и вешает на всех слушателя
//слушатель следит за событием Инпут и запускает функцию проверки на корректность
//переключает состояние кнопки в зависимости от валидности инпутов функцией toggleButtonState
const setInputListeners = (formElement, options) => {
  const inputList = Array.from(formElement.querySelectorAll(options.inputSelector));
  const buttonElement = formElement.querySelector(options.submitButtonSelector);

  inputList.forEach(
    inputElement => {
      inputElement.addEventListener('input', () => {
        checkInputValidity(formElement, inputElement, options);
        toggleButtonState(inputList, buttonElement, options);
      });
      toggleButtonState(inputList, buttonElement, options);
    }
  );
};

//берет все формы и делает массив форм.
//перебирает формы и вешает слушателя для предотвращения поведения стандартного
//Вызывает функцию выставления слушателей для каждой формы в момент перебора
const enableValidation = (options) => {
  const formList = Array.from(document.querySelectorAll(options.formSelector));
  formList.forEach(
    formElement =>{
      formElement.addEventListener('submit', (event) => {
        event.preventDefault();
      });
      setInputListeners(formElement, options);
    }
  );
};

enableValidation(optionsList);
