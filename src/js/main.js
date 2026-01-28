import '../css/styles.css';

const SERVICES = {
  diagnostics: { name: 'Diagnostics', price: 10 },
  screen: { name: 'Screen replacement', price: 79 },
  battery: { name: 'Battery replacement', price: 49 },
};

const form = document.querySelector('#bookingForm');
const serviceSelect = document.querySelector('#service');
const totalPriceEl = document.querySelector('#totalPrice');
const successMsg = document.querySelector('#successMsg');

function updateTotal() {
  const key = serviceSelect.value;
  const price = key && SERVICES[key] ? SERVICES[key].price : 0;
  totalPriceEl.textContent = `€${price}`;
}

function setError(fieldId, message) {
  const input = document.querySelector(`#${fieldId}`);
  const err = document.querySelector(`#err-${fieldId}`);

  if (!input || !err) return; // захист, якщо десь немає елемента

  if (message) {
    input.classList.add('is-error');
    err.textContent = message;
  } else {
    input.classList.remove('is-error');
    err.textContent = '';
  }
}

serviceSelect.addEventListener('change', updateTotal);
updateTotal();

form.addEventListener('submit', (e) => {
  e.preventDefault();
  if (successMsg) successMsg.textContent = '';

  const name = document.querySelector('#name').value.trim();
  const phone = document.querySelector('#phone').value.trim();
  const date = document.querySelector('#date').value;
  const time = document.querySelector('#time').value;
  const serviceKey = serviceSelect.value;

  // reset errors
  setError('name', '');
  setError('phone', '');
  setError('service', '');
  setError('date', '');
  setError('time', '');

  let hasError = false;

  if (!name) { setError('name', 'Enter your name'); hasError = true; }
  if (!phone) { setError('phone', 'Enter phone number'); hasError = true; }
  if (!serviceKey) { setError('service', 'Select a service'); hasError = true; }
  if (!date) { setError('date', 'Select a date'); hasError = true; }
  if (!time) { setError('time', 'Select a time'); hasError = true; }

  if (hasError) return;

  const service = SERVICES[serviceKey];
  const total = service.price;

  const message =
    `New booking:\n` +
    `Name: ${name}\n` +
    `Phone: ${phone}\n` +
    `Service: ${service.name}\n` +
    `Total: €${total}\n` +
    `Date: ${date}\n` +
    `Time: ${time}`;

  const telegramUsername = 'Denys_Borysenko';
  const url = `https://t.me/${telegramUsername}?text=${encodeURIComponent(message)}`;

  window.open(url, '_blank');

  // UX: show success + reset
  if (successMsg) successMsg.textContent = '✅ Booking message prepared. Telegram opened.';
  form.reset();
  updateTotal();
});
