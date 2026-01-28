import '../css/styles.css';

console.log('✅ main.js loaded');

const form = document.querySelector('#bookingForm');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const name = document.querySelector('#name').value.trim();
  const phone = document.querySelector('#phone').value.trim();
  const date = document.querySelector('#date').value;
  const time = document.querySelector('#time').value;

  if (!name || !phone || !date || !time) {
    alert('Please fill in all fields.');
    return;
  }

  const message =
    `New booking:\n` +
    `Name: ${name}\n` +
    `Phone: ${phone}\n` +
    `Date: ${date}\n` +
    `Time: ${time}`;

  const telegramUsername = 'Denis_Borysenko'; // без @
  const url = `https://t.me/${telegramUsername}?text=${encodeURIComponent(message)}`;

  window.open(url, '_blank');
});
