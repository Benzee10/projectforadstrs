function redirectGroup(group) {
  // All redirects go to VIP
  window.open('https://vip-redirect.vercel.app', '_blank');
  showPopup(); // optional: show Telegram popup
}

// Popup functions
const popup = document.getElementById('telegramPopup');
function showPopup() {
  popup.classList.add('active');
}
function closePopup() {
  popup.classList.remove('active');
}

// Show popup after 5 seconds
setTimeout(showPopup, 5000);