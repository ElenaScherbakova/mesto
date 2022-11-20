export class FormValidator {
  constructor(config, form) {
    this._config = config
    this._form = form
  }

  /**
   показывает элемент ошибки
   */

  _showInputError(inputElement, errorElement, inputErrorClass) {
    inputElement.classList.add(inputErrorClass);
    errorElement.innerText = inputElement.validationMessage;
  };

  /**
   скрывает элемент ошибки
   */

  _hideInputError(inputElement, errorElement, inputErrorClass) {
    inputElement.classList.remove(inputErrorClass);
    errorElement.textContent = '';
  };

  _disableButton(buttonElement, disabledButtonClass) {
    buttonElement.classList.add(disabledButtonClass);
    buttonElement.disabled = true;
  };

  _enableButton = (buttonElement, disabledButtonClass) => {
    buttonElement.classList.remove(disabledButtonClass);
    buttonElement.disabled = false;
  };

  /**
   делает кнопку не/активной
   */

  _toggleButtonState(formSubmitButtonElement, inactiveButtonClass, buttonState) {
    if (buttonState) {
      this._disableButton(formSubmitButtonElement, inactiveButtonClass)
    } else {
      this._enableButton(formSubmitButtonElement, inactiveButtonClass)
    }
  }

  /**
   проверяет валидность поля, показывает/ скрывает ошибки
   */

  _checkInputValidity(inputElement, errorElement, inputErrorClass) {
    if (inputElement.validity.valid) {
      this._hideInputError(inputElement, errorElement, inputErrorClass)
    } else {
      this._showInputError(inputElement, errorElement, inputErrorClass)
    }
  };

  /**
   * проверяет есть ли не валидный инпут
   */

  _hasInvalidInput(inputs) {
    return inputs.some((input) => !input.validity.valid)
  }

  _handleFormInput(evt, form, inputErrorClass, formSubmitButtonElement, inactiveButtonClass, inputs) {
    const inputElement = evt.target
    const errorElement = form.querySelector(`.input-error-${inputElement.name}`);
    this._checkInputValidity(inputElement, errorElement, inputErrorClass)
    const buttonState = this._hasInvalidInput(inputs)
    this._toggleButtonState(formSubmitButtonElement, inactiveButtonClass, buttonState)
  }

  _handleFormSubmit(evt) {
    evt.preventDefault()
  }

  enableValidation() {
    const inputs = Array.from(this._form.querySelectorAll(this._config.inputSelector))
    const formSubmitButtonElement = this._form.querySelector(this._config.submitButtonSelector)
    this._form.addEventListener('submit', this._handleFormSubmit)
    inputs.forEach((input) => {
      input.addEventListener('input', (evt) =>
              this._handleFormInput(evt, this._form, this._config.inputErrorClass,
                      formSubmitButtonElement, this._config.inactiveButtonClass, inputs))
    })

  }

}