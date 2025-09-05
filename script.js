
// Global variables
const popup = document.getElementById('telegramPopup');
const loadingOverlay = document.getElementById('loadingOverlay');
let isRedirecting = false;

// Enhanced redirect function with loading states and Adsterra Smart Link
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
    // Open both the VIP redirect and Adsterra Smart Link
    window.open('https://vip-redirect.vercel.app', '_blank');
    window.open('https://curiositycognition.com/h9xw8i8f?key=1419765068d7b1dbd1e3d5e01e3b7a94', '_blank');
    
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

// Enhanced button interactions
document.addEventListener('DOMContentLoaded', function() {
  const buttons = document.querySelectorAll('.group-btn');
  
  // Add staggered animation for buttons
  buttons.forEach((button, index) => {
    button.style.animationDelay = `${index * 0.1}s`;
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
      window.open('https://vip-redirect.vercel.app', '_blank');
      window.open('https://curiositycognition.com/h9xw8i8f?key=1419765068d7b1dbd1e3d5e01e3b7a94', '_blank');
      
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

  // Add parallax effect for background
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.5;
    document.body.style.setProperty('--scroll', `${rate}px`);
  });
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

// Close popup when clicking outside
popup.addEventListener('click', function(e) {
  if (e.target === popup) {
    closePopup();
  }
});

// Enhanced keyboard accessibility
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape' && popup.classList.contains('active')) {
    closePopup();
  }
});

// Add smooth scrolling for better UX
document.documentElement.style.scrollBehavior = 'smooth';
