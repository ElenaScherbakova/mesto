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

const enableValidation = (config) => {
  const formElement = document.querySelector(config.formSelector);
  const inputs = formElement.querySelectorAll(config.inputSelector)
  formElement.addEventListener('submit', handleFormSubmit)
  inputs.forEach((input) => {
    input.value = ""
    input.addEventListener('input', (evt) =>
            handleFormInput(evt, formElement, config.inputErrorClass, config.submitButtonSelector))
  })

  const submitButtonSelector = formElement.querySelector(config.submitButtonSelector)
  setSubmitButtonState(false, submitButtonSelector)
  formElement.addEventListener('input', function (evt) {
    const arrayInput = Array.from(inputs)
    const isValid = arrayInput.every(function (element) {
      return element.value.length > 1
    })
    setSubmitButtonState(isValid)
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
}


/*




const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll('.form__input'));
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement);
    });
  });
};


const enableValidation = (classNames) => {
  const formList = Array.from(document.querySelectorAll(classNames, 'form'));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });

    setEventListeners(formElement);
  });
}




const addButton = document.querySelector('.popup__button_active');

form.addEventListener('input', function (evt) {
  const isValid = nameInputName.value.length > 1 && nameInputAvocation.value.length > 1
  setSubmitButtonState(isValid)
});

function setSubmitButtonState(isFormValid) {
  if (isFormValid) {
    addButton.removeAttribute('disabled');
  } else {
    addButton.setAttribute('disabled', 'true');
  }
}


// enableValidation()

*/
