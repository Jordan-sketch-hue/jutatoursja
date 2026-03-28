// main.js — entry point, imports & initialises all modules

import { initNavigation } from './navigation.js';
import { initModals } from './modal.js';
import { initAccordion } from './accordion.js';
import { initAnimations } from './animations.js';
import { initFilters } from './filters.js';
import { initAccessibility } from './accessibility.js';
import { initBookingForm } from './bookingForm.js';

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initModals();
  initAccordion();
  initAnimations();
  initFilters();
  initAccessibility();
  initBookingForm();
});
