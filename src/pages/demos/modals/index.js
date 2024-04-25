import '../../index';
import { errorMessage } from '../../../local/en/modals/constants';

// Modal open & close functions

const openModalIds = [
    'basic-modal',
    'confirm-modal',
    'form-modal',
    'location-modal',
    'no-service-modal',
    'autopay-modal',
];

const closeModalIds = ['basic-modal', 'location-modal', 'autopay-modal'];

const modalDiv = document.getElementById('modal-containers');

const DISPLAY_BLOCK = 'block';
const DISPLAY_NONE = 'none';

function setModalValues(modalId, modalValue) {
    const modal = document.getElementById(modalId);
    modalDiv.style.display = modalValue;
    modal.style.display = modalValue;
}

function openModal(modalId) {
    setModalValues(modalId, DISPLAY_BLOCK);
}

function closeModal(modalId) {
    setModalValues(modalId, DISPLAY_NONE);
}

function setModalAction(action) {
    document.querySelectorAll('[data-modal]').forEach((button) => {
        button.addEventListener('click', function () {
            const modalId = this.getAttribute('data-modal');
            action(modalId);
        });
    });
}

setModalAction(openModal);
setModalAction(closeModal);

document.addEventListener('click', function (event) {
    const openButtons = Array.from(document.querySelectorAll('[data-modal]'));
    const openButtonIds = openButtons.map((button) => button.id);

    openButtons.forEach((button) => {
        const modalId = button.getAttribute('data-modal');
        const modal = document.getElementById(modalId);

        if (
            !modal.contains(event.target) &&
            !openButtonIds.includes(event.target.id) &&
            modal.style.display !== 'none'
        ) {
            setModalValues(modalId, 'none');
        }
    });
});

function toggleModal(ids, action, attribute) {
    ids.forEach((id) => {
        const button = document.querySelector(`[${attribute}="${id}"]`);
        if (button) {
            button.addEventListener('click', () => action(id));
        }
    });
}

toggleModal(openModalIds, openModal, 'data-modal');
toggleModal(closeModalIds, closeModal, 'data-modal-close');

// Form Validation

function validateForm() {
    const form = document.getElementById('myForm');
    const inputs = form.getElementsByTagName('input');
    let isValid = true;

    for (let i = 0; i < inputs.length; i++) {
        const input = inputs[i];
        if (input.hasAttribute('required') && input.value === '') {
            isValid = false;
            displayErrorMessage(input, `${errorMessage.fieldRequired}`);
        } else if (input.hasAttribute('pattern') && !input.checkValidity()) {
            isValid = false;
            displayErrorMessage(input, `${errorMessage.invalidInput}`);
        } else {
            removeValidationMessage(input);
        }
    }
    return isValid;
}

function displayErrorMessage(input, message) {
    removeValidationMessage(input);

    const errorMessage = document.createElement('div');
    errorMessage.className = 'validation-message';
    errorMessage.textContent = message;
    input.parentNode.insertBefore(errorMessage, input.nextSibling);
}

function removeValidationMessage(input) {
    const nextSibling = input.nextSibling;
    if (nextSibling && nextSibling.className === 'validation-message') {
        input.parentNode.removeChild(nextSibling);
    }
}

document.getElementById('formValidationButton').addEventListener('click', validateForm);
