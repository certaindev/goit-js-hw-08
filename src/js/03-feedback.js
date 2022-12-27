import throttle from 'lodash.throttle';

const feedback = document.querySelector('.feedback-form');
const formElements = feedback.elements;
const KEY_FEEDBACK = 'feedback-form-state';

fillForm();
feedback.addEventListener('input', throttle(onFormInput, 500));
feedback.addEventListener('submit', onSubmit);

function fillForm() {
  if (loadData(KEY_FEEDBACK)) {
    const { email, message } = loadData(KEY_FEEDBACK);

    formElements.email.value = email;
    formElements.message.value = message;
  }
}

function onFormInput(e) {
  if (e.target.value.trim() !== '') {
    const { email, message } = formElements;
    saveData(KEY_FEEDBACK, { email: email.value, message: message.value });
  }
}

function onSubmit(e) {
  e.preventDefault();
  if (loadData(KEY_FEEDBACK)) {
    const { email, message } = loadData(KEY_FEEDBACK);
    console.log(`email: ${email} message: ${message}`);

    feedback.reset();
    localStorage.removeItem(KEY_FEEDBACK);
  }
}

function saveData(key, value) {
  try {
    const serializedState = JSON.stringify(value);
    localStorage.setItem(key, serializedState);
  } catch (error) {
    console.error('Set state error: ', error.message);
  }
}

function loadData(key) {
  try {
    const serializedState = localStorage.getItem(key);
    return serializedState === null ? undefined : JSON.parse(serializedState);
  } catch (error) {
    console.error('Get state error: ', error.message);
  }
}
