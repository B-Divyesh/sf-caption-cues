const offline = document.querySelector<HTMLElement>('#offline');

function setOnlineState() {
  if (offline) offline.hidden = navigator.onLine;
}

window.addEventListener('online', setOnlineState);
window.addEventListener('offline', setOnlineState);
setOnlineState();

const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming | undefined;
let cameFromThisSite = false;
try { cameFromThisSite = Boolean(document.referrer) && new URL(document.referrer).origin === location.origin; }
catch { cameFromThisSite = false; }

function focusRouteHeading() {
  const heading = document.querySelector<HTMLElement>('h1');
  const announcement = document.querySelector<HTMLElement>('#route-status');
  requestAnimationFrame(() => {
    heading?.focus({ preventScroll: true });
    if (announcement && heading) announcement.textContent = `${heading.textContent ?? ''} page loaded`;
  });
}

if (cameFromThisSite || navigation?.type === 'back_forward') focusRouteHeading();
window.addEventListener('pageshow', (event) => { if (event.persisted) focusRouteHeading(); });

if ('serviceWorker' in navigator && (location.protocol === 'https:' || ['localhost', '127.0.0.1'].includes(location.hostname))) {
  void navigator.serviceWorker.register('/service-worker.js', { updateViaCache: 'none' });
}
