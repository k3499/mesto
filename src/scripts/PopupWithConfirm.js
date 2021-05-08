import {Popup} from './Popup.js'

export class PopupWithConfirm extends Popup{
  constructor(popupSelector, formSubmitHandler){
    super(popupSelector); //Подгружаем параметры родительского попапа
    this._formSubmitHandler = formSubmitHandler;
  }
  setEventListeners(){
    super.setEventListeners();
    this._popup.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._formSubmitHandler(this._cardElement);
    } );
  }
  open(cardElement){
    super.open();
    this._cardElement = cardElement;
  }
  removeCard(element){
    element._element.remove();
    element._element = null;
  }
}
