import Popup from './Popup.js';

export default class PopupChangeAvatar extends Popup {
    constructor(popupSelector, handleClick, imageSelector) {
        super(popupSelector)
        this._handleClick = handleClick
        this._image = document.querySelector(imageSelector)
        const inputUrl = this._popup.querySelector('.popup__input');
        this._image.addEventListener('click', this._handleClick)

    }

    handleOpenPopup() {
        super.handleOpenPopup()
        this.input.value = this._image.src

    }
}