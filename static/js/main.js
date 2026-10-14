document.addEventListener('DOMContentLoaded', () => {
  const header = document.getElementById('siteHeader');
  const nav = document.getElementById('mainNav');
  const toggle = document.getElementById('mobileNavToggle');
  const navLinks = [...document.querySelectorAll('.nav-link')];

  toggle?.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
  });

  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      toggle?.setAttribute('aria-expanded', 'false');
    });
  });

  const sections = [...document.querySelectorAll('main section[id]')];
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navLinks.forEach((link) => link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`));
    });
  }, { rootMargin: '-35% 0px -55% 0px', threshold: 0 });
  sections.forEach((section) => observer.observe(section));

  window.addEventListener('scroll', () => header?.classList.toggle('scrolled', window.scrollY > 8), { passive: true });

  [['tableauDashboardViz', 'dashboardLoader'], ['tableauStoryViz', 'storyLoader']].forEach(([vizId, loaderId]) => {
    document.getElementById(vizId)?.addEventListener('firstinteractive', () => document.getElementById(loaderId)?.classList.add('hidden'));
  });
});
