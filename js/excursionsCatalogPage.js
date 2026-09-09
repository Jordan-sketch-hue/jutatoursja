import { EXCURSIONS, CATEGORY_ORDER, RESORT_AREAS, getExcursionsByCategory, getExcursionsByResortArea } from './excursionsData.js';
import { getExcursionImageForCard } from './excursionsOnlineImages.js';

function slugify(value) {
  return value.toLowerCase().replace(/\s+/g, '-');
}

function renderCard(item) {
  const includesHtml = item.includes && item.includes.length
    ? `<div style="margin:0.5rem 0 0.75rem;"><div style="font-size:0.75rem;font-weight:700;color:var(--green);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:0.35rem;">Included</div><ul style="list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:0.2rem;">${item.includes.slice(0, 3).map(i => `<li style="font-size:0.78rem;color:var(--gray-text);display:flex;gap:0.4rem;align-items:start;"><span style="color:var(--green);flex-shrink:0;">✓</span>${i}</li>`).join('')}</ul></div>`
    : '';
  const timesHtml = item.times ? `<span style="font-size:0.78rem;color:var(--gray-text);">🕗 Departs ${item.times}</span>` : '';
  const cancelHtml = `<span style="display:inline-flex;align-items:center;gap:0.3rem;font-size:0.72rem;font-weight:700;color:var(--green);background:rgba(0,155,58,0.08);padding:0.2rem 0.55rem;border-radius:50px;">✓ Free cancellation</span>`;

  return `
    <article class="card reveal catalog-card" data-filter="${item.category.toLowerCase()} ${item.location.toLowerCase()}" data-resort-areas="${(item.resortAreas || []).join(',')}">
      <div style="position:relative;overflow:hidden;">
        <img class="card-img" src="${item.image}" data-excursion-id="${item.id}" alt="${item.title} in ${item.location}, Jamaica" loading="lazy" referrerpolicy="no-referrer" />
        <span style="position:absolute;top:0.75rem;left:0.75rem;background:rgba(0,0,0,0.72);color:white;font-size:0.72rem;font-weight:700;padding:0.25rem 0.65rem;border-radius:50px;text-transform:uppercase;">${item.category}</span>
        <span style="position:absolute;top:0.75rem;right:0.75rem;background:rgba(0,0,0,0.58);color:white;font-size:0.75rem;padding:0.25rem 0.65rem;border-radius:50px;">${item.duration}</span>
      </div>
      <div class="card-body catalog-card-body">
        <span class="card-tag green">${item.category} · ${item.location}</span>
        <h3 style="margin-top:0.55rem;">${item.title}</h3>
        <p style="font-size:0.88rem;margin:0.55rem 0 0.5rem;">${item.summary}</p>
        ${includesHtml}
        <div style="display:flex;gap:0.5rem;flex-wrap:wrap;align-items:center;margin-bottom:0.85rem;">${timesHtml}${timesHtml ? '<span style="color:var(--gray-mid);">·</span>' : ''}${cancelHtml}</div>
        <div class="catalog-actions" style="display:flex;justify-content:space-between;align-items:center;gap:0.75rem;flex-wrap:wrap;">
          <div style="display:flex;gap:0.45rem;flex-wrap:wrap;">
            <a href="excursion-detail.html?id=${encodeURIComponent(item.id)}" class="btn btn-sm" style="background:var(--gray-light);color:var(--black);">View Details</a>
            <a href="https://wa.me/18763929505?text=${encodeURIComponent('Hi Noel, I\'d like a quote for: ' + item.title)}" class="btn btn-sm btn-primary" target="_blank" rel="noopener noreferrer">Request Quote</a>
          </div>
        </div>
      </div>
    </article>
  `;
}

function renderCategoryBlock(category) {
  const items = getExcursionsByCategory(category);
  if (!items.length) return '';

  const slug = slugify(category);

  return `
    <section id="catalog-${slug}" class="catalog-category-block" data-category-slug="${slug}" style="margin-bottom:2.2rem;" aria-label="${category} excursions">
      <div style="display:flex;justify-content:space-between;align-items:end;gap:1rem;flex-wrap:wrap;margin-bottom:0.9rem;">
        <div>
          <p class="section-label" style="margin-bottom:0.2rem;">${category}</p>
          <h3 style="margin:0;">${items.length} bookable options</h3>
        </div>
        <a href="contact.html?service=excursion&excursion=custom&category=${encodeURIComponent(category)}" class="btn btn-sm btn-outline-green">Book this whole category</a>
      </div>
      <div class="grid-3 catalog-grid" style="gap:1rem;">
        ${items.map(renderCard).join('')}
      </div>
    </section>
  `;
}

