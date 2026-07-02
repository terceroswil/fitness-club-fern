/* =========================================
   MAIN.JS - Navbar, Hero, Animaciones
========================================= */

document.documentElement.classList.add('js');

// --------- PÓSTER: prueba múltiples extensiones ---------
const posterImg = document.getElementById('posterImg');
if (posterImg) {
  let fallbacks = [];
  try { fallbacks = JSON.parse(posterImg.dataset.fallbacks || '[]'); } catch (e) {}
  let idx = 0;
  posterImg.addEventListener('error', function handler() {
    if (idx < fallbacks.length) {
      posterImg.src = fallbacks[idx++];
    } else {
      posterImg.removeEventListener('error', handler);
      const wrap = posterImg.parentElement;
      wrap.classList.add('poster-fallback');
      posterImg.remove();
    }
  });
  posterImg.addEventListener('load', () => {
    const lbImg = document.getElementById('posterLightboxImg');
    if (lbImg) lbImg.src = posterImg.src;
  });
}

// --------- LIGHTBOX PÓSTER ---------
const posterWrap = document.getElementById('posterWrap');
const posterLightbox = document.getElementById('posterLightbox');
const posterLightboxClose = document.getElementById('posterLightboxClose');
if (posterWrap && posterLightbox) {
  posterWrap.addEventListener('click', () => {
    if (posterWrap.classList.contains('poster-fallback')) return;
    posterLightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  });
  const closeLB = () => {
    posterLightbox.classList.remove('open');
    document.body.style.overflow = '';
  };
  if (posterLightboxClose) posterLightboxClose.addEventListener('click', closeLB);
  posterLightbox.addEventListener('click', (e) => { if (e.target === posterLightbox) closeLB(); });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && posterLightbox.classList.contains('open')) closeLB();
  });
}

// --------- BANNER PROMOCIONAL ---------
const promoBanner = document.getElementById('promoBanner');
const promoClose = document.getElementById('promoClose');
if (promoBanner && promoClose) {
  if (sessionStorage.getItem('fcf_promo_closed') === '1') {
    promoBanner.style.display = 'none';
    document.body.classList.remove('has-promo');
  }
  promoClose.addEventListener('click', () => {
    promoBanner.style.display = 'none';
    document.body.classList.remove('has-promo');
    sessionStorage.setItem('fcf_promo_closed', '1');
  });
}

// --------- NAVBAR SCROLL + MENÚ MÓVIL ---------
const navbar = document.getElementById('navbar');
if (navbar) {
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  });
}
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');
if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', () => navLinks.classList.toggle('open'));
  navLinks.querySelectorAll('a').forEach(a =>
    a.addEventListener('click', () => navLinks.classList.remove('open'))
  );
}

// --------- TYPEWRITER HERO ---------
const typedEl = document.getElementById('typedText');
if (typedEl) {
  const phrases = ['TRANSFORMA TU CUERPO.', 'TRANSFORMA TU VIDA.'];
  typedEl.textContent = phrases[0];
  let pi = 0, ci = phrases[0].length, deleting = true;
  function type() {
    const cur = phrases[pi];
    typedEl.textContent = deleting ? cur.slice(0, --ci) : cur.slice(0, ++ci);
    let speed = deleting ? 40 : 80;
    if (!deleting && ci === cur.length) { speed = 1500; deleting = true; }
    else if (deleting && ci === 0) { deleting = false; pi = (pi + 1) % phrases.length; speed = 300; }
    setTimeout(type, speed);
  }
  setTimeout(type, 1500);
}

// --------- PARTÍCULAS CANVAS ---------
const canvas = document.getElementById('particles-canvas');
if (canvas) {
  const ctx = canvas.getContext('2d');
  let particles = [];
  function resizeCanvas() {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);
  class Particle {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.vx = (Math.random() - 0.5) * 0.6;
      this.vy = (Math.random() - 0.5) * 0.6;
      this.size = Math.random() * 2 + 0.5;
      this.color = Math.random() > 0.5 ? '#00ff88' : '#00d4ff';
    }
    update() {
      this.x += this.vx; this.y += this.vy;
      if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
      if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.shadowBlur = 10;
      ctx.shadowColor = this.color;
      ctx.fill();
    }
  }
  for (let i = 0; i < 80; i++) particles.push(new Particle());
  function connectParticles() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          ctx.beginPath();
          ctx.strokeStyle = 'rgba(0,255,136,' + (0.15 * (1 - dist / 120)) + ')';
          ctx.lineWidth = 0.5;
          ctx.shadowBlur = 0;
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }
  }
  function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => { p.update(); p.draw(); });
    connectParticles();
    requestAnimationFrame(animateParticles);
  }
  animateParticles();
}

