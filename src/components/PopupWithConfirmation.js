import Popup from './Popup.js';

export default class PopupWithConfirmation extends Popup {
    constructor(popupSelector, handleClick) {
        super(popupSelector)
        this._handleClick = handleClick
        this._popupConfirmationButton = this._popup.querySelector('.popup__button_confirmation');
        this._popupConfirmationButton.addEventListener('click', this._handleOk.bind(this))
    }

    _handleOk() {
        this._handleClick()
        this.handleClosePopup()
    }
}