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

document.querySelectorAll('.nav-more details').forEach(details => {
  details.addEventListener('mouseenter', () => {
    if (window.matchMedia('(min-width: 1081px)').matches) details.open = true;
  });
  details.addEventListener('mouseleave', () => {
    if (window.matchMedia('(min-width: 1081px)').matches) details.open = false;
  });
});

// Use Backspace for page navigation without interfering with form editing.
document.addEventListener('keydown', (event) => {
  const target = event.target;
  const isEditing = target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement || target.isContentEditable;

  if (event.key === 'Backspace' && !isEditing && !event.altKey && !event.ctrlKey && !event.metaKey) {
    event.preventDefault();
    window.history.back();
  }
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

// Catalogue category PDF viewer.
const catalogueViewer = document.getElementById('catalogue-viewer');
if (catalogueViewer) {
  const catalogueTitle = document.getElementById('catalogue-viewer-title');
  const cataloguePreviewTitle = document.getElementById('catalogue-preview-title');
  const catalogueOpen = document.getElementById('catalogue-viewer-open');
  const catalogueClose = document.getElementById('catalogue-viewer-close');
  let activeCatalogueCard;

  const closeCatalogueViewer = () => {
    catalogueViewer.hidden = true;
    activeCatalogueCard?.focus();
  };

  document.querySelectorAll('.catalogue-card').forEach(card => {
    const openCatalogueViewer = () => {
      activeCatalogueCard = card;
      catalogueTitle.textContent = `${card.dataset.catalogueTitle} Catalogue`;
      cataloguePreviewTitle.textContent = `${card.dataset.catalogueTitle} Catalogue`;
      catalogueOpen.href = card.dataset.cataloguePdf;
      catalogueViewer.hidden = false;
      catalogueClose.focus();
    };

    card.addEventListener('click', openCatalogueViewer);
    card.addEventListener('keydown', event => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        openCatalogueViewer();
      }
    });
  });

  catalogueClose.addEventListener('click', closeCatalogueViewer);
  catalogueViewer.addEventListener('click', event => {
    if (event.target === catalogueViewer) closeCatalogueViewer();
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && !catalogueViewer.hidden) closeCatalogueViewer();
  });

  const selectedCategory = new URLSearchParams(window.location.search).get('category');
  const selectedCatalogueCard = document.querySelector(`.catalogue-card[data-category="${selectedCategory}"]`);
  if (selectedCatalogueCard) selectedCatalogueCard.click();
}

// Shared footer for the additional pages.
const sharedFooter = document.querySelector('.shared-footer');
if (sharedFooter) {
  sharedFooter.innerHTML = `
    <div class="container footer-inner">
      <div class="footer-brand"><img src="logo.png" alt="Pomolo emblem" class="brand-logo"><img src="Pomolo_original-removebg.png" alt="Pomolo interior equipment" class="footer-logo"><p>Interior. Luxury. Quality.</p><div class="footer-social"><a href="https://www.instagram.com/pomolo_mykonos_official/" target="_blank" rel="noopener noreferrer" aria-label="Pomolo Mykonos on Instagram"><svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg></a><a href="https://www.facebook.com/pomolomykonos" target="_blank" rel="noopener noreferrer" aria-label="Pomolo Mykonos on Facebook"><svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M15 8h-2a2 2 0 0 0-2 2v3H9v3h2v6h3v-6h2.2l.8-3H14v-2c0-.6.4-1 1-1h2V8Z"/></svg></a></div></div>
      <div class="footer-links"><h4>Collections</h4><ul><li>Bathroom</li><li>Furniture</li><li>Taps &amp; Tiles</li><li>Fabric &amp; Curtains</li><li>Blinds &amp; Parasols</li></ul></div>
      <div class="footer-links"><h4>Explore</h4><ul><li><a href="catalogue.html">Catalogues</a></li><li><a href="brands.html">Brands &amp; Partners</a></li><li><a href="projects.html">Projects</a></li><li><a href="professionals.html">For Professionals</a></li><li><a href="consultation.html">Book a Consultation</a></li><li><a href="quote.html">Ask for a Quote</a></li></ul></div>
      <div class="footer-contact"><h4>Contact</h4><p><strong>Showroom</strong><a href="https://www.google.com/maps/place/Pomolo+Mykonos/@37.4262301,25.3210062,1004m/data=!3m2!1e3!4b1!4m6!3m5!1s0x14a2be5c880e42df:0x6e0a7d070bba3527!8m2!3d37.4262301!4d25.3235811!16s%2Fg%2F11g6rmvs_f?entry=ttu&amp;g_ep=EgoyMDI2MDgyNi4wIKXMDSoASAFQAw%3D%3D" target="_blank" rel="noopener noreferrer">Ornos, Míkonos 84600</a></p><p><strong>Email</strong><a href="mailto:info@pomolo-mykonos.com">info@pomolo-mykonos.com</a></p><p><strong>Phone</strong><a href="tel:+302289077800">+30 22890 77800</a></p></div>
    </div>
    <div class="container footer-bottom"><p>&copy; <span id="year"></span> <img src="Pomolo_original-removebg.png" alt="Pomolo interior equipment" class="brand-inline">. All rights reserved. <a href="privacy.html">Privacy</a> <a href="terms.html">Terms</a></p></div>`;
}

// Footer year
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Get category parameter from URL
const categoryParam = new URLSearchParams(window.location.search).get('category');
const categoryNames = {
  'bathroom': 'Bathroom',
  'furniture': 'Furniture',
  'taps': 'Taps',
  'tiles': 'Tiles',
  'fabric': 'Fabric',
  'blinds': 'Blinds',
  'curtains': 'Curtains',
  'parasols': 'Parasols'
};

// Update ALL "Ask for a Quote" links if category is in URL
if (categoryParam) {
  const categoryName = categoryNames[categoryParam] || categoryParam;
  
  // Update subject field on quote page
  const subjectField = document.querySelector('input[name="subject"]');
  if (subjectField) {
    subjectField.value = `Catalogue quote request - ${categoryName}`;
  }
  
  // Update ALL quote links on the current page
  document.querySelectorAll('a[href*="quote.html"]').forEach(link => {
    if (!link.href.includes('?category=')) {
      link.href = `quote.html?category=${categoryParam}`;
    }
  });
}

// Catalogue page: update quote links with category parameter when catalogue card is clicked
const catalogueCards = document.querySelectorAll('.catalogue-card');
if (catalogueCards.length > 0) {
  const quoteViewerLink = document.getElementById('quote-viewer-link');
  
  catalogueCards.forEach(card => {
    const category = card.dataset.category;
    card.addEventListener('click', () => {
      if (quoteViewerLink) {
        quoteViewerLink.href = `quote.html?category=${category}`;
      }
      // Also update the generic quote link if it exists
      const quoteGenericLink = document.getElementById('quote-generic-link');
      if (quoteGenericLink) {
        quoteGenericLink.href = `quote.html?category=${category}`;
      }
    });
  });
}


