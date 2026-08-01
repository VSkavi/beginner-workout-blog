// ============================================
// Mobile nav toggle
// ============================================
const navToggle = document.getElementById('navToggle');
const mobileNav = document.getElementById('mobileNav');

if (navToggle && mobileNav) {
  navToggle.addEventListener('click', () => {
    const isOpen = mobileNav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  // Close mobile nav after tapping a link
  mobileNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      mobileNav.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

// ============================================
// FAQ accordion
// ============================================
const accTriggers = document.querySelectorAll('.acc-trigger');

accTriggers.forEach((trigger) => {
  const panel = trigger.nextElementSibling;
  panel.style.maxHeight = '0px';

  trigger.addEventListener('click', () => {
    const isOpen = trigger.getAttribute('aria-expanded') === 'true';

    // Close all other panels (single-open accordion)
    accTriggers.forEach((other) => {
      if (other !== trigger) {
        other.setAttribute('aria-expanded', 'false');
        other.nextElementSibling.style.maxHeight = '0px';
      }
    });

    trigger.setAttribute('aria-expanded', String(!isOpen));
    panel.style.maxHeight = isOpen ? '0px' : `${panel.scrollHeight}px`;
  });
});

// ============================================
// Scroll reveal (respects reduced motion)
// ============================================
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const revealEls = document.querySelectorAll('[data-reveal]');

if (prefersReducedMotion || !('IntersectionObserver' in window)) {
  revealEls.forEach((el) => el.classList.add('is-visible'));
} else {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  revealEls.forEach((el) => observer.observe(el));
}
