/*
const showInputError = (inputElement, errorElement, inputErrorClass) => {
  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = inputElement.validationMessage;
};

const hideInputError = (inputElement, errorElement, inputErrorClass) => {
  inputElement.classList.remove(inputErrorClass);
  errorElement.textContent = '';
};


const toggleButtonState = () => {

}

const checkInputValidity = (inputElement, errorElement, inputErrorClass) => {
  if (inputElement.validity.valid) {
    hideInputError(inputElement, errorElement, inputErrorClass)
  } else {
    showInputError(inputElement, errorElement, inputErrorClass)
  }

};


const handleFormInput = (evt, form, inputErrorClass, submitButtonSelector) => {
  const inputElement = evt.target
  const errorElement = form.querySelector(`.input-error-${inputElement.name}`);

  checkInputValidity(inputElement, errorElement, inputErrorClass)
  toggleButtonState()
}

const handleFormSubmit = (evt) => {
  evt.preventDefault()
}

const validateForm = (formElement) => {

  const inputs = Array.from(formElement.elements).filter((element)=>{
    return element.type ==='text'
  })
  const submitButton = Array.from(formElement.elements).filter((element)=>{
    return element.type ==='submit'
  }).pop()
  doValidation(inputs, submitButton)
}

const doValidation = (inputs, submitButtonSelector) => {
  const arrayInput = Array.from(inputs)
  const isValid = arrayInput.every(function (element) {
    return element.value.length > 1
  })
  setSubmitButtonState(isValid, submitButtonSelector)
}

const enableValidation = (config) => {
  const formElement = document.querySelector(config.formSelector);
  const inputs = formElement.querySelectorAll(config.inputSelector)
  formElement.addEventListener('submit', handleFormSubmit)
  inputs.forEach((input) => {
    input.addEventListener('input', (evt) =>
            handleFormInput(evt, formElement, config.inputErrorClass, config.submitButtonSelector))
  })


  const submitButtonSelector = formElement.querySelector(config.submitButtonSelector)

  formElement.addEventListener('change', function (evt) {
    doValidation(inputs, submitButtonSelector)
  });
  formElement.addEventListener('input', function (evt) {
    doValidation(inputs, submitButtonSelector)
  });
}

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
});




function setSubmitButtonState(isFormValid, button) {
  if (isFormValid) {
    button.removeAttribute('disabled');
  } else {
    button.setAttribute('disabled', 'true');
  }
}*/
