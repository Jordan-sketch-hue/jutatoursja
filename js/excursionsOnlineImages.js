const COMMONS_API_URL = 'https://commons.wikimedia.org/w/api.php';

const PINNED_IMAGE_OVERRIDES = {
  'somerset-falls': 'https://live.staticflickr.com/4125/5165961381_ea4e4e6b39_b.jpg',
  'konoko-falls': 'https://static.wixstatic.com/media/d01383_52a05f3d16ca41d7927e8cb146cf00d0.jpg/v1/fit/w_2500,h_1330,al_c/d01383_52a05f3d16ca41d7927e8cb146cf00d0.jpg',
  'reggae-falls': 'https://live.staticflickr.com/490/32079737900_4256c8ab6d_b.jpg',
  'cane-river-falls': 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fe/A._Duperly_%26_Sons_-_Cane_River_Falls%2C_Jamaica_6159928951.jpg/1280px-A._Duperly_%26_Sons_-_Cane_River_Falls%2C_Jamaica_6159928951.jpg',
  'lovers-leap': 'https://live.staticflickr.com/160/387153874_62f85fd258_b.jpg',
  'milk-river-bath': 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/MilkRiverBath.JPG/1280px-MilkRiverBath.JPG'
};

const QUERY_OVERRIDES = {
  'dunns-river-falls': "Dunn's River Falls Ocho Rios Jamaica waterfall",
  'blue-hole-secret-falls': 'Blue Hole Secret Falls Ocho Rios St Ann Jamaica',
  'ys-falls': 'YS Falls St Elizabeth Jamaica',
  'reach-falls': 'Reach Falls Portland Jamaica',
  'green-grotto-caves': 'Green Grotto Caves Discovery Bay Jamaica',
  'blue-mountains-tour': 'Blue Mountains Jamaica coffee trail',
  'cockpit-country': 'Cockpit Country Jamaica landscape',
  'black-river-safari': 'Black River Safari Jamaica boat',
  'martha-brae-rafting': 'Martha Brae River rafting Jamaica bamboo raft',
  'rio-grande-rafting': 'Rio Grande rafting Portland Jamaica bamboo raft',
  'seven-mile-beach': 'Seven Mile Beach Negril Jamaica',
  'doctors-cave-beach': "Doctor's Cave Beach Montego Bay Jamaica",
  'frenchmans-cove': "Frenchman's Cove Portland Jamaica",
  'boston-bay-beach': 'Boston Bay Beach Portland Jamaica surf',
  'winnifred-beach': 'Winnifred Beach Portland Jamaica',
  'hellshire-beach': 'Hellshire Beach Jamaica',
  'james-bond-beach': 'James Bond Beach Oracabessa Jamaica',
  'bob-marley-museum': 'Bob Marley Museum Kingston Jamaica 56 Hope Road',
  'devon-house': 'Devon House Kingston Jamaica',
  'rose-hall-great-house': 'Rose Hall Great House Montego Bay Jamaica',
  'accompong-maroon-village': 'Accompong Maroon Village Jamaica',
  'rastafari-indigenous-village': 'Rastafari Indigenous Village Montego Bay Jamaica',
  'falmouth-historic-district': 'Falmouth Jamaica historic district Georgian architecture',
  'port-royal': 'Port Royal Jamaica historic town',
  'scotchies': 'Scotchies Montego Bay Jamaica jerk',
  'ricks-cafe-dining': "Rick's Cafe Negril Jamaica cliff",
  'boston-jerk-centre': 'Boston Jerk Centre Portland Jamaica',
  'glorias-seafood': "Gloria's Seafood Kingston Jamaica",
  'kingston-street-food-flavours': 'Kingston Jamaica street food',
  'appleton-estate': 'Appleton Estate Jamaica rum tour',
  'sweetwood-jerk-joint': 'Sweetwood Jerk Joint Kingston Jamaica',
  'tracks-and-records': "Usain Bolt's Tracks and Records Kingston Jamaica",
  'mystic-mountain': 'Mystic Mountain Ocho Rios Jamaica bobsled',
  'chukka-caribbean': 'Chukka Caribbean Adventures Jamaica ATV zipline',
  'dolphin-cove-adventure': 'Dolphin Cove Ocho Rios Jamaica',
  'yaaman-adventure-park': 'Yaaman Adventure Park Ocho Rios Jamaica',
  'blue-hole-mineral-spring': 'Blue Hole Mineral Spring Negril Jamaica',
  'luminous-lagoon-swim': 'Luminous Lagoon Falmouth Jamaica bioluminescent',
  'negril-cliffs-diving': 'Negril Cliffs Jamaica cliff diving',
  'private-yacht-mobay': 'Montego Bay Marine Park Jamaica yacht',
  'helicopter-island-tour': 'Jamaica aerial coastline helicopter',
  'tryall-roundhill-villas': 'Tryall Club Round Hill Montego Bay Jamaica villa',
  'taboo-nightclub-vip': 'Montego Bay Jamaica nightlife club',
  'strawberry-hill-spa': 'Strawberry Hill Jamaica spa Blue Mountains',
  'pelican-bar-sunset-boat-trip': 'Pelican Bar St Elizabeth Jamaica sunset boat',
  'somerset-falls': 'Somerset Falls Portland Jamaica',
  'konoko-falls': 'Konoko Falls Ocho Rios Jamaica',
  'reggae-falls': 'Reggae Falls St Thomas Jamaica',
  'cane-river-falls': 'Cane River Falls St Andrew Jamaica',
  'lovers-leap': 'Lovers Leap St Elizabeth Jamaica cliff',
  'milk-river-bath': 'Milk River Bath Clarendon Jamaica mineral spa',
  'emancipation-park': 'Emancipation Park Kingston Jamaica',
  'hope-botanical-gardens': 'Hope Botanical Gardens Kingston Jamaica',
  'blue-mountain-scenic-drive': 'Blue Mountains Jamaica scenic drive',
  'doctors-cave-private-setup': "Doctor's Cave Beach Montego Bay Jamaica beach club",
  'kool-runnings-water-park': 'Kool Runnings Water Park Negril Jamaica',
  'hope-zoo': 'Hope Zoo Kingston Jamaica',
  'dolphin-cove-family': 'Dolphin Cove Ocho Rios Jamaica dolphins',
  'mystic-mountain-family': 'Mystic Mountain Jamaica chairlift',
  'sunset-cruise-mobay': 'Montego Bay Jamaica sunset cruise',
  'caves-restaurant-dinner': 'The Caves Restaurant Negril Jamaica',
  'blue-lagoon-romance': 'Blue Lagoon Portland Jamaica',
  'strawberry-hill-retreat': 'Strawberry Hill Jamaica mountain retreat'
};

