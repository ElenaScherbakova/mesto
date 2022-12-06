export default class UserInfo {
  constructor({userName, userInfo}) {
    this._userName = document.querySelector(userName);
    this._userInfo = document.querySelector(userInfo);
  }

  getUserInfo() {
    return {
      name: this._userName.innerText,
      about: this._userInfo.innerText
    };
  }

  setUserInfo(userName, userInfo) {
    this._userName.innerText = userName
    this._userInfo.innerText = userInfo
  }
}