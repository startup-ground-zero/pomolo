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

// Contact form (front-end only demo submission)
const contactForm = document.getElementById('contact-form');
const formNote = document.getElementById('form-note');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    // Honeypot: if the hidden field got filled, silently drop the submission (bot).
    if (contactForm.company.value.trim() !== '') {
      contactForm.reset();
      return;
    }
    formNote.textContent = 'Thank you — our design team will be in touch shortly.';
    contactForm.reset();
  });
}

// Newsletter form
const newsletterForm = document.getElementById('newsletter-form');
if (newsletterForm) {
  newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    newsletterForm.reset();
  });
}

// Live Instagram feed (Instagram Graph API — requires a long-lived access token)
// Get one via developers.facebook.com > Instagram Basic Display / Graph API for a
// connected Business/Creator account, then paste it below. Until then the static
// placeholder tiles already in the page remain visible.
const IG_ACCESS_TOKEN = '';
const IG_POST_LIMIT = 6;

async function loadInstagramFeed() {
  if (!IG_ACCESS_TOKEN) return;
  const feed = document.getElementById('instagram-feed');
  if (!feed) return;
  try {
    const res = await fetch(
      `https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,thumbnail_url,permalink&limit=${IG_POST_LIMIT}&access_token=${IG_ACCESS_TOKEN}`
    );
    if (!res.ok) throw new Error('Instagram feed request failed');
    const data = await res.json();
    if (!data.data || !data.data.length) return;

    feed.innerHTML = data.data.map((post) => {
      const img = post.media_type === 'VIDEO' ? post.thumbnail_url : post.media_url;
      return `<a class="gallery-tile" href="${post.permalink}" target="_blank" rel="noopener noreferrer" style="background-image:url('${img}')" aria-label="View post on Instagram"></a>`;
    }).join('');
  } catch (err) {
    console.warn('Could not load live Instagram feed, showing placeholders instead.', err);
  }
}
loadInstagramFeed();

// If a SnapWidget/Behold embed has been pasted into #instagram-embed, hide the placeholder grid.
const instagramEmbed = document.getElementById('instagram-embed');
const instagramPlaceholder = document.getElementById('instagram-feed');
if (instagramEmbed && instagramPlaceholder && instagramEmbed.childElementCount > 0) {
  instagramPlaceholder.classList.add('has-embed');
}
