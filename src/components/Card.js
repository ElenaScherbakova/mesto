import api from "./API";
import PopupWithConfirmation from "./PopupWithConfirmation";

export class Card {
  _templateSelector;
  item;

  constructor(templateSelector, item, onImgClick, onRemove, onLike) {
    this._templateSelector = templateSelector;
    this.item = item;
    this._onImgClick = onImgClick
    this._onRemove = onRemove
    this._onLike = onLike
    this._likeButton = () => {
      this.elementLike.classList.toggle('card__like_active') // ставит и убирает лайк
      this._onLike()
    }
    this._handleImageClick = () => {
      this._onImgClick(this.item)
    }
    this._handleDeleteCardClickTrash = () => {
      this._onImgClick(this.item)
    }
    this._removeItem = () => {
      /**
       экземпляр класса PopupWithConfirmation для формы Подтверждения
       */
      const popupConfirmation = new PopupWithConfirmation ('.popup_type_confirmation', () => {
        api.removeCard(this.item._id)
            .then( () => this._onRemove(this._element))
      })
      popupConfirmation.handleOpenPopup()
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
    this._updateLikes ()
    this.elementLike = element.querySelector('.card__like')
    this._setEventListeners()
    return element
  };

  _updateLikes () {
    this.elementcounter = this._element.querySelector('.card__counter')
    this.elementcounter.innerText = this.item.likes.length
  }

  _clickLikeRemove () {

  }






}



