/**
 отвечает за открытие и закрытие попапа
 */
export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._popupCloseButton = this._popup.querySelector('.popup__close');
    this.closeEsc = this.closeEsc.bind(this)
    this.closePopupByOverlay = this.closePopupByOverlay.bind(this)
    this.handleClosePopup = this.handleClosePopup.bind(this)
  }

  handleOpenPopup() {
    this._popup.classList.remove('popup_hidden') // класс hidden нужен для анимации и плавного открытия модалок
    this._popup.classList.add("popup_opened")
    this.setEventListeners()
  }

  closeEsc(event) {
    if (event.key === 'Escape') {
      this.handleClosePopup()
    }
  }

  closePopupByOverlay(event) {
    if (event.target.classList.contains('popup') || event.target.classList.contains('popup__block')) {
      this.handleClosePopup(event)
    }
  }

  handleClosePopup() {
    this._popup.classList.remove("popup_opened")
    this._popup.classList.add('popup_hidden')
    this.removeEventListeners()
  }

  /**
   Закрытие по кнопке Esc
   */
  _handleEscClose() {

  }

  setEventListeners() {
    document.addEventListener('keydown', this.closeEsc);
    document.addEventListener('mousedown', this.closePopupByOverlay);
    this._popupCloseButton.addEventListener('click', this.handleClosePopup)
  }

  removeEventListeners() {
    document.removeEventListener('keydown', this.closeEsc);
    document.removeEventListener('mousedown', this.closePopupByOverlay);
    this._popupCloseButton.removeEventListener('click', this.handleClosePopup)
  }
}