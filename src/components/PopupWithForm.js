import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector)
    this._handleFormSubmit = handleFormSubmit
    this._popupForm = this._popup.querySelector('.popup__form')
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
  }

  /**
   собирает данные всех полей формы
   */
  _getInputValues() {
    // достаём все элементы полей
    const inputList = this._popupForm.querySelectorAll('.popup__input');
    // создаём пустой объект
    const formValues = {};
    // добавляем в этот объект значения всех полей
    inputList.forEach(input => {
      formValues[input.name] = input.value;
    });
    // возвращаем объект значений
    return formValues;
  }

  handleOpenPopup(formValues) {
    super.handleOpenPopup()
    const inputList = this._popupForm.querySelectorAll('.popup__input');
    inputList.forEach(input => {
      input.value = formValues[input.name];
    });
  }

  /**
   Закрытие попапа и сброс формы
   */
  handleClosePopup() {
    super.handleClosePopup()
    this._popupForm.reset()
  }

  handleFormSubmit() {
    const values = this._getInputValues()
    this._handleFormSubmit(values)
    this.handleClosePopup()
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