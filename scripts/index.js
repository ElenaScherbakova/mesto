const openPopupBtn = document.querySelector(".profile__edit");
const openPopupTitleBtn = document.querySelector(".profile__plus");
const popupEdit = document.querySelector(".popup__edit");
const popupPlus = document.querySelector(".popup__plus");
const popupEditSave  = popupEdit.querySelector(".popup__edit_save");
const popupPlusSave  = popupPlus.querySelector(".popup__plus_save");
const popupEditClose  = popupEdit.querySelector(".popup__edit_close");
const popupPlusClose  = popupPlus.querySelector(".popup__plus_close");
const nameInputName = document.getElementById("name");
const nameInputAvocation = document.getElementById("avocation");
const nameSpan = document.querySelector(".profile__title");
const avocationSpan = document.querySelector(".profile__subtitle");
const form  = document.getElementById("submit-form");
const nameInputTitle = document.getElementById("title");
const nameInputLink = document.getElementById("link");
const formPlace  = document.getElementById("place-form");
const listItemTemplate = document.querySelector('#place');
const list = document.querySelector('.elements');

const initialCards = [
  {
    name: 'Камчатка',
    link: 'https://images.unsplash.com/photo-1634745186518-db2e653372c9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80'
  },
  {
    name: 'Алтай',
    link: 'https://images.unsplash.com/photo-1597241234507-fb03ab29199e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80'
  },
  {
    name: 'Карелия',
    link: 'https://images.unsplash.com/photo-1602162991689-c97214fb18f2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80'
  },
  {
    name: 'Смоленск',
    link: 'https://images.unsplash.com/photo-1603708200950-324b7933d332?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80'
  },
  {
    name: 'Дубровицы',
    link: 'https://images.unsplash.com/photo-1627358510286-6d244d028887?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80'
  },
  {
    name: 'Тулиновка',
    link: 'https://images.unsplash.com/photo-1545674525-2bd19515ca01?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80'
  }
];


const formSubmitHandler = (formEvent) => {
  formEvent.preventDefault();
  popupEdit.classList.remove("popup_opened");
  const name = nameInputName.value;
  const avocation = nameInputAvocation.value;
  nameSpan.innerText = name;
  avocationSpan.innerText = avocation;
};

const formPlaceSubmitHandler = (formPlaceEvent) => {
  formPlaceEvent.preventDefault();
  popupPlus.classList.remove("popup_opened");
};


const openPopup = () => {
  popupEdit.classList.add("popup_opened");
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
  popupPlus.classList.add("popup_opened");
/*  const title = null;
  const link = null;
  nameInputTitle.value = title;
  nameInputLink.value = link;*/
}; //  откртие второго попапа с фото и ссылкой

const closePopupPlace = () => {
  closeDialog(popupPlus);
}; // закрытие по кнопке сохранить

const closePlus = () => {
  closeDialog(popupPlus);
}; // закрытие по крестику

const closeDialog = (dialog) => {
  dialog.classList.remove("popup_opened")
}; // закртие общее



openPopupTitleBtn.addEventListener('click', openPopupPlace);
openPopupBtn.addEventListener("click", openPopup);
popupPlusSave.addEventListener("click", closePopupPlace);
popupEditSave.addEventListener("click", closePopupEdit);
popupPlusClose.addEventListener("click", closePlus);
popupEditClose.addEventListener("click", closeEdit);
form.addEventListener("submit", formSubmitHandler);
formPlace.addEventListener("submit", formPlaceSubmitHandler);


const renderCenterPane = () => {
  for(let i = 0; i < initialCards.length; i++) {
    createItem(initialCards[i], false);
  }
};

const createItem = (item, appendToStart) => {
  const element = listItemTemplate.content.cloneNode(true).firstElementChild;
  const elementName = element.querySelector('.elements__text');
  const elementImg = element.querySelector('.elements__photo');
  const elementLike = element.querySelector('.elements__like')
  const removeButton = element.querySelector('.elements__basket');
  elementName.innerText = item.name; // меняет текст в заголовке
  elementImg.attributes.src.nodeValue = item.link; // меняет ссылку на картинку
  if (appendToStart) {
    list.prepend(element)
  } else {
    list.appendChild(element)
  }
  const likeButton = () => {
    elementLike.classList.toggle('elements__like_active')
  }
  elementLike.addEventListener('click', likeButton)

  const removeCard = () => {
   /* list.removeChild(element);*/
    element.parentNode.removeChild(element)
  }

 removeButton.addEventListener('click', removeCard);
};


const handleFormSubmit = (event) => {
  event.preventDefault(); // предотвращает перезагрузку страницы
  createItem({
    name: nameInputTitle.value,
    link: nameInputLink.value
  }, true);
}
formPlace.addEventListener('submit', handleFormSubmit);



renderCenterPane()