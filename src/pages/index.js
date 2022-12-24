import './index.css';
import {Card} from '../components/Card.js'
import {FormValidator} from '../components/FormValidator.js'
import Section from '../components/Section.js'
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import api from "../components/API";
import PopupWithConfirmation from "../components/PopupWithConfirmation";

const storage = {
    user: null
}
const buttonOpenPlusPopup = document.querySelector(".profile__plus");
const buttonOpenEditPopup = document.querySelector(".profile__edit");
const formEditProfile = document.getElementById("submit-form");
const formAddPlace = document.getElementById("place-form");
const avatarImage = document.querySelector('.profile__image')
const formAvatar = document.getElementById("avatar-form");
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
const validateAvatar = createValidator(formAvatar)


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
    link: "",
    likes:[],
    _id: "",
    owner: storage.user
  })
  validateAddPlace.resetErrors()
  validateAddPlace.disableButton()
};

const openAvatarChange = () => {
  popupChangeAvatar.handleOpenPopup({
    url: avatarImage.src
  })
  validateAvatar.resetErrors()
  validateAvatar.disableButton()
}

buttonOpenEditPopup.addEventListener("click", openEditPopup);
buttonOpenPlusPopup.addEventListener('click', openPopupPlace);
avatarImage.parentElement.addEventListener('click', openAvatarChange)

const likeItem = (item, isLiked) => {
    return api.likeCard(item._id, !isLiked)
        .catch( status => {
            if (status === 400) {
                window.alert('Карточка была удалена')
            }
            return Promise.reject()
        })
}
// нельзя делать членом класса, так как метод использует внутри дргуие классы.
const removeItem = (element, id) => {
  popupConfirmation.waitConfirmation()
      .then( (remove) => {
          if (remove) {
            api.removeCard(id)
                .then( () => removeItemElement(element))
                .catch( (status) => console.error(`Ошибка удаления Карточки: ${status}`) )
          }
      })
}

const removeItemElement = (element) => {
    list.removeChild(element)
}

const popupImage = new PopupWithImage('.popup_type_image')

/**
 экземпляр класса PopupWithConfirmation для формы Подтверждения
 */
const popupConfirmation = new PopupWithConfirmation ('.popup_type_confirmation', (id) => {
    return api.removeCard(id)
        .catch(e => console.error(`Невозможно удалить карточку. Ошибка ${e}`))
})

const cardsList = new Section({
  /**
   создает карточку
   */
  renderer: (item) => {
    const card = new Card(
        "#place",
        item,
        popupImage.handleOpenPopup.bind(popupImage),
        removeItem,
        likeItem,
        storage)
    const cardElement = card.createItem();
    return cardElement
  },
}, '.elements');

/**
 экземпляр класса PopupWithForm для формы Редактировать профиль
 */
const popupEditForm = new PopupWithForm('.popup_type_edit', ({name, about}) => {
  return api.updateUser(name, about)
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
  return api.createNewCard(argument.name, argument.link)
      .then( card => {
        cardsList.renderItem(card)
      })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      })
})

/**
 экземпляр класса PopupWithForm для создания новой карточки
 */
const popupChangeAvatar = new PopupWithForm('.popup_type_agreement', ({ url }) => {
    return api.changeAvatar(url)
        .then( user => {
            storage.user = user
            avatarImage.src = user.avatar
        })
        .catch((err) => {
            console.log(err); // выведем ошибку в консоль
        })
})

const userNewInfo = new UserInfo({
    userName: ".profile__title",
    userInfo: ".profile__subtitle",
    userAvatar: ".profile__image"
})

const updateUserInfo = () => {
   if (storage.user !== null) {
       userNewInfo.setUserInfo(storage.user.name, storage.user.about)
       userNewInfo.setAvatar(storage.user.avatar)
   }
}
// Нельзя использовать Promise.all, так как если провалится один из запросов,
// весь Promise.all будет rejected. нельзя так же испольовать Promise.allSettled
// так как если запрос на user/me провалится, то запрос на карточки выполнится все равно.
// В текущей реализации отобразитсья хотя бы информация о пользователе.

api.getUser()
    .then((user) => {
        storage.user = user
        updateUserInfo()
        return api.getInitialCards()
    }) // получили данные пользователя
    .then((initialCards) => {
        cardsList.renderItems(initialCards)
    }) // получили карточки с api
    .catch( (e) => {
      console.error(e)
    })


