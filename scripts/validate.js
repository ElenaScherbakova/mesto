const showInputError = (inputElement, errorElement, inputErrorClass) => {
  inputElement.classList.add(inputErrorClass);
  errorElement.innerText = inputElement.validationMessage;

}; // показывает элемент ошибки

const hideInputError = (inputElement, errorElement, inputErrorClass) => {
  inputElement.classList.remove(inputErrorClass);
  errorElement.textContent = '';

}; // скрывает элемент ошибки

const disableButton = (buttonElement, disabledButtonClass) => {
  buttonElement.classList.add(disabledButtonClass);
  buttonElement.disabled = true;
};

const enableButton = (buttonElement, disabledButtonClass) => {
  buttonElement.classList.remove(disabledButtonClass);
  buttonElement.disabled = false;
};

const toggleButtonState = (formSubmitButtonElement, inactiveButtonClass,buttonState) => {
  if(buttonState) {
    disableButton(formSubmitButtonElement, inactiveButtonClass)
  } else{
    enableButton(formSubmitButtonElement, inactiveButtonClass)
  }
}

// проверяет валидность поля
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
  const buttonState =  hasInvalidInput(inputs)
  toggleButtonState(formSubmitButtonElement, inactiveButtonClass, buttonState)
}

const handleFormSubmit = (evt) => {
  evt.preventDefault()
  //сюда нужно засунуть showInputError hideInputError disableButton чтоб при повторном открытии форм не было ошибок
}


/*const validateForm = (formElement) => {

  const inputs = Array.from(formElement.elements).filter((element)=>{
    return element.type ==='text'
  })
  const submitButton = Array.from(formElement.elements).filter((element)=>{
    return element.type ==='submit'
  }).pop()
  doValidation(inputs, submitButton)
}*/

/*
const doValidation = (inputs, submitButtonSelector) => {
  const arrayInput = Array.from(inputs)
  const isValid = arrayInput.every(function (element) {
    return element.value.length > 1
  })
  setSubmitButtonState(isValid, submitButtonSelector)
}
*/

/*const enableValidation = (classNames) => {
  const formList = Array.from(document.querySelectorAll(classNames, 'form'));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });

    setEventListeners(formElement);
  });
}*/


const enableValidation = (config) => {
  const formElement = document.querySelector(config.formSelector);
  const inputs = Array.from(formElement.querySelectorAll(config.inputSelector))
  const formSubmitButtonElement = formElement.querySelector(config.submitButtonSelector)
          // здесь нужно не одну форму брать а по всем проходиться
  formElement.addEventListener('submit', handleFormSubmit)
  inputs.forEach((input) => {
    input.addEventListener('input', (evt) =>
            handleFormInput(evt, formElement, config.inputErrorClass,
                    formSubmitButtonElement, config.inactiveButtonClass, inputs))
  })


/*  const submitButtonSelector = formElement.querySelector(config.submitButtonSelector)

  formElement.addEventListener('change', function (evt) {
    doValidation(inputs, submitButtonSelector)
  });
  formElement.addEventListener('input', function (evt) {
    doValidation(inputs, submitButtonSelector)
  });*/
}
enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
});



/*function setSubmitButtonState(isFormValid, button) {
  if (isFormValid) {
    button.removeAttribute('disabled');
  } else {
    button.setAttribute('disabled', 'true');
  }
}*/

/*

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
