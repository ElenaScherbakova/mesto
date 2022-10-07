const openPopupBtn = document.querySelector(".profile__edit");
const popup = document.querySelector(".popup");
const popupCloseBtn  = popup.querySelector(".popup__close");
const nameInputName = document.getElementById("name");
const nameInputAvocation = document.getElementById("avocation");
const nameSpan = document.querySelector(".profile__title");
const avocationSpan = document.querySelector(".profile__subtitle");
const form  = document.getElementById("submit-form");

const formSubmitHandler = (formEvent) => {
  formEvent.preventDefault();
  popup.classList.remove("popup__opened");
  const name = nameInputName.value;
  const avocation = nameInputAvocation.value;
  nameSpan.innerText = name;
  avocationSpan.innerText = avocation;
};

const closePopup = () => {
  popup.classList.remove("popup__opened");
};

const openPopup = () => {
  popup.classList.add("popup__opened");
  const name = nameSpan.innerText;
  const avocation = avocationSpan.innerText;
  nameInputName.value = name;
  nameInputAvocation.value = avocation;
};

openPopupBtn.addEventListener("click", openPopup);
popupCloseBtn.addEventListener("click", closePopup);
form.addEventListener("submit", formSubmitHandler);
