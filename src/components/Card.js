 import api from "./API";
import PopupWithConfirmation from "./PopupWithConfirmation";

export class Card {
  _templateSelector;
  item;

  constructor(templateSelector, item, onImgClick, onRemove, onLike, storage) {
    this._templateSelector = templateSelector;
    this.item = item;
    this._onImgClick = onImgClick
    this._onRemove = onRemove
    this._onLike = onLike
    this._storage = storage

    this._likeButton = () => {
      this._onLike(this)
    }

    this._handleImageClick = () => {
      this._onImgClick(this.item)
    }

    this._removeItem = () => {
      this._onRemove(this._element, this.item._id)
    }

    this.isCurrentUserLiked = () => {
      return this.item.likes.some((liker)=> {
        return liker._id === this._storage.user._id
      })
    }

    this._isOwner = () => {
      return this.item.owner._id === this._storage.user._id
    }
  }

  getCardId() {
    return this.item._id
  }

  getCardElement() {
    return this._element
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
    this.elementName = element.querySelector('.card__text');
    const elementParent = element.querySelector('.card__place');
    this.elementImg = element.querySelector('.card__photo');
    this.removeButton = element.querySelector('.card__basket');
    this.elementCounter = this._element.querySelector('.card__counter')
    this.elementLike = element.querySelector('.card__like')

    if (!this._isOwner()) {
      elementParent.removeChild(this.removeButton)
    }
    this._updateItem()
    this._setEventListeners()
    return element
  };

  updateItem(item) {
    this.item = item
    this._updateItem()
  }

  /**
   * Метод актуализирует состояния карточки
   */
  _updateItem () {
    this.elementCounter.innerText = this.item.likes.length
    this.elementName.innerText = this.item.name; // меняет текст в заголовке
    this.elementImg.src = this.item.link; // меняет ссылку на картинку
    this.elementImg.alt = this.item.name;

    const isLiked = this.isCurrentUserLiked()
    if (isLiked) {
      this.elementLike.classList.add('card__like_active')
    } else {
      this.elementLike.classList.remove('card__like_active')
    }
  }

}



