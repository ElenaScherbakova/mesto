import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector)
    this.handleFormSubmit = handleFormSubmit
    this._popupForm = this._popupForm.forms('.popup__form')
  }

  /**
   собирает данные всех полей формы
   */
  _getInputValues() {
    const nameInputName = document.getElementById("name");
    const nameInputAvocation = document.getElementById("avocation");
  }

  handleOpenPopup() {
    super.handleOpenPopup()
  }

  setEventListeners() {
    super.setEventListeners()
    this._popupForm.addEventListener('submit', this.handleFormSubmit)
  }

  removeEventListeners() {
    super.removeEventListeners()
    this._popupForm.removeEventListener('submit', this.handleFormSubmit)
  }
}