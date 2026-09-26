// 制作マネージャー：オフラインでも開けるようにする（通信はページ本体の取得だけ）
const CACHE = "seisaku-v5";
const FILES = ["./", "./index.html", "./manifest.json", "./icon.svg"];
self.addEventListener("install", e => {
  // 控えを作るときもブラウザの古い控えを使わない
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES.map(f => new Request(f, { cache: "reload" })))).then(() => self.skipWaiting()));
});
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
// ネット優先（ブラウザの控えも使わず毎回取りにいく）・だめなら控え
self.addEventListener("fetch", e => {
  if (e.request.method !== "GET") return;
  e.respondWith(
    fetch(e.request, { cache: "no-store" }).then(r => {
      const copy = r.clone();
      caches.open(CACHE).then(c => c.put(e.request, copy));
      return r;
    }).catch(() => caches.match(e.request, { ignoreSearch: true }).then(r => r || caches.match("./index.html")))
  );
});
