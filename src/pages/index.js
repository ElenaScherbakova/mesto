import './index.css';
import {Card} from '../components/Card.js'
import {FormValidator} from '../components/FormValidator.js'
import Section from '../components/Section.js'
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import api from "../components/API";
import PopupWithConfirmation from "../components/PopupWithConfirmation";
import PopupChangeAvatar from "../components/PopupChangeAvatar";

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
const validateEditProfile = createValidator(formEditProfile)
const validateAddPlace = createValidator(formAddPlace)


/**
 * открытие первого попапа с именем и профессией
 */

const openEditPopup = () => {
  popupEditForm.handleOpenPopup(
          userNewInfo.getUserInfo())
  validateEditProfile.resetErrors()
  validateEditProfile.disableButton()
};

const openPopupPlace = () => {
  popupNewCard.handleOpenPopup({
    name: "",
    link: ""
  })
  validateAddPlace.resetErrors()
  validateAddPlace.disableButton()
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
  api.updateUser(name, about)
      .then( (user) => {
        userNewInfo.setUserInfo(user.name, user.about)
      })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      })
})

/**
 экземпляр класса PopupWithForm для создания новой карточки
 */
const popupNewCard = new PopupWithForm('.popup_type_plus', (argument) => {
  api.createNewCard(argument.name, argument.link)
      .then( card => {
        cardsList.renderItem(card)
      })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      })
})

/**
 экземпляр класса PopupWithAgreement для смены аватара
 */
const popupNewAvatar = new PopupChangeAvatar('.popup_type_agreement', (argument) => {
 /*   api.changeAvatar (argument.link)
        .then( card => {
            cardsList.renderItem(card)
        })
        .catch((err) => {
            console.log(err); // выведем ошибку в консоль
        })*/
})


const userNewInfo = new UserInfo({userName: ".profile__title", userInfo: ".profile__subtitle"})

api.getUser()
    .then((user) => {
      userNewInfo.setUserInfo(user.name, user.about)//TODO передать поля юзера правильно
    }) // получили данные пользователя
    .catch( (e) => {
      console.error(e)
    })
api.getInitialCards()
    .then((initialCards) => {
      cardsList.renderItems(initialCards)
    }) // получили карточки с api
    .catch((err) => {
      console.log(err); // выведем ошибку в консоль
    })


