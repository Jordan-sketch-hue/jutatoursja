// filters.js — excursion/package filter by category, accessibility, price

export function initFilters() {
  const pills = document.querySelectorAll('.filter-pill');
  const cards = document.querySelectorAll('[data-filter]');

  if (!pills.length || !cards.length) return;

  // Create filter helper text if not exists
  const filterBar = document.querySelector('[role="group"][aria-label*="Filter"]');
  let helperText = filterBar?.querySelector('[data-filter-helper]');
  if (filterBar && !helperText) {
    helperText = document.createElement('p');
    helperText.setAttribute('data-filter-helper', 'true');
    helperText.style.cssText = 'font-size:0.85rem;color:var(--gray-text);margin:1rem 0 0;';
    filterBar.parentElement.insertAdjacentElement('afterend', helperText);
  }

  function updateFilterState() {
    const activeFilter = document.querySelector('.filter-pill.active');
    const filterVal = activeFilter?.getAttribute('data-filter-value') || 'all';
    const visibleCards = Array.from(cards).filter(card => card.style.display !== 'none');
    
    if (helperText) {
      if (filterVal === 'all') {
        helperText.textContent = `Showing all ${cards.length} experiences.`;
      } else {
        const filterLabel = activeFilter?.textContent?.trim() || filterVal;
        helperText.textContent = `Showing ${visibleCards.length} ${filterLabel} experiences.`;
      }
    }
  }

  pills.forEach(pill => {
    pill.addEventListener('click', () => {
      pills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');

      const filterVal = pill.getAttribute('data-filter-value');

      cards.forEach(card => {
        const tags = (card.getAttribute('data-filter') || '').toLowerCase();
        const match = filterVal === 'all' || tags.includes(filterVal.toLowerCase());
        card.style.display = match ? '' : 'none';
        if (match) {
          card.style.animation = 'none';
          card.offsetHeight; // reflow
          card.style.animation = '';
        }
      });

      updateFilterState();
      pill.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });
  });

  // Search filter
  const searchInput = document.querySelector('[data-search-filter]');
  if (searchInput) {
    searchInput.addEventListener('input', () => {
      const query = searchInput.value.toLowerCase().trim();
      cards.forEach(card => {
        const text = card.textContent.toLowerCase();
        card.style.display = text.includes(query) ? '' : 'none';
      });
      updateFilterState();
    });
  }

  // Initialize helper text on page load
  updateFilterState();
}
