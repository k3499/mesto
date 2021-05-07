export class Card {
  constructor( item, selector, handleCardClick, handleDelete, handleLike ){
    //помещаем в элементы обьекта то что передали при создании
    //(название карточки, ссылка на изображение и селектор .template)
    this.title = item.name;
    this.img = item.link;
    this._selector = selector;
    this._handleCardClick = handleCardClick;
    this._handleDelete = handleDelete;
    this.countLike = item.likes.length;
    this.id = item._id;
    this._handleLike = handleLike;
  }

  // _deleteClickHandler(){//обработчик нажатия кнопки удаления
  //   this._element.remove();
  //   this._element = null;
  // }
  // _likeClickHandler(){//обработчик нажатия кнопки лайк
  //   this._element.querySelector('.element__like').classList.toggle('element__like_active');
  // }

  _getTemplate(){
      //берем код из теймплейта
    const cardElement = document.querySelector(this._selector).content.querySelector(".element").cloneNode(true);
    return cardElement;
  }

  _setEventListeners() {
    //находим из созданного элемента кнопку лайк и вешаем на нее листнеры
    this._element.querySelector('.element__like').addEventListener('click', () => this._handleLike(this, this._element.querySelector('.element__like').classList.contains('element__like_active')));

    this._element.querySelector('.element__delete').addEventListener('click', () => {
      this._handleDelete(this);
    });

    this._element.querySelector('.element__image').addEventListener('click', () => {
      this._handleCardClick();
    });
  }

  // _handleLike() {
  //   //находим из созданного элемента кнопку лайк и переключаем состояние
  //   this._element.querySelector('.element__like').classList.toggle('element__like_active');
  // }
  // _handleDelete() {
  //   this._element.remove();
  // }

  generateCard() {
    //находим изображение и подпись
    this._element = this._getTemplate();
    this._setEventListeners();

    const image = this._element.querySelector('.element__image');
    const title = this._element.querySelector('.element__title');

    //в ссылку и подпись помещаем то изображение и в подпись - текст
    image.src = this.img;
    image.alt = this.title;
    title.textContent = this.title;
    this._element.querySelector('.element__like-count').textContent = this.countLike;
    return this._element;
  }
}
