export class Popup{
  constructor(popupSelector){
    this._popup = document.querySelector(popupSelector);
    this._closeButton = this._popup.querySelector('.popup__close');
    this._handleEscClose = this._handleEscClose.bind(this);
    this._closePopupOnOverlay = this._closePopupOnOverlay.bind(this);
  }
  _handleEscClose(evt){//нажатие на Esc
    if (evt.key === "Escape") this.close()
  }
  _closePopupOnOverlay(evt){//Клик по оверлею
    if (evt.target.classList.contains("popup")) {

      this.close();
    };
  }

  setEventListeners(){//вешаем слушатели
    this._closeButton.addEventListener('click', () => this.close());
    this._popup.addEventListener("click", this._closePopupOnOverlay);
  }
  open(){//открываем попап
    this._popup.classList.add('popup_opened');
    document.addEventListener("keydown", this._handleEscClose);
  }
  close(){//закрываем попап
    this._popup.classList.remove('popup_opened');
    document.removeEventListener("keydown", this._handleEscClose);
  }

}
