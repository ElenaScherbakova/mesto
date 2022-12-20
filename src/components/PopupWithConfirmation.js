import Popup from './Popup.js';

export default class PopupWithConfirmation extends Popup {
    constructor(popupSelector, handleClick) {
        super(popupSelector)
        this._handleClick = handleClick

    }

}