export class UserInfo{
  constructor(nameSelector, descriptionSelector){
    this.name = document.querySelector(nameSelector);
    this.description = document.querySelector(descriptionSelector);
  }
  getUserInfo(){
    return {
      name: this.name.textContent,
      description: this.description.textContent
    }
  }
  setUserInfo(data){
    this.name.textContent = data.name;
    this.description.textContent = data.description;
  }
}
