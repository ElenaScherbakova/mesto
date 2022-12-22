export default class UserInfo {
  constructor({userName, userInfo, userAvatar}) {
    this._userName = document.querySelector(userName);
    this._userInfo = document.querySelector(userInfo);
    this._userAvatar = document.querySelector(userAvatar);
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

  setAvatar (userAvatar) {
    this._userAvatar.src = userAvatar
  }

  getAvatar () {
    return this._userAvatar.src
  }
}
