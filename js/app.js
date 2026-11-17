// Hudson Moreschi — interações da página
(function () {
  'use strict';

  var header = document.querySelector('.site-header');
  function updateHeader() {
    if (header) header.classList.toggle('is-scrolled', window.scrollY > 24);
  }
  window.addEventListener('scroll', updateHeader, { passive: true });
  updateHeader();

  // Menu mobile acessível
  var toggle = document.getElementById('menuToggle');
  var nav = document.getElementById('navLinks');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
    });
    nav.addEventListener('click', function (event) {
      if (event.target.closest('a')) {
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.setAttribute('aria-label', 'Abrir menu');
      }
    });
  }

  // Carrossel de propostas
  var track = document.getElementById('proposalTrack');
  var previous = document.getElementById('propPrev');
  var next = document.getElementById('propNext');
  function slideAmount() {
    var card = track && track.querySelector('.proposal-card');
    return card ? card.getBoundingClientRect().width + 20 : 380;
  }
  if (track && previous && next) {
    previous.addEventListener('click', function () {
      track.scrollBy({ left: -slideAmount(), behavior: 'smooth' });
    });
    next.addEventListener('click', function () {
      track.scrollBy({ left: slideAmount(), behavior: 'smooth' });
    });
  }

  // Reveal progressivo com stagger discreto
  var reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var groups = new Map();
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        var parent = el.parentElement;
        var siblings = groups.get(parent);
        if (!siblings) {
          siblings = Array.prototype.slice.call(parent.querySelectorAll(':scope > .reveal'));
          groups.set(parent, siblings);
        }
        var index = siblings.indexOf(el);
        if (index > 0) el.style.setProperty('--reveal-delay', Math.min(index * 70, 350) + 'ms');
        el.classList.add('visible');
        observer.unobserve(el);
      });
    }, { threshold: 0.14, rootMargin: '0px 0px -8% 0px' });
    reveals.forEach(function (el) { observer.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('visible'); });
  }
})();
