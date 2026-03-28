// accordion.js — FAQ accordion with smooth animation

export function initAccordion() {
  document.querySelectorAll('.accordion-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.accordion-item');
      const content = item.querySelector('.accordion-content');
      const isOpen = btn.classList.contains('open');

      // Close all others in same group
      const group = item.closest('.accordion');
      if (group) {
        group.querySelectorAll('.accordion-btn.open').forEach(other => {
          if (other !== btn) {
            other.classList.remove('open');
            other.setAttribute('aria-expanded', 'false');
            const otherContent = other.closest('.accordion-item').querySelector('.accordion-content');
            otherContent.classList.remove('open');
            otherContent.style.maxHeight = '0';
          }
        });
      }

      // Toggle current
      if (isOpen) {
        btn.classList.remove('open');
        btn.setAttribute('aria-expanded', 'false');
        content.classList.remove('open');
        content.style.maxHeight = '0';
      } else {
        btn.classList.add('open');
        btn.setAttribute('aria-expanded', 'true');
        content.classList.add('open');
        content.style.maxHeight = content.scrollHeight + 'px';
      }
    });
    btn.setAttribute('aria-expanded', 'false');
  });
}
