import {Popup} from './Popup.js'

export class PopupWithConfirm extends Popup{
  constructor(popupSelector){
    super(popupSelector); //Подгружаем параметры родительского попапа
  }
  setEventListeners(){
    super.setEventListeners();
    this._popup.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleSubmitCallback();
    } );
  }
  open(cardElement){
    super.open();
    this._cardElement = cardElement;
  }
  setSubmitAction(action) {
    this._handleSubmitCallback = action;
}
}
