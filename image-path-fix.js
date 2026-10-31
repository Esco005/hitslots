/* Fix legacy absolute asset paths for GitHub Pages project path /hitslots/. */
(() => {
  const rewrite = (img) => {
    if (!(img instanceof HTMLImageElement)) return;
    const raw = img.getAttribute('src');
    if (!raw || !/^\/(cases|mascot|rewards)\//.test(raw)) return;
    img.setAttribute('src', '/hitslots' + raw);
  };
  const scan = (node) => {
    if (node instanceof HTMLImageElement) rewrite(node);
    if (node instanceof Element) node.querySelectorAll('img').forEach(rewrite);
  };
  document.addEventListener('error', (event) => {
    if (event.target instanceof HTMLImageElement) rewrite(event.target);
  }, true);
  const start = () => {
    scan(document.documentElement);
    new MutationObserver(records => {
      for (const r of records) {
        if (r.type === 'attributes') rewrite(r.target);
        for (const n of r.addedNodes) scan(n);
      }
    }).observe(document.documentElement, {childList:true, subtree:true, attributes:true, attributeFilter:['src']});
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start, {once:true});
  else start();
})();
