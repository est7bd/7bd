// includes.js — loads shared header and footer partials
// Works on Cloudflare Pages (static hosting)

async function loadInclude(selector, url) {
  const el = document.querySelector(selector);
  if (!el) return;
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Failed to load ${url}`);
    el.innerHTML = await res.text();

    // Mark active nav link
    const links = el.querySelectorAll('a');
    links.forEach(link => {
      const href = link.getAttribute('href');
      if (href && href !== '/' && window.location.pathname.startsWith(href.split('#')[0]) && href.split('#')[0] !== '/') {
        link.classList.add('active');
      } else if (href === '/' && window.location.pathname === '/') {
        link.classList.add('active');
      }
    });

    // Mobile nav toggle
    const toggle = el.querySelector('.nav-toggle');
    const navLinks = el.querySelector('.nav-links');
    if (toggle && navLinks) {
      toggle.addEventListener('click', () => {
        navLinks.classList.toggle('open');
        toggle.classList.toggle('open');
      });
    }
  } catch (e) {
    console.warn('Include load failed:', e);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  loadInclude('#header-placeholder', '/_header.html');
  loadInclude('#footer-placeholder', '/_footer.html');
});
