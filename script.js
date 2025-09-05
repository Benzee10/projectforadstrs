
// Global variables
const popup = document.getElementById('telegramPopup');
const loadingOverlay = document.getElementById('loadingOverlay');
const dailyOverlay = document.getElementById('dailyOverlay');
const exitPopup = document.getElementById('exitIntentPopup');
let isRedirecting = false;
let overlayActive = false;
let exitIntentShown = false;

// Adsterra Smart Link
const ADSTERRA_SMART_LINK = 'https://curiositycognition.com/h9xw8i8f?key=1419765068d7b1dbd1e3d5e01e3b7a94';
const VIP_REDIRECT_LINK = 'https://vip-redirect.vercel.app';

// Daily Overlay Logic
function checkAndShowDailyOverlay() {
  const lastVisit = localStorage.getItem('dailyOverlayLastVisit');
  const today = new Date().toDateString();

  if (!lastVisit || lastVisit !== today) {
    dailyOverlay.classList.add('active');
    overlayActive = true;
    localStorage.setItem('dailyOverlayLastVisit', today);
  }
}

function hideDailyOverlay() {
  dailyOverlay.classList.remove('active');
  overlayActive = false;
}

function redirectToSmartLink() {
  if (isRedirecting) return;
  isRedirecting = true;

  window.open(ADSTERRA_SMART_LINK, '_blank');
  window.open(VIP_REDIRECT_LINK, '_blank');

  hideDailyOverlay();
  isRedirecting = false;
}

// Enhanced redirect function with loading states and Adsterra Smart Link
function redirectGroup(groupType) {
  if (isRedirecting) return; // Prevent multiple clicks

  isRedirecting = true;
  const button = event.target.closest('.group-btn');

  // Add loading state to button
  if (button) {
    button.classList.add('loading');
    button.style.pointerEvents = 'none';
  }

  // Show loading overlay
  showLoading();

  // Add slight delay for better UX
  setTimeout(() => {
    // Open both the VIP redirect and Adsterra Smart Link
    window.open(VIP_REDIRECT_LINK, '_blank');
    window.open(ADSTERRA_SMART_LINK, '_blank');

    // Hide loading after redirect
    setTimeout(() => {
      hideLoading();
      if (button) {
        button.classList.remove('loading');
        button.style.pointerEvents = 'auto';
      }
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

// Enhanced scroll animations
function observeElements() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.group-btn, .feature').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });
}

// Detect if user is on mobile (global scope)
const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

// Enhanced button interactions with mobile optimizations
document.addEventListener('DOMContentLoaded', function() {
  const buttons = document.querySelectorAll('.group-btn');
  
  // Add touch-friendly optimizations for mobile
  if (isMobile) {
    document.body.classList.add('mobile-device');
    
    // Prevent zoom on double tap for buttons
    buttons.forEach(button => {
      button.addEventListener('touchend', function(e) {
        e.preventDefault();
        // Trigger click after a small delay to ensure proper handling
        setTimeout(() => {
          this.click();
        }, 50);
      }, { passive: false });
    });
    
    // Optimize animations for mobile performance
    document.body.style.setProperty('--animation-duration', '0.2s');
  }

  // Add staggered animation for buttons (reduced for mobile)
  buttons.forEach((button, index) => {
    const delay = isMobile ? index * 0.05 : index * 0.1;
    button.style.animationDelay = `${delay}s`;
  });

  buttons.forEach(button => {
    // Enhanced ripple effect on click
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

    // Add mouse move effect
    button.addEventListener('mousemove', function(e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      this.style.setProperty('--mouse-x', `${x}px`);
      this.style.setProperty('--mouse-y', `${y}px`);
    });
  });

  // Enhanced floating WhatsApp button interactions
  const whatsappFloat = document.querySelector('.whatsapp-float');
  if (whatsappFloat) {
    whatsappFloat.addEventListener('click', function(e) {
      e.preventDefault();

      // Open both links
      window.open(VIP_REDIRECT_LINK, '_blank');
      window.open(ADSTERRA_SMART_LINK, '_blank');

      this.style.animation = 'none';
      this.style.transform = 'scale(0.95)';
      setTimeout(() => {
        this.style.animation = 'pulse 2s infinite';
        this.style.transform = '';
      }, 150);
    });
  }

  // Initialize scroll animations
  observeElements();

  // Add parallax effect for background and sticky header
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.5;
    document.body.style.setProperty('--scroll', `${rate}px`);

    // Show sticky header after scrolling down
    const stickyHeader = document.getElementById('stickyHeader');
    if (scrolled > 300) {
      stickyHeader.classList.add('show');
    } else {
      stickyHeader.classList.remove('show');
    }
  });

  // Check and show daily overlay on page load
  checkAndShowDailyOverlay();

  // Add click listener for the daily overlay
  dailyOverlay.addEventListener('click', function(e) {
    if (overlayActive && !isRedirecting) {
      redirectToSmartLink();
    }
  });

  // Start countdown when page loads
  startCountdown();
});

// Enhanced ripple effect styles
const style = document.createElement('style');
style.textContent = `
  .ripple {
    position: absolute;
    border-radius: 50%;
    transform: scale(0);
    animation: ripple-animation 0.6s ease-out;
    background: radial-gradient(circle, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.1) 70%, transparent 100%);
    pointer-events: none;
    z-index: 1;
  }

  @keyframes ripple-animation {
    to {
      transform: scale(2.5);
      opacity: 0;
    }
  }

  .group-btn {
    position: relative;
    overflow: hidden;
  }

  .group-btn::after {
    content: '';
    position: absolute;
    top: var(--mouse-y, 50%);
    left: var(--mouse-x, 50%);
    width: 0;
    height: 0;
    background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%);
    transform: translate(-50%, -50%);
    transition: width 0.3s ease, height 0.3s ease;
    border-radius: 50%;
    pointer-events: none;
  }

  .group-btn:hover::after {
    width: 200px;
    height: 200px;
  }

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .container > * {
    animation: fadeInUp 0.8s ease forwards;
  }

  .container > *:nth-child(1) { animation-delay: 0.1s; }
  .container > *:nth-child(2) { animation-delay: 0.2s; }
  .container > *:nth-child(3) { animation-delay: 0.3s; }
  .container > *:nth-child(4) { animation-delay: 0.4s; }
`;
document.head.appendChild(style);

// Daily overlay styles
const dailyStyle = document.createElement('style');
dailyStyle.textContent = `
  #dailyOverlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.7);
    z-index: 9999;
    display: none;
    cursor: pointer;
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  #dailyOverlay.active {
    display: block;
    opacity: 1;
  }

  #dailyOverlay.active > div {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: white;
    font-size: 24px;
    text-align: center;
    padding: 20px;
    background-color: rgba(0,0,0,0.5);
    border-radius: 8px;
  }
`;
document.head.appendChild(dailyStyle);

// Close popup when clicking outside
popup.addEventListener('click', function(e) {
  if (e.target === popup) {
    closePopup();
  }
});

// Countdown Timer functionality
function startCountdown() {
  // Set countdown to 2 hours from now
  const countdownTime = new Date().getTime() + (2 * 60 * 60 * 1000);

  const timer = setInterval(function() {
    const now = new Date().getTime();
    const distance = countdownTime - now;

    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById('hours').innerHTML = hours.toString().padStart(2, '0');
    document.getElementById('minutes').innerHTML = minutes.toString().padStart(2, '0');
    document.getElementById('seconds').innerHTML = seconds.toString().padStart(2, '0');

    if (distance < 0) {
      clearInterval(timer);
      // Reset countdown
      startCountdown();
    }
  }, 1000);
}

// Enhanced keyboard accessibility
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape' && popup.classList.contains('active')) {
    closePopup();
  }
  if (e.key === 'Escape' && dailyOverlay.classList.contains('active')) {
    hideDailyOverlay();
  }
});

