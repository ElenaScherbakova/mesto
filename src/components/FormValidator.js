export class FormValidator {
  constructor(config, form) {
    this._config = config
    this._form = form

    this.disableButton = () => {
      this._formSubmitButtonElement.classList.add(this._config.inactiveButtonClass);
      this._formSubmitButtonElement.disabled = true;
    };

    this.enableButton = () => {
      this._formSubmitButtonElement.classList.remove(this._config.inactiveButtonClass);
      this._formSubmitButtonElement.disabled = false;
    };
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


  /**
   делает кнопку не/активной
   */

  _toggleButtonState(formSubmitButtonElement, inactiveButtonClass, buttonState) {
    if (buttonState) {
      this.disableButton(formSubmitButtonElement, inactiveButtonClass)
    } else {
      this.enableButton(formSubmitButtonElement, inactiveButtonClass)
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
    this._inputs = Array.from(this._form.querySelectorAll(this._config.inputSelector))
    this._formSubmitButtonElement = this._form.querySelector(this._config.submitButtonSelector)
    this._form.addEventListener('submit', this._handleFormSubmit)
    this._inputs.forEach((input) => {
      input.addEventListener('input', (evt) =>
              this._handleFormInput(evt, this._form, this._config.inputErrorClass,
                      this._formSubmitButtonElement, this._config.inactiveButtonClass, this._inputs))
    })

  }

  resetErrors() {
    this._inputs.forEach((input) => {
      const errorElement = this._form.querySelector(`.input-error-${input.name}`);
      this._hideInputError(input, errorElement, this._config.inputErrorClass)
    })
  }

}