// --------- PARALLAX HERO ---------
window.addEventListener('scroll', () => {
  const heroContent = document.querySelector('.hero-content');
  if (!heroContent) return;
  const y = window.scrollY;
  if (y < window.innerHeight) {
    heroContent.style.transform = 'translateY(' + (y * 0.3) + 'px)';
    heroContent.style.opacity = Math.max(0, 1 - y / 600);
  }
});

// --------- INTERSECTION OBSERVER: REVEAL ---------
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('active');
      revealObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.15 });
document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => revealObserver.observe(el));
window.__revealObserver = revealObserver;

// Fallback si algo queda invisible
setTimeout(() => {
  document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && !el.classList.contains('active')) {
      el.classList.add('active');
    }
  });
}, 3000);

// --------- CONTADOR ESTADÍSTICAS ---------
const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      animateCounter(e.target);
      statsObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.5 });
document.querySelectorAll('.stat-number').forEach(el => statsObserver.observe(el));

function animateCounter(el) {
  const target = parseInt(el.dataset.target);
  const dur = 2000;
  const start = performance.now();
  function frame(t) {
    const p = Math.min((t - start) / dur, 1);
    const ease = 1 - Math.pow(1 - p, 3);
    el.textContent = Math.floor(target * ease) + '+';
    if (p < 1) requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
}

// --------- GALERÍA CARRUSEL ---------
const galleryTrack = document.getElementById('galleryTrack');
if (galleryTrack) {
  const galleryDots = document.getElementById('galleryDots');
  const totalSlides = galleryTrack.children.length;
  let curSlide = 0;
  for (let i = 0; i < totalSlides; i++) {
    const d = document.createElement('div');
    d.className = 'gallery-dot' + (i === 0 ? ' active' : '');
    d.addEventListener('click', () => goToSlide(i));
    galleryDots.appendChild(d);
  }
  function goToSlide(i) {
    curSlide = (i + totalSlides) % totalSlides;
    galleryTrack.style.transform = 'translateX(-' + (curSlide * 100) + '%)';
    galleryDots.querySelectorAll('.gallery-dot').forEach((d, idx) =>
      d.classList.toggle('active', idx === curSlide)
    );
    if (typeof startAutoplay === 'function') startAutoplay();
  }
  const galleryPrev = document.getElementById('galleryPrev');
  const galleryNext = document.getElementById('galleryNext');
  if (galleryPrev) galleryPrev.addEventListener('click', () => goToSlide(curSlide - 1));
  if (galleryNext) galleryNext.addEventListener('click', () => goToSlide(curSlide + 1));

  // Autoplay: se reinicia con cada cambio (manual o automático) para evitar saltos
  let autoplay = null;
  function startAutoplay() {
    clearInterval(autoplay);
    autoplay = setInterval(() => goToSlide(curSlide + 1), 5000);
  }
  startAutoplay();

  // Pausar al pasar el mouse, reanudar al salir
  const galleryWrap = galleryTrack.closest('.gallery-wrap');
  if (galleryWrap) {
    galleryWrap.addEventListener('mouseenter', () => clearInterval(autoplay));
    galleryWrap.addEventListener('mouseleave', startAutoplay);
  }
}

// --------- TESTIMONIOS CARRUSEL ---------
const testSlides = document.querySelectorAll('.testimonial-slide');
if (testSlides.length) {
  const testNav = document.getElementById('testimonialNav');
  let curTest = 0;
  testSlides.forEach((_, i) => {
    const d = document.createElement('div');
    d.className = 'test-dot' + (i === 0 ? ' active' : '');
    d.addEventListener('click', () => showTest(i));
    testNav.appendChild(d);
  });
  function showTest(i) {
    testSlides[curTest].classList.remove('active');
    testNav.children[curTest].classList.remove('active');
    curTest = (i + testSlides.length) % testSlides.length;
    testSlides[curTest].classList.add('active');
    testNav.children[curTest].classList.add('active');
  }
  setInterval(() => showTest(curTest + 1), 6000);
}
