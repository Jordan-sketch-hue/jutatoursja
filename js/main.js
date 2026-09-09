// main.js — entry point, imports & initialises all modules

import { initNavigation } from './navigation.js';
import { initModals } from './modal.js';
import { initAccordion } from './accordion.js';
import { initAnimations } from './animations.js';
import { initFilters } from './filters.js';
import { initAccessibility } from './accessibility.js';
import { initBookingForm } from './bookingForm.js';
import { initUiRefinement } from './uiRefinement.js';

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
  initBookingIntentPersistence();
});
