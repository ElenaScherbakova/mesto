import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector)
    this._handleFormSubmit = handleFormSubmit
    this._popupForm = this._popup.querySelector('.popup__form')
    this._inputList = this._popupForm.querySelectorAll('.popup__input');
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
  }

  /**
   собирает данные всех полей формы
   */
  _getInputValues() {
    // создаём пустой объект
    const formValues = {};
    // добавляем в этот объект значения всех полей
    this._inputList.forEach(input => {
      formValues[input.name] = input.value;
    });
    // возвращаем объект значений
    return formValues;
  }

  handleOpenPopup(formValues) {
    super.handleOpenPopup()
    this._inputList.forEach(input => {
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

  /**
   Обработчик сабмита формы, ставит на кнопку значение "сохранение", пока идет запрос
   */
  handleFormSubmit(e) {
    const values = this._getInputValues()
    const submitButton = e.submitter
    const title = submitButton.innerText
    submitButton.innerText = 'Сохранение...'
    this._handleFormSubmit(values)
        .then( () => {
          this.handleClosePopup()
          submitButton.innerText = title
        })
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