export class Section {
  constructor({ items, renderer }, containerSelector){
    this._items = items;
    this._renderer = renderer;
    this._containerSelector = document.querySelector(containerSelector);
  }
  renderItems(){// добавление карточек
    this._items.forEach(item => {
      this._renderer(item);
    });
  }

  addItem(InputEvent){//добавление карточки одной в разметку
    this._containerSelector.prepend(InputEvent);
  }
}
