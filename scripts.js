const popup__active = "popup__active"

const openPopupBtn = document.querySelector(".profile__edit");
const popup = document.querySelector(".popup");
const popupContainer = popup.querySelector(".popup__container");
const popupCloseBtn  = popup.querySelector(".popup__close");
const form = document.querySelector(".popup__text");
const nameInput = document.querySelector(".popup__input_name");
const nameInput = document.querySelector(".popup__input_avocation");



openPopupBtn.addEventListener("click", () => {

  popup.classList.add("popup__active");
});

  popup.addEventListener("click", (event) => {
    if(!popupContainer.contains(event.target)  || event.target === popupCloseBtn) {
      popup.classList.remove(popup__active);
    }


  });



  form.addEventListener("submit",() => {
    event.preventDefault();
    form.querySelectorAll(".popup__input")

});



