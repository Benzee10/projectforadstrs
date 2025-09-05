
// Popup blocker detection and instructions
function checkPopupBlocker() {
  const testPopup = window.open('', 'test', 'width=1,height=1');
  if (!testPopup || testPopup.closed || typeof testPopup.closed == 'undefined') {
    showPopupBlockerNotice();
    return true;
  } else {
    testPopup.close();
    return false;
  }
}

function showPopupBlockerNotice() {
  const notice = document.createElement('div');
  notice.id = 'popup-notice';
  notice.innerHTML = `
    <div style="position: fixed; top: 20px; right: 20px; background: #ff4757; color: white; padding: 15px 20px; border-radius: 8px; z-index: 10000; max-width: 300px; box-shadow: 0 4px 12px rgba(0,0,0,0.3);">
      <h4 style="margin: 0 0 10px 0; font-size: 16px;">🚫 Popup Blocked!</h4>
      <p style="margin: 0 0 15px 0; font-size: 14px; line-height: 1.4;">
        To access all VIP features, please allow popups for this site in your browser settings.
      </p>
      <button onclick="document.getElementById('popup-notice').remove()" style="background: white; color: #ff4757; border: none; padding: 8px 12px; border-radius: 4px; cursor: pointer; font-weight: 600;">
        Got it
      </button>
    </div>
  `;
  document.body.appendChild(notice);
  
  // Auto-remove after 10 seconds
  setTimeout(() => {
    const notice = document.getElementById('popup-notice');
    if (notice) notice.remove();
  }, 10000);
}

// Check on page load
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(checkPopupBlocker, 2000);
});
