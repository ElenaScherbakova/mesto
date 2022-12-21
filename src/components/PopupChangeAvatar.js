import Popup from './Popup.js';

export default class PopupChangeAvatar extends Popup {
    constructor(popupSelector, handleClick, imageSelector) {
        super(popupSelector)
        this._handleClick = handleClick
        this._image = document.querySelector(imageSelector)
        this._inputUrl = this._popup.querySelector('.popup__input');
        this._image.addEventListener('click', this.handleOpenPopup.bind(this))

    }

    handleOpenPopup() {
        super.handleOpenPopup()
        this._inputUrl.value = this._image.src

    }
}