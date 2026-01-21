// MyDreamConsultancy – responsive interactions & enhancements
(function () {
  const body = document.body;
  const header = document.getElementById('site-header');
  const toggle = document.querySelector('.nav-toggle');
  const navLinks = document.getElementById('primary-nav');

  // ===== Header shadow on scroll =====
  function setHeaderShadow() {
    if (!header) return;
    const scrolled = window.scrollY > 8;
    header.classList.toggle('scrolled', scrolled);
  }

  // ===== Mobile menu toggle =====
  if (toggle && navLinks) {
    toggle.addEventListener('click', () => {
      const expanded = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!expanded));
      toggle.classList.toggle('active');
      navLinks.classList.toggle('active');
      body.classList.toggle('menu-open');
    });
  }

  // ===== Close menu when a link is clicked =====
  if (navLinks) {
    navLinks.querySelectorAll('a').forEach((a) => {
      a.addEventListener('click', () => {
        navLinks.classList.remove('active');
        toggle.classList.remove('active');
        body.classList.remove('menu-open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // ===== Smooth scroll with header offset =====
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href');
      if (!id || id === '#') return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      const top =
        target.getBoundingClientRect().top +
        window.pageYOffset -
        (header?.offsetHeight || 0) -
        6;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

  // ===== FAQ accordion (only one open at a time) =====
  const faqs = document.querySelectorAll('.faq-item');
  faqs.forEach((d) => {
    d.addEventListener('toggle', () => {
      if (d.open) {
        faqs.forEach((o) => o !== d && (o.open = false));
      }
    });
  });

  // ===== Fallback for broken images =====
  const placeholder = 'assets/img/placeholder-16x9.svg';
  document.querySelectorAll('.photo-card img').forEach((img) => {
    img.addEventListener('error', () => {
      if (img.dataset.fallbackApplied) return;
      img.dataset.fallbackApplied = 'true';
      img.src = placeholder;
    });
  });

  // ===== Hero image airplane fallback =====
  const heroImg = document.querySelector('.hero-media img.hero-img');
  if (heroImg) {
    const remotePlane =
      'https://images.pexels.com/photos/46148/aircraft-jet-landing-cloud-46148.jpeg?auto=compress&cs=tinysrgb&w=1920';
    heroImg.addEventListener('error', () => {
      if (heroImg.dataset.fallbackApplied) return;
      heroImg.dataset.fallbackApplied = 'true';
      heroImg.src = remotePlane;
    });
  }

  // ===== Close menu with Escape key =====
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      body.classList.remove('menu-open');
      navLinks.classList.remove('active');
      toggle.classList.remove('active');
      toggle.setAttribute('aria-expanded', 'false');
    }
  });

  // ===== Initialize header shadow =====
  window.addEventListener('scroll', setHeaderShadow, { passive: true });
  setHeaderShadow();
})();
