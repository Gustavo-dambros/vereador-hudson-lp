// Hudson Moreschi — LP · interações
// Header que escurece ao rolar + menu mobile + reveal on-scroll (stagger 70ms)

(function () {
  'use strict';

  var header = document.querySelector('.site-header');
  var onScroll = function () {
    if (window.scrollY > 24) header.classList.add('is-scrolled');
    else header.classList.remove('is-scrolled');
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Menu mobile
  var toggle = document.getElementById('menuToggle');
  var nav = document.querySelector('.nav-links');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      toggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
    });
    nav.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') nav.classList.remove('open');
    });
  }

  // Reveal on-scroll — IntersectionObserver (padrão do DNA: threshold .14)
  var reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var groups = new Map();
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        var parent = el.parentElement;
        var siblings = groups.get(parent) || null;
        if (!siblings) {
          siblings = Array.prototype.slice.call(parent.querySelectorAll(':scope > .reveal'));
          groups.set(parent, siblings);
        }
        var idx = siblings.indexOf(el);
        if (idx > 0) el.style.setProperty('--reveal-delay', (idx * 70) + 'ms');
        el.classList.add('visible');
        io.unobserve(el);
      });
    }, { threshold: 0.14, rootMargin: '0px 0px -8% 0px' });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('visible'); });
  }
})();
