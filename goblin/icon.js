document.addEventListener('DOMContentLoaded', () => {
  const currentPath = window.location.pathname.split('/').pop(); // e.g. "index.html"
  document.querySelectorAll('.app-nav .tab').forEach(tab => {
    const href = tab.getAttribute('href');
    if (href === currentPath || (href === 'index.html' && currentPath === '')) {
      tab.classList.add('active');
    }
  });
});