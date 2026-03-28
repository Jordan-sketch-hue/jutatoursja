import { EXCURSIONS, CATEGORY_ORDER, getExcursionsByCategory } from './excursionsData.js';
import { getExcursionImageForCard } from './excursionsOnlineImages.js';

function formatPrice(price) {
  return `$${price}`;
}

function slugify(value) {
  return value.toLowerCase().replace(/\s+/g, '-');
}

function renderCard(item) {
  return `
    <article class="card reveal catalog-card" data-filter="${item.category.toLowerCase()} ${item.location.toLowerCase()}">
      <div style="position:relative;overflow:hidden;">
        <img class="card-img" src="${item.image}" data-excursion-id="${item.id}" alt="${item.title} in ${item.location}, Jamaica" loading="lazy" referrerpolicy="no-referrer" />
        <span style="position:absolute;top:0.75rem;left:0.75rem;background:rgba(0,0,0,0.72);color:white;font-size:0.72rem;font-weight:700;padding:0.25rem 0.65rem;border-radius:50px;text-transform:uppercase;">${item.category}</span>
        <span style="position:absolute;top:0.75rem;right:0.75rem;background:rgba(0,0,0,0.58);color:white;font-size:0.75rem;padding:0.25rem 0.65rem;border-radius:50px;">${item.duration}</span>
      </div>
      <div class="card-body catalog-card-body">
        <span class="card-tag green">${item.category} · ${item.location}</span>
        <h3 style="margin-top:0.55rem;">${item.title}</h3>
        <p style="font-size:0.88rem;margin:0.55rem 0 0.85rem;">${item.summary}</p>
        <div class="catalog-actions" style="display:flex;justify-content:space-between;align-items:center;gap:0.75rem;flex-wrap:wrap;">
          <strong style="color:var(--green);font-size:1.02rem;">From ${formatPrice(item.priceFrom)}</strong>
          <div style="display:flex;gap:0.45rem;flex-wrap:wrap;">
            <a href="excursion-detail.html?id=${encodeURIComponent(item.id)}" class="btn btn-sm" style="background:var(--gray-light);color:var(--black);">View Details</a>
            <a href="contact.html?service=excursion&excursion=${encodeURIComponent(item.id)}" class="btn btn-sm btn-primary">Book Now</a>
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
    <section id="catalog-${slug}" class="catalog-category-block" style="margin-bottom:2.2rem;" aria-label="${category} excursions">
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
  return `
    <div class="catalog-quick-tabs" role="navigation" aria-label="Jump to excursion category">
      ${CATEGORY_ORDER.map(category => {
        const slug = slugify(category);
        return `<a class="catalog-quick-tab" href="#catalog-${slug}">${category}</a>`;
      }).join('')}
    </div>
  `;
}

async function hydrateCatalogOnlineImages(root) {
  const images = Array.from(root.querySelectorAll('img[data-excursion-id]'));
  if (!images.length) return;

  const itemsById = new Map(EXCURSIONS.map(item => [item.id, item]));
  const usedUrls = new Set();

  await Promise.all(
    images.map(async img => {
      const id = img.dataset.excursionId;
      if (!id) return;

      const item = itemsById.get(id);
      if (!item) return;

      const onlineUrl = await getExcursionImageForCard(item, usedUrls);
      if (onlineUrl && img.isConnected) {
        img.src = onlineUrl;
      }
    })
  );
}

function initCatalog() {
  const mount = document.getElementById('fullExcursionsCatalog');
  if (!mount) return;

  mount.innerHTML = CATEGORY_ORDER.map(renderCategoryBlock).join('');

  const total = EXCURSIONS.length;
  const heading = document.createElement('p');
  heading.style.cssText = 'margin:0 0 1rem;font-size:0.85rem;color:var(--gray-text);';
  heading.textContent = `${total} total excursions now bookable with dedicated detail pages.`;
  mount.prepend(heading);
  heading.insertAdjacentHTML('afterend', renderQuickTabs());

  hydrateCatalogOnlineImages(mount);
}

document.addEventListener('DOMContentLoaded', initCatalog);
