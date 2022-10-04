const popup__active = "popup__active"

const openPopupBtn = document.querySelector(".profile__edit");
const popup = document.querySelector(".popup");
const popupContainer = document.querySelector(".popup__container");
const popupCloseBtn  = document.querySelector(".popup__close");


openPopupBtn.addEventListener("click", () => {

  popup.classList.add("popup__active");
});

  popup.addEventListener("click", (event) => {
    if(!popupContainer.contains(event.target)  || event.target === popupCloseBtn) {
      popup.classList.remove(popup__active);
    }


  });





