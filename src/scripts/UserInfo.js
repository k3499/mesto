export class UserInfo{
  constructor(nameSelector, descriptionSelector){
    this.name = document.querySelector(nameSelector);
    this.descr = document.querySelector(descriptionSelector);
  }
  getUserInfo(){
    return {
      name: this.name.textContent,
      descr: this.descr.textContent
    }
  }
  setUserInfo(data){
    this.name.textContent = data.name;
    this.descr.textContent = data.descr;
  }
}
