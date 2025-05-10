import { registerForm } from './registerForm.js';
import { AuthRequest } from './apiAuthReq.js';

const modal = document.getElementById('registerDialog');
const showRegisterBtn = document.getElementById('ShowRegister');

document.addEventListener('DOMContentLoaded', async () => {
  try {
    const data = await AuthRequest.validateSession();
    if (data.valid) {
      window.location.href = '/protected';
    }
  } catch (error) {
    console.error(error.message);
  }
});

showRegisterBtn.addEventListener('click', () => {
  modal.innerHTML = registerForm();
  attachCloseEvent();
  modal.showModal();
});

function attachCloseEvent() {
  const closeBtn = document.getElementById('closeDialog');
  if (closeBtn) {
    closeBtn.addEventListener(
      'click',
      () => {
        modal.close();
      },
      { once: true }
    );
  }
}

document.getElementById('login').addEventListener('submit', async (e) => {
  e.preventDefault();
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  clearInput('username');
  clearInput('password');
  try {
    await AuthRequest.loginUser({ username, password });
    window.location.href = '/protected';
  } catch (error) {
    error.message
    ?alert(error.message)
    :alert(JSON.stringify(error))
  }
});
const clearInput = (id) => {
  document.getElementById(id).value = '';
};
