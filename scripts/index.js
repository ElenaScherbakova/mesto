const buttonOpenEditPopup = document.querySelector(".profile__edit");
const buttonOpenPlusPopup = document.querySelector(".profile__plus");
const buttonOpenPhotoPopup = document.querySelector(".popup_type_image");
const popupEdit = document.querySelector(".popup_type_edit");
const popupPlus = document.querySelector(".popup_type_plus");
const popupPhoto = document.querySelector('.popup__photo');
const popupEditSave = popupEdit.querySelector(".popup__button_edit");
const popupPlusSave = popupPlus.querySelector(".popup__button_plus");
const popupEditClose = popupEdit.querySelector(".popup__close_edit");
const popupPlusClose = popupPlus.querySelector(".popup__close_plus");
const popupPhotoClose = document.querySelector('.popup__close_photo')
const nameInputName = document.getElementById("name");
const nameInputAvocation = document.getElementById("avocation");
const nameSpan = document.querySelector(".profile__title");
const avocationSpan = document.querySelector(".profile__subtitle");
const form = document.getElementById("submit-form");
const nameInputTitle = document.getElementById("title");
const nameInputLink = document.getElementById("link");
const formPlace = document.getElementById("place-form");
const listItemTemplate = document.querySelector('#place');
const list = document.querySelector('.elements');
const popupFigcaption = document.querySelector(".popup__figcaption")



const handleSubmitProfileEditForm = (formEvent) => {
  formEvent.preventDefault();
  popupEdit.classList.remove("popup_opened");
  const name = nameInputName.value;
  const avocation = nameInputAvocation.value;
  nameSpan.innerText = name;
  avocationSpan.innerText = avocation;
};

const openDialog = (dialog) => {
  dialog.classList.remove('popup_hidden')
  dialog.classList.add("popup_opened")
};

const openEditPopup = () => {
  openDialog(popupEdit);
  const name = nameSpan.innerText;
  const avocation = avocationSpan.innerText;
  nameInputName.value = name;
  nameInputAvocation.value = avocation;
}; //  откртие первого попапа с именем и профессией

const closePopupEdit = () => {
  closeDialog(popupEdit);
}; // закртыие по кнопке создать

const closeEdit = () => {
  closeDialog(popupEdit);
}; // закрытие по крестику

const openPopupPlace = () => {
  openDialog(popupPlus)
}; //  откртие второго попапа с фото и ссылкой

const closePopupPlace = () => {
  closeDialog(popupPlus);
}; // закрытие по кнопке сохранить

const closePlus = () => {
  closeDialog(popupPlus);
}; // закрытие по крестику

const closePhoto = () => {
  closeDialog(buttonOpenPhotoPopup);
};

const closeDialog = (dialog) => {
  dialog.classList.remove("popup_opened")
  dialog.classList.add('popup_hidden')
}; // закртие общее

const handleSubmitProfilePlaceForm = (event) => {
  event.preventDefault(); // предотвращает перезагрузку страницы
  createItem({
    name: nameInputTitle.value,
    link: nameInputLink.value
  }, true);
  popupPlus.classList.remove("popup_opened");
} // создание новой карточки и закрытие модалки

popupPhotoClose.addEventListener('click', closePhoto);
buttonOpenPlusPopup.addEventListener('click', openPopupPlace);
buttonOpenEditPopup.addEventListener("click", openEditPopup);
popupPlusSave.addEventListener("click", closePopupPlace);
popupEditSave.addEventListener("click", closePopupEdit);
popupPlusClose.addEventListener("click", closePlus);
popupEditClose.addEventListener("click", closeEdit);
form.addEventListener("submit", handleSubmitProfileEditForm);
formPlace.addEventListener("submit", handleSubmitProfilePlaceForm);

const renderCenterPane = () => {
  initialCards.forEach(createItem)
 /* for (let i = 0; i < initialCards.length; i++) {
    createItem(initialCards[i], false);
  }*/
};





const createItem = (item, appendToStart) => {
  const element = listItemTemplate.content.cloneNode(true).firstElementChild;
  const elementName = element.querySelector('.elements__text');
  const elementImg = element.querySelector('.elements__photo');
  const removeButton = element.querySelector('.elements__basket');
  elementName.innerText = item.name; // меняет текст в заголовке
  elementImg.src = item.link; // меняет ссылку на картинку
  if (appendToStart) {
    list.appendChild(element)
  } else {
    list.prepend(element)
  }

  const elementLike = element.querySelector('.elements__like')
  const likeButton = () => {
    elementLike.classList.toggle('elements__like_active')
  }


  const popupOpenDialog = () => {
    popupPhoto.setAttribute('alt', item.name)
    popupPhoto.setAttribute('src', item.link);
    popupFigcaption.textContent = item.name;
    openDialog(buttonOpenPhotoPopup)
  }
  const removeItem = () => {
    list.removeChild(element)
    elementImg.removeEventListener('click', popupOpenDialog)
    removeButton.removeEventListener('click', removeItem);
    elementLike.removeEventListener('click', likeButton)
  }
  elementLike.addEventListener('click', likeButton)
  elementImg.addEventListener('click', popupOpenDialog) // вызов модалки с фото
  removeButton.addEventListener('click', removeItem);
};



renderCenterPane()