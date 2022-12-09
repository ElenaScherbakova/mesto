import './index.css';
import {Card} from '../scripts/Card.js'
import {FormValidator} from '../scripts/FormValidator.js'
import Section from '../scripts/Section.js'
import PopupWithForm from "../scripts/PopupWithForm.js";
import PopupWithImage from "../scripts/PopupWithImage.js";
import UserInfo from "../scripts/UserInfo.js";
import initialCards from '../scripts/initialCards';

const buttonOpenPlusPopup = document.querySelector(".profile__plus");
const buttonOpenEditPopup = document.querySelector(".profile__edit");
const formEditProfile = document.getElementById("submit-form");
const formAddPlace = document.getElementById("place-form");
const list = document.querySelector('.elements');


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
createValidator(formEditProfile)
createValidator(formAddPlace)


/**
 * открытие первого попапа с именем и профессией
 */

const openEditPopup = () => {
  popupEditForm.handleOpenPopup(
          userNewInfo.getUserInfo())
};

const openPopupPlace = () => {
  popupNewCard.handleOpenPopup({
    name: "",
    link: ""
  })
};

buttonOpenEditPopup.addEventListener("click", openEditPopup);
buttonOpenPlusPopup.addEventListener('click', openPopupPlace);

const removeItem = (element) => {
  list.removeChild(element)
}

const popupImage = new PopupWithImage('.popup_type_image')

const cardsList = new Section({
  /**
   создает карточку
   */
  renderer: (item) => {
    const card = new Card("#place", item, popupImage.handleOpenPopup.bind(popupImage), removeItem)
    const cardElement = card.createItem();
    return cardElement
  },
}, '.elements');

/**
 экземпляр класса PopupWithForm для формы Редактировать профиль
 */
const popupEditForm = new PopupWithForm('.popup_type_edit', ({name, about}) => {
  userNewInfo.setUserInfo(name, about)
})

/**
 экземпляр класса PopupWithForm для формы Новое место
 */
const popupNewCard = new PopupWithForm('.popup_type_plus', (argument) => {
  cardsList.renderItem(argument)
})


const userNewInfo = new UserInfo({userName: ".profile__title", userInfo: ".profile__subtitle"})


const renderCenterPane = () => {
  cardsList.renderItems(initialCards)
};


renderCenterPane()
