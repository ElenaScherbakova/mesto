import api from "./API";

export class Card {
  _templateSelector;
  item;

  constructor(templateSelector, item, onImgClick, onRemove) {
    this._templateSelector = templateSelector;
    this.item = item;
    this._onImgClick = onImgClick
    this._onRemove = onRemove
    this._likeButton = () => {
      this.elementLike.classList.toggle('card__like_active') // ставит и убирает лайк
    }
    this._handleImageClick = () => {
      this._onImgClick(this.item)
    }
    this._removeItem = () => {
      api.removeCard(this.item._id)
      this._onRemove(this._element)
    }
  }

  getTemplate() {
    return document.querySelector(this._templateSelector)
            .content.querySelector('.card')
  }

  _setEventListeners() {
    this.elementLike.addEventListener('click', this._likeButton)
    this.elementImg.addEventListener('click', this._handleImageClick) // вызов модалки с фото
    this.removeButton.addEventListener('click', this._removeItem);
  }

  createItem() {
    const element = this.getTemplate().cloneNode(true);
    this._element = element
    const elementName = element.querySelector('.card__text');
    this.elementImg = element.querySelector('.card__photo');
    this.removeButton = element.querySelector('.card__basket');
    elementName.innerText = this.item.name; // меняет текст в заголовке
    this.elementImg.src = this.item.link; // меняет ссылку на картинку
    this.elementImg.alt = this.item.name;
    this.elementLike = element.querySelector('.card__like')
    this._setEventListeners()
    return element
  };

}



