export const optionsList = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};


export class FormValidator {
  constructor(options, formElement) {
    this._formSelector = options.formSelector;
    this._inputSelector = options.inputSelector;
    this._submitButtonSelector = options.submitButtonSelector;
    this._inactiveButtonClass = options.inactiveButtonClass;
    this._inputErrorClass = options.inputErrorClass;
    this._errorClass = options.errorClass;

    this._formElement = formElement;
    this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    this._buttonElement = this._formElement.querySelector(this._submitButtonSelector);
  }
  _showInputError = (inputElement, errorMessage) => {
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);

    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass );
  };
  _hideInputError = (inputElement) => {
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);

    errorElement.textContent = '';
    errorElement.classList.remove(this._errorClass);
    inputElement.classList.remove(this._inputErrorClass);
  };

  _checkInputValidity = (inputElement) => {
    const isValid = inputElement.validity.valid;

    if (isValid){

      this._hideInputError(inputElement);
    } else {
      const errorMessage = inputElement.validationMessage;
      this._showInputError(inputElement, errorMessage);
    }
  };

  _toggleButtonState = () => {
    const NotValidInput = this._inputList.some(
      (inputElement) => !inputElement.validity.valid
    );
    const allInputsEmpty = !this._inputList.some(inputElement =>
      inputElement.value.length > 0);

    if (NotValidInput || allInputsEmpty){
      this._buttonElement.setAttribute('disabled', true);
      this._buttonElement.classList.add(this._inactiveButtonClass);
    } else {
      this._buttonElement.removeAttribute('disabled');
      this._buttonElement.classList.remove(this._inactiveButtonClass);
    }
  };

   _setInputListeners = () => {

    this._formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  }
    enableValidation() {
      this._setInputListeners();
    }
    clearForm() {
      this._toggleButtonState();
      this._inputList.forEach((inputElement) => {
        this._hideInputError(inputElement);
      });
    }
}
