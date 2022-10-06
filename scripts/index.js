const openPopupBtn = document.querySelector(".profile__edit");
const popup = document.querySelector(".popup");
const popupContainer = popup.querySelector(".popup__container");
const popupCloseBtn  = popup.querySelector(".popup__close");
const form = document.querySelector(".popup__text");
const nameInputName = document.querySelector(".popup__input_name");
const nameInputAvocation = document.querySelector(".popup__input_avocation");
const nameSpan = document.querySelector(".profile__title");
const saveBtn = document.querySelector(".popup__button");
const avocationSpan = document.querySelector(".profile__subtitle");


openPopupBtn.addEventListener("click", () => {
  popup.classList.add("popup__opened");
  const name = nameSpan.innerText;
  const avocation = avocationSpan.innerText;
  nameInputName.value = name;
  nameInputAvocation.value = avocation;
});

popupCloseBtn.addEventListener("click", () => {
  popup.classList.remove("popup__opened");
});

saveBtn.addEventListener("click", () => {
  popup.classList.remove("popup__opened");
  const name = nameInputName.value;
  const avocation = nameInputAvocation.value;
  nameSpan.innerText = name;
  avocationSpan.innerText = avocation;

});





