const buttonOpenEditPopup = document.querySelector(".profile__edit");
const buttonOpenPlusPopup = document.querySelector(".profile__plus");
const buttonOpenPhotoPopup = document.querySelector(".popup_type_image");
const popupEdit = document.querySelector(".popup_type_edit");
const popupModalFon = document.querySelectorAll(".popup__container");
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
  closeDialog( popupEdit);
  const name = nameInputName.value;
  const avocation = nameInputAvocation.value;
  nameSpan.innerText = name;
  avocationSpan.innerText = avocation;
};

const openDialog = (dialog) => {
  dialog.classList.remove('popup_hidden') // класс hidden нужен для анимации и плавного открытия модалок
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

const closeModal = () => {
  closeDialog(popupModalFon);
};

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

/**
 закрытие по Esc
 */


const closeAllDialog =() => {
  document.querySelectorAll(".popup_opened").forEach((dialog) => {
    closeDialog(dialog)
  })
}


const closeEsc = (event)  =>  {
    if (event.key === 'Escape') {
      closeAllDialog()
    }
  }


document.addEventListener('keydown', closeEsc)
/*document.addEventListener('click', closeAllDialog)*/

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
  closeDialog(popupPlus);
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
  return element
};

renderCenterPane()


