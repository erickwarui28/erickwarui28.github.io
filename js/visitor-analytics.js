(() => {
  'use strict';
  if (location.hostname !== 'erickwarui28.github.io' || !['/', '/index.html'].includes(location.pathname)) return;
  const endpoint = 'https://67.211.211.236/site-analytics/collect.php';
  const key = 'es-analytics-consent';
  let enabled = false, timer, active = 0, wasVisible = !document.hidden, last = performance.now(), queue = [], sequence = 0;
  const visit = crypto.randomUUID();
  let visitor;
  const banner = document.createElement('aside');
  banner.style.cssText = 'position:fixed;bottom:0;left:0;right:0;z-index:9999;display:flex;justify-content:center;align-items:center;gap:24px;background:#262626;color:#eee;padding:14px 24px;border-top:1px solid #d4af3755;font:14px/1.5 system-ui;box-shadow:0 -4px 20px #0003';
  banner.setAttribute('aria-label', 'Visitor analytics notice');
  banner.innerHTML = '<span>By visiting this site, you agree to visitor analytics.</span><button type="button" data-choice="dismiss" style="padding:8px 20px;border-radius:20px;border:1px solid #d4af37;background:#d4af37;color:#222;font:600 14px system-ui;cursor:pointer;flex-shrink:0">Dismiss</button>';
  function saved() { try { return localStorage.getItem(key); } catch { return null; } }
  function tick() { const now = performance.now(); if (wasVisible) active += Math.min(now - last, 20000); last = now; wasVisible = !document.hidden; }
  function event(type, target = '', value = 0) { if (enabled && queue.length < 80) queue.push({type, target: target.slice(0,120), value, at: new Date().toISOString()}); }
  function flush() {
    if (!enabled) return;
    tick();
    const payload = JSON.stringify({visit, visitor, sequence: ++sequence, active: Math.round(active / 1000), events: queue.splice(0), referrer: (() => { try { return new URL(document.referrer).hostname; } catch { return ''; } })(), screen: `${innerWidth}x${innerHeight}`, language: navigator.language});
    fetch(endpoint, {method:'POST', body:payload, headers:{'Content-Type':'text/plain'}, keepalive:true, credentials:'omit'}).catch(() => {});
  }
  function start() {
    if (enabled || navigator.globalPrivacyControl || navigator.doNotTrack === '1') return;
    enabled = true; last = performance.now();
    try { visitor = localStorage.getItem('es-visitor') || crypto.randomUUID(); localStorage.setItem('es-visitor', visitor); } catch { visitor = crypto.randomUUID(); }
    event('pageview'); flush(); timer = setInterval(flush,15000);
  }
  banner.addEventListener('click', e => {
    const choice = e.target.dataset.choice; if (!choice) return;
    if (choice === 'dismiss') { try { localStorage.setItem('es-notice-dismissed','yes'); } catch {} banner.remove(); return; }
    try { localStorage.setItem(key, choice); if (choice === 'no') localStorage.removeItem('es-visitor'); } catch {}
    if (choice === 'no') { enabled=false; clearInterval(timer); queue=[]; }
    banner.remove(); if (choice === 'yes') start();
  });
  if (saved() !== 'no') start();
  let dismissed = false; try { dismissed = localStorage.getItem('es-notice-dismissed') === 'yes'; } catch {}
  if (!dismissed && saved() !== 'no') document.body.append(banner);
  function target(el) { return el?.closest('[data-analytics],button,a,input,select,textarea,summary')?.getAttribute('data-analytics') || el?.closest('[id]')?.id || el?.tagName?.toLowerCase() || 'page'; }
  document.addEventListener('click', e => event('click',target(e.target)));
  document.addEventListener('change', e => event('change',target(e.target)));
  document.addEventListener('submit', e => event('submit',target(e.target)));
  document.addEventListener('focusin', e => event('focus',target(e.target)));
  document.addEventListener('play', e => event('media_play',target(e.target)),true);
  document.addEventListener('pause', e => event('media_pause',target(e.target)),true);
  document.addEventListener('toggle', e => event('toggle',target(e.target)),true);
  let depth = 0;
  addEventListener('scroll', () => { const d = Math.min(100,Math.round((scrollY+innerHeight)/Math.max(document.documentElement.scrollHeight,1)*100)); if (d >= depth+25) { depth = Math.floor(d/25)*25; event('scroll','page',depth); } },{passive:true});
  document.addEventListener('visibilitychange', () => { tick(); event(document.hidden?'hidden':'visible'); flush(); });
  addEventListener('pagehide',flush);
})();
