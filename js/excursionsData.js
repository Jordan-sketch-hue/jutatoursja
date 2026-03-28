export const EXCURSIONS = [
  // Nature
  { id: 'dunns-river-falls', title: "Dunn's River Falls", category: 'Nature', location: 'Ocho Rios', duration: '3 hrs', priceFrom: 45, image: 'assets/images/jamaica-falls.jpg', summary: 'Guided waterfall climb plus beach access at Jamaica\'s iconic falls.' },
  { id: 'blue-hole-secret-falls', title: 'Blue Hole (Secret Falls / Island Gully)', category: 'Nature', location: 'St. Ann', duration: '3 hrs', priceFrom: 55, image: 'assets/images/jamaica-falls.jpg', summary: 'Blue spring pools, rope swings, and rainforest cascades.' },
  { id: 'ys-falls', title: 'YS Falls', category: 'Nature', location: 'St. Elizabeth', duration: '4 hrs', priceFrom: 60, image: 'assets/images/jamaica-falls.jpg', summary: 'Seven-tier waterfall gardens with natural pools and canopy zipline.' },
  { id: 'reach-falls', title: 'Reach Falls', category: 'Nature', location: 'Portland', duration: '4 hrs', priceFrom: 60, image: 'assets/images/jamaica-falls.jpg', summary: 'River cave and jungle waterfall adventure in eastern Jamaica.' },
  { id: 'green-grotto-caves', title: 'Green Grotto Caves', category: 'Nature', location: 'Discovery Bay', duration: '2 hrs', priceFrom: 40, image: 'assets/images/jamaica-culture.jpg', summary: 'Historic limestone cave network with underground lake.' },
  { id: 'blue-mountains-tour', title: 'Blue Mountains (hiking + coffee tours)', category: 'Nature', location: 'St. Andrew', duration: 'Full Day', priceFrom: 95, image: 'assets/images/jamaica-mountains.jpg', summary: 'Sunrise trails and origin coffee tastings above Kingston.' },
  { id: 'cockpit-country', title: 'Cockpit Country', category: 'Nature', location: 'Trelawny', duration: 'Full Day', priceFrom: 110, image: 'assets/images/jamaica-mountains.jpg', summary: 'Karst valleys, endemic wildlife, and expert local nature guiding.' },
  { id: 'black-river-safari', title: 'Black River Safari Tour', category: 'Nature', location: 'St. Elizabeth', duration: '3 hrs', priceFrom: 55, image: 'assets/images/jamaica-river-rafting.jpg', summary: 'Boat safari through mangroves and crocodile habitat.' },
  { id: 'martha-brae-rafting', title: 'Martha Brae River bamboo rafting', category: 'Nature', location: 'Trelawny', duration: '2 hrs', priceFrom: 50, image: 'assets/images/jamaica-river-rafting.jpg', summary: 'Slow scenic bamboo rafting with local raft captain.' },
  { id: 'rio-grande-rafting', title: 'Rio Grande River rafting', category: 'Nature', location: 'Portland', duration: '3-4 hrs', priceFrom: 80, image: 'assets/images/jamaica-river-rafting.jpg', summary: 'Long-form bamboo raft journey through lush Portland valleys.' },

  // Beach
  { id: 'seven-mile-beach', title: 'Seven Mile Beach', category: 'Beach', location: 'Negril', duration: 'Full Day', priceFrom: 85, image: 'assets/images/jamaica-beach.jpg', summary: 'White-sand stretch, calm clear water, and sunset energy.' },
  { id: 'doctors-cave-beach', title: "Doctor's Cave Beach", category: 'Beach', location: 'Montego Bay', duration: 'Half Day', priceFrom: 45, image: 'assets/images/jamaica-beach.jpg', summary: 'Classic Mobay beach club known for turquoise calm water.' },
  { id: 'frenchmans-cove', title: "Frenchman's Cove", category: 'Beach', location: 'Portland', duration: 'Half Day', priceFrom: 60, image: 'assets/images/jamaica-beach.jpg', summary: 'River-meets-sea cove framed by tropical greenery.' },
  { id: 'boston-bay-beach', title: 'Boston Bay Beach', category: 'Beach', location: 'Portland', duration: 'Half Day', priceFrom: 55, image: 'assets/images/jamaica-beach.jpg', summary: 'Surf-friendly bay near Jamaica\'s jerk heartland.' },
  { id: 'winnifred-beach', title: 'Winnifred Beach', category: 'Beach', location: 'Portland', duration: 'Half Day', priceFrom: 50, image: 'assets/images/jamaica-beach.jpg', summary: 'Community-loved beach with authentic local vibe.' },
  { id: 'hellshire-beach', title: 'Hellshire Beach', category: 'Beach', location: 'St. Catherine', duration: 'Half Day', priceFrom: 45, image: 'assets/images/jamaica-beach.jpg', summary: 'Popular fish beach with local weekend atmosphere.' },
  { id: 'james-bond-beach', title: 'James Bond Beach', category: 'Beach', location: 'St. Mary', duration: 'Half Day', priceFrom: 50, image: 'assets/images/jamaica-beach.jpg', summary: 'North-coast beach spot tied to Bond film lore.' },

  // Culture
  { id: 'bob-marley-museum', title: 'Bob Marley Museum', category: 'Culture', location: 'Kingston', duration: '2 hrs', priceFrom: 55, image: 'assets/images/jamaica-bob-marley.jpg', summary: 'Walk through 56 Hope Road and reggae history.' },
  { id: 'devon-house', title: 'Devon House', category: 'Culture', location: 'Kingston', duration: '2 hrs', priceFrom: 35, image: 'assets/images/jamaica-culture.jpg', summary: 'Historic mansion, courtyard food, and island heritage.' },
  { id: 'rose-hall-great-house', title: 'Rose Hall Great House (haunted night tour)', category: 'Culture', location: 'Montego Bay', duration: '2 hrs', priceFrom: 50, image: 'assets/images/jamaica-culture.jpg', summary: 'Legendary Georgian estate with night storytelling tour.' },
  { id: 'accompong-maroon-village', title: 'Accompong Maroon Village', category: 'Culture', location: 'St. Elizabeth', duration: 'Full Day', priceFrom: 95, image: 'assets/images/jamaica-culture.jpg', summary: 'Maroon history, drumming, and indigenous heritage.' },
  { id: 'rastafari-indigenous-village', title: 'Rastafari Indigenous Village', category: 'Culture', location: 'Montego Bay', duration: '3 hrs', priceFrom: 55, image: 'assets/images/jamaica-culture.jpg', summary: 'Roots culture immersion with drumming and ital traditions.' },
  { id: 'falmouth-historic-district', title: 'Falmouth Historic District', category: 'Culture', location: 'Trelawny', duration: '2 hrs', priceFrom: 40, image: 'assets/images/jamaica-culture.jpg', summary: 'Georgian port-town architecture and guided heritage walk.' },
  { id: 'port-royal', title: 'Port Royal', category: 'Culture', location: 'Kingston', duration: '2 hrs', priceFrom: 40, image: 'assets/images/jamaica-culture.jpg', summary: 'Historic pirate city and maritime fort history.' },

  // Food
  { id: 'scotchies', title: 'Scotchies (jerk chicken/pork)', category: 'Food', location: 'Montego Bay', duration: '2 hrs', priceFrom: 35, image: 'assets/images/jamaica-food.jpg', summary: 'Legendary jerk stop with pimento-wood smoke flavor.' },
  { id: 'ricks-cafe-dining', title: "Rick's Cafe (sunset + cliff diving + dining)", category: 'Food', location: 'Negril', duration: '3 hrs', priceFrom: 50, image: 'assets/images/jamaica-food.jpg', summary: 'Sunset dining with iconic cliff-diving scene.' },
  { id: 'boston-jerk-centre', title: 'Boston Jerk Centre', category: 'Food', location: 'Portland', duration: '2 hrs', priceFrom: 35, image: 'assets/images/jamaica-food.jpg', summary: 'Original jerk corridor with authentic pit cooking.' },
  { id: 'glorias-seafood', title: "Gloria's Seafood", category: 'Food', location: 'Kingston', duration: '2 hrs', priceFrom: 40, image: 'assets/images/jamaica-food.jpg', summary: 'Local seafood institution with waterfront energy.' },
  { id: 'kingston-street-food-flavours', title: 'Kingston Street Food & Flavours', category: 'Food', location: 'Kingston', duration: '3 hrs', priceFrom: 50, image: 'assets/images/jamaica-food.jpg', summary: 'Curated tasting route through Kingston favorites, from jerk to patties.' },
  { id: 'appleton-estate', title: 'Appleton Estate rum tours', category: 'Food', location: 'St. Elizabeth', duration: '4 hrs', priceFrom: 65, image: 'assets/images/jamaica-food.jpg', summary: 'Estate-to-glass rum heritage tour and tasting.' },
  { id: 'sweetwood-jerk-joint', title: 'Sweetwood Jerk Joint', category: 'Food', location: 'Kingston', duration: '2 hrs', priceFrom: 35, image: 'assets/images/jamaica-food.jpg', summary: 'Fast local favorite for jerk and sides.' },
  { id: 'tracks-and-records', title: "Usain Bolt's Tracks & Records", category: 'Food', location: 'Kingston', duration: '2 hrs', priceFrom: 40, image: 'assets/images/jamaica-food.jpg', summary: 'Sports bar dining with nightlife crossover.' },

  // Adventure
  { id: 'mystic-mountain', title: 'Mystic Mountain (zipline + bobsled)', category: 'Adventure', location: 'Ocho Rios', duration: '3 hrs', priceFrom: 75, image: 'assets/images/jamaica-mystic.jpg', summary: 'Bobsled, zipline, and chairlift in rainforest terrain.' },
  { id: 'chukka-caribbean', title: 'Chukka Caribbean Adventures (ATV, zipline, horseback)', category: 'Adventure', location: 'Multiple parishes', duration: 'Half Day', priceFrom: 85, image: 'assets/images/jamaica-mystic.jpg', summary: 'High-adrenaline bundles across land and trail routes.' },
  { id: 'dolphin-cove-adventure', title: 'Dolphin Cove', category: 'Adventure', location: 'Ocho Rios', duration: '3 hrs', priceFrom: 90, image: 'assets/images/jamaica-mystic.jpg', summary: 'Marine interaction park with added activity options.' },
  { id: 'yaaman-adventure-park', title: 'Yaaman Adventure Park', category: 'Adventure', location: 'Ocho Rios', duration: '3 hrs', priceFrom: 80, image: 'assets/images/jamaica-mystic.jpg', summary: 'ATV rides, mud tracks, and Jamaican cooking moments.' },
  { id: 'blue-hole-mineral-spring', title: 'Blue Hole Mineral Spring', category: 'Adventure', location: 'Negril', duration: '2 hrs', priceFrom: 45, image: 'assets/images/jamaica-mystic.jpg', summary: 'Mineral spring cave jump and countryside views.' },
  { id: 'luminous-lagoon-swim', title: 'Luminous Lagoon night glow swim', category: 'Adventure', location: 'Falmouth', duration: '2 hrs', priceFrom: 40, image: 'assets/images/glistening-waters-falmouth.jpg', summary: 'Night swim where the water glows with movement.' },
  { id: 'negril-cliffs-diving', title: 'Negril Cliffs cliff diving', category: 'Adventure', location: 'Negril', duration: '3 hrs', priceFrom: 55, image: 'assets/images/jamaica-mystic.jpg', summary: 'Cliff-side viewing and optional guided jump zones.' },

  // Luxury
  { id: 'private-yacht-mobay', title: 'Private yacht charter - Montego Bay Marine Park', category: 'Luxury', location: 'Montego Bay', duration: '4 hrs', priceFrom: 350, image: 'assets/images/jamaica-pelican-bar.jpg', summary: 'Private vessel charter with custom onboard itinerary.' },
  { id: 'helicopter-island-tour', title: 'Helicopter tours (island aerial views)', category: 'Luxury', location: 'Island-wide', duration: '1 hr', priceFrom: 450, image: 'assets/images/jamaica-lagoon-sunset.jpg', summary: 'Aerial Jamaica circuit for premium travelers.' },
  { id: 'tryall-roundhill-villas', title: 'Private villas in Tryall Club / Round Hill', category: 'Luxury', location: 'Montego Bay', duration: 'Custom', priceFrom: 500, image: 'assets/images/jamaica-lagoon-sunset.jpg', summary: 'Private-villa transfer and concierge coordination.' },
  { id: 'taboo-nightclub-vip', title: 'VIP nightlife: Taboo Nightclub', category: 'Luxury', location: 'Montego Bay', duration: 'Night', priceFrom: 200, image: 'assets/images/jamaica-concert.jpg', summary: 'VIP nightlife routing with private transport.' },
  { id: 'strawberry-hill-spa', title: 'Spa day: Strawberry Hill Spa', category: 'Luxury', location: 'Blue Mountains', duration: 'Half Day', priceFrom: 180, image: 'assets/images/jamaica-lagoon-sunset.jpg', summary: 'Mountain wellness retreat and scenic spa experiences.' },
  { id: 'pelican-bar-sunset-boat-trip', title: 'Pelican Bar Sunset Boat Trip', category: 'Luxury', location: 'St. Elizabeth', duration: '5 hrs', priceFrom: 150, image: 'assets/images/jamaica-pelican-bar.jpg', summary: 'Sandbar bar sunset trip with private boat options and photo stops.' },

  // Hidden Gems
  { id: 'somerset-falls', title: 'Somerset Falls', category: 'Hidden Gems', location: 'Portland', duration: '3 hrs', priceFrom: 60, image: 'assets/images/jamaica-mayfield.jpg', summary: 'Boat-in grotto waterfall and quiet tropical gardens.' },
  { id: 'konoko-falls', title: 'Konoko Falls', category: 'Hidden Gems', location: 'Ocho Rios', duration: '2 hrs', priceFrom: 45, image: 'assets/images/jamaica-mayfield.jpg', summary: 'Terraced falls and botanical trails with fewer crowds.' },
  { id: 'reggae-falls', title: 'Reggae Falls', category: 'Hidden Gems', location: 'St. Thomas', duration: '3 hrs', priceFrom: 65, image: 'assets/images/jamaica-mayfield.jpg', summary: 'Natural falls with local countryside atmosphere.' },
  { id: 'cane-river-falls', title: 'Cane River Falls', category: 'Hidden Gems', location: 'St. Andrew', duration: '2 hrs', priceFrom: 50, image: 'assets/images/jamaica-mayfield.jpg', summary: 'Off-path waterfall spot ideal for private moments.' },
  { id: 'lovers-leap', title: 'Lovers Leap', category: 'Hidden Gems', location: 'St. Elizabeth', duration: '2 hrs', priceFrom: 45, image: 'assets/images/jamaica-mayfield.jpg', summary: 'South-coast cliff viewpoint with dramatic sea panoramas.' },
  { id: 'milk-river-bath', title: 'Milk River Bath', category: 'Hidden Gems', location: 'Clarendon', duration: '2 hrs', priceFrom: 45, image: 'assets/images/jamaica-mayfield.jpg', summary: 'Mineral-rich thermal bath destination with local history.' },

  // Accessible
  { id: 'emancipation-park', title: 'Emancipation Park (flat + accessible)', category: 'Accessible', location: 'Kingston', duration: '2 hrs', priceFrom: 35, image: 'assets/images/jamaica-accessible-transport.jpg', summary: 'Smooth pathways and city-center accessible leisure route.' },
  { id: 'hope-botanical-gardens', title: 'Hope Botanical Gardens', category: 'Accessible', location: 'Kingston', duration: '2 hrs', priceFrom: 35, image: 'assets/images/jamaica-accessible-transport.jpg', summary: 'Mobility-friendly garden paths and shaded open grounds.' },
  { id: 'blue-mountain-scenic-drive', title: 'Scenic Blue Mountain drive (no hike option)', category: 'Accessible', location: 'St. Andrew', duration: 'Half Day', priceFrom: 70, image: 'assets/images/jamaica-mountains.jpg', summary: 'View-heavy mountain route with minimal walking required.' },
  { id: 'doctors-cave-private-setup', title: "Private beach setups at Doctor's Cave", category: 'Accessible', location: 'Montego Bay', duration: 'Half Day', priceFrom: 85, image: 'assets/images/jamaica-accessible-transport.jpg', summary: 'Assisted setup for accessible beach comfort and shade.' },

  // Family
  { id: 'kool-runnings-water-park', title: 'Kool Runnings Water Park', category: 'Family', location: 'Negril', duration: 'Half Day', priceFrom: 55, image: 'assets/images/jamaica-mystic.jpg', summary: 'Slides, pools, and family-safe water fun.' },
  { id: 'hope-zoo', title: 'Hope Zoo', category: 'Family', location: 'Kingston', duration: '2 hrs', priceFrom: 35, image: 'assets/images/jamaica-mystic.jpg', summary: 'Kid-friendly wildlife visit inside Hope Gardens area.' },
  { id: 'dolphin-cove-family', title: 'Dolphin Cove', category: 'Family', location: 'Ocho Rios', duration: '3 hrs', priceFrom: 90, image: 'assets/images/jamaica-mystic.jpg', summary: 'Family marine interaction packages with guided support.' },
  { id: 'mystic-mountain-family', title: 'Mystic Mountain', category: 'Family', location: 'Ocho Rios', duration: '3 hrs', priceFrom: 75, image: 'assets/images/jamaica-mystic.jpg', summary: 'Rainforest rides and activities for mixed-age groups.' },

  // Couples
  { id: 'sunset-cruise-mobay', title: 'Sunset cruise in Montego Bay', category: 'Couples', location: 'Montego Bay', duration: '2 hrs', priceFrom: 120, image: 'assets/images/jamaica-lagoon-sunset.jpg', summary: 'Golden-hour cruise with private or shared options.' },
  { id: 'caves-restaurant-dinner', title: 'Private dinner at The Caves Restaurant', category: 'Couples', location: 'Negril', duration: 'Evening', priceFrom: 140, image: 'assets/images/jamaica-lagoon-sunset.jpg', summary: 'Romantic cliffside dinner transfer and timing service.' },
  { id: 'blue-lagoon-romance', title: 'Blue Lagoon romance tour', category: 'Couples', location: 'Portland', duration: 'Half Day', priceFrom: 110, image: 'assets/images/jamaica-lagoon-sunset.jpg', summary: 'Private lagoon route built for scenic romantic pacing.' },
  { id: 'strawberry-hill-retreat', title: 'Spa + retreat at Strawberry Hill', category: 'Couples', location: 'Blue Mountains', duration: 'Half Day', priceFrom: 180, image: 'assets/images/jamaica-lagoon-sunset.jpg', summary: 'Spa and mountain retreat for honeymoon-style days.' }
];

export const CATEGORY_ORDER = [
  'Nature',
  'Beach',
  'Culture',
  'Food',
  'Adventure',
  'Luxury',
  'Hidden Gems',
  'Accessible',
  'Family',
  'Couples'
];

export function getExcursionById(id) {
  return EXCURSIONS.find(item => item.id === id);
}

export function getExcursionsByCategory(category) {
  return EXCURSIONS.filter(item => item.category === category);
}
