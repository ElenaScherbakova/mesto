export class Section {
  constructor({renderer}, containerSelector) {
    this._renderer = renderer; // renderer — это функция
    this._container = document.querySelector(containerSelector);
  }

  /**
   Отрисовка всего массива
   */

  renderItems(items) {
    items.forEach((item) => {
      const cardElement = this._renderer(item)
      this.addItem(cardElement)
    })
  }

  addItem(cardElement) {
    this._container.prepend(cardElement)
  } //принимает DOM-элемент и добавляет его в контейнер

}

