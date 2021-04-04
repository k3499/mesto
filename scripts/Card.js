import { lightbox, lightboxImage, lightboxCaption, openPopup } from './index.js';

export default class Card {
  constructor(title, imgLink, selector){
    //помещаем в элементы обьекта то что передали при создании
    //(название карточки, ссылка на изображение и селектор .template)
    this._title = title;
    this._img = imgLink;
    this._selector = selector;
  }


  _getTemplate(){
      //берем код из теймплейта
    const cardElement = document.querySelector(this._selector).content.querySelector('.element').cloneNode(true);
    return cardElement;
  }

  _setEventListeners() {
    //находим из созданного элемента кнопку лайк и вешаем на нее листнер с функцией лайк
    this._element.querySelector('.element__like').addEventListener('click', () => {
      this._handleLike();
    });

    this._element.querySelector('.element__delete').addEventListener('click', () => {
      this._handleDelete();
    });

    this._element.querySelector('.element__image').addEventListener('click', () => {
      this._handleOpenImg();
    });
  }

  _handleOpenImg() {
    openPopup(lightbox);
    lightboxImage.src = this._img;
    lightboxImage.alt = this._title;
    lightboxCaption.textContent = this._title;
  }
  _handleLike() {
    //находим из созданного элемента кнопку лайк и пересключаем состояние активности
    this._element.querySelector('.element__like').classList.toggle('element__like_active');
  }
  _handleDelete() {
    this._element.closest('.element').remove();
  }

  generateCard() {
    //находим изображение и подпись
    this._element = this._getTemplate();
    this._setEventListeners();

    const image = this._element.querySelector('.element__image');
    const title = this._element.querySelector('.element__title');

    //в ссылку и подпись помещаем то изображение и в подпись - текст
    image.src = this._img;
    image.alt = this._title;
    title.textContent = this._title;

    return this._element;
  }
}
