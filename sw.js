// 旧バージョン(Supabase版)をホーム画面に追加していた端末のための後片付け。
// 古いキャッシュをすべて削除し、自分自身も登録解除して、新しいアプリを読み込ませる。
self.addEventListener('install', () => self.skipWaiting());

self.addEventListener('activate', (e) => {
  e.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.map((k) => caches.delete(k)));
    await self.registration.unregister();
    const clientList = await self.clients.matchAll({ type: 'window' });
    clientList.forEach((c) => c.navigate(c.url));
  })());
});
