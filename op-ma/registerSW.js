if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    // One-shot cache bust: stale SW was serving a Sept 1 bundle after Pages publishes.
    const bustKey = 'opma-sw-bust-2026-09-04b';
    if (!localStorage.getItem(bustKey)) {
      Promise.all([
        navigator.serviceWorker.getRegistrations().then((regs) =>
          Promise.all(regs.map((r) => r.unregister())),
        ),
        caches.keys().then((keys) => Promise.all(keys.map((k) => caches.delete(k)))),
      ]).finally(() => {
        localStorage.setItem(bustKey, '1');
        location.reload();
      });
      return;
    }
    navigator.serviceWorker
      .register('/op-ma/sw.js', { scope: '/op-ma/' })
      .then((reg) => reg.update().catch(() => undefined))
      .catch(() => undefined);
  });
}
