import { EXCURSIONS, CATEGORY_ORDER, getExcursionsByCategory } from './excursionsData.js';

const ONLINE_IMAGES = {
  'dunns-river-falls': 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Dunns_River_Falls_climb.JPG/640px-Dunns_River_Falls_climb.JPG',
  'green-grotto-caves': 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/Jamaica_Discovery_Bay_Green_Grotto_Caves_2.jpg/640px-Jamaica_Discovery_Bay_Green_Grotto_Caves_2.jpg',
  'blue-mountains-tour': 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Blue_Mountains%2C_Jamaica.jpg/640px-Blue_Mountains%2C_Jamaica.jpg',
  'cockpit-country': 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Cockpit_Country.jpg/640px-Cockpit_Country.jpg',
  'seven-mile-beach': 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Negril_Jamaica_2007-09.jpg/640px-Negril_Jamaica_2007-09.jpg',
  'doctors-cave-beach': 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/Doctors-Cave-Beach.jpg/640px-Doctors-Cave-Beach.jpg',
  'frenchmans-cove': 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/Frenchman%27s_cove1.JPG/640px-Frenchman%27s_cove1.JPG',
  'hellshire-beach': 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/Hellshire-beach.jpg/640px-Hellshire-beach.jpg',
  'james-bond-beach': 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/JamesBondBeach3.jpg/640px-JamesBondBeach3.jpg',
  'bob-marley-museum': 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/81/56hoperd.JPG/640px-56hoperd.JPG',
  'devon-house': 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/Devonhouse.jpg/640px-Devonhouse.jpg',
  'rose-hall-great-house': 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Rose_Hall_Jamaica_Photo_D_Ramey_Logan.jpg/640px-Rose_Hall_Jamaica_Photo_D_Ramey_Logan.jpg',
  'accompong-maroon-village': 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Accompong%2C_Jamaica%2C_early_20th_century_%28imp-cswc-GB-237-CSWC47-LS12-015%29.jpg/640px-Accompong%2C_Jamaica%2C_early_20th_century_%28imp-cswc-GB-237-CSWC47-LS12-015%29.jpg',
  'falmouth-historic-district': 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/Falmouth%2C_Jamaica_I.jpg/640px-Falmouth%2C_Jamaica_I.jpg',
  'mystic-mountain': 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Ocho_Rios%2C_Jamaica.JPG/640px-Ocho_Rios%2C_Jamaica.JPG',
  'luminous-lagoon-swim': 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/Falmouth%2C_Jamaica_I.jpg/640px-Falmouth%2C_Jamaica_I.jpg',
  'private-yacht-mobay': 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Negril_Jamaica_2007-09.jpg/640px-Negril_Jamaica_2007-09.jpg',
  'strawberry-hill-spa': 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Strawberry_Hill_1200.jpg/640px-Strawberry_Hill_1200.jpg',
  'milk-river-bath': 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/MilkRiverBath.JPG/640px-MilkRiverBath.JPG',
  'hope-botanical-gardens': 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Hope_Botanical_Gardens%2C_Jamaica.jpg/640px-Hope_Botanical_Gardens%2C_Jamaica.jpg',
  'sunset-cruise-mobay': 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Negril_Jamaica_2007-09.jpg/640px-Negril_Jamaica_2007-09.jpg'
};

function formatPrice(price) {
  return `$${price}`;
}

function getImage(item) {
  return ONLINE_IMAGES[item.id] || item.image;
}

function slugify(value) {
  return value.toLowerCase().replace(/\s+/g, '-');
}

function renderCard(item) {
  return `
    <article class="card reveal catalog-card" data-filter="${item.category.toLowerCase()} ${item.location.toLowerCase()}">
      <div style="position:relative;overflow:hidden;">
        <img class="card-img" src="${getImage(item)}" alt="${item.title} in ${item.location}, Jamaica" loading="lazy" referrerpolicy="no-referrer" />
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
}

document.addEventListener('DOMContentLoaded', initCatalog);
