// bookingForm.js — smart multi-service booking form with validation, WhatsApp + email output

export function initBookingForm() {
  document.querySelectorAll('.juta-booking-form').forEach(form => {
    setupForm(form);
  });
}

function setupForm(form) {
  // Service type conditional fields
  const serviceSelect = form.querySelector('[name="service_type"]');
  const conditionalSections = form.querySelectorAll('[data-show-for]');

  function updateConditionalFields() {
    const val = serviceSelect ? serviceSelect.value : '';
    conditionalSections.forEach(section => {
      const showFor = section.getAttribute('data-show-for').split(',').map(s => s.trim());
      const show = showFor.includes(val) || showFor.includes('all');
      section.style.display = show ? '' : 'none';
      section.querySelectorAll('[required]').forEach(input => {
        input.required = show;
      });
    });
  }

  if (serviceSelect) {
    serviceSelect.addEventListener('change', updateConditionalFields);
    updateConditionalFields();
  }

  // Char counter for notes
  form.querySelectorAll('textarea[data-maxlength]').forEach(ta => {
    const max = parseInt(ta.getAttribute('data-maxlength'));
    const counter = form.querySelector(`[data-counter-for="${ta.name}"]`);
    if (counter) {
      ta.addEventListener('input', () => {
        counter.textContent = `${ta.value.length}/${max}`;
        counter.style.color = ta.value.length > max * 0.9 ? '#e53e3e' : '';
      });
    }
  });

  // Date validation — no past dates
  form.querySelectorAll('input[type="date"]').forEach(input => {
    const today = new Date().toISOString().split('T')[0];
    input.setAttribute('min', today);
  });

  // Step navigation
  const steps = form.querySelectorAll('.form-step');
  const nextBtns = form.querySelectorAll('[data-form-next]');
  const prevBtns = form.querySelectorAll('[data-form-prev]');
  let currentStep = 0;

  function showStep(idx) {
    steps.forEach((s, i) => {
      s.style.display = i === idx ? '' : 'none';
      s.setAttribute('aria-hidden', i !== idx);
    });
    // Update step indicator
    form.querySelectorAll('.step').forEach((s, i) => {
      s.classList.toggle('active', i <= idx);
    });
  }

  if (steps.length > 1) {
    showStep(0);
    nextBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        if (validateStep(form, steps[currentStep])) {
          currentStep = Math.min(currentStep + 1, steps.length - 1);
          showStep(currentStep);
          form.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
    prevBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        currentStep = Math.max(currentStep - 1, 0);
        showStep(currentStep);
      });
    });
  }

  // Submission
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!validateStep(form, form)) return;

    const submitBtn = form.querySelector('[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<span class="spinner"></span> Sending...';
    submitBtn.disabled = true;

    const data = buildFormData(form);

    try {
      // Primary: Formspree (no backend needed)
      const endpoint = form.getAttribute('data-endpoint') || 'https://formspree.io/f/YOUR_FORM_ID';
      if (endpoint.includes('YOUR_FORM_ID')) {
        throw new Error('missing_formspree_endpoint');
      }
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(data)
      });

      if (res.ok) {
        showSuccess(form, data);
      } else {
        throw new Error('submission_failed');
      }
    } catch (err) {
      // Fallback: open WhatsApp with prefilled message
      openWhatsAppFallback(data);
    } finally {
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;
    }
  });
}

function validateStep(form, container) {
  let valid = true;
  container.querySelectorAll('[required]').forEach(input => {
    const error = form.querySelector(`[data-error-for="${input.name}"]`);
    const isEmpty = !input.value.trim();
    if (isEmpty) {
      input.classList.add('error');
      if (error) error.classList.add('visible');
      valid = false;
    } else {
      input.classList.remove('error');
      if (error) error.classList.remove('visible');
    }
  });
  // Email validation
  container.querySelectorAll('input[type="email"]').forEach(input => {
    if (input.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value)) {
      input.classList.add('error');
      const error = form.querySelector(`[data-error-for="${input.name}"]`);
      if (error) { error.textContent = 'Please enter a valid email address.'; error.classList.add('visible'); }
      valid = false;
    }
  });
  if (!valid) {
    const firstError = container.querySelector('.error');
    if (firstError) firstError.focus();
  }
  return valid;
}

function buildFormData(form) {
  const fd = new FormData(form);
  const data = { _subject: 'New Booking Inquiry — JUTA Tours JA', submitted_at: new Date().toISOString() };
  fd.forEach((value, key) => { data[key] = value; });
  return data;
}

function showSuccess(form, data) {
  const successEl = form.querySelector('.form-success');
  if (successEl) {
    successEl.style.display = '';
    const successName = successEl.querySelector('.success-name');
    const successService = successEl.querySelector('.success-service');
    if (successName) successName.textContent = data.first_name || 'there';
    if (successService) successService.textContent = data.service_type || 'your request';
    const formFields = form.querySelector('.form-fields');
    if (formFields) formFields.style.display = 'none';
  } else {
    alert(`Thank you, ${data.first_name || 'friend'}! We've received your inquiry and will respond within 30 minutes via WhatsApp or email.`);
  }
  // Scroll to success
  form.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

function openWhatsAppFallback(data) {
  const lines = [
    `*New JUTA Tours JA Inquiry*`,
    `Name: ${data.first_name || ''} ${data.last_name || ''}`.trim(),
    `Service: ${data.service_type || ''}`,
    `Date: ${data.travel_date || ''}`,
    `Passengers: ${data.passengers || ''}`,
    `Email: ${data.email || ''}`,
    `Phone: ${data.phone || ''}`,
    `Notes: ${data.notes || 'None'}`,
  ].filter(l => !l.endsWith(': ')).join('\n');

  const phone = '18765551234'; // Replace with real WhatsApp number
  const url = `https://wa.me/${phone}?text=${encodeURIComponent(lines)}`;
  window.open(url, '_blank', 'noopener,noreferrer');
}
