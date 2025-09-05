// Global variables
const popup = document.getElementById('telegramPopup');
const loadingOverlay = document.getElementById('loadingOverlay');
let isRedirecting = false;

// Enhanced redirect function with loading states
function redirectGroup(group) {
  if (isRedirecting) return; // Prevent multiple clicks
  
  isRedirecting = true;
  const button = event.target.closest('.group-btn');
  
  // Add loading state to button
  button.classList.add('loading');
  button.style.pointerEvents = 'none';
  
  // Show loading overlay
  showLoading();
  
  // Add slight delay for better UX
  setTimeout(() => {
    // Open VIP redirect
    window.open('https://vip-redirect.vercel.app', '_blank');
    
    // Hide loading after redirect
    setTimeout(() => {
      hideLoading();
      button.classList.remove('loading');
      button.style.pointerEvents = 'auto';
      isRedirecting = false;
      
      // Show Telegram popup after successful redirect
      setTimeout(() => {
        showPopup();
      }, 1000);
    }, 1500);
  }, 800);
}

// Loading overlay functions
function showLoading() {
  loadingOverlay.classList.add('active');
}

function hideLoading() {
  loadingOverlay.classList.remove('active');
}

// Popup functions
function showPopup() {
  popup.classList.add('active');
  // Auto-hide popup after 10 seconds
  setTimeout(() => {
    if (popup.classList.contains('active')) {
      closePopup();
    }
  }, 10000);
}

function closePopup() {
  popup.classList.remove('active');
}

// Enhanced button hover effects
document.addEventListener('DOMContentLoaded', function() {
  const buttons = document.querySelectorAll('.group-btn');
  
  buttons.forEach(button => {
    // Add ripple effect on click
    button.addEventListener('click', function(e) {
      if (this.classList.contains('loading')) return;
      
      const ripple = document.createElement('span');
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;
      
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = x + 'px';
      ripple.style.top = y + 'px';
      ripple.classList.add('ripple');
      
      this.appendChild(ripple);
      
      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  });
  
  // Add floating WhatsApp button click tracking
  const whatsappFloat = document.querySelector('.whatsapp-float');
  if (whatsappFloat) {
    whatsappFloat.addEventListener('click', function() {
      // Add a subtle bounce animation
      this.style.animation = 'none';
      setTimeout(() => {
        this.style.animation = 'pulse 1.8s infinite';
      }, 100);
    });
  }
});

// Add ripple effect styles dynamically
const style = document.createElement('style');
style.textContent = `
  .ripple {
    position: absolute;
    border-radius: 50%;
    transform: scale(0);
    animation: ripple-animation 0.6s ease-out;
    background-color: rgba(255, 255, 255, 0.3);
    pointer-events: none;
  }
  
  @keyframes ripple-animation {
    to {
      transform: scale(2);
      opacity: 0;
    }
  }
  
  .group-btn {
    position: relative;
    overflow: hidden;
  }
`;
document.head.appendChild(style);

// Close popup when clicking outside
popup.addEventListener('click', function(e) {
  if (e.target === popup) {
    closePopup();
  }
});

// Keyboard accessibility
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape' && popup.classList.contains('active')) {
    closePopup();
  }
});