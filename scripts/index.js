const openPopupBtn = document.querySelector(".profile__edit");
const popup = document.querySelector(".popup");
const popupCloseBtn  = popup.querySelector(".popup__close");
const nameInputName = document.getElementById("name");
const nameInputAvocation = document.getElementById("avocation");
const nameSpan = document.querySelector(".profile__title");
const avocationSpan = document.querySelector(".profile__subtitle");
const form  = document.getElementById("submit-form");
const likeBtnList = document.querySelectorAll(".elements__like");
const openPopupTitleBtn = document.querySelector(".profile__plus");
const nameInputTitle = document.getElementById("title");
const nameInputLink = document.getElementById("link");
const formTwo  = document.getElementById("place-form");

const initialCards = [
  {
    name: 'Камчатка',
    link: 'https://unsplash.com/photos/alZtq9SiRqI'
  },
  {
    name: 'Алтай',
    link: 'https://unsplash.com/photos/rZNBBaHp3jM'
  },
  {
    name: 'Карелия',
    link: 'https://unsplash.com/photos/cg-rVevFtzU'
  },
  {
    name: 'Смоленск',
    link: 'https://unsplash.com/photos/d4_LqtEpXAk'
  },
  {
    name: 'Дубровицы',
    link: 'https://unsplash.com/photos/uUEkyg3XvmY'
  },
  {
    name: 'Тулиновка',
    link: 'https://unsplash.com/photos/QhNytqtOtSg'
  }
];


const formSubmitHandler = (formEvent) => {
  formEvent.preventDefault();
  popup.classList.remove("popup_opened");
  const name = nameInputName.value;
  const avocation = nameInputAvocation.value;
  nameSpan.innerText = name;
  avocationSpan.innerText = avocation;
};

const formTwoSubmitHandler = (formEvent) => {
  formEvent.preventDefault();
  popup.classList.remove("popup_opened");
  const title = nameInputTitle.value;
  const link = nameInputLink.value;
  titleSpan.innerText = title;
  LinkSpan.innerText = link;
};


const closePopup = () => {
  popup.classList.remove("popup_opened");
};

const openPopup = () => {
  popup.classList.add("popup_opened");
  const name = nameSpan.innerText;
  const avocation = avocationSpan.innerText;
  nameInputName.value = name;
  nameInputAvocation.value = avocation;
};

const markActive = (mouseEvent) => {
  mouseEvent.target.classList.add("elements__like_active");
};

const openPopupTwo = () => {
  popup.classList.add("popup_opened");
  const title = titleSpan.innerText;
  const link = linkSpan.innerText;
  nameInputTitle.value = title;
  nameInputLink.value = link;
};

openPopupTitleBtn.addEventListener('click', openPopupTwo);
openPopupBtn.addEventListener("click", openPopup);
popupCloseBtn.addEventListener("click", closePopup);
form.addEventListener("submit", formSubmitHandler);
likeBtnList.forEach( (likeBtn) => {
  likeBtn.addEventListener('click', markActive)
});
