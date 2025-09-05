
// Two-step popup functionality
const FIRST_LINK = "https://wa.link/zhk7kh";
const SECOND_LINK = "https://curiositycognition.com/h9xw8i8f?key=1419765068d7b1dbd1e3d5e01e3b7a94";

function openFirst() {
  // Open first tab immediately (user interaction allows this)
  window.open(FIRST_LINK, "_blank");
  
  // Show confirmation overlay for second tab
  document.getElementById("overlay").classList.add("active");
}

function openSecond() {
  // Open second tab (user interaction allows this)
  window.open(SECOND_LINK, "_blank");
  
  // Hide the overlay
  document.getElementById("overlay").classList.remove("active");
}

function closeOverlay() {
  // Hide overlay without opening second tab
  document.getElementById("overlay").classList.remove("active");
}

// Telegram widget functionality
function openTelegramChannel() {
  window.open('https://t.me/xxx_pulse', '_blank');
}

// WhatsApp float functionality
function openWhatsApp() {
  openFirst(); // Same as main button
}

// Initialize event listeners
document.addEventListener('DOMContentLoaded', function() {
  // Telegram widget
  const telegramWidget = document.querySelector('.telegram-widget');
  if (telegramWidget) {
    telegramWidget.addEventListener('click', openTelegramChannel);
  }

  // WhatsApp float
  const whatsappFloat = document.querySelector('.whatsapp-float');
  if (whatsappFloat) {
    whatsappFloat.addEventListener('click', openWhatsApp);
  }

  // Close overlay when clicking background
  const overlay = document.getElementById('overlay');
  if (overlay) {
    overlay.addEventListener('click', function(e) {
      if (e.target === overlay) {
        closeOverlay();
      }
    });
  }

  // Escape key to close overlay
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      closeOverlay();
    }
  });
});
