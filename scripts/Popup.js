export class Popup{
  constructor(popupSelector){
    this._popup = document.querySelector(popupSelector);
    this._closeButton = this._popup.querySelector('.popup__close');
  }
  _handleEscClose(evt){//нажатие на Esc
    if (evt.key === "Escape") this.close()
  }
  _closePopupOnOverlay(evt){//Клик по оверлею
    if (evt.target.classList.contains("popup")) this.close()
  }
  }
  setEventListeners(){//вешаем слушатели
    this._closeButton.addEventListener('click', () => this.close());
  }
  open(){//открываем попап
    this._popup.classList.add('popup_opened');
    this._popup.addEventListener("keydown", this._handleEscPress);
    this._popup.addEventListener("click", this._closePopupOnOverlay);
  }
  close(){//закрываем попап
    this._popup.classList.remove('popup_opened');
    this._popup.removeEventListener("keydown", this._handleEscPress);
    this._popup.removeEventListener("click", this._closePopupOnOverlay);
  }

}
