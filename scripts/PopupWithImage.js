import {Popup} from './Popup.js'

export class PopupWithImage extends Popup{
  constructor(popupSelector){
    super(popupSelector); //Подгружаем параметры родительского попапа
    this._lightboxImage = this._popupType.querySelector(".popup__image");
    this._lightboxCaption = this._popupType.querySelector(".popup__image-caption");
  }
  open(data) {//перезаписываем метод открытия попапа с картинкой
    this._lightboxImage.src = data.link;
    this._lightboxImage.alt = data.name;
    this._lightboxCaption.textContent = data.name;
    super.open();
  }
}
