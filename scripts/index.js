import {Card} from './Card.js'
import {FormValidator} from './FormValidator.js'
import {Section} from './Section.js'
import PopupWithForm from "./PopupWithForm";


const buttonOpenEditPopup = document.querySelector(".profile__edit");
const buttonOpenPlusPopup = document.querySelector(".profile__plus");
const buttonOpenPhotoPopup = document.querySelector(".popup_type_image");
const popupEditProfile = document.querySelector(".popup_type_edit");
const popupAddCard = document.querySelector(".popup_type_plus");

const popupEditClose = popupEditProfile.querySelector(".popup__close_edit");
const popupPlusClose = popupAddCard.querySelector(".popup__close_plus");
const popupPhotoClose = document.querySelector('.popup__close_photo')

const nameSpan = document.querySelector(".profile__title");
const avocationSpan = document.querySelector(".profile__subtitle");
const formEditProfile = document.getElementById("submit-form");
const nameInputTitle = document.getElementById("title");
const nameInputLink = document.getElementById("link");
const formAddPlace = document.getElementById("place-form");
const listItemTemplate = document.querySelector('#place');
const list = document.querySelector('.elements');

const popupSubmitPlace = document.querySelector(".popup__button_plus")
const formElements = Array.from(document.querySelectorAll('.popup__form'));


const createValidator = (form) => {
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

const formEditValidator = createValidator(formEditProfile)
const formPlaceValidator = createValidator(formAddPlace)

const handleSubmitProfileEditForm = (formEvent) => {
  formEvent.preventDefault();
  closeDialog(popupEditProfile);
  const name = nameInputName.value;
  const avocation = nameInputAvocation.value;
  nameSpan.innerText = name;
  avocationSpan.innerText = avocation;
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


const removeItem = (element) => {
  list.removeChild(element)
}


const cardsList = new Section({
  /**
   создает карточку
   */
  renderer: (item) => {
    const card = new Card("#place", item, openPopupDialog, removeItem)
    const cardElement = card.createItem();
    return cardElement
  },
}, '.elements');

const popupForm = new PopupWithForm('.popup_type_edit', ({name, avocation}) => {
  nameSpan.innerText = name;
  avocationSpan.innerText = avocation;
})

const renderCenterPane = () => {
  cardsList.renderItems(initialCards)
};


renderCenterPane()
