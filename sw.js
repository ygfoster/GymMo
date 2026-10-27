// GymMo（Gemini 版）の公開終了にあたり、以前インストールされたサービスワーカーを片付けるためのもの。
// 更新されるとキャッシュを消して自分を登録解除し、開いている画面を再読み込みする（index.html が GymMo2 へ転送する）。
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(keys.filter((k) => k.startsWith('gym-memo')).map((k) => caches.delete(k)));
      await self.registration.unregister();
      const clients = await self.clients.matchAll({ type: 'window' });
      clients.forEach((c) => c.navigate(c.url));
    })()
  );
});
