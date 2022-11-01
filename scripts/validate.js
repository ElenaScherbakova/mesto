/**
 показывает элемент ошибки
 */
const showInputError = (inputElement, errorElement, inputErrorClass) => {
  inputElement.classList.add(inputErrorClass);
  errorElement.innerText = inputElement.validationMessage;
};

/**
 скрывает элемент ошибки
 */
const hideInputError = (inputElement, errorElement, inputErrorClass) => {
  inputElement.classList.remove(inputErrorClass);
  errorElement.textContent = '';
};

const disableButton = (buttonElement, disabledButtonClass) => {
  buttonElement.classList.add(disabledButtonClass);
  buttonElement.disabled = true;
};

const enableButton = (buttonElement, disabledButtonClass) => {
  buttonElement.classList.remove(disabledButtonClass);
  buttonElement.disabled = false;
};

/**
 делает кнопку не/активной
 */

const toggleButtonState = (formSubmitButtonElement, inactiveButtonClass, buttonState) => {
  if (buttonState) {
    disableButton(formSubmitButtonElement, inactiveButtonClass)
  } else {
    enableButton(formSubmitButtonElement, inactiveButtonClass)
  }
}

/**
 проверяет валидность поля
 */

const checkInputValidity = (inputElement, errorElement, inputErrorClass) => {
  if (inputElement.validity.valid) {
    hideInputError(inputElement, errorElement, inputErrorClass)
  } else {
    showInputError(inputElement, errorElement, inputErrorClass)
  }
};

/**
 * проверяет есть ли не валидный инпут
 */

const hasInvalidInput = (inputs) => {
  return inputs.some((input) => !input.validity.valid)
}

const handleFormInput = (evt, form, inputErrorClass, formSubmitButtonElement, inactiveButtonClass, inputs) => {
  const inputElement = evt.target
  const errorElement = form.querySelector(`.input-error-${inputElement.name}`);
  checkInputValidity(inputElement, errorElement, inputErrorClass)
  const buttonState = hasInvalidInput(inputs)
  toggleButtonState(formSubmitButtonElement, inactiveButtonClass, buttonState)
}

const handleFormSubmit = (evt) => {
  evt.preventDefault()
}

const enableValidation = (config) => {
  const formElements = Array.from(document.querySelectorAll(config.formSelector));
  formElements.forEach((formElement) => {
    const inputs = Array.from(formElement.querySelectorAll(config.inputSelector))
    const formSubmitButtonElement = formElement.querySelector(config.submitButtonSelector)
    formElement.addEventListener('submit', handleFormSubmit)
    inputs.forEach((input) => {
      input.addEventListener('input', (evt) =>
              handleFormInput(evt, formElement, config.inputErrorClass,
                      formSubmitButtonElement, config.inactiveButtonClass, inputs))
    })
  })
}

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
});
