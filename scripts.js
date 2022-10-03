const openPopupBtn = document.querySelector(".profile__edit");
const popup = document.querySelector(".popup");
const popup__active = "popup__active"

openPopupBtn.addEventListener("click", () => {

  popup.classList.add("popup__active");
});

  popup.addEventListener("click", (event) => {
    console.log("Клик по модалке");
  })