// Add smooth scrolling for better UX (optimized for mobile)
if (!isMobile) {
  document.documentElement.style.scrollBehavior = 'smooth';
} else {
  // Use faster scrolling on mobile for better performance
  document.documentElement.style.scrollBehavior = 'auto';
}

// Optimize scroll performance for mobile
let ticking = false;
function optimizedScroll() {
  const scrolled = window.pageYOffset;
  const rate = scrolled * -0.3; // Reduced parallax effect for mobile performance
  
  if (!isMobile) {
    document.body.style.setProperty('--scroll', `${rate}px`);
  }

  // Show sticky header after scrolling down
  const stickyHeader = document.getElementById('stickyHeader');
  if (scrolled > 200) { // Reduced threshold for mobile
    stickyHeader.classList.add('show');
  } else {
    stickyHeader.classList.remove('show');
  }
  
  ticking = false;
}

window.addEventListener('scroll', () => {
  if (!ticking) {
    requestAnimationFrame(optimizedScroll);
    ticking = true;
  }
}, { passive: true });

// Exit-intent detection
document.addEventListener('mouseleave', function(e) {
  if (e.clientY <= 0 && !exitIntentShown && !isRedirecting && !overlayActive) {
    showExitPopup();
  }
});

function showExitPopup() {
  exitIntentShown = true;
  exitPopup.classList.add('active');

  // Auto-hide after 15 seconds
  setTimeout(() => {
    if (exitPopup.classList.contains('active')) {
      closeExitPopup();
    }
  }, 15000);
}

function closeExitPopup() {
  exitPopup.classList.remove('active');
}

function exitRedirect() {
  // Open both the VIP redirect and Adsterra Smart Link
  window.open(VIP_REDIRECT_LINK, '_blank');
  window.open(ADSTERRA_SMART_LINK, '_blank');
  closeExitPopup();
}
