const buttonOpenEditPopup = document.querySelector(".profile__edit");
const buttonOpenPlusPopup = document.querySelector(".profile__plus");
const buttonOpenPhotoPopup = document.querySelector(".popup_type_image");
const popupEditProfile = document.querySelector(".popup_type_edit");
const popupAddCard = document.querySelector(".popup_type_plus");
const popupPhoto = document.querySelector('.popup__photo');
const popupEditClose = popupEditProfile.querySelector(".popup__close_edit");
const popupPlusClose = popupAddCard.querySelector(".popup__close_plus");
const popupPhotoClose = document.querySelector('.popup__close_photo')
const nameInputName = document.getElementById("name");
const nameInputAvocation = document.getElementById("avocation");
const nameSpan = document.querySelector(".profile__title");
const avocationSpan = document.querySelector(".profile__subtitle");
const formEditProfile = document.getElementById("submit-form");
const nameInputTitle = document.getElementById("title");
const nameInputLink = document.getElementById("link");
const formAddPlace = document.getElementById("place-form");
const listItemTemplate = document.querySelector('#place');
const list = document.querySelector('.elements');
const popupFigcaption = document.querySelector(".popup__figcaption")

const handleSubmitProfileEditForm = (formEvent) => {
  formEvent.preventDefault();
  closeDialog(popupEditProfile);
  const name = nameInputName.value;
  const avocation = nameInputAvocation.value;
  nameSpan.innerText = name;
  avocationSpan.innerText = avocation;
};

const openDialog = (dialog) => {
  dialog.classList.remove('popup_hidden') // класс hidden нужен для анимации и плавного открытия модалок
  dialog.classList.add("popup_opened")
  document.addEventListener('keydown', closeEsc);
  document.addEventListener('mousedown', closePopupByOverlay);

};

/**
 * открытие первого попапа с именем и профессией
 */

const openEditPopup = () => {
  openDialog(popupEditProfile);
  const name = nameSpan.innerText;
  const avocation = avocationSpan.innerText;
  nameInputName.value = name;
  nameInputLink.value = avocation;
};

/**
 * закртыие по кнопке создать
 */

const closePopupEdit = () => {
  closeDialog(popupEditProfile);
};

/**
 * откртие второго попапа с фото и ссылкой
 */

const openPopupPlace = () => {
  nameInputTitle.value = "";
  nameInputLink.value = "";
  openDialog(popupAddCard)
};

/**
 * закрытие по кнопке сохранить
 */
const closePopupPlace = () => {
  closeDialog(popupAddCard);
};

const closePhoto = () => {
  closeDialog(buttonOpenPhotoPopup);
};

/**
 закрытие диалогов
 */

function closeOpenDialog  () {
  const keepDialog = document.querySelector('.popup_opened')
  if (keepDialog) {
    closeDialog(keepDialog)
  }
  document.removeEventListener('keydown', closeEsc);
  document.removeEventListener('mousedown', closePopupByOverlay);
}



/**
Закрытие по кнопке Esc
 */

const closeEsc = (event)  => {
   if (event.key === 'Escape') {
    closeOpenDialog()
  }
}

/**
 Закрытие по overlay
 */

const closePopupByOverlay = (event) => {
  if (event.target.classList.contains('popup') || event.target.classList.contains('popup__block')) {
    closeOpenDialog(event)
  }
}

/**
  общее закрытие
 */

const closeDialog = (dialog) => {
  dialog.classList.remove("popup_opened")
  dialog.classList.add('popup_hidden')
};


const handleSubmitProfilePlaceForm = (event) => {
  event.preventDefault(); // предотвращает перезагрузку страницы
  prependCard({
    name: nameInputTitle.value,
    link: nameInputLink.value
  });
  closeDialog(popupAddCard);
} // создание новой карточки и закрытие модалки


popupPhotoClose.addEventListener('click', closePhoto);
buttonOpenPlusPopup.addEventListener('click', openPopupPlace);
buttonOpenEditPopup.addEventListener("click", openEditPopup);
popupPlusClose.addEventListener("click", closePopupPlace);
popupEditClose.addEventListener("click", closePopupEdit);
formEditProfile.addEventListener("submit", handleSubmitProfileEditForm);
formAddPlace.addEventListener("submit", handleSubmitProfilePlaceForm);


const renderCenterPane = () => {
  initialCards.forEach(appendCard)
};

const appendCard = (item) => {
  const element = createItem(item)
  list.appendChild(element)
}
const prependCard = (item) => {
  const element = createItem(item)
  list.prepend(element)
}

const createItem = (item) => {
  const element = listItemTemplate.content.cloneNode(true).firstElementChild;
  const elementName = element.querySelector('.card__text');
  const elementImg = element.querySelector('.card__photo');
  const removeButton = element.querySelector('.card__basket');
  elementName.innerText = item.name; // меняет текст в заголовке
  elementImg.src = item.link; // меняет ссылку на картинку
  elementImg.alt = item.name;
  const elementLike = element.querySelector('.card__like')
  const likeButton = () => {
    elementLike.classList.toggle('card__like_active') // ставит и убирает лайк
  } // В пределах одной функции код более транспортабелен, тем самым легче перенести в отдельный модуль и использовать потом.
  // Функции объявленные внутри этой функции не используются нигде кроме как в самой функции. Код т.о. инкапсулирован.

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
  return element
};


renderCenterPane()


