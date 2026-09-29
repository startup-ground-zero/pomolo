// Preloader
const hidePreloader = () => {
  const preloader = document.getElementById('preloader');
  if (preloader) preloader.classList.add('hidden');
};
document.addEventListener('DOMContentLoaded', hidePreloader, { once: true });
window.setTimeout(hidePreloader, 1200);

// Header scroll state
const header = document.getElementById('header');
const backToTop = document.getElementById('back-to-top');

function onScroll() {
  const scrolled = window.scrollY > 60;
  if (header) header.classList.toggle('scrolled', scrolled);
  if (backToTop) backToTop.classList.toggle('show', window.scrollY > 500);
}
window.addEventListener('scroll', onScroll);
onScroll();

if (backToTop) {
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// Mobile menu toggle
const menuToggle = document.getElementById('menu-toggle');
if (menuToggle) {
  menuToggle.setAttribute('aria-controls', 'nav');
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.addEventListener('click', () => {
    const isOpen = header ? header.classList.toggle('nav-open') : false;
    document.documentElement.classList.toggle('nav-open', isOpen);
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  });
}
document.querySelector('#nav')?.addEventListener('click', event => {
  if (!event.target.closest('a')) return;
  if (header) header.classList.remove('nav-open');
  document.documentElement.classList.remove('nav-open');
  if (menuToggle) menuToggle.setAttribute('aria-expanded', 'false');
});

document.querySelectorAll('.nav-more details').forEach(details => {
  details.addEventListener('mouseenter', () => {
    if (window.matchMedia('(min-width: 1081px)').matches) details.open = true;
  });
  details.addEventListener('mouseleave', () => {
    if (window.matchMedia('(min-width: 1081px)').matches) details.open = false;
  });
});

// Keep the collections menu consistent across the static pages.
document.querySelectorAll('.mega-grid').forEach(menu => {
  menu.innerHTML = `
    <div class="mega-col">
      <a href="catalogue.html?category=furniture" class="mega-cat-title">Furniture</a>
      <ul class="mega-sub-menu"><li><a href="catalogue.html?category=indoor">Indoor</a></li><li><a href="catalogue.html?category=outdoor">Outdoor</a></li></ul>
    </div>
    <div class="mega-col">
      <a href="catalogue.html?category=tiles" class="mega-cat-title">Tiles</a>
    </div>
    <div class="mega-col">
      <a href="catalogue.html?category=bathroom" class="mega-cat-title">Bathroom</a>
      <ul class="mega-sub-menu"><li><a href="catalogue.html?category=taps">Taps</a></li><li><a href="catalogue.html?category=sanitary-ware">Sanitary Ware</a></li><li><a href="catalogue.html?category=accessories">Accessories</a></li></ul>
    </div>
    <div class="mega-col">
      <a href="catalogue.html?category=curtains" class="mega-cat-title">Curtains</a>
      <ul class="mega-sub-menu"><li><a href="catalogue.html?category=blinds">Blinds</a></li><li><a href="catalogue.html?category=fabric">Fabric</a></li></ul>
    </div>
    <div class="mega-col">
      <a href="catalogue.html?category=parasols" class="mega-cat-title">Parasols</a>
    </div>
    <div class="mega-col">
      <a href="catalogue.html?category=lighting" class="mega-cat-title">Lighting</a>
    </div>`;
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

const showroomVideos = document.querySelectorAll('.about-media video[data-src]');
const heroVideo = document.querySelector('.hero-media');
const revealVideoWhenReady = video => {
  const reveal = () => video.classList.add('video-ready');
  if (video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) reveal();
  else video.addEventListener('canplay', reveal, { once: true });
};

if (heroVideo) {
  revealVideoWhenReady(heroVideo);
  heroVideo.play().catch(() => {});
}

const loadShowroomVideo = video => {
  if (video.src) return;
  video.src = video.dataset.src;
  video.autoplay = true;
  revealVideoWhenReady(video);
  video.load();
};

if ('IntersectionObserver' in window) {
  const videoObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        loadShowroomVideo(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { rootMargin: '300px 0px' });
  showroomVideos.forEach(video => videoObserver.observe(video));
} else {
  showroomVideos.forEach(loadShowroomVideo);
}

// Catalogue category PDF viewer.
const catalogueViewer = document.getElementById('catalogue-viewer');
if (catalogueViewer) {
  const catalogueTitle = document.getElementById('catalogue-viewer-title');
  const cataloguePreviewTitle = document.getElementById('catalogue-preview-title');
  const catalogueList = document.getElementById('catalogue-list');
  const catalogueClose = document.getElementById('catalogue-viewer-close');
  let activeCatalogueCard;

  const closeCatalogueViewer = () => {
    catalogueViewer.hidden = true;
    document.documentElement.classList.remove('dialog-open');
    activeCatalogueCard?.focus();
  };

  document.querySelectorAll('.catalogue-card').forEach(card => {
    const openCatalogueViewer = () => {
      activeCatalogueCard = card;
      const catalogueName = card.dataset.catalogueTitle;
      const cataloguePdf = card.dataset.cataloguePdf;
      const localizedCatalogueName = window.pomoloTranslateText?.(catalogueName) ?? catalogueName;
      const localizedCatalogues = window.pomoloTranslateText?.('Catalogues') ?? 'Catalogues';
      const localizedCatalogue = window.pomoloTranslateText?.('Catalogue') ?? 'Catalogue';
      catalogueTitle.textContent = `${localizedCatalogueName} ${localizedCatalogues}`;
      cataloguePreviewTitle.textContent = `${localizedCatalogueName} ${localizedCatalogues}`;
      catalogueList.replaceChildren();

      for (let index = 1; index <= 5; index += 1) {
        const item = document.createElement('div');
        item.className = 'catalogue-list-item';

        const itemTitle = document.createElement('span');
        itemTitle.textContent = `${localizedCatalogueName} ${localizedCatalogue} ${index}`;

        const openLink = document.createElement('a');
        openLink.className = 'catalogue-list-open';
        openLink.href = cataloguePdf;
        openLink.target = '_blank';
        openLink.rel = 'noopener noreferrer';
        openLink.textContent = window.pomoloTranslateText?.('Open PDF') ?? 'Open PDF';

        item.append(itemTitle, openLink);
        catalogueList.append(item);
      }

      const quoteViewerLink = document.getElementById('quote-viewer-link');
      if (quoteViewerLink) quoteViewerLink.href = `quote.html?category=${card.dataset.category}`;
      catalogueViewer.hidden = false;
      document.documentElement.classList.add('dialog-open');
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
  const categoryGroups = {
    furniture: 'furniture',
    indoor: 'furniture',
    outdoor: 'furniture',
    bathroom: 'bathroom',
    taps: 'bathroom',
    'sanitary-ware': 'bathroom',
    accessories: 'bathroom',
    tiles: 'tiles',
    curtains: 'curtains',
    blinds: 'curtains',
    fabric: 'curtains',
    parasols: 'parasols',
    lighting: 'lighting'
  };
  const selectedCategoryGroup = selectedCatalogueCard?.dataset.categoryGroup || categoryGroups[selectedCategory];
  if (selectedCategoryGroup) {
    const group = selectedCategoryGroup;
    if (group) {
      const parentContainer = selectedCatalogueCard?.closest('.catalogue-library, .collections') || document.querySelector('.catalogue-library, .collections');
      if (parentContainer) {
        const matchingTab = parentContainer.querySelector(`.category-tab-btn[data-filter="${group}"]`);
        if (matchingTab) {
          parentContainer.querySelectorAll('.category-tab-btn').forEach(b => b.classList.remove('active'));
          matchingTab.classList.add('active');
          parentContainer.querySelectorAll('.collection-card').forEach(card => {
            if (card.dataset.categoryGroup === group) {
              card.classList.remove('hidden-card');
              card.style.display = '';
            } else {
              card.classList.add('hidden-card');
              card.style.display = 'none';
            }
          });
          parentContainer.querySelectorAll('.collection-row').forEach(row => {
            const rowGroup = row.dataset.rowGroup;
            if (rowGroup === group) {
              row.classList.remove('hidden-row');
              row.style.display = '';
            } else {
              row.classList.add('hidden-row');
              row.style.display = 'none';
            }
          });
        }
      }
    }
    if (selectedCatalogueCard) selectedCatalogueCard.click();
  }
}

// Category filter tabs functionality (Home page & Catalogue page)
const categoryTabButtons = document.querySelectorAll('.category-tab-btn');
if (categoryTabButtons.length > 0) {
  categoryTabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const parentContainer = btn.closest('.collections, .catalogue-library');
      if (!parentContainer) return;

      const filter = btn.dataset.filter;
      parentContainer.querySelectorAll('.category-tab-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const cards = parentContainer.querySelectorAll('.collection-card');
      cards.forEach(card => {
        const group = card.dataset.categoryGroup;
        if (filter === 'all' || group === filter) {
          card.classList.remove('hidden-card');
          card.style.display = '';
        } else {
          card.classList.add('hidden-card');
          card.style.display = 'none';
        }
      });

      const rows = parentContainer.querySelectorAll('.collection-row');
      rows.forEach(row => {
        const rowGroup = row.dataset.rowGroup;
        if (filter === 'all' || rowGroup === filter) {
          row.classList.remove('hidden-row');
          row.style.display = '';
        } else {
          row.classList.add('hidden-row');
          row.style.display = 'none';
        }
      });
    });
  });
}

// Shared footer for the additional pages.
const sharedFooter = document.querySelector('.shared-footer');
if (sharedFooter) {
  sharedFooter.innerHTML = `
    <div class="container footer-inner">
      <div class="footer-brand"><img src="logo.png" alt="Pomolo emblem" class="brand-logo"><img src="Pomolo_original-removebg.png" alt="Pomolo interior equipment" class="footer-logo"><p>Interior - Exterior Quality Brands</p><div class="footer-social"><a href="https://www.instagram.com/pomolo_mykonos_official/" target="_blank" rel="noopener noreferrer" aria-label="Pomolo Mykonos on Instagram"><svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg></a><a href="https://www.facebook.com/pomolomykonos" target="_blank" rel="noopener noreferrer" aria-label="Pomolo Mykonos on Facebook"><svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M15 8h-2a2 2 0 0 0-2 2v3H9v3h2v6h3v-6h2.2l.8-3H14v-2c0-.6.4-1 1-1h2V8Z"/></svg></a></div></div>
      <div class="footer-links"><h4>Collections</h4><ul><li><a href="catalogue.html?category=furniture">Furniture</a></li><li><a href="catalogue.html?category=bathroom">Bathroom</a></li><li><a href="catalogue.html?category=tiles">Tiles</a></li><li><a href="catalogue.html?category=curtains">Curtains</a></li><li><a href="catalogue.html?category=parasols">Parasols</a></li><li><a href="catalogue.html?category=lighting">Lighting</a></li></ul></div>
      <div class="footer-links"><h4>Explore</h4><ul><li><a href="catalogue.html">Catalogues</a></li><li><a href="brands.html">Brands &amp; Partners</a></li><li><a href="projects.html">Cyclades</a></li><li><a href="consultation.html">Book a Consultation</a></li><li><a href="quote.html">Ask for a Quote</a></li></ul></div>
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
  'indoor': 'Indoor Furniture',
  'outdoor': 'Outdoor Furniture',
  'taps': 'Taps',
  'sanitary-ware': 'Sanitary Ware',
  'accessories': 'Bathroom Accessories',
  'tiles': 'Tiles',
  'fabric': 'Fabric',
  'blinds': 'Blinds',
  'curtains': 'Curtains',
  'parasols': 'Parasols',
  'lighting': 'Lighting',
  'general': 'General'
};

// Update ALL "Ask for a Quote" links if category is in URL
if (categoryParam) {
  const categoryName = categoryNames[categoryParam] || (categoryParam.charAt(0).toUpperCase() + categoryParam.slice(1));
  
  // Update subject field on quote page
  const subjectField = document.querySelector('input[name="subject"]');
  if (subjectField) {
    subjectField.value = `Catalogue quote request - ${categoryName}`;
  }
  
  // Update ALL quote links on the current page
  document.querySelectorAll('a[href*="quote.html"]').forEach(link => {
    link.href = `quote.html?category=${categoryParam}`;
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

// Site-wide English / Greek language support.
const greekTranslations = {
  'Home': 'Αρχική', 'Collections': 'Συλλογές', 'Explore': 'Εξερεύνηση', 'Services': 'Υπηρεσίες', 'About Us': 'Σχετικά με εμάς', 'Gallery': 'Γκαλερί', 'Contact': 'Επικοινωνία', 'Consultation': 'Ραντεβού',
  'Furniture': 'Έπιπλα', 'Indoor': 'Εσωτερικού χώρου', 'Outdoor': 'Εξωτερικού χώρου', 'Indoor Furniture': 'Έπιπλα εσωτερικού χώρου', 'Outdoor Furniture': 'Έπιπλα εξωτερικού χώρου', 'Tiles': 'Πλακάκια', 'Bathroom': 'Μπάνιο', 'Taps': 'Μπαταρίες', 'Sanitary Ware': 'Είδη υγιεινής', 'Bathroom Accessories': 'Αξεσουάρ μπάνιου', 'Accessories': 'Αξεσουάρ', 'Curtains': 'Κουρτίνες', 'Blinds': 'Στόρια', 'Fabric': 'Υφάσματα', 'Parasols': 'Ομπρέλες', 'Lighting': 'Φωτισμός', 'General': 'Γενικά',
  'Interior & Outdoor Furniture': 'Έπιπλα εσωτερικού και εξωτερικού χώρου', 'View All Catalogues': 'Δείτε όλους τους καταλόγους', 'Brands & Partners': 'Μάρκες και Συνεργάτες', 'Cyclades': 'Κυκλάδες',
  'Book a Consultation': 'Κλείστε ραντεβού', 'Ask for a Quote': 'Ζητήστε προσφορά', 'Catalogues': 'Κατάλογοι', 'Catalogue': 'Κατάλογος', 'Open PDF': 'Άνοιγμα PDF', 'Close': 'Κλείσιμο',
  'Interior - Exterior Quality Brands': 'Ποιοτικές μάρκες εσωτερικού και εξωτερικού χώρου', 'Explore Collections': 'Εξερευνήστε τις συλλογές',
  'Bespoke bathrooms, furniture & interior essentials, curated on the island of Mykonos.': 'Εξατομικευμένες λύσεις για μπάνιο, έπιπλα και είδη εσωτερικού χώρου, επιλεγμένες στη Μύκονο.',
  'Our Collections': 'Οι συλλογές μας', 'Curated for Every Room, Indoors & Out': 'Επιλεγμένα για κάθε χώρο, μέσα και έξω', 'All': 'Όλα',
  'Considered pieces for living rooms, bedrooms and refined interiors.': 'Επιλεγμένα κομμάτια για καθιστικά, υπνοδωμάτια και εκλεπτυσμένους εσωτερικούς χώρους.',
  'Weather-ready silhouettes for terraces, gardens and poolside living.': 'Ανθεκτικά σχέδια για βεράντες, κήπους και χώρους δίπλα στην πισίνα.',
  'Natural stone & porcelain surfaces sourced from the finest ateliers.': 'Επιφάνειες από φυσική πέτρα και πορσελάνη από τα καλύτερα εργαστήρια.',
  'Precision-engineered fixtures in brushed brass, chrome & matte black.': 'Εξαρτήματα ακριβείας σε βουρτσισμένο ορείχαλκο, χρώμιο και ματ μαύρο.',
  'Architectural washbasins, freestanding pieces & refined ceramic elements.': 'Αρχιτεκτονικοί νιπτήρες, ελεύθερα στοιχεία και εκλεπτυσμένα κεραμικά.',
  'Finishing details that bring cohesion and character to every bathroom.': 'Λεπτομέρειες φινιρίσματος που δίνουν συνοχή και χαρακτήρα σε κάθε μπάνιο.',
  'Tailored light control with an architectural finish.': 'Εξατομικευμένος έλεγχος φωτός με αρχιτεκτονικό φινίρισμα.',
  'Luxurious weaves for upholstery, cushions & soft furnishings.': 'Πολυτελείς υφάνσεις για ταπετσαρίες, μαξιλάρια και μαλακή επίπλωση.',
  'Elegant shade solutions for terraces, pools & the Aegean sun.': 'Κομψές λύσεις σκίασης για βεράντες, πισίνες και τον αιγαιοπελαγίτικο ήλιο.',
  'Atmospheric fixtures and considered illumination for every space.': 'Ατμοσφαιρικά φωτιστικά και μελετημένος φωτισμός για κάθε χώρο.',
  'Designed Around You': 'Σχεδιασμένα γύρω από εσάς', 'From First Idea to Final Detail': 'Από την πρώτη ιδέα έως την τελευταία λεπτομέρεια',
  'brings together product knowledge, considered selection and personal guidance for homes, villas and hospitality projects.': 'συνδυάζει γνώση προϊόντων, προσεκτική επιλογή και προσωπική καθοδήγηση για κατοικίες, βίλες και έργα φιλοξενίας.',
  'Interior Consultation': 'Συμβουλευτική εσωτερικού χώρου', 'Practical, design-led guidance for spaces that feel considered from every angle.': 'Πρακτική, σχεδιαστικά προσανατολισμένη καθοδήγηση για χώρους με φροντίδα σε κάθε λεπτομέρεια.',
  'Explore the specialist makers and collections we bring together for exceptional interiors.': 'Ανακαλύψτε τους εξειδικευμένους δημιουργούς και τις συλλογές που συνθέτουμε για ξεχωριστούς εσωτερικούς χώρους.',
  'See how': 'Δείτε πώς η', 'supports private residences, rental villas and destination properties.': 'υποστηρίζει ιδιωτικές κατοικίες, βίλες προς ενοικίαση και προορισμούς φιλοξενίας.',
  'Since 2016 at Mykonos': 'Στη Μύκονο από το 2016', 'An Island Standard of Interior Craftsmanship': 'Ένα νησιωτικό πρότυπο εσωτερικής δεξιοτεχνίας',
  'was born on the island of Mykonos, where Cycladic light meets uncompromising design. We source and curate the finest bathroom fittings, furniture, textiles and outdoor living pieces for discerning homes, villas and hospitality projects across the Aegean and beyond.': 'γεννήθηκε στη Μύκονο, όπου το κυκλαδίτικο φως συναντά τον αδιαπραγμάτευτο σχεδιασμό. Επιλέγουμε τα καλύτερα είδη μπάνιου, έπιπλα, υφάσματα και στοιχεία εξωτερικού χώρου για απαιτητικές κατοικίες, βίλες και έργα φιλοξενίας στο Αιγαίο και πέρα από αυτό.',
  'Having now established very strong partnerships with well-known international firms from Spain and especially from Italy, we can guarantee 100% customers\' satisfaction.': 'Έχοντας αναπτύξει ισχυρές συνεργασίες με αναγνωρισμένες διεθνείς εταιρείες από την Ισπανία και ιδιαίτερα την Ιταλία, μπορούμε να εγγυηθούμε την πλήρη ικανοποίηση των πελατών μας.',
  'Every piece in our showroom is chosen for one reason: it must embody our promise —': 'Κάθε κομμάτι στο showroom μας επιλέγεται για έναν λόγο: πρέπει να εκφράζει την υπόσχεσή μας —',
  'Interior & Exterior, Luxury, Quality.': 'Εσωτερικός και εξωτερικός χώρος, πολυτέλεια, ποιότητα.',
  'A Personal Vision': 'Ένα προσωπικό όραμα', 'Meet the Owner': 'Γνωρίστε τον ιδρυτή',
  'is shaped by a passion for Cycladic architecture and refined living. That point of view guides every piece selected for the showroom and every project created for Mykonos homes and villas.': 'διαμορφώνεται από το πάθος για την κυκλαδίτικη αρχιτεκτονική και την εκλεπτυσμένη διαβίωση. Αυτή η οπτική καθοδηγεί κάθε επιλογή για το showroom και κάθε έργο για κατοικίες και βίλες στη Μύκονο.',
  'Every collection is personally curated and every client relationship personally overseen, because true luxury is in the details.': 'Κάθε συλλογή επιμελείται προσωπικά και κάθε σχέση με πελάτη παρακολουθείται στενά, γιατί η αληθινή πολυτέλεια βρίσκεται στις λεπτομέρειες.',
  'After all, a satisfied client is the master key to new eras, and as Elias often says: ‘The': 'Άλλωστε, ένας ικανοποιημένος πελάτης είναι το κλειδί για νέες εποχές και, όπως λέει συχνά ο Ηλίας: «Η',
  'price': 'τιμή', 'BE FORGOTTEN': 'ΘΑ ΞΕΧΑΣΤΕΙ', 'QUALITY': 'ΠΟΙΟΤΗΤΑ', 'of any product will eventually': 'οποιουδήποτε προϊόντος τελικά', 'never.’': 'ποτέ.»',
  'The': 'Η', 'Promise': 'Υπόσχεση', 'Visit Us': 'Επισκεφθείτε μας', 'Plan Your Next Interior Project': 'Σχεδιάστε το επόμενο έργο εσωτερικού χώρου',
  'Our design consultants are available for private appointments, villa projects and trade enquiries.': 'Οι σύμβουλοι σχεδιασμού μας είναι διαθέσιμοι για ιδιωτικά ραντεβού, έργα βιλών και επαγγελματικές ερωτήσεις.',
  'Showroom': 'Εκθεσιακός χώρος', 'Email': 'Email', 'Phone': 'Τηλέφωνο', 'Instagram': 'Instagram', 'Full Name': 'Ονοματεπώνυμο', 'Email Address': 'Διεύθυνση email', 'Phone Number': 'Αριθμός τηλεφώνου', 'Subject': 'Θέμα', 'Tell us about your project...': 'Πείτε μας για το έργο σας...', 'I agree to the': 'Συμφωνώ με την', 'Privacy': 'Απόρρητο', 'Privacy Policy': 'Πολιτική Απορρήτου', 'Send Enquiry': 'Αποστολή ερωτήματος',
  'Pomolo Mykonos | Interior & Exterior. Luxury. Quality.': 'Pomolo Mykonos | Εσωτερικός και εξωτερικός χώρος. Πολυτέλεια. Ποιότητα.', 'Pomolo Mykonos — curated bathrooms, indoor & outdoor furniture, taps, tiles, fabrics, blinds, curtains and parasols for the finest homes.': 'Pomolo Mykonos — επιλεγμένα είδη μπάνιου, έπιπλα εσωτερικού και εξωτερικού χώρου, μπαταρίες, πλακάκια, υφάσματα, στόρια, κουρτίνες και ομπρέλες για τις πιο ξεχωριστές κατοικίες.', 'Curated bathrooms, indoor & outdoor furniture, taps, tiles, fabrics, blinds, curtains and parasols for the finest homes in Mykonos.': 'Επιλεγμένα είδη μπάνιου, έπιπλα εσωτερικού και εξωτερικού χώρου, μπαταρίες, πλακάκια, υφάσματα, στόρια, κουρτίνες και ομπρέλες για τις πιο ξεχωριστές κατοικίες στη Μύκονο.',
  'Brands & Partners | Pomolo Mykonos': 'Μάρκες και Συνεργάτες | Pomolo Mykonos', 'We select enduring brands and specialist makers whose craftsmanship belongs in exceptional interiors.': 'Επιλέγουμε διαχρονικές μάρκες και εξειδικευμένους δημιουργούς, των οποίων η δεξιοτεχνία ανήκει σε ξεχωριστούς εσωτερικούς χώρους.',
  'Partner Brands': 'Συνεργαζόμενες μάρκες', 'Selected international brands we collaborate with for sanitaryware, furniture, outdoor living, surfaces and textiles.': 'Επιλεγμένες διεθνείς μάρκες με τις οποίες συνεργαζόμαστε για είδη υγιεινής, έπιπλα, εξωτερικούς χώρους, επιφάνειες και υφάσματα.',
  'Architectural Collaboration': 'Αρχιτεκτονική συνεργασία', 'Architecture Office Partnership': 'Συνεργασία με αρχιτεκτονικά γραφεία',
  'We work in close synergy with leading architectural practices and interior studios to deliver cohesive design solutions for villas, private residences, and hospitality projects in Mykonos and the Cyclades.': 'Συνεργαζόμαστε στενά με κορυφαία αρχιτεκτονικά γραφεία και studios εσωτερικού χώρου για ολοκληρωμένες σχεδιαστικές λύσεις σε βίλες, ιδιωτικές κατοικίες και έργα φιλοξενίας στη Μύκονο και τις Κυκλάδες.',
  'Explore Collaboration': 'Εξερευνήστε τη συνεργασία', 'Meet the collections in person.': 'Γνωρίστε τις συλλογές από κοντά.', 'Visit our Mykonos showroom for current brands, samples and product guidance.': 'Επισκεφθείτε το showroom μας στη Μύκονο για τις τρέχουσες μάρκες, δείγματα και καθοδήγηση προϊόντων.',
  'Catalogues | Pomolo Mykonos': 'Κατάλογοι | Pomolo Mykonos', 'Explore the latest Pomolo Mykonos catalogues for bathrooms, furniture and outdoor living.': 'Εξερευνήστε τους πιο πρόσφατους καταλόγους της Pomolo Mykonos για μπάνια, έπιπλα και εξωτερικούς χώρους.', 'Our Catalogues': 'Οι κατάλογοί μας', 'Discover our carefully selected collections for considered interiors, villa projects and outdoor living.': 'Ανακαλύψτε τις προσεκτικά επιλεγμένες συλλογές μας για εσωτερικούς χώρους, έργα βιλών και εξωτερική διαβίωση.',
  'Catalogue Library': 'Βιβλιοθήκη καταλόγων', 'Browse by Collection': 'Περιηγηθείτε ανά συλλογή', 'New catalogues are coming soon.': 'Νέοι κατάλογοι έρχονται σύντομα.', 'For the latest product information and project support, speak with our showroom team.': 'Για τις πιο πρόσφατες πληροφορίες προϊόντων και υποστήριξη έργων, επικοινωνήστε με την ομάδα του showroom μας.',
  'Choose from the available catalogues below.': 'Επιλέξτε από τους διαθέσιμους καταλόγους παρακάτω.', 'Available catalogues': 'Διαθέσιμοι κατάλογοι', 'Catalogue list': 'Λίστα καταλόγων', 'Close catalogue viewer': 'Κλείσιμο προβολής καταλόγων',
  'Book a Consultation | Pomolo Mykonos': 'Κλείστε ραντεβού | Pomolo Mykonos', 'Book a design and product consultation with Pomolo Mykonos.': 'Κλείστε ραντεβού σχεδιασμού και προϊόντων με την Pomolo Mykonos.', 'Tell us about your plans and we will help shape a showroom visit around your project.': 'Πείτε μας για τα σχέδιά σας και θα οργανώσουμε μια επίσκεψη στο showroom γύρω από το έργο σας.',
  'Your Appointment': 'Το ραντεβού σας', 'A considered place to begin.': 'Ένα προσεκτικό σημείο εκκίνησης.',
  'Whether you are furnishing a villa, choosing a bathroom, sourcing outdoor pieces or managing a larger project, a': 'Είτε επιπλώνετε μια βίλα, επιλέγετε μπάνιο, αναζητάτε έπιπλα εξωτερικού χώρου ή διαχειρίζεστε ένα μεγαλύτερο έργο, μια',
  'consultation gives you time and focused guidance.': 'συμβουλευτική συνάντηση σας προσφέρει χρόνο και στοχευμένη καθοδήγηση.', 'Our showroom is in Ornos, Mykonos. We will contact you to arrange a suitable time.': 'Το showroom μας βρίσκεται στον Όρνο της Μυκόνου. Θα επικοινωνήσουμε μαζί σας για να ορίσουμε την κατάλληλη ώρα.',
  'Consultation request': 'Αίτημα ραντεβού', 'Tell us about your project, preferred visit date and the collections you would like to explore.': 'Πείτε μας για το έργο σας, την προτιμώμενη ημερομηνία επίσκεψης και τις συλλογές που θέλετε να εξερευνήσετε.', 'Request Consultation': 'Αίτημα ραντεβού',
  'Gallery | Pomolo Mykonos': 'Γκαλερί | Pomolo Mykonos', 'Follow the latest interiors, collections and installations from Pomolo Mykonos.': 'Ακολουθήστε τους πιο πρόσφατους εσωτερικούς χώρους, συλλογές και εγκαταστάσεις της Pomolo Mykonos.', 'Follow the Story': 'Ακολουθήστε την ιστορία', 'Life at': 'Η ζωή στο', ', Mykonos': ', Μύκονο', 'A live feed from our Instagram — the latest interiors, arrivals & installations.': 'Μια ζωντανή ροή από το Instagram μας — οι τελευταίοι εσωτερικοί χώροι, αφίξεις και εγκαταστάσεις.',
  'For Professionals | Pomolo Mykonos': 'Για επαγγελματίες | Pomolo Mykonos', 'Project support for architects, interior designers and hospitality professionals from Pomolo Mykonos.': 'Υποστήριξη έργων για αρχιτέκτονες, σχεδιαστές εσωτερικών χώρων και επαγγελματίες φιλοξενίας από την Pomolo Mykonos.', 'Trade & Project Support': 'Υποστήριξη επαγγελματιών και έργων', 'For Professionals': 'Για επαγγελματίες', 'A practical, responsive partner for architects, interior designers, developers and hospitality teams working in Mykonos.': 'Ένας πρακτικός και άμεσος συνεργάτης για αρχιτέκτονες, σχεδιαστές εσωτερικών χώρων, κατασκευαστές και ομάδες φιλοξενίας που εργάζονται στη Μύκονο.',
  'Specification Support': 'Υποστήριξη προδιαγραφών', 'Guidance across finishes, fittings, furniture and material combinations to help decisions move forward with confidence.': 'Καθοδήγηση σε φινιρίσματα, εξαρτήματα, έπιπλα και συνδυασμούς υλικών για αποφάσεις με σιγουριά.',
  'Samples & Selections': 'Δείγματα και επιλογές', 'See materials and product options together in our showroom, with a clear view of how they will perform in the finished space.': 'Δείτε μαζί υλικά και επιλογές προϊόντων στο showroom μας, με σαφή εικόνα για τη λειτουργία τους στον ολοκληρωμένο χώρο.',
  'Project Coordination': 'Συντονισμός έργου', 'One point of contact to support your selection process from first brief through to final product decisions.': 'Ένα σημείο επικοινωνίας για να υποστηρίξει τη διαδικασία επιλογής από την αρχική ενημέρωση έως τις τελικές αποφάσεις προϊόντων.',
  'Bring your next project to the showroom.': 'Φέρτε το επόμενο έργο σας στο showroom.', 'Tell us what you are working on and we will arrange a focused consultation with the': 'Πείτε μας πάνω σε τι εργάζεστε και θα οργανώσουμε μια στοχευμένη συνάντηση με την ομάδα της', 'team.': 'ομάδα.', 'Arrange a Consultation': 'Οργανώστε ραντεβού',
  'Cyclades | Pomolo Mykonos': 'Κυκλάδες | Pomolo Mykonos', 'Pomolo Mykonos Cyclades portfolio for considered homes, villas and hospitality spaces.': 'Χαρτοφυλάκιο έργων της Pomolo Mykonos στις Κυκλάδες για επιλεγμένες κατοικίες, βίλες και χώρους φιλοξενίας.', 'Pomolo Mykonos project portfolio for considered homes, villas and hospitality spaces.': 'Χαρτοφυλάκιο έργων της Pomolo Mykonos για επιλεγμένες κατοικίες, βίλες και χώρους φιλοξενίας.', 'Thoughtful selections for homes, villas and hospitality spaces, made around the character of each place.': 'Μελετημένες επιλογές για κατοικίες, βίλες και χώρους φιλοξενίας, βασισμένες στον χαρακτήρα κάθε τόπου.', 'Portfolio': 'Έργα',
  'Very carefully selected international brands which guarantee that the value of their products is 100% representative to them. Materials that have been tested and obviously used to the bad weather conditions of the island of Mykonos. Sun, humidity and desalinated water are always the worst enemy.': 'Πολύ προσεκτικά επιλεγμένες διεθνείς μάρκες που εγγυώνται την αξία των προϊόντων τους. Υλικά δοκιμασμένα στις δύσκολες καιρικές συνθήκες της Μυκόνου, όπου ο ήλιος, η υγρασία και το αφαλατωμένο νερό είναι οι μεγαλύτεροι αντίπαλοι.',
  'Having developed several projects across the Cyclades islands and some European countries, the positive and supportive feedback is always our best guide and boost to keep moving on like this.': 'Έχοντας υλοποιήσει αρκετά έργα στα νησιά των Κυκλάδων και σε ευρωπαϊκές χώρες, η θετική και υποστηρικτική ανατροφοδότηση παραμένει ο καλύτερος οδηγός και η ώθησή μας να συνεχίζουμε.',
  'With total respect and dedication to the clients, who finally turned out to be good friends, we are hoping to hear from you anytime for any potential project.': 'Με απόλυτο σεβασμό και αφοσίωση στους πελάτες μας, που τελικά έγιναν καλοί φίλοι, θα χαρούμε να ακούσουμε νέα σας για κάθε πιθανό έργο.', 'Start a Conversation': 'Ξεκινήστε μια συζήτηση',
  'Ask for a Quote | Pomolo Mykonos': 'Ζητήστε προσφορά | Pomolo Mykonos', 'Request a quote from Pomolo Mykonos for a catalogue item or interior project.': 'Ζητήστε προσφορά από την Pomolo Mykonos για ένα προϊόν καταλόγου ή έργο εσωτερικού χώρου.', 'Seen something you like in a catalogue? Send us the details and we will prepare an offer for your project.': 'Είδατε κάτι που σας αρέσει σε έναν κατάλογο; Στείλτε μας τις λεπτομέρειες και θα ετοιμάσουμε μια προσφορά για το έργο σας.',
  'Product Enquiry': 'Ερώτημα προϊόντος', 'Tell us what you are looking for.': 'Πείτε μας τι αναζητάτε.', 'Include the catalogue name, brand, product reference or a link to the item. The more detail you provide, the more accurately we can prepare your quote.': 'Συμπεριλάβετε το όνομα καταλόγου, τη μάρκα, τον κωδικό προϊόντος ή έναν σύνδεσμο. Όσο περισσότερες λεπτομέρειες δώσετε, τόσο ακριβέστερα θα ετοιμάσουμε την προσφορά σας.',
  'For larger villa and hospitality projects, use the message field to outline the scope and estimated quantities.': 'Για μεγαλύτερα έργα βιλών και φιλοξενίας, χρησιμοποιήστε το πεδίο μηνύματος για να περιγράψετε το εύρος και τις εκτιμώμενες ποσότητες.',
  'Catalogue, brand, product name or reference, quantity, and any project details.': 'Κατάλογος, μάρκα, όνομα ή κωδικός προϊόντος, ποσότητα και οποιεσδήποτε λεπτομέρειες έργου.', 'Send Quote Request': 'Αποστολή αιτήματος προσφοράς',
  'Privacy Policy | Pomolo Mykonos': 'Πολιτική Απορρήτου | Pomolo Mykonos', 'How Pomolo Mykonos handles personal information submitted through this website.': 'Πώς η Pomolo Mykonos διαχειρίζεται τις προσωπικές πληροφορίες που υποβάλλονται μέσω αυτού του ιστότοπου.', 'How we use the personal information you provide through this website.': 'Πώς χρησιμοποιούμε τις προσωπικές πληροφορίες που παρέχετε μέσω αυτού του ιστότοπου.', 'Last updated: 31 August 2026': 'Τελευταία ενημέρωση: 31 Αυγούστου 2026',
  'Who is responsible for your information': 'Ποιος είναι υπεύθυνος για τις πληροφορίες σας', 'is responsible for the personal information collected through this website. Contact us at': 'είναι υπεύθυνη για τις προσωπικές πληροφορίες που συλλέγονται μέσω αυτού του ιστότοπου. Επικοινωνήστε μαζί μας στο', 'or at our showroom in Ornos, Mykonos 84600, Greece.': 'ή στο showroom μας στον Όρνο, Μύκονο 84600, Ελλάδα.',
  'Information we collect': 'Πληροφορίες που συλλέγουμε', 'When you send an enquiry, consultation request, or quote request, we collect the name, email address, subject, and project details you choose to provide. Our website also uses essential technical information required to deliver the site securely.': 'Όταν στέλνετε ερώτημα, αίτημα ραντεβού ή αίτημα προσφοράς, συλλέγουμε το όνομα, τη διεύθυνση email, το θέμα και τις λεπτομέρειες του έργου που επιλέγετε να παρέχετε. Ο ιστότοπός μας χρησιμοποιεί επίσης βασικές τεχνικές πληροφορίες που απαιτούνται για την ασφαλή λειτουργία του.',
  'Why we use it': 'Γιατί τις χρησιμοποιούμε', 'We use your information to respond to your enquiry, prepare a quote, arrange a consultation, and manage any resulting customer relationship. Our legal basis is our legitimate interest in responding to business enquiries and, where requested, taking steps towards a contract.': 'Χρησιμοποιούμε τις πληροφορίες σας για να απαντήσουμε στο ερώτημά σας, να ετοιμάσουμε προσφορά, να οργανώσουμε ραντεβού και να διαχειριστούμε την προκύπτουσα σχέση με τον πελάτη. Η νομική μας βάση είναι το έννομο συμφέρον μας να απαντούμε σε επιχειρηματικά ερωτήματα και, όπου ζητείται, να λαμβάνουμε μέτρα για σύναψη σύμβασης.',
  'Form delivery': 'Αποστολή φόρμας', 'Website form submissions are processed by FormSubmit and delivered to our showroom email address. Do not include payment card information, identity documents, or other sensitive personal data in a message.': 'Οι υποβολές φορμών του ιστότοπου επεξεργάζονται από το FormSubmit και αποστέλλονται στη διεύθυνση email του showroom μας. Μην συμπεριλαμβάνετε στοιχεία καρτών πληρωμής, έγγραφα ταυτότητας ή άλλα ευαίσθητα προσωπικά δεδομένα σε μήνυμα.',
  'How long we keep it': 'Για πόσο καιρό τις διατηρούμε', 'We retain enquiry records only for as long as necessary to respond, manage a customer relationship, meet legal obligations, or resolve a dispute. We review records periodically and securely delete information that is no longer needed.': 'Διατηρούμε τα αρχεία ερωτημάτων μόνο για όσο διάστημα είναι απαραίτητο για να απαντήσουμε, να διαχειριστούμε μια σχέση με πελάτη, να εκπληρώσουμε νομικές υποχρεώσεις ή να επιλύσουμε μια διαφορά. Ελέγχουμε τα αρχεία περιοδικά και διαγράφουμε με ασφάλεια τις πληροφορίες που δεν χρειάζονται πλέον.',
  'Your rights': 'Τα δικαιώματά σας', 'Subject to applicable law, you may request access to, correction of, deletion of, or restriction of your personal information, object to certain processing, or ask for a portable copy. To exercise these rights, contact us using the details above. You may also lodge a complaint with the Hellenic Data Protection Authority.': 'Σύμφωνα με την ισχύουσα νομοθεσία, μπορείτε να ζητήσετε πρόσβαση, διόρθωση, διαγραφή ή περιορισμό των προσωπικών πληροφοριών σας, να αντιταχθείτε σε ορισμένη επεξεργασία ή να ζητήσετε φορητό αντίγραφο. Για να ασκήσετε αυτά τα δικαιώματα, επικοινωνήστε μαζί μας χρησιμοποιώντας τα παραπάνω στοιχεία. Μπορείτε επίσης να υποβάλετε καταγγελία στην Αρχή Προστασίας Δεδομένων Προσωπικού Χαρακτήρα.',
  'Changes to this notice': 'Αλλαγές στην παρούσα ενημέρωση', 'We may update this notice when our services or legal requirements change. The current version will always be available on this page.': 'Μπορούμε να ενημερώνουμε αυτήν την ειδοποίηση όταν αλλάζουν οι υπηρεσίες ή οι νομικές μας υποχρεώσεις. Η τρέχουσα έκδοση θα είναι πάντα διαθέσιμη σε αυτή τη σελίδα.',
  'Website Terms | Pomolo Mykonos': 'Όροι Χρήσης Ιστοτόπου | Pomolo Mykonos', 'Terms for using the Pomolo Mykonos website.': 'Όροι για τη χρήση του ιστότοπου της Pomolo Mykonos.', 'Website Terms': 'Όροι Χρήσης Ιστοτόπου', 'Terms governing your use of this website and the information it contains.': 'Όροι που διέπουν τη χρήση αυτού του ιστότοπου και των πληροφοριών που περιέχει.',
  'Website information': 'Πληροφορίες ιστότοπου', 'This website provides general information about': 'Αυτός ο ιστότοπος παρέχει γενικές πληροφορίες για', ', our showroom, and the collections we curate. Product descriptions, images, finishes, availability, and catalogue information are indicative and may change without notice.': ', το showroom μας και τις συλλογές που επιμελούμαστε. Οι περιγραφές προϊόντων, οι εικόνες, τα φινιρίσματα, η διαθεσιμότητα και οι πληροφορίες καταλόγων είναι ενδεικτικές και μπορεί να αλλάξουν χωρίς προειδοποίηση.',
  'Quotes and orders': 'Προσφορές και παραγγελίες', 'A website enquiry, catalogue, or indicative price is not a binding offer. Product availability, specifications, delivery times, payment terms, and installation arrangements are confirmed only in a written quotation or order agreement issued by': 'Ένα ερώτημα μέσω ιστοτόπου, ένας κατάλογος ή μια ενδεικτική τιμή δεν αποτελεί δεσμευτική προσφορά. Η διαθεσιμότητα προϊόντων, οι προδιαγραφές, οι χρόνοι παράδοσης, οι όροι πληρωμής και οι ρυθμίσεις εγκατάστασης επιβεβαιώνονται μόνο με γραπτή προσφορά ή συμφωνία παραγγελίας που εκδίδεται από την',
  '.': '.', 'Intellectual property': 'Πνευματική ιδιοκτησία', 'Unless stated otherwise, this website\'s content, design, text, and images belong to': 'Εκτός αν αναφέρεται διαφορετικά, το περιεχόμενο, ο σχεδιασμός, το κείμενο και οι εικόνες αυτού του ιστότοπου ανήκουν στην', 'or are used with permission. You may view the site for personal or professional reference, but you may not reproduce, distribute, or use its content commercially without permission.': 'ή χρησιμοποιούνται με άδεια. Μπορείτε να προβάλετε τον ιστότοπο για προσωπική ή επαγγελματική αναφορά, αλλά δεν μπορείτε να αναπαράγετε, να διανέμετε ή να χρησιμοποιείτε εμπορικά το περιεχόμενό του χωρίς άδεια.',
  'External websites': 'Εξωτερικοί ιστότοποι', 'We may link to third-party websites, including Instagram and Google Maps. We do not control those sites and are not responsible for their content, availability, or privacy practices.': 'Ενδέχεται να συνδεόμαστε με ιστότοπους τρίτων, συμπεριλαμβανομένων του Instagram και των Χαρτών Google. Δεν ελέγχουμε αυτούς τους ιστότοπους και δεν ευθυνόμαστε για το περιεχόμενο, τη διαθεσιμότητα ή τις πρακτικές απορρήτου τους.',
  'Liability': 'Ευθύνη', 'We take reasonable care to keep this website accurate and available. To the extent permitted by law, we are not liable for loss arising from reliance on general website information or from temporary interruption of the website.': 'Λαμβάνουμε εύλογη μέριμνα για να διατηρούμε αυτόν τον ιστότοπο ακριβή και διαθέσιμο. Στον βαθμό που επιτρέπεται από τον νόμο, δεν ευθυνόμαστε για ζημία που προκύπτει από την εμπιστοσύνη σε γενικές πληροφορίες του ιστότοπου ή από προσωρινή διακοπή της λειτουργίας του.',
  'For questions about these terms, contact': 'Για ερωτήσεις σχετικά με αυτούς τους όρους, επικοινωνήστε με το',
  'Thank You | Pomolo Mykonos': 'Ευχαριστούμε | Pomolo Mykonos', 'Thank you.': 'Ευχαριστούμε.', 'Your message has been sent to our showroom team. We will be in touch soon.': 'Το μήνυμά σας έχει σταλεί στην ομάδα του showroom μας. Θα επικοινωνήσουμε σύντομα μαζί σας.', 'Return Home': 'Επιστροφή στην αρχική', 'Pomolo website enquiry': 'Ερώτημα μέσω ιστοτόπου Pomolo', 'Pomolo consultation request': 'Αίτημα ραντεβού Pomolo', 'Pomolo quote request': 'Αίτημα προσφοράς Pomolo', 'Catalogue quote request - General': 'Αίτημα προσφοράς καταλόγου - Γενικά',
  '. All rights reserved.': '. Με επιφύλαξη παντός δικαιώματος.', 'All rights reserved.': 'Με επιφύλαξη παντός δικαιώματος.', 'Terms': 'Όροι', 'Architecture Studio Logo': 'Λογότυπο αρχιτεκτονικού γραφείου', 'Toggle menu': 'Εναλλαγή μενού', 'Back to top': 'Επιστροφή στην κορυφή', 'Scroll down': 'Κύλιση προς τα κάτω', 'Pomolo Mykonos on Instagram': 'Pomolo Mykonos στο Instagram', 'Pomolo Mykonos on Facebook': 'Pomolo Mykonos στο Facebook',
  'Enter an email address with a domain, such as name@example.com.': 'Εισαγάγετε μια διεύθυνση email με όνομα τομέα, όπως name@example.com.'
};

const originalTextNodes = new WeakMap();
const originalAttributes = new WeakMap();
const languageStorageKey = 'pomolo-language';
const originalDocumentTitle = document.title;

function translateText(text, language = document.documentElement.lang) {
  return language === 'el' && Object.prototype.hasOwnProperty.call(greekTranslations, text) ? greekTranslations[text] : text;
}

window.pomoloTranslateText = translateText;

function translateTextNodes(language) {
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  const nodes = [];

  while (walker.nextNode()) {
    const node = walker.currentNode;
    const parent = node.parentElement;
    if (!parent || parent.closest('script, style, svg, [data-no-translate]')) continue;
    nodes.push(node);
  }

  nodes.forEach(node => {
    const original = originalTextNodes.get(node) ?? node.nodeValue;
    originalTextNodes.set(node, original);
    const leading = original.match(/^\s*/)?.[0] ?? '';
    const trailing = original.match(/\s*$/)?.[0] ?? '';
    const content = original.trim();
    node.nodeValue = content ? `${leading}${translateText(content, language)}${trailing}` : original;
  });
}

function translateAttributes(language) {
  document.querySelectorAll('[placeholder], [title], [aria-label], [value], meta[content]').forEach(element => {
    const attributes = ['placeholder', 'title', 'aria-label', 'value', 'content'];
    const originals = originalAttributes.get(element) ?? {};

    attributes.forEach(attribute => {
      if (!element.hasAttribute(attribute)) return;
      if (!(attribute in originals)) originals[attribute] = element.getAttribute(attribute);
      element.setAttribute(attribute, translateText(originals[attribute], language));
    });

    originalAttributes.set(element, originals);
  });
}

function updateQuoteSubject(language) {
  const subjectField = document.querySelector('input[name="subject"]');
  if (!subjectField || !categoryParam) return;
  const categoryName = categoryNames[categoryParam] || (categoryParam.charAt(0).toUpperCase() + categoryParam.slice(1));
  const translatedCategory = translateText(categoryName, language);
  subjectField.value = language === 'el' ? `Αίτημα προσφοράς καταλόγου - ${translatedCategory}` : `Catalogue quote request - ${categoryName}`;
}

function applyLanguage(language) {
  document.documentElement.lang = language;
  document.documentElement.dataset.language = language;
  document.title = translateText(originalDocumentTitle, language);
  translateTextNodes(language);
  translateAttributes(language);
  updateQuoteSubject(language);

  const button = document.querySelector('.language-toggle');
  if (button) {
    button.textContent = language === 'el' ? 'ΕΛ' : 'EN';
    button.setAttribute('aria-label', language === 'el' ? 'Αλλαγή σε Αγγλικά' : 'Switch to Greek');
    button.setAttribute('aria-pressed', String(language === 'el'));
  }
}

function addLanguageToggle() {
  const headerInner = document.querySelector('.header-inner');
  const menuButton = document.getElementById('menu-toggle');
  if (!headerInner || !menuButton || headerInner.querySelector('.language-toggle')) return;

  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'language-toggle';
  button.dataset.noTranslate = '';
  button.addEventListener('click', () => {
    const nextLanguage = document.documentElement.lang === 'el' ? 'en' : 'el';
    localStorage.setItem(languageStorageKey, nextLanguage);
    applyLanguage(nextLanguage);
  });

  headerInner.insertBefore(button, menuButton);
}

addLanguageToggle();
const savedLanguage = localStorage.getItem(languageStorageKey);
applyLanguage(savedLanguage === 'el' ? 'el' : 'en');


