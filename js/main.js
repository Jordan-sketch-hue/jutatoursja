// main.js — entry point, imports & initialises all modules

import { initNavigation } from './navigation.js';
import { initModals } from './modal.js';
import { initAccordion } from './accordion.js';
import { initAnimations } from './animations.js';
import { initFilters } from './filters.js';
import { initAccessibility } from './accessibility.js';
import { initBookingForm } from './bookingForm.js';
import { initUiRefinement } from './uiRefinement.js';

function initGlobalWhatsAppChat() {
  if (document.querySelector('[data-global-whatsapp-chat]')) return;

  const link = document.createElement('a');
  link.href = 'https://wa.me/18763929505?text=Hi%2C%20I%20need%20help%20choosing%20a%20tour%20in%20Jamaica.';
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
  link.className = 'global-whatsapp-chat';
  link.setAttribute('data-global-whatsapp-chat', 'true');
  link.setAttribute('aria-label', 'Chat with our tour guide on WhatsApp');
  link.setAttribute('title', 'Chat with our tour guide on WhatsApp');
  link.innerHTML = `
    <span class="global-whatsapp-chat-icon" aria-hidden="true">
      <svg viewBox="0 0 24 24" fill="currentColor" width="26" height="26" focusable="false" aria-hidden="true">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884"/>
      </svg>
    </span>
    <span class="global-whatsapp-chat-text">Chat</span>
  `;

  document.body.appendChild(link);
}

function initBookingIntentPersistence() {
  const links = document.querySelectorAll('a[href*="contact.html"]');
  if (!links.length) return;

  links.forEach(link => {
    link.addEventListener('click', () => {
      let parsed;
      try {
        parsed = new URL(link.href, window.location.origin);
      } catch {
        return;
      }

      if (!parsed.pathname.endsWith('contact.html')) return;

      const service = parsed.searchParams.get('service') || '';
      const excursion = parsed.searchParams.get('excursion') || '';
      const pkg = parsed.searchParams.get('package') || '';
      const airport = parsed.searchParams.get('airport') || '';
      const category = parsed.searchParams.get('category') || '';

      // Save only when the link actually carries booking intent.
      if (!service && !excursion && !pkg && !airport && !category) return;

      const payload = {
        service,
        excursion,
        package: pkg,
        airport,
        category,
        savedAt: Date.now()
      };

      try {
        window.localStorage.setItem('juta_booking_intent', JSON.stringify(payload));
      } catch {
        // Ignore storage failures (private mode, quota, etc.).
      }
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initModals();
  initAccordion();
  initAnimations();
  initFilters();
  initAccessibility();
  initBookingForm();
  initUiRefinement();
  initGlobalWhatsAppChat();
  initBookingIntentPersistence();
});
