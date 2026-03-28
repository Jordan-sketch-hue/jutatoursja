import { EXCURSIONS, getExcursionById, getExcursionsByCategory } from './excursionsData.js';
import { getExcursionImageForCard } from './excursionsOnlineImages.js';

function escapeHtml(text) {
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function card(item) {
  return `
    <article class="card reveal">
      <img class="card-img" src="${escapeHtml(item.image)}" data-excursion-id="${escapeHtml(item.id)}" alt="${escapeHtml(item.title)} in ${escapeHtml(item.location)}, Jamaica" loading="lazy" referrerpolicy="no-referrer" />
      <div class="card-body">
        <span class="card-tag green">${escapeHtml(item.category)} · ${escapeHtml(item.location)}</span>
        <h3 style="margin-top:0.55rem;">${escapeHtml(item.title)}</h3>
        <p style="font-size:0.88rem;margin:0.55rem 0 0.85rem;">${escapeHtml(item.summary)}</p>
        <div style="display:flex;gap:0.45rem;flex-wrap:wrap;">
          <a href="excursion-detail.html?id=${encodeURIComponent(item.id)}" class="btn btn-sm" style="background:var(--gray-light);color:var(--black);">View Details</a>
          <a href="contact.html?service=excursion&excursion=${encodeURIComponent(item.id)}" class="btn btn-sm btn-primary">Book Now</a>
        </div>
      </div>
    </article>
  `;
}

async function hydrateImages(root, chosen, hero) {
  const cards = Array.from(root.querySelectorAll('img[data-excursion-id]'));
  const usedUrls = new Set();
  const itemsById = new Map(EXCURSIONS.map(item => [item.id, item]));

  await Promise.all(
    cards.map(async img => {
      const id = img.dataset.excursionId;
      const item = itemsById.get(id || '');
      if (!item) return;

      const onlineUrl = await getExcursionImageForCard(item, usedUrls);
      if (onlineUrl && img.isConnected) {
        img.src = onlineUrl;
      }
    })
  );

  const chosenOnlineUrl = await getExcursionImageForCard(chosen, usedUrls);
  if (chosenOnlineUrl && hero) {
    hero.style.backgroundImage = `url('${chosenOnlineUrl}')`;
  }
}

function init() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');
  const mount = document.getElementById('excursionDetailMount');
  const relatedMount = document.getElementById('relatedExcursionsMount');
  if (!mount || !relatedMount) return;

  const chosen = id ? getExcursionById(id) : EXCURSIONS[0];
  if (!chosen) {
    mount.innerHTML = '<div class="notice notice-info"><span>ℹ️</span><span>Excursion not found. Please return to the excursions page.</span></div>';
    return;
  }

  document.title = `${chosen.title} — Noel's Jamaica Vibes Tour`;
  const h1 = document.getElementById('excursionTitle');
  const subtitle = document.getElementById('excursionSubtitle');
  const hero = document.getElementById('excursionHeroImage');
  if (h1) h1.textContent = chosen.title;
  if (subtitle) subtitle.textContent = `${chosen.category} · ${chosen.location} · ${chosen.duration}`;
  if (hero) {
    hero.style.backgroundImage = `url('${chosen.image}')`;
  }

  mount.innerHTML = `
    <div class="grid-2" style="gap:1.5rem;align-items:start;">
      <div class="card" style="overflow:hidden;">
        <img class="card-img" src="${escapeHtml(chosen.image)}" data-excursion-id="${escapeHtml(chosen.id)}" alt="${escapeHtml(chosen.title)} in ${escapeHtml(chosen.location)}, Jamaica" loading="lazy" referrerpolicy="no-referrer" />
      </div>
      <div class="card" style="box-shadow:none;border:1px solid var(--gray-mid);">
        <div class="card-body">
          <span class="card-tag green">${escapeHtml(chosen.category)} · ${escapeHtml(chosen.location)}</span>
          <h2 style="margin-top:0.6rem;font-size:1.45rem;">${escapeHtml(chosen.title)}</h2>
          <p style="margin-top:0.65rem;">${escapeHtml(chosen.summary)}</p>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:0.65rem;margin-top:1rem;">
            <div style="padding:0.7rem;background:var(--gray-light);border-radius:10px;"><strong style="font-size:0.8rem;">Duration</strong><p style="font-size:0.88rem;">${escapeHtml(chosen.duration)}</p></div>
            <div style="padding:0.7rem;background:var(--gray-light);border-radius:10px;"><strong style="font-size:0.8rem;">Price</strong><p style="font-size:0.88rem;">From $${chosen.priceFrom}</p></div>
          </div>
          <div style="display:flex;gap:0.6rem;flex-wrap:wrap;margin-top:1rem;">
            <a href="contact.html?service=excursion&excursion=${encodeURIComponent(chosen.id)}" class="btn btn-primary">Book This Excursion</a>
            <a href="https://wa.me/18763929505?text=${encodeURIComponent(`Hi, I want to book ${chosen.title}`)}" class="btn" style="background:var(--gray-light);color:var(--black);">WhatsApp</a>
          </div>
        </div>
      </div>
    </div>
  `;

  const sameCategory = getExcursionsByCategory(chosen.category).filter(x => x.id !== chosen.id);
  const related = sameCategory.slice(0, 6);
  relatedMount.innerHTML = related.map(card).join('');

  const allFromCategoryLink = document.getElementById('backToCategoryLink');
  if (allFromCategoryLink) {
    const categorySlug = chosen.category.toLowerCase().replace(/\s+/g, '-');
    allFromCategoryLink.href = `excursions.html#catalog-${encodeURIComponent(categorySlug)}`;
    allFromCategoryLink.textContent = `Back to ${chosen.category} catalog`;
  }

  hydrateImages(document, chosen, hero);
}

document.addEventListener('DOMContentLoaded', init);
