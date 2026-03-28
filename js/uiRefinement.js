// uiRefinement.js - remove emoji-heavy UI labels and apply cleaner text treatments

export function initUiRefinement() {
  stripEmojiFromTextNodes();
  normalizeFooterSocialLabels();
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
      .replace(emojiPattern, '')
      .replace(/\s{2,}/g, ' ')
      .replace(/^\s+|\s+$/g, '');

    if (cleaned !== node.nodeValue) {
      node.nodeValue = cleaned;
    }
  });
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

function normalizeCommonCtas() {
  document.querySelectorAll('.nav-whatsapp, .whatsapp-pill').forEach((el) => {
    el.textContent = 'WhatsApp';
  });

  document.querySelectorAll('.mobile-menu a').forEach((el) => {
    el.textContent = el.textContent.replace(/^\s+|\s+$/g, '');
  });
}
