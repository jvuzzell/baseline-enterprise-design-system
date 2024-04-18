import { initBackgroundToggle } from '../../../assets/demo-scripts/backgroundToggle';
import { FormValidation, initFormValidation } from 'html5-form-validation-js/html5-form-validation.js';

initBackgroundToggle();

// Initialize Plugin
initFormValidation();

// Form Submission Handler
FormValidation.registerCallback('handleFormValidation', (formSubmitEvent) =>
    alert('Form ID - ' + formSubmitEvent.target.id + ' is valid!')
);

//  Form Reset Button
const formResetButton = document.querySelector('#demo-form [type=reset]');

formResetButton.addEventListener('click', function (e) {
    const form = e.target.form;

    const inputErrors = form.querySelectorAll('.input-error');
    const validationMessages = form.querySelectorAll('.validation-message');

    inputErrors.forEach((formInput) => {
        formInput.classList.remove('input-error');
    });

    validationMessages.forEach((messageNode) => {
        messageNode.parentElement.removeChild(messageNode);
    });
});

// Input Reset Button
const inputResetButtons = document.querySelectorAll('#demo-form .has-reset-button > button');

inputResetButtons.forEach((button) => {
    button.addEventListener('click', (e) => {
        e.preventDefault();

        const inputWrapper = e.target.parentElement.parentElement; // Icon ends up being the target
        const input = inputWrapper.querySelector('input');

        input.classList.remove('input-error');
        input.value = '';

        if (inputWrapper.querySelector('.validation-message') !== null) {
            inputWrapper.removeChild(inputWrapper.querySelector('.validation-message'));
        }
    });
});

// Nested Checklist
const checklistLabel = document.querySelectorAll('.nested-checklist');

checklistLabel.forEach((checklist) => {
    const id = checklist.getAttribute('for');
    const subOptions = document.querySelectorAll(`[for=${id}] + ul > li input`);
    const parentOptionInput = document.querySelector(`[for=${id}] input`);

    checklist.addEventListener('click', (e) => {
        if (e.target.checked) {
            subOptions.forEach((option) => {
                option.checked = true;
            });
        } else {
            subOptions.forEach((option) => {
                option.checked = false;
            });
        }
    });

    subOptions.forEach((option) => {
        option.addEventListener('click', (e) => {
            const subOptionsCount = subOptions.length;
            let checkedOptionsCount = checkAllOptions(subOptions);

            switch (true) {
                case checkedOptionsCount === 0:
                    checklist.classList.remove('partial');
                    parentOptionInput.checked = false;
                    break;

                case checkedOptionsCount === subOptionsCount:
                    checklist.classList.remove('partial');
                    parentOptionInput.checked = true;
                    break;
                default:
                    checklist.classList.add('partial');
                    parentOptionInput.checked = true;
                    break;
            }
        });
    });

    function checkAllOptions(subOptions) {
        let count = 0;

        for (let i = 0; i < subOptions.length; i++) {
            if (subOptions[i].checked) {
                count++;
            }
        }

        return count;
    }
});

// Form Check Validity

const form = document.querySelector('#demo-form');

form.addEventListener('change', (e) => {
    const input = e.target;
    const validationMsgClass = 'validation-message';
    const inputErrorClass = 'input-error';
    const errorOutputId = form.getAttribute('data-error-output-id');
    const aroundInput = form.getAttribute('data-near-input');
    const errorMsgContainer = document.getElementById(errorOutputId);

    if (!form.checkValidity() && input.willValidate === true && input.validity.valid !== true) {
        let message = input.validationMessage;
        let parent = input.parentNode;

        if (input.dataset.errorMessage !== undefined) {
            message = input.dataset.errorMessage;
        }

        if (errorOutputId !== null) {
            message = formatElementName(input.name) + ' - ' + message;
        }

        if (input.willValidate === true && input.validity.valid !== true) {
            let messageDiv = document.createElement('div');
            messageDiv.classList.add(validationMsgClass);
            messageDiv.appendChild(document.createTextNode(message));

            input.classList.add(inputErrorClass);
            if (errorOutputId === null) {
                if (aroundInput === 'before') {
                    parent.insertBefore(messageDiv, input.previousSibling);
                } else {
                    parent.insertBefore(messageDiv, input.nextSibling);
                }
            } else {
                errorMsgContainer.appendChild(messageDiv);
            }
        }
    } else {
        input.classList.remove('input-error');

        if (input.parentElement.querySelector('.validation-message') !== null) {
            input.parentElement.removeChild(input.parentElement.querySelector('.validation-message'));
        }
    }
});
