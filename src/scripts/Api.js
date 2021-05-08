export class Api {
  constructor(config){
    this._url = config.url;
    this._headers = config.headers;
  }
  _resOk(res){
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }
    //загрузка карточек с сервера
  getInitialCards(){
    return fetch(`${this._url}cards`, {
       method: 'GET',
       headers: this._headers
     })
     .then((res) => {
        return this._resOk(res);
      });
  }

    //загрузка информации о пользователе
  getUserInfo(){
    return fetch(`${this._url}users/me`, {
      method: 'GET',
      headers: this._headers
    })
    .then((res) => {
      return this._resOk(res);
     })
  }
    //отправка новой информации о пользователе
  setUserInfo(inputData){
    return fetch(`${this._url}users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: inputData.name,
        about: inputData.job
      })
    })
    .then((res) => {
      return this._resOk(res);
    })
  }
    //добавление карточек на сервер
  addCard(inputData){
    return fetch(`${this._url}cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: inputData.cardname,
        link: inputData.cardlink
      })
    })
    .then((res) => {
      return this._resOk(res);
    })
    // .then((result) => {
    //   handleCardAdd(result);
    // })
    // .catch((err) => {
    //   console.log(err);
    // })
    // .finally(() => {
    //   renderLoading(false);
    // });
  }
    //добавление лайков
  like(cardId, handleLike){
    return fetch(`${this._url}cards/likes/${cardId}`, {
      method: 'PUT',
      headers: this._headers
    })
    .then((res) => {
      return this._resOk(res);
     })
     .then((result) => {
      handleLike(result);
     })
     .catch((err) => {
       console.log(err);
     });
  }
    //снятие лайка
  removeLike(cardId, handleRemoveLike){
    return fetch(`${this._url}cards/likes/${cardId}`, {
      method: 'DELETE',
      headers: this._headers
    })
    .then((res) => {
      return this._resOk(res);
     })
     .then((result) => {
      handleRemoveLike(result);
     })
     .catch((err) => {
       console.log(err);
     });
  }
    //Удаление карточки с сервера
  removeCard(cardId){
    return fetch(`${this._url}cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers
    })
    .then((res) => {
      return this._resOk(res);
     })
  }
    //загрузка аватара пользователя
  avatarUpl(inputData){
    return fetch(`${this._url}users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: inputData
      })
    })
    .then((res) => {
      return this._resOk(res);
    })
  }
}
