"use strict";
/**
 * Queremos Injustiça - Landing Page
 * Scroll animations and interactive effects
 */
// ===== Scroll-triggered animations (Intersection Observer) =====
const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            const section = entry.target;
            section
                .querySelectorAll('.section-inner, .contact-content, [data-scroll-animate]')
                .forEach((el) => el.classList.add('visible'));
            sectionObserver.unobserve(section);
        }
    });
}, { rootMargin: '0px 0px -80px 0px', threshold: 0.15 });
document.querySelectorAll('.section').forEach((section) => {
    sectionObserver.observe(section);
});
// ===== Nav scroll effect =====
const nav = document.querySelector('.nav');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        nav?.classList.add('scrolled');
    }
    else {
        nav?.classList.remove('scrolled');
    }
}, { passive: true });
// ===== Mobile nav toggle =====
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
navToggle?.addEventListener('click', () => {
    nav?.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', nav?.classList.contains('open') ? 'true' : 'false');
});
navLinks?.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
        nav?.classList.remove('open');
        navToggle?.setAttribute('aria-expanded', 'false');
    });
});
// ===== Hero particles =====
const createParticles = () => {
    const container = document.getElementById('hero-particles');
    if (!container)
        return;
    const particleCount = 40;
    const colors = ['rgba(201, 162, 39, 0.3)', 'rgba(201, 162, 39, 0.15)', 'rgba(139, 105, 20, 0.2)'];
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
      position: absolute;
      width: ${2 + Math.random() * 4}px;
      height: ${2 + Math.random() * 4}px;
      background: ${colors[Math.floor(Math.random() * colors.length)]};
      border-radius: 50%;
      left: ${Math.random() * 100}%;
      top: ${Math.random() * 100}%;
      animation: particleFloat ${8 + Math.random() * 12}s ease-in-out infinite;
      animation-delay: ${Math.random() * 5}s;
    `;
        container.appendChild(particle);
    }
};
createParticles();
// ===== Form redirect URL (GitHub Pages compatible) =====
const formNext = document.getElementById('form-next');
if (formNext) {
    formNext.value = `${window.location.origin}${window.location.pathname.replace(/\/index\.html$/, '') || '/'}#contato`;
}
// ===== Parallax effect on hero =====
const heroContent = document.querySelector('.hero-content');
window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const heroHeight = window.innerHeight;
    if (scrollY < heroHeight && heroContent) {
        const progress = scrollY / heroHeight;
        const translateY = progress * 30;
        const opacity = 1 - progress * 0.3;
        heroContent.style.transform = `translateY(${translateY}px)`;
        heroContent.style.opacity = String(opacity);
    }
}, { passive: true });
