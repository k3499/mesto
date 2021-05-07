export class UserInfo{
  constructor(nameSelector, descriptionSelector, avatar){
    this.name = document.querySelector(nameSelector);
    this.descr = document.querySelector(descriptionSelector);
    this.avatar = document.querySelector(avatar);
  }
  getUserInfo(){
    return {
      name: this.name.textContent,
      descr: this.descr.textContent
    }
  }
  setUserInfo(data){
    this.name.textContent = data.name;
    this.descr.textContent = data.about;
  }
  setAvatarLink(avatarLink){
    this.avatar.src = avatarLink;
  }
}
