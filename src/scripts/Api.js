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
}
