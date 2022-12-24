import Popup from "./Popup";

export default class PopupWithConfirmation extends Popup {
    constructor(popupSelector) {
        super(popupSelector)
        this._popupConfirmationButton = this._popup.querySelector('.popup__button_confirmation');
        this._popupConfirmationButton.addEventListener('click', this._handleOk.bind(this))
    }

    _handleOk() {
        this._allowDeletion(true)
        this._allowDeletion = null
        this.handleClosePopup()
    }

    handleClosePopup() {
        if (this._allowDeletion) {
            this._allowDeletion(false)
        }
        super.handleClosePopup();
    }

    waitConfirmation() {
        this.handleOpenPopup()
        return new Promise((resolve) => {
            this._allowDeletion = resolve
        })
    }
}