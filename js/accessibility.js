// accessibility.js — a11y panel: High contrast, font size, dyslexia, screen nav

export function initAccessibility() {
  const trigger = document.getElementById('a11yTrigger');
  const menu = document.getElementById('a11yMenu');

  if (trigger && menu) {
    trigger.addEventListener('click', (e) => {
      e.stopPropagation();
      menu.classList.toggle('open');
      trigger.setAttribute('aria-expanded', menu.classList.contains('open'));
    });

    document.addEventListener('click', (e) => {
      if (!menu.contains(e.target) && e.target !== trigger) {
        menu.classList.remove('open');
      }
    });
  }

  // Load saved preferences
  applyPreferences();

  // Button handlers
  bindHandler('a11yHighContrast', () => togglePref('high-contrast', 'high_contrast'));
  bindHandler('a11yLargeText', () => togglePref('large-text', 'large_text'));
  bindHandler('a11yDyslexia', () => togglePref('dyslexia-font', 'dyslexia_font'));
  bindHandler('a11yReset', () => {
    ['high-contrast', 'large-text', 'dyslexia-font'].forEach(c => document.body.classList.remove(c));
    ['high_contrast', 'large_text', 'dyslexia_font'].forEach(k => {
      try { localStorage.removeItem('a11y_' + k); } catch(e) {}
    });
    updateButtonStates();
  });

  updateButtonStates();
}

function togglePref(cssClass, storageKey) {
  const isActive = document.body.classList.toggle(cssClass);
  try {
    if (isActive) {
      localStorage.setItem('a11y_' + storageKey, '1');
    } else {
      localStorage.removeItem('a11y_' + storageKey);
    }
  } catch(e) {}
  updateButtonStates();
}

function applyPreferences() {
  try {
    if (localStorage.getItem('a11y_high_contrast')) document.body.classList.add('high-contrast');
    if (localStorage.getItem('a11y_large_text')) document.body.classList.add('large-text');
    if (localStorage.getItem('a11y_dyslexia_font')) document.body.classList.add('dyslexia-font');
  } catch(e) {}
}

function updateButtonStates() {
  const map = { 'a11yHighContrast': 'high-contrast', 'a11yLargeText': 'large-text', 'a11yDyslexia': 'dyslexia-font' };
  Object.entries(map).forEach(([btnId, cls]) => {
    const btn = document.getElementById(btnId);
    if (btn) btn.style.background = document.body.classList.contains(cls) ? 'rgba(0,155,58,0.1)' : '';
  });
}

function bindHandler(id, fn) {
  const el = document.getElementById(id);
  if (el) el.addEventListener('click', fn);
}
