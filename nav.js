// Theme toggle
const THEME_KEY = 'km_theme';
function applyTheme(t) {
  document.body.classList.toggle('light', t === 'light');
  const btn = document.getElementById('themeBtn');
  if (btn) btn.textContent = t === 'light' ? '🌙' : '☀️';
}
function toggleTheme() {
  const current = localStorage.getItem(THEME_KEY) === 'light' ? 'light' : 'dark';
  const next = current === 'light' ? 'dark' : 'light';
  localStorage.setItem(THEME_KEY, next);
  applyTheme(next);
}
(function () {
  const saved = localStorage.getItem(THEME_KEY) || 'dark';
  applyTheme(saved);
})();

// Mobile menu
function toggleMenu() {
  document.getElementById('mobileMenu').classList.toggle('open');
}
document.addEventListener('click', function (e) {
  const m = document.getElementById('mobileMenu');
  if (m && !m.contains(e.target) && !e.target.classList.contains('hamburger')) {
    m.classList.remove('open');
  }
});

// Scroll reveal
document.addEventListener('DOMContentLoaded', function () {
  const els = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); }
    });
  }, { threshold: 0.12 });
  els.forEach(el => io.observe(el));
});

// Lightbox
function openLightbox(src) {
  const lb = document.getElementById('lightbox');
  const img = document.getElementById('lbImg');
  if (lb && img) { img.src = src; lb.classList.add('open'); }
}
function closeLightbox() {
  document.getElementById('lightbox')?.classList.remove('open');
}
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLightbox(); });

// dynamic loading removed – all content is now inlined in index.html

// highlight section link as you scroll
const sections = ['home', 'journey', 'projects', 'skills', 'training',
  'certificates', 'achievements', 'resume', 'contact'];
let ticking = false;
window.addEventListener('scroll', () => {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      const pos = window.scrollY + 80; // account for fixed nav
      sections.forEach(id => {
        const el = document.getElementById(id);
        const link = document.querySelector(`.nav-links a[href="#${id}"]`);
        if (!el || !link) return;
        if (pos >= el.offsetTop && pos < el.offsetTop + el.offsetHeight) {
          link.classList.add('active');
        } else {
          link.classList.remove('active');
        }
      });
      ticking = false;
    });
    ticking = true;
  }
}, { passive: true });
