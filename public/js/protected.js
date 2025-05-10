import { AuthRequest } from './apiAuthReq.js';

const btnLogout = document.getElementById('btnLogout');
const message = document.getElementById('message');

btnLogout.addEventListener('click', async () => {
  const data = await AuthRequest.logout();
  message.innerHTML = data.message;
  setTimeout(() => (window.location.href = '/'),1000);
});