function renderQuickTabs() {
  const resortSelect = `
    <div style="display:flex;align-items:center;gap:0.6rem;margin-left:auto;flex-shrink:0;">
      <label for="resortFilter" style="font-size:0.8rem;font-weight:600;color:var(--gray-text);white-space:nowrap;">Find tours near:</label>
      <select id="resortFilter" style="font-size:0.82rem;padding:0.4rem 0.75rem;border-radius:50px;border:2px solid var(--green);background:white;color:var(--black);cursor:pointer;font-family:inherit;" aria-label="Filter by resort area">
        <option value="all">All areas</option>
        ${RESORT_AREAS.map(area => `<option value="${area}">${area}</option>`).join('')}
      </select>
    </div>
  `;
  return `
    <div style="display:flex;flex-wrap:wrap;align-items:center;gap:0.5rem;margin-bottom:0.75rem;">
      <div class="catalog-quick-tabs" role="tablist" aria-label="Filter excursion category" style="flex:1;min-width:0;">
        <button type="button" class="catalog-quick-tab is-active" data-category-filter="all" aria-pressed="true">All</button>
        ${CATEGORY_ORDER.map(category => {
          const slug = slugify(category);
          return `<button type="button" class="catalog-quick-tab" data-category-filter="${slug}" aria-pressed="false">${category}</button>`;
        }).join('')}
      </div>
      ${resortSelect}
    </div>
  `;
}

function getActiveCategoryFromHash() {
  const hash = window.location.hash || '';
  if (!hash.startsWith('#catalog-')) return 'all';

  const slug = hash.replace('#catalog-', '');
  return CATEGORY_ORDER.some(category => slugify(category) === slug) ? slug : 'all';
}

function updateCatalogFilterState(root, activeSlug, helperText) {
  const sections = Array.from(root.querySelectorAll('.catalog-category-block'));
  const tabs = Array.from(root.querySelectorAll('[data-category-filter]'));

  tabs.forEach(tab => {
    const isActive = tab.dataset.categoryFilter === activeSlug;
    tab.classList.toggle('is-active', isActive);
    tab.setAttribute('aria-pressed', String(isActive));
  });

  sections.forEach(section => {
    const isVisible = activeSlug === 'all' || section.dataset.categorySlug === activeSlug;
    section.hidden = !isVisible;
    section.classList.toggle('catalog-category-hidden', !isVisible);
  });

  if (!helperText) return;

  if (activeSlug === 'all') {
    helperText.textContent = `${EXCURSIONS.length} total excursions now bookable with dedicated detail pages.`;
    return;
  }

  const activeCategory = CATEGORY_ORDER.find(category => slugify(category) === activeSlug);
  const visibleCount = activeCategory ? getExcursionsByCategory(activeCategory).length : 0;
  helperText.textContent = `Showing ${visibleCount} ${activeCategory || 'selected'} excursions only.`;
}

function bindCatalogFilters(root, helperText) {
  const tabs = Array.from(root.querySelectorAll('[data-category-filter]'));
  if (!tabs.length) return;

  const applyFilter = (activeSlug, shouldScroll) => {
    updateCatalogFilterState(root, activeSlug, helperText);

    if (activeSlug === 'all') {
      window.history.replaceState(null, '', window.location.pathname + window.location.search);
    } else {
      window.history.replaceState(null, '', `#catalog-${activeSlug}`);
    }

    if (shouldScroll) {
      root.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const activeSlug = tab.dataset.categoryFilter || 'all';
      applyFilter(activeSlug, true);
    });
  });

  const initialSlug = getActiveCategoryFromHash();
  applyFilter(initialSlug, initialSlug !== 'all');
}

async function hydrateCatalogOnlineImages(root) {
  const images = Array.from(root.querySelectorAll('img[data-excursion-id]'));
  if (!images.length) return;

  const itemsById = new Map(EXCURSIONS.map(item => [item.id, item]));
  const usedUrls = new Set();

  for (const img of images) {
    const id = img.dataset.excursionId;
    if (!id) continue;

    const item = itemsById.get(id);
    if (!item) continue;

    const onlineUrl = await getExcursionImageForCard(item, usedUrls);
    if (onlineUrl && img.isConnected) {
      img.src = onlineUrl;
    }
  }
}

function initCatalog() {
  const mount = document.getElementById('fullExcursionsCatalog');
  if (!mount) return;

  mount.innerHTML = CATEGORY_ORDER.map(renderCategoryBlock).join('');

  const heading = document.createElement('p');
  heading.style.cssText = 'margin:0 0 1rem;font-size:0.85rem;color:var(--gray-text);';
  heading.textContent = `${EXCURSIONS.length} total excursions now bookable with dedicated detail pages.`;
  mount.prepend(heading);
  heading.insertAdjacentHTML('afterend', renderQuickTabs());

  bindCatalogFilters(mount, heading);
  bindResortFilter(mount, heading);
  hydrateCatalogOnlineImages(mount);
}

function bindResortFilter(root, helperText) {
  const select = root.querySelector('#resortFilter') || document.getElementById('resortFilter');
  if (!select) return;

  select.addEventListener('change', () => {
    const area = select.value;
    const cards = Array.from(root.querySelectorAll('.catalog-card'));
    let visible = 0;

    cards.forEach(card => {
      const areas = (card.dataset.resortAreas || '').split(',').map(s => s.trim());
      const show = area === 'all' || areas.includes(area);
      card.hidden = !show;
      if (show) visible++;
    });

    const sections = Array.from(root.querySelectorAll('.catalog-category-block'));
    sections.forEach(section => {
      const hasVisible = Array.from(section.querySelectorAll('.catalog-card')).some(c => !c.hidden);
      section.hidden = !hasVisible;
    });

    if (helperText) {
      helperText.textContent = area === 'all'
        ? `${EXCURSIONS.length} total excursions now bookable with dedicated detail pages.`
        : `${visible} excursions departing from / near ${area}.`;
    }
  });
}

document.addEventListener('DOMContentLoaded', initCatalog);
