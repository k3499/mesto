export class Api {
  constructor(config){
    this._url = config.url;
    this._headers = config.headers;
  }
    //загрузка карточек с сервера
  getInitialCards(handleCard){
    return fetch(`${this._url}cards`, {
       method: 'GET',
       headers: this._headers
     })
     .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .then((result) => {
        handleCard(result);
      })
      .catch((err) => {
        console.log(err);
      });
  }
    //загрузка информации о пользователе
  getUserInfo(handleUserInfo){
    return fetch(`${this._url}users/me`, {
      method: 'GET',
      headers: this._headers
    })
    .then((res) => {
       if (res.ok) {
         return res.json();
       }
       return Promise.reject(`Ошибка: ${res.status}`);
     })
     .then((result) => {
       handleUserInfo(result);
     })
     .catch((err) => {
       console.log(err);
     });
  }
    //отправка новой информации о пользователе
  setUserInfo(inputData, HandleUserInfoSet, renderLoading){
    renderLoading(true);
    console.log(inputData);
    return fetch(`${this._url}users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: inputData.name,
        about: inputData.job
      })
    })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .then((result) => {
      HandleUserInfoSet(result);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoading(false);
    });
  }
    //добавление карточек на сервер
  addCard(inputData, handleCardAdd, renderLoading){
    renderLoading(true);
    return fetch(`${this._url}cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: inputData.cardname,
        link: inputData.cardlink
      })
    })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .then((result) => {
      handleCardAdd(result);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoading(false);
    });
  }
    //добавление лайков
  like(cardId, handleLike){
    return fetch(`${this._url}cards/likes/${cardId}`, {
      method: 'PUT',
      headers: this._headers
    })
    .then((res) => {
       if (res.ok) {
         return res.json();
       }
       return Promise.reject(`Ошибка: ${res.status}`);
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
       if (res.ok) {
         return res.json();
       }
       return Promise.reject(`Ошибка: ${res.status}`);
     })
     .then((result) => {
      handleRemoveLike(result);
     })
     .catch((err) => {
       console.log(err);
     });
  }
    //Удаление карточки с сервера
  removeCard(cardId, handleRemoveCard){
    return fetch(`${this._url}cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers
    })
    .then((res) => {
       if (res.ok) {
         return res.json();
       }
       return Promise.reject(`Ошибка: ${res.status}`);
     })
     .then((result) => {
      handleRemoveCard(result);
     })
     .catch((err) => {
       console.log(err);
     });
  }
    //загрузка аватара пользователя
  avatarUpl(inputData, handleAvatarUpl, renderLoading){
    renderLoading(true);
    console.log(inputData);
    return fetch(`${this._url}users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: inputData
      })
    })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .then((result) => {
      handleAvatarUpl(result);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoading(false);
    });
  }
}
