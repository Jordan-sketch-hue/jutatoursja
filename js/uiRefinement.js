// uiRefinement.js - remove emoji-heavy UI labels and apply cleaner text treatments

export function initUiRefinement() {
  stripEmojiFromTextNodes();
  normalizeNavAndTrustCopy();
  normalizeFooterSocialLabels();
  normalizeA11yLabels();
  normalizeIconTokens();
  normalizeTagLikeLabels();
  normalizeFooterBrand();
  normalizeCommonCtas();
}

function stripEmojiFromTextNodes() {
  const emojiPattern = /[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}\u{1F1E6}-\u{1F1FF}]/gu;
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  const nodes = [];

  while (walker.nextNode()) {
    nodes.push(walker.currentNode);
  }

  nodes.forEach((node) => {
    const parent = node.parentElement;
    if (!parent) return;
    if (parent.closest('script, style')) return;

    const cleaned = node.nodeValue
      .replace(/\uFE0F/g, '')
      .replace(emojiPattern, '')
      .replace(/\s{2,}/g, ' ');

    if (cleaned !== node.nodeValue) {
      node.nodeValue = cleaned;
    }
  });
}

function normalizeNavAndTrustCopy() {
  document.querySelectorAll('.nav-links a, .mobile-menu a, .trust-bar-item, .blog-cat, .filter-pill').forEach((el) => {
    el.textContent = cleanLabel(el.textContent);
  });

  const compactTrustMap = {
    'Verified Licensed Drivers': 'Verified Drivers',
    '24/7 WhatsApp Support': '24/7 Support',
    'Licensed Tour Standards': 'JUTA Standards',
    'Transparent Pricing': 'Clear Pricing',
    'Accessible Vehicles Available': 'Accessible Fleet',
  };

  document.querySelectorAll('.trust-bar-item').forEach((el) => {
    const current = cleanLabel(el.textContent);
    if (compactTrustMap[current]) {
      el.textContent = compactTrustMap[current];
    }
  });
}

function cleanLabel(value) {
  return (value || '')
    .replace(/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}\u{1F1E6}-\u{1F1FF}\uFE0F]/gu, '')
    .replace(/^\s*[-:|]+\s*/g, '')
    .replace(/\s{2,}/g, ' ')
    .trim();
}

function normalizeFooterSocialLabels() {
  const fallbackLabels = {
    instagram: 'IG',
    facebook: 'FB',
    tiktok: 'TT',
    whatsapp: 'WA',
    youtube: 'YT',
    x: 'X',
  };

  document.querySelectorAll('.footer-social a').forEach((link) => {
    const aria = (link.getAttribute('aria-label') || '').toLowerCase();
    const hasText = link.textContent.trim().length > 0;
    if (!hasText) {
      const key = Object.keys(fallbackLabels).find((k) => aria.includes(k));
      link.textContent = key ? fallbackLabels[key] : 'LN';
    }
  });
}

function normalizeA11yLabels() {
  const trigger = document.getElementById('a11yTrigger');
  if (trigger) {
    trigger.textContent = 'A11Y';
    trigger.classList.add('premium-icon-token');
  }

  const labelsById = {
    a11yHighContrast: 'High Contrast',
    a11yLargeText: 'Larger Text',
    a11yDyslexia: 'Dyslexia Font',
    a11yReset: 'Reset',
  };

  Object.entries(labelsById).forEach(([id, label]) => {
    const btn = document.getElementById(id);
    if (btn) btn.textContent = label;
  });
}

function normalizeIconTokens() {
  document.querySelectorAll('.sco-icon').forEach((icon) => {
    const card = icon.closest('[data-value]');
    const value = card ? card.getAttribute('data-value') : '';
    const token = {
      'airport-transfer': 'AT',
      'festival-transport': 'FT',
      excursion: 'EX',
      packages: 'PK',
    }[value] || 'JT';

    icon.textContent = token;
    icon.classList.add('premium-icon-token');
  });

  document.querySelectorAll('.trust-item-icon, .sidebar-icon').forEach((icon) => {
    const context = cleanLabel(icon.parentElement ? icon.parentElement.textContent : '').toLowerCase();
    let token = 'JT';
    if (context.includes('phone') || context.includes('contact')) token = 'CL';
    if (context.includes('map') || context.includes('coverage') || context.includes('location')) token = 'MAP';
    if (context.includes('airport') || context.includes('transfer')) token = 'AT';
    if (context.includes('festival')) token = 'FT';
    if (context.includes('excursion') || context.includes('tour')) token = 'EX';
    if (context.includes('access')) token = 'AC';
    icon.textContent = token;
    icon.classList.add('premium-icon-token');
  });
}

function normalizeTagLikeLabels() {
  document.querySelectorAll('h2, h3, .btn, .badge, .blog-cat, .filter-pill').forEach((el) => {
    if (el.childElementCount > 0) return;
    const cleaned = cleanLabel(el.textContent);
    if (cleaned) {
      el.textContent = cleaned;
    }
  });
}

function normalizeFooterBrand() {
  document.querySelectorAll('.logo-text').forEach((el) => {
    el.textContent = cleanLabel(el.textContent);
  });
}

function normalizeCommonCtas() {
  document.querySelectorAll('.nav-whatsapp, .whatsapp-pill').forEach((el) => {
    el.textContent = 'WhatsApp';
  });

  const mobileLabelMap = {
    'Airport Transfer': 'Airport',
    'Festival Transport': 'Festival',
    Excursions: 'Tours',
    Packages: 'Packages',
    About: 'About',
    FAQ: 'FAQ',
    Blog: 'Journal',
  };

  document.querySelectorAll('.mobile-menu a').forEach((el) => {
    const cleaned = cleanLabel(el.textContent);
    el.textContent = mobileLabelMap[cleaned] || cleaned;
  });
}
