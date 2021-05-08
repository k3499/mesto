export class Card {
  constructor(id, item, selector, handleCardClick, handleDelete, handleLike  ){
    //помещаем в элементы обьекта то что передали при создании
    //(название карточки, ссылка на изображение и селектор .template)
    this.title = item.name;
    this.img = item.link;
    this._selector = selector;
    this._handleCardClick = handleCardClick;
    this._handleDelete = handleDelete;
    this.countLike = item.likes.length;
    this.id = item._id;
    this._owner = item.owner;
    this._handleLike = handleLike;
    this._selfId = id;
    this._likes = item.likes;
  }

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
    if (this._owner._id !== this._selfId) {
      this._element.querySelector('.element__delete').classList.add('element__delete_disable');
    }
     if (this._likes.some(elem => elem._id === this._selfId)) {
       this.like()
     };
    return this._element;
  }
  like() {
    this._element.querySelector('.element__like').classList.toggle('element__like_active');
  }

  likesStatus(data){
    this._element.querySelector('.element__like-count').textContent = data.likes.length;
    this.like()

  }
  removeCard() {
    this._element.remove();
    this._element = null;
  }
}
