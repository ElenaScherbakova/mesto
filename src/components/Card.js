import api from "./API";
import PopupWithConfirmation from "./PopupWithConfirmation";

export class Card {
  _templateSelector;
  item;

  constructor(templateSelector, item, onImgClick, onRemove, storage) {
    this._templateSelector = templateSelector;
    this.item = item;
    this._onImgClick = onImgClick
    this._onRemove = onRemove
    this._storage = storage
    this._likeButton = () => {
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

    this._isCurrentUserLiked = () => {
      return this.item.likes.some((liker)=> {
        return liker._id === this._storage.user._id
      })
    }

    this._isOwner = () => {
      return this.item.owner._id === this._storage.user._id
    }

    this._onLike = () => {
      api.likeCard(this.item._id, !this._isCurrentUserLiked())
          .then( card => {
            this.item = card
            this._updateLikes()
          })
          .catch( status => {
            if (status === 400) {
              this._onRemove(this._element)
              window.alert('Карточка была удалена')
            }
          })
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
    const elementParent = element.querySelector('.card__place');
    this.elementImg = element.querySelector('.card__photo');
    this.removeButton = element.querySelector('.card__basket');
    if (!this._isOwner()) {
      elementParent.removeChild(this.removeButton)
    }
    elementName.innerText = this.item.name; // меняет текст в заголовке
    this.elementImg.src = this.item.link; // меняет ссылку на картинку
    this.elementImg.alt = this.item.name;
    this.elementLike = element.querySelector('.card__like')
    this._updateLikes ()
    this._setEventListeners()
    return element
  };

  /**
   метод устанавливает актуальное значение лайков
   */
  _updateLikes () {
    this.elementcounter = this._element.querySelector('.card__counter')
    this.elementcounter.innerText = this.item.likes.length
    const isLiked = this._isCurrentUserLiked()
    if (isLiked) {
      this.elementLike.classList.add('card__like_active')
    } else {
      this.elementLike.classList.remove('card__like_active')
    }
  }

  _clickLikeRemove () {

  }






}



