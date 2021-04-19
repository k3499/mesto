import {Popup} from './Popup.js'

export class PopupWithImage extends Popup{
  constructor(popupSelector){
    super(popupSelector); //Подгружаем параметры родительского попапа
    this._lightboxImage = this._popup.querySelector(".popup__image");
    this._lightboxCaption = this._popup
    .querySelector(".popup__image-caption");
  }
  open(title, img) {//перезаписываем метод открытия попапа с картинкой
    this._lightboxImage.src = img;
    this._lightboxImage.alt = title;
    this._lightboxCaption.textContent = title;
    super.open();
  }
}
