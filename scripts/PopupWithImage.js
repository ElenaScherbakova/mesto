import Popup from "./Popup.js";


export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector)
    this._popupPhoto = document.querySelector('.popup__photo');
    this._popupFigcaption = document.querySelector(".popup__figcaption")
  }

  handleOpenPopup(item) {
    super.handleOpenPopup()
    this._popupPhoto.setAttribute('alt', item.name)
    this._popupPhoto.setAttribute('src', item.link);
    this._popupFigcaption.textContent = item.name;
  }
}