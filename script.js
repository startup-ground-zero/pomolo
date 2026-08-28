// Preloader
window.addEventListener('load', () => {
  const preloader = document.getElementById('preloader');
  if (preloader) preloader.classList.add('hidden');
});

// Header scroll state
const header = document.getElementById('header');
const backToTop = document.getElementById('back-to-top');

function onScroll() {
  const scrolled = window.scrollY > 60;
  header.classList.toggle('scrolled', scrolled);
  backToTop.classList.toggle('show', window.scrollY > 500);
}
window.addEventListener('scroll', onScroll);
onScroll();

backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Mobile menu toggle
const menuToggle = document.getElementById('menu-toggle');
menuToggle.addEventListener('click', () => {
  header.classList.toggle('nav-open');
});
document.querySelectorAll('#nav a').forEach(link => {
  link.addEventListener('click', () => header.classList.remove('nav-open'));
});

// Reveal collection cards on scroll
const cards = document.querySelectorAll('.collection-card');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
cards.forEach(card => observer.observe(card));

// Footer year
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

const contactForm = document.getElementById('contact-form');
const formNote = document.getElementById('form-note');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (contactForm.company.value.trim() !== '') {
      contactForm.reset();
      return;
    }

    const formData = new FormData(contactForm);
    const subject = encodeURIComponent(formData.get('subject'));
    const body = encodeURIComponent([
      `Name: ${formData.get('name')}`,
      `Email: ${formData.get('email')}`,
      '',
      formData.get('message')
    ].join('\n'));
    window.location.href = `mailto:info@pomolo-mykonos.com?subject=${subject}&body=${body}`;
    formNote.textContent = 'Your email app is opening with the enquiry details.';
  });
}

