const openPopupBtn = document.querySelector(".profile__edit");
const popup = document.querySelector(".popup");
const popupContainer = popup.querySelector(".popup__container");
const popupCloseBtn  = popup.querySelector(".popup__close");
const form = document.querySelector(".popup__text");
const nameInputName = document.querySelector(".popup__input_name");
const nameInputAvocation = document.querySelector(".popup__input_avocation");
const nameSpan = document.querySelector(".profile__title");
const saveBtn = document.querySelector(".popup__form-text");
const avocationSpan = document.querySelector(".profile__subtitle");


openPopupBtn.addEventListener("click", () => {
  popup.style.display = "block";
  const name = nameSpan.innerText;
  nameInputName.value = name;
  const avocation = avocationSpan.innerText;
  nameInputAvocation.value = avocation;
});

popupCloseBtn.addEventListener("click", () => {
  popup.style.display = "none";
});

saveBtn.addEventListener("click", () => {
  popup.style.display = "none";
  const name = nameInputName.value;
  nameSpan.innerText = name;
});

saveBtn.addEventListener("click", () => {
  popup.style.display = "none";
  const avocation = nameInputAvocation.value;
  avocationSpan.innerText = avocation;
});