const imagePromiseCache = new Map();

const TITLE_BLOCKLIST = [
  'map',
  'manual',
  'diaries',
  '.pdf',
  'gazette',
  'state magazine',
  'cyclopedia',
  'advertisement',
  'loc ',
  'thumbnail',
  'document'
];

function cleanTitle(value) {
  return value
    .replace(/\s*\([^)]*\)\s*/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function getQuery(item) {
  if (QUERY_OVERRIDES[item.id]) return QUERY_OVERRIDES[item.id];
  return `${cleanTitle(item.title)} ${item.location} Jamaica`;
}

function buildCommonsSearchUrl(query) {
  const params = new URLSearchParams({
    action: 'query',
    generator: 'search',
    gsrnamespace: '6',
    gsrlimit: '12',
    gsrsearch: `${query} filetype:bitmap`,
    prop: 'imageinfo',
    iiprop: 'url',
    iiurlwidth: '1400',
    format: 'json',
    origin: '*'
  });

  return `${COMMONS_API_URL}?${params.toString()}`;
}

function getCandidatesFromPages(pages) {
  return Object.values(pages)
    .sort((a, b) => (a.index || 0) - (b.index || 0))
    .map(page => ({
      title: String(page?.title || '').toLowerCase(),
      url: page?.imageinfo?.[0]?.thumburl || page?.imageinfo?.[0]?.url || ''
    }))
    .filter(candidate => Boolean(candidate.url))
    .filter(candidate => !/\.svg($|\?)/i.test(candidate.url));
}

function isCandidateAllowed(item, candidate) {
  const title = candidate.title || '';
  const isBlocked = TITLE_BLOCKLIST.some(token => title.includes(token));
  if (isBlocked) return false;

  const locationToken = String(item.location || '').toLowerCase();
  const titleToken = cleanTitle(String(item.title || ''))
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter(token => token.length >= 4)
    .slice(0, 3);

  if (title.includes('jamaica')) return true;
  if (locationToken && title.includes(locationToken)) return true;
  return titleToken.some(token => title.includes(token));
}

async function fetchCandidates(query) {
  const url = buildCommonsSearchUrl(query);
  const response = await fetch(url);
  if (!response.ok) return [];

  const data = await response.json();
  const pages = data?.query?.pages;
  if (!pages) return [];

  return getCandidatesFromPages(pages);
}

function pickUniqueUrl(item, candidates, usedUrls) {
  if (!candidates.length) return '';
  const filtered = candidates.filter(candidate => isCandidateAllowed(item, candidate));
  const pool = filtered.length ? filtered : candidates;
  const unique = pool.find(candidate => !usedUrls.has(candidate.url));
  return (unique || pool[0] || {}).url || '';
}

export function getExcursionImageForCard(item, usedUrls) {
  const pinned = PINNED_IMAGE_OVERRIDES[item.id];
  if (pinned) {
    usedUrls.add(pinned);
    return Promise.resolve(pinned);
  }

  const existing = imagePromiseCache.get(item.id);
  if (existing) {
    return existing.then(url => {
      if (url) usedUrls.add(url);
      return url;
    });
  }

  const imagePromise = fetchCandidates(getQuery(item))
    .then(candidates => pickUniqueUrl(item, candidates, usedUrls))
    .catch(() => '');

  imagePromiseCache.set(item.id, imagePromise);

  return imagePromise.then(url => {
    if (url) usedUrls.add(url);
    return url;
  });
}
