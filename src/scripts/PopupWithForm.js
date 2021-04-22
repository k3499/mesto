import {Popup} from './Popup.js'

export class PopupWithForm extends Popup{
  constructor(popupSelector, formSubmitHandler){
    super(popupSelector); //Подгружаем параметры родительского попапа
    this._formSubmitHandler = formSubmitHandler;
    this._form = this._popup.querySelector('.popup__form');
    this._inputsList = Array.from(this._popup.querySelectorAll('input'));
  }
    _getInputValues(){
      //Получаем данные инпутов
      const inputsData = {
        uInput: this._inputsList[0].value,
        dInput: this._inputsList[1].value
      };
      return inputsData;
      //проходим по каждому элементу массива и помещаем значение инпута в обьект
    }
    setEventListeners(){//Вешаем слушателей
      super.setEventListeners();//наследуем слушателя и родительского класса
      this._popup.addEventListener("submit", (evt) => {
        evt.preventDefault();
        this._formSubmitHandler(this._getInputValues());//прокидываем данные полей функцию из вне
      });
    }
    close(){
      super.close();
      this._form.reset();
    }
}