import { registerForm } from './registerForm.js';

const modal = document.getElementById('registerDialog');
const showRegisterBtn = document.getElementById('ShowRegister');

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
