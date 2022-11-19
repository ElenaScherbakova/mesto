export class Card {
  _templateSelector;
  data;

  constructor(templateSelector, data, onImgClick, onRemove) {
    this._templateSelector = templateSelector;
    this.data = data;
    this._onImgClick = onImgClick
    this._onRemove = onRemove
    this._likeButton = () => {
      this.elementLike.classList.toggle('card__like_active') // ставит и убирает лайк
    }
    this._popupOpenDialog = () => {
      this._onImgClick(this.data)
    }
    this._removeItem = () => {
      this._onRemove(this._element)
    }
  }

  getTemplate() {
    return document.querySelector(this._templateSelector)
            .content.querySelector('.card')
  }

  createItem() {
    const element = this.getTemplate().cloneNode(true);
    this._element = element
    const elementName = element.querySelector('.card__text');
    const elementImg = element.querySelector('.card__photo');
    const removeButton = element.querySelector('.card__basket');
    elementName.innerText = this.data.name; // меняет текст в заголовке
    elementImg.src = this.data.link; // меняет ссылку на картинку
    elementImg.alt = this.data.name;
    this.elementLike = element.querySelector('.card__like')
    this.elementLike.addEventListener('click', this._likeButton)
    elementImg.addEventListener('click', this._popupOpenDialog) // вызов модалки с фото
    removeButton.addEventListener('click', this._removeItem);
    return element
  };

}



