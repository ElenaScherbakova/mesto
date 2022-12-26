export default class Section {
  constructor({renderer}, containerSelector) {
    this._renderer = renderer; // renderer — это функция
    this._container = document.querySelector(containerSelector);
  }

  renderItem(item) {
    const cardElement = this._renderer(item)
    this.addItem(cardElement)
  }

  /**
   Отрисовка всего массива
   */

  renderItems(items) {
    items.forEach(this.renderItem.bind(this))
  }

  addItem(cardElement) {
    this._container.prepend(cardElement)
  } //принимает DOM-элемент и добавляет его в контейнер

  removeItem(element) {
    this._container.removeChild(element)
  }
}

