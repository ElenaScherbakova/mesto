import Popup from './Popup.js';
import PopupWithForm from "./PopupWithForm";

export default class PopupChangeAvatar extends PopupWithForm {
    constructor(popupSelector, handleClick, imageSelector) {
        super(popupSelector, handleClick)
        this._image = document.querySelector(imageSelector)
        this._image.parentElement.addEventListener('click', this.handleOpenPopup.bind(this))
    }

    handleOpenPopup() {
        super.handleOpenPopup({url: this._image.src})
    }
}