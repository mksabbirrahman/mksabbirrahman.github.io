// script.js — page behaviors for index.html

document.addEventListener('DOMContentLoaded', () => {
  // Set current year
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Smooth scroll for internal links
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (!href) return;
      if (href.startsWith('#') && href.length > 1) {
        const el = document.querySelector(href);
        if (el) {
          e.preventDefault();
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          try { history.replaceState(null, '', href); } catch (_) {}
        }
      }
    });
  });

  // Mobile nav toggle (progressive enhancement)
  (function setupMobileNavToggle() {
    const navInner = document.querySelector('.nav-inner');
    if (!navInner) return;
    const navLinks = navInner.querySelector('.nav-links');
    if (!navLinks) return;

    // Create toggle button if not present
    let toggle = document.getElementById('nav-toggle');
    if (!toggle) {
      toggle = document.createElement('button');
      toggle.id = 'nav-toggle';
      toggle.type = 'button';
      toggle.className = 'nav-toggle';
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-controls', 'primary-navigation');
      toggle.setAttribute('aria-label', 'Toggle menu');
      toggle.innerHTML = '<span class="visually-hidden">Menu</span><span aria-hidden="true">☰</span>';
      navInner.insertBefore(toggle, navInner.firstChild);
      // Add id to nav-links for aria-controls
      navLinks.id = navLinks.id || 'primary-navigation';
    }

    // Toggle behavior
    toggle.addEventListener('click', () => {
      const expanded = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!expanded));
      // toggle class instead of inline style where possible
      if (!expanded) {
        navLinks.style.display = 'flex';
      } else {
        navLinks.style.display = '';
      }
    });

    // Ensure nav is visible on large screens after resize
    window.addEventListener('resize', () => {
      if (window.innerWidth > 560) {
        navLinks.style.display = 'flex';
        toggle.setAttribute('aria-expanded', 'false');
      } else {
        // keep current state (do not force close)
        if (toggle.getAttribute('aria-expanded') === 'false') navLinks.style.display = '';
      }
    });

    // Close menu when pressing Escape
    document.addEventListener('keydown', (ev) => {
      if (ev.key === 'Escape') {
        navLinks.style.display = '';
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  })();

  // Contact form handling (simulated send)
  (function setupContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;
    const status = document.getElementById('form-status');

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      // Basic client-side validation fallback
      const formData = new FormData(form);
      const name = (formData.get('name') || '').toString().trim();
      const email = (formData.get('email') || '').toString().trim();
      const message = (formData.get('message') || '').toString().trim();

      if (!name || !email || !message) {
        if (status) status.textContent = 'Please complete all required fields.';
        return;
      }

      if (status) status.textContent = 'Sending…';
      // Simulate an async send (replace this with a real endpoint or form service)
      setTimeout(() => {
        if (status) status.textContent = 'Message sent — thank you! I will reply soon.';
        form.reset();
      }, 900);
    });
  })();

  // Friendly fallback for CTA links that are placeholders
  document.querySelectorAll('a.cta').forEach(a => {
    const href = a.getAttribute('href');
    if (!href || href === '#') {
      a.addEventListener('click', (e) => {
        e.preventDefault();
        const project = a.closest('.project')?.querySelector('h3')?.textContent || 'this project';
        // Use a non-blocking browser-native notification for now
        // (replace with a nicer modal if you want)
        alert(`Demo not configured for ${project}. Replace the link in index.html with your project URL.`);
      });
    }
  });

  // Accessibility: ensure keyboard focus styles are visible when using keyboard
  (function manageFocusVisible() {
    function handleFirstTab(e) {
      if (e.key === 'Tab') {
        document.body.classList.add('user-is-tabbing');
        window.removeEventListener('keydown', handleFirstTab);
      }
    }
    window.addEventListener('keydown', handleFirstTab);
  })();

  // Interactive button tilt + shine following the pointer
  (function setupButtonPointerEffects() {
    const els = Array.from(document.querySelectorAll('.cta, .btn-primary'));
    if (!els.length) return;

    function onMove(e, el) {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left; // x position within the element.
      const y = e.clientY - rect.top;  // y position within the element.
      const cx = rect.width / 2;
      const cy = rect.height / 2;
      // Normalized offsets -1..1
      const nx = (x - cx) / cx;
      const ny = (y - cy) / cy;
      const ry = (nx * 10).toFixed(2) + 'deg'; // rotateY
      const rx = (-ny * 8).toFixed(2) + 'deg'; // rotateX
      const scale = 1.02;
      el.style.setProperty('--rx', rx);
      el.style.setProperty('--ry', ry);
      el.style.setProperty('--scale', scale);
      // optional shine offset
      const shine = (nx * 60).toFixed(0) + '%';
      el.style.setProperty('--shine', shine);
    }

    function onEnter(e) {
      const el = e.currentTarget;
      el.classList.add('interactive');
      el.classList.add('interactive');
      el.style.transition = 'transform .12s ease, box-shadow .12s ease';
    }

    function onLeave(e) {
      const el = e.currentTarget;
      el.classList.remove('interactive');
      el.style.setProperty('--rx', '0deg');
      el.style.setProperty('--ry', '0deg');
      el.style.setProperty('--scale', '1');
      el.style.setProperty('--shine', '-100%');
      // restore slower transition for exit
      el.style.transition = 'transform .22s cubic-bezier(.2,.9,.2,1),box-shadow .22s ease';
    }

    els.forEach(el => {
      // set defaults
      el.style.setProperty('--rx', '0deg');
      el.style.setProperty('--ry', '0deg');
      el.style.setProperty('--scale', '1');
      el.style.setProperty('--shine', '-100%');

      el.addEventListener('mousemove', (ev) => onMove(ev, el));
      el.addEventListener('mouseenter', onEnter);
      el.addEventListener('mouseleave', onLeave);
      // touch fallback: small pop on touchstart
      el.addEventListener('touchstart', () => {
        el.style.setProperty('--scale', '1.02');
        setTimeout(()=> el.style.setProperty('--scale', '1'), 160);
      }, {passive:true});
    });
  })();

});
