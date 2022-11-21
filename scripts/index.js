import {Card} from './Card.js'
import {FormValidator} from './FormValidator.js'

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
const popupSubmitPlace = document.querySelector(".popup__button_plus")
const formElements = Array.from(document.querySelectorAll('.popup__form'));


const callForm = (form) => {
  const formValidator = new FormValidator({
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
  }, form)
  formValidator.enableValidation()
  return formValidator
}

const formEditValidator = callForm(formEditProfile)
const formPlaceValidator = callForm(formAddPlace)

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
  nameInputAvocation.value = avocation;
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
  formPlaceValidator.disableButton();
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

function closeOpenedDialog() {
  const openedDialog = document.querySelector('.popup_opened')
  if (openedDialog) {
    closeDialog(openedDialog)
  }
}

/**
 Закрытие по кнопке Esc
 */

const closeEsc = (event) => {
  if (event.key === 'Escape') {
    closeOpenedDialog()
  }
}

/**
 Закрытие по overlay
 */

const closePopupByOverlay = (event) => {
  if (event.target.classList.contains('popup') || event.target.classList.contains('popup__block')) {
    closeOpenedDialog(event)
  }
}

/**
 общее закрытие
 */

const closeDialog = (dialog) => {
  dialog.classList.remove("popup_opened")
  dialog.classList.add('popup_hidden')
  document.removeEventListener('keydown', closeEsc);
  document.removeEventListener('mousedown', closePopupByOverlay);
};

const handleSubmitProfilePlaceForm = (event) => {
  event.preventDefault(); // предотвращает перезагрузку страницы
  prependCard({
    name: nameInputTitle.value,
    link: nameInputLink.value
  });
  nameInputTitle.value = ''
  nameInputLink.value = ''
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

const removeItem = (element) => {
  list.removeChild(element)
}

const openPopupDialog = (item) => {
  popupPhoto.setAttribute('alt', item.name)
  popupPhoto.setAttribute('src', item.link);
  popupFigcaption.textContent = item.name;
  openDialog(buttonOpenPhotoPopup)
}

const createItem = (item) => {
  const card = new Card("#place", item, openPopupDialog, removeItem)
  return card.createItem()
};

renderCenterPane()