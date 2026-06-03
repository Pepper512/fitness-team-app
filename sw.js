// Fitness-Team service worker — offline app shell + exercise images
const CACHE = 'fitness-team-v1';
const SHELL = [
  './',
  './index.html',
  './assets/plan.js',
  './assets/icon-192.png',
  './assets/icon-512.png',
  './manifest.webmanifest'
];
const IMG = ['goblet_squat','db_floor_press','db_rdl','db_ohp','db_curl','plank',
  'hip_thrust','db_row','bulgarian','one_arm_row','db_tricep','dead_bug',
  'reverse_lunge','incline_press','lateral_raise','calf_raise','glute_bridge','side_plank']
  .map(s => `./assets/images/${s}.jpg`);

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll([...SHELL, ...IMG])).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);
  // never cache the AI API; always go to network
  if (url.hostname.includes('anthropic.com')) return;
  // cache-first for app shell + images (offline support)
  e.respondWith(
    caches.match(e.request).then(hit => hit || fetch(e.request).then(res => {
      if (e.request.method === 'GET' && res.ok && url.origin === location.origin) {
        const copy = res.clone();
        caches.open(CACHE).then(c => c.put(e.request, copy));
      }
      return res;
    }).catch(() => hit))
  );
});