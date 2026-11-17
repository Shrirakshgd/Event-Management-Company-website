/**
 * ASHIRWAD WEDDINGS & EVENTS — Weddings & Events
 * Main JavaScript
 *
 * Sections:
 * 1. Sticky Header
 * 2. Mobile Navigation
 * 3. Testimonial Tabs
 * 4. Enquiry Form (Formspree)
 * 5. Back to Top
 * 6. Utilities
 */

/* ============================================================
   1. STICKY HEADER
   ============================================================ */
(function initStickyHeader() {
  const header = document.getElementById('site-header');
  if (!header) return;

  function updateHeader() {
    if (window.scrollY > 30) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', updateHeader, { passive: true });
  updateHeader();
})();


/* ============================================================
   2. MOBILE NAVIGATION
   ============================================================ */
(function initMobileNav() {
  const toggle   = document.querySelector('.mobile-menu-toggle');
  const close    = document.querySelector('.mobile-nav-close');
  const drawer   = document.getElementById('mobile-nav');
  const backdrop = document.getElementById('mobile-backdrop');
  const navLinks = drawer ? drawer.querySelectorAll('a') : [];

  if (!toggle || !drawer || !backdrop) return;

  function openNav() {
    drawer.classList.add('open');
    backdrop.classList.add('active');
    drawer.removeAttribute('aria-hidden');
    toggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeNav() {
    drawer.classList.remove('open');
    backdrop.classList.remove('active');
    drawer.setAttribute('aria-hidden', 'true');
    toggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  toggle.addEventListener('click', openNav);
  if (close) close.addEventListener('click', closeNav);
  backdrop.addEventListener('click', closeNav);

  navLinks.forEach(link => link.addEventListener('click', closeNav));

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && drawer.classList.contains('open')) closeNav();
  });
})();


/* ============================================================
   3. CURATED DESTINATIONS VISUAL SHOWCASE
   ============================================================ */
const DESTINATIONS = [
  // India (12)
  {
    id: 'udaipur',
    name: 'Udaipur',
    country: 'Rajasthan, India',
    region: 'india',
    categories: ['palace'],
    vibe: 'Royal Lake Palaces',
    img: 'https://images.unsplash.com/photo-1703092289078-ff03b771237c?auto=format&fit=crop&w=800&q=80',
    desc: "The City of Lakes — regal lakeside mandaps, majestic palace courtyards, and timeless Rajput hospitality.",
    venues: ['The Oberoi Udaivilas', 'Mementos by ITC Hotels']
  },
  {
    id: 'jaipur',
    name: 'Jaipur',
    country: 'Rajasthan, India',
    region: 'india',
    categories: ['palace'],
    vibe: 'Forts & Royal Havelis',
    img: 'https://images.unsplash.com/photo-1670570586106-c1bc75d94b46?auto=format&fit=crop&w=800&q=80',
    desc: "The Pink City — opulent fort courtyards, heritage havelis, and grand celebrations steeped in royal Rajasthani pageantry.",
    venues: ['Taj Devi Ratn', 'Mundota Fort & Palace']
  },
  {
    id: 'goa',
    name: 'Goa',
    country: 'India',
    region: 'india',
    categories: ['coastal'],
    vibe: 'Sunset Beach & Heritage',
    img: 'https://images.unsplash.com/photo-1695411560235-595738c0dbda?auto=format&fit=crop&w=800&q=80',
    desc: "Golden sands, sunset beachfront pheras, private Portuguese estates, and vibrant multi-day coastal soirees.",
    venues: ['Taj Holiday Village', 'Grand Hyatt Goa', 'Gateway by Taj']
  },
  {
    id: 'kerala',
    name: 'Kerala',
    country: 'India',
    region: 'india',
    categories: ['coastal'],
    vibe: 'Emerald Backwaters',
    img: 'https://images.unsplash.com/photo-1593693411515-c20261bcad6e?auto=format&fit=crop&w=800&q=80',
    desc: "God's Own Country — tranquil palm-fringed backwaters, luxury tropical resorts, and lush, serene landscapes.",
    venues: ['Grand Hyatt Kochi', 'Taj Bekal Resort & Spa']
  },
  {
    id: 'hyderabad',
    name: 'Hyderabad',
    country: 'Telangana, India',
    region: 'india',
    categories: ['metro'],
    vibe: 'Grand Resorts & Film City',
    img: 'https://images.unsplash.com/photo-1560237606-f82b6cb1ebbf?auto=format&fit=crop&w=800&q=80',
    desc: "The City of Pearls — hosted grand guest hospitality, artist management, and turnkey logistics across world-class properties.",
    venues: ['Hilton Hyderabad', 'Ramoji Film City']
  },
  {
    id: 'bengaluru',
    name: 'Bengaluru',
    country: 'Karnataka, India',
    region: 'india',
    categories: ['metro'],
    vibe: 'Garden Estates & Luxury',
    img: 'https://images.unsplash.com/photo-1672828792610-c336e7db6646?auto=format&fit=crop&w=800&q=80',
    desc: "Silicon City — premier five-star luxury ballrooms, sprawling palace grounds, and bespoke metropolitan galas.",
    venues: ['JW Marriott Prestige Golfshire']
  },
  {
    id: 'mumbai',
    name: 'Mumbai',
    country: 'Maharashtra, India',
    region: 'india',
    categories: ['coastal', 'metro'],
    vibe: 'Seafront Glamour & Banquets',
    img: 'https://images.unsplash.com/photo-1781636582616-cbc208ad57d3?auto=format&fit=crop&w=800&q=80',
    desc: "India's cosmopolitan capital — iconic seafront hotels, grand heritage ballrooms, and high-profile private celebrations.",
    venues: ['The Taj Mahal Palace', 'Taj Lands End', 'Grand Hyatt Mumbai', 'The Westin Powai', 'Fairmont Mumbai', 'Sahara Star']
  },
  {
    id: 'rishikesh',
    name: 'Rishikesh',
    country: 'Uttarakhand, India',
    region: 'india',
    categories: ['hills'],
    vibe: 'Sacred Himalayan Ganges',
    img: 'https://images.unsplash.com/photo-1598609970679-53239f2ede82?auto=format&fit=crop&w=800&q=80',
    desc: "Sacred Himalayan town on the holy Ganges — tranquil, spiritual, and intimate riverside wedding mandaps.",
    venues: ['The Westin Resort & Spa', 'Antalya Resort']
  },
  {
    id: 'mussoorie',
    name: 'Mussoorie',
    country: 'Uttarakhand, India',
    region: 'india',
    categories: ['hills'],
    vibe: 'Misty Mountain Hills',
    img: 'https://images.unsplash.com/photo-1651307110965-8340722facc0?auto=format&fit=crop&w=800&q=80',
    desc: "Queen of the Hills — misty mountain panoramas, crisp highland weather, and colonial heritage manor venues.",
    venues: ['JW Marriott Mussoorie Walnut Grove']
  },
  {
    id: 'surat',
    name: 'Surat',
    country: 'Gujarat, India',
    region: 'india',
    categories: ['metro'],
    vibe: 'Opulent Luxury Banquets',
    img: 'https://images.unsplash.com/photo-1587271407850-8d438ca9fdf2?auto=format&fit=crop&w=800&q=80',
    desc: "Vibrant cultural hub of Gujarat — grand multi-day community celebrations, bespoke catering, and lavish setups.",
    venues: ['Le Méridien Surat', 'Avadh Utopia', 'Bhavanta Resort']
  },
  {
    id: 'coorg',
    name: 'Coorg',
    country: 'Karnataka, India',
    region: 'india',
    categories: ['hills'],
    vibe: 'Coffee Plantation Retreats',
    img: 'https://images.unsplash.com/photo-1756825676966-93efb43d2b81?auto=format&fit=crop&w=800&q=80',
    desc: "The Scotland of India — lush private coffee estates, serene misty mornings, and intimate nature soirees.",
    venues: ['Taj Madikeri Resort & Spa', 'Montrose Golf Resort & Spa', 'The Coorg Wilderness Resort & Spa']
  },
  {
    id: 'bidar',
    name: 'Bidar',
    country: 'Karnataka, India',
    region: 'india',
    categories: ['palace'],
    vibe: 'Deccan Citadel Traditions',
    img: 'https://images.unsplash.com/photo-1793133482705-4cf112a56b92?auto=format&fit=crop&w=800&q=80',
    desc: "Historic Deccan citadel — rich cultural legacy, grand multi-day family celebrations, and customized hospitality.",
    venues: ['Heritage Fort Venues & Banquets']
  },

  // International (4)
  {
    id: 'bahrain',
    name: 'Bahrain',
    country: 'Bahrain',
    region: 'international',
    categories: ['international'],
    vibe: 'Arabian Gulf Luxury',
    img: 'https://images.unsplash.com/photo-1748066768504-99532da7d1e9?auto=format&fit=crop&w=800&q=80',
    desc: "Arabian Gulf jewel — luxury five-star island resorts, beachfront banquets, and seamless cross-border NRI event production.",
    venues: ['Royal Saray Resort', 'Four Seasons Bahrain Bay', 'The Gulf Hotel', 'Wyndham Grand', 'Wyndham Garden']
  },
  {
    id: 'thailand',
    name: 'Thailand',
    country: 'Thailand',
    region: 'international',
    categories: ['coastal', 'international'],
    vibe: 'Tropical Beachfront Buyouts',
    img: 'https://images.unsplash.com/photo-1786511905202-4bed727d9b0d?auto=format&fit=crop&w=800&q=80',
    desc: "Tropical paradise — luxury resort buyouts, turquoise oceanfront mandaps, and sunset celebration galas.",
    venues: ['JW Marriott Khao Lak Resort & Spa']
  },
  {
    id: 'nepal',
    name: 'Nepal',
    country: 'Nepal',
    region: 'international',
    categories: ['hills', 'international'],
    vibe: 'Himalayan Panoramas',
    img: 'https://images.unsplash.com/photo-1611516491426-03025e6043c8?auto=format&fit=crop&w=800&q=80',
    desc: "Kathmandu valley heritage palaces, serene Himalayan mountain panoramas, and sacred wedding rituals.",
    venues: ['Hyatt Regency Kathmandu', 'Kathmandu Marriott Hotel']
  },
  {
    id: 'sri-lanka',
    name: 'Sri Lanka',
    country: 'Sri Lanka',
    region: 'international',
    categories: ['coastal', 'international'],
    vibe: 'Oceanfront Luxury Resorts',
    img: 'https://images.unsplash.com/photo-1783254887950-fc17bd0e8574?auto=format&fit=crop&w=800&q=80',
    desc: "Pearl of the Indian Ocean — tranquil beachfront lagoons, colonial heritage ballrooms, and oceanfront sunset mandaps.",
    venues: ['Taj Samudra Colombo', 'Anantara Kalutara Resort']
  }
];

(function initDestinationsShowcase() {
  const grid = document.getElementById('dest-grid');
  const tabs = document.querySelectorAll('.dest-tab');
  const destInput = document.getElementById('destination');

  if (!grid) return;

  function render(filter) {
    const list = filter === 'all'
      ? DESTINATIONS
      : DESTINATIONS.filter(d => {
          if (filter === 'international') return d.region === 'international' || d.categories?.includes('international');
          if (filter === 'palace') return d.categories?.includes('palace');
          if (filter === 'coastal') return d.categories?.includes('coastal');
          if (filter === 'hills') return d.categories?.includes('hills');
          if (filter === 'metro') return d.categories?.includes('metro');
          return d.region === filter || d.categories?.includes(filter);
        });

    grid.innerHTML = list.map(d => `
      <article class="dest-card" data-id="${d.id}">
        <div class="dest-card-media">
          <img src="${d.img}" alt="${d.name} Wedding & Event Destination" class="dest-card-img" loading="lazy" onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80';">
          <div class="dest-card-badges">
            <span class="dest-card-badge">${d.vibe}</span>
            <span class="dest-card-flag">${d.region === 'international' ? 'International' : 'India'}</span>
          </div>
        </div>
        <div class="dest-card-body">
          <div class="dest-card-header">
            <h3 class="dest-card-name">${d.name}</h3>
            <span class="dest-card-vibe">${d.country}</span>
          </div>
          <p class="dest-card-desc">${d.desc}</p>
          ${d.venues && d.venues.length ? `
            <div class="dest-card-venues">
              <span class="venues-label">Featured Venues:</span>
              <div class="venues-tags">
                ${d.venues.map(v => `<span class="venue-tag">${v}</span>`).join('')}
              </div>
            </div>
          ` : ''}
          <a href="#contact" class="dest-card-action" data-dest="${d.name}" aria-label="Plan your event in ${d.name}">
            <span>Inquire For This Destination</span>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </a>
        </div>
      </article>
    `).join('');

    // Pre-fill destination field when clicking "Inquire For This Destination"
    grid.querySelectorAll('.dest-card-action').forEach(btn => {
      btn.addEventListener('click', () => {
        const place = btn.getAttribute('data-dest');
        if (destInput && place) {
          destInput.value = place;
          destInput.focus();
        }
      });
    });
  }

  // Filter tabs
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');
      const filter = tab.getAttribute('data-filter') || 'all';
      render(filter);
    });
  });

  // Initial render
  render('all');
})();


/* ============================================================
   4. TESTIMONIAL TABS
   ============================================================ */
(function initTestimonialTabs() {
  const tabs    = document.querySelectorAll('.testimonial-tab');
  const panels  = document.querySelectorAll('.testimonials-panel');

  if (!tabs.length) return;

  tabs.forEach((tab, idx) => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      panels.forEach(p => {
        p.classList.add('hidden');
        p.setAttribute('aria-hidden', 'true');
      });

      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');

      const panel = panels[idx];
      if (panel) {
        panel.classList.remove('hidden');
        panel.removeAttribute('aria-hidden');
      }
    });
  });
})();


/* ============================================================
   7. ENQUIRY FORM (FORMSPREE)
   ============================================================ */
(function initEnquiryForm() {
  const form       = document.getElementById('enquiry-form');
  const submitBtn  = document.getElementById('submit-btn');
  const statusEl   = document.getElementById('form-status');

  if (!form) return;

  // Field-level validation rules
  const rules = {
    name:       { required: true, minLength: 2, label: 'Name' },
    email:      { required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, label: 'Email' },
    event_type: { required: true, label: 'Event type' },
  };

  function validateField(input) {
    const rule = rules[input.name];
    const err  = input.closest('.form-group')?.querySelector('.form-error');

    if (!rule) return true;

    const val = input.value.trim();

    if (rule.required && !val) {
      setFieldError(input, err, `${rule.label} is required`);
      return false;
    }

    if (rule.minLength && val.length < rule.minLength) {
      setFieldError(input, err, `${rule.label} must be at least ${rule.minLength} characters`);
      return false;
    }

    if (rule.pattern && !rule.pattern.test(val)) {
      setFieldError(input, err, `Please enter a valid ${rule.label.toLowerCase()}`);
      return false;
    }

    clearFieldError(input, err);
    return true;
  }

  function setFieldError(input, errEl, msg) {
    input.classList.add('has-error');
    input.classList.remove('is-valid');
    if (errEl) errEl.textContent = msg;
  }

  function clearFieldError(input, errEl) {
    input.classList.remove('has-error');
    input.classList.add('is-valid');
    if (errEl) errEl.textContent = '';
  }

  // Live validation on blur
  Object.keys(rules).forEach(name => {
    const input = form.elements[name];
    if (input) {
      input.addEventListener('blur', () => validateField(input));
      input.addEventListener('input', () => {
        if (input.classList.contains('has-error')) validateField(input);
      });
    }
  });

  function setLoadingState(loading) {
    const btnText = submitBtn.querySelector('.submit-text');
    const btnLoad = submitBtn.querySelector('.submit-loading');

    submitBtn.disabled = loading;
    if (loading) {
      btnText.hidden = true;
      btnLoad.hidden = false;
    } else {
      btnText.hidden = false;
      btnLoad.hidden = true;
    }
  }

  function showStatus(type, msg) {
    statusEl.className = `form-status ${type}`;
    statusEl.textContent = msg;
    statusEl.style.display = 'flex';
    statusEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  function hideStatus() {
    statusEl.style.display = 'none';
    statusEl.className = 'form-status';
  }

  form.addEventListener('submit', async function (e) {
    e.preventDefault();
    hideStatus();

    // Validate all required fields
    let isValid = true;
    Object.keys(rules).forEach(name => {
      const input = form.elements[name];
      if (input && !validateField(input)) isValid = false;
    });

    if (!isValid) {
      showStatus('error', 'Please fill in all required fields correctly.');
      return;
    }

    // Build WhatsApp pre-filled message URL with all submitted data
    function buildWhatsAppUrl() {
      const nameInput = form.elements['name'] || form.elements['fullname'] || document.getElementById('name');
      const name = (nameInput && nameInput.value.trim()) || '';
      const email = (form.elements['email'] && form.elements['email'].value.trim()) || '';
      const phone = (form.elements['phone'] && form.elements['phone'].value.trim()) || '';
      const eventType = (form.elements['event_type'] && form.elements['event_type'].value) || '';
      const destination = (form.elements['destination'] && form.elements['destination'].value.trim()) || '';
      const eventDate = (form.elements['event_date'] && form.elements['event_date'].value.trim()) || '';
      const guestCount = (form.elements['guest_count'] && form.elements['guest_count'].value) || '';
      const message = (form.elements['message'] && form.elements['message'].value.trim()) || '';

      const lines = [
        '*New Event Enquiry — Ashirwad Weddings & Events*',
        '',
        '*Name:* ' + (name || 'Not provided'),
        '*Phone:* ' + (phone || 'Not provided'),
        '*Email:* ' + (email || 'Not provided'),
        '*Event Type:* ' + (eventType || 'Not specified'),
        '*Preferred Destination:* ' + (destination || 'Not specified'),
        '*Approx Date:* ' + (eventDate || 'Not specified'),
        '*Guest Count:* ' + (guestCount || 'Not specified'),
        '*Details:* ' + (message || 'Not specified')
      ];

      return 'https://wa.me/919920355344?text=' + encodeURIComponent(lines.join('\n'));
    }

    function showWhatsAppFallback(reasonText) {
      const waUrl = buildWhatsAppUrl();
      statusEl.className = 'form-status form-status-fallback';
      statusEl.innerHTML = `
        <div class="form-fallback-card">
          <div class="form-fallback-header">
            <span class="fallback-badge">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
              Enquiry Details Saved
            </span>
            <h4 class="fallback-heading">Connect Instantly on WhatsApp</h4>
          </div>
          <p class="fallback-desc">
            ${reasonText || "To guarantee your enquiry is answered immediately without any email latency, tap below to chat directly with our planning team on WhatsApp:"}
          </p>
          <a href="${waUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-wa-fallback">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.301-.15-1.78-.878-2.056-.978-.276-.1-.476-.15-.676.15-.2.301-.776.978-.952 1.18-.175.2-.351.225-.652.075-.301-.15-1.27-.468-2.42-1.493-.895-.798-1.5-1.784-1.676-2.085-.175-.301-.019-.464.132-.614.136-.134.301-.35.452-.525.15-.175.2-.3.301-.5.1-.2.05-.375-.025-.525s-.677-1.632-.927-2.235c-.244-.588-.492-.508-.676-.518-.175-.008-.376-.01-.577-.01-.2 0-.527.075-.802.375-.276.301-1.054 1.03-1.054 2.513s1.079 2.912 1.23 3.113c.15.2 2.123 3.242 5.143 4.547.718.31 1.279.496 1.716.635.722.23 1.378.197 1.897.12.578-.088 1.78-.727 2.03-1.428.25-.702.25-1.303.175-1.428-.075-.125-.276-.2-.577-.35zM12.042 21.75c-1.802 0-3.567-.47-5.127-1.36l-.367-.212-3.808 1 1.018-3.712-.236-.375A9.704 9.704 0 0 1 2.25 12.042C2.25 6.643 6.643 2.25 12.042 2.25s9.792 4.393 9.792 9.792-4.393 9.708-9.792 9.708zm0-17.917c-4.509 0-8.175 3.666-8.175 8.209 0 1.583.454 3.125 1.317 4.458l.192.3-.617 2.25 2.308-.608.292.175c1.283.766 2.766 1.175 4.283 1.175 4.509 0 8.175-3.667 8.175-8.209s-3.666-7.75-8.175-7.75z"/></svg>
            <span>Send Enquiry via WhatsApp (+91 99203 55344) &rarr;</span>
          </a>
        </div>
      `;
      statusEl.style.display = 'block';
      statusEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    setLoadingState(true);

    try {
      const data     = new FormData(form);
      const response = await fetch(form.action, {
        method: 'POST',
        body:   data,
        headers: { Accept: 'application/json' },
      });

      if (response.ok) {
        const waUrl = buildWhatsAppUrl();
        const nameInput = form.elements['name'] || form.elements['fullname'] || document.getElementById('name');
        const clientName = (nameInput && nameInput.value.trim()) || '';
        const eventType = (form.elements['event_type'] && form.elements['event_type'].value) || 'your event';

        // Hide form inputs so the Thank You card takes center stage right on the website
        const formElementsToHide = form.querySelectorAll('.form-row, .form-group, #submit-btn, .form-direct-wa');
        formElementsToHide.forEach(el => el.style.display = 'none');

        statusEl.className = 'form-status form-status-success';
        const safeClientName = clientName.replace(/[<>&"']/g, c => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;', "'": '&#39;' }[c]));
        const safeEventType = eventType.replace(/[<>&"']/g, c => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;', "'": '&#39;' }[c]));
        const safeDest = ((form.elements['destination'] && form.elements['destination'].value.trim()) || 'Curated Destinations').replace(/[<>&"']/g, c => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;', "'": '&#39;' }[c]));
        const safeDate = ((form.elements['event_date'] && form.elements['event_date'].value.trim()) || 'Dates to be aligned').replace(/[<>&"']/g, c => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;', "'": '&#39;' }[c]));
        const safeGuests = ((form.elements['guest_count'] && form.elements['guest_count'].value) || '').replace(/[<>&"']/g, c => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;', "'": '&#39;' }[c]));

        statusEl.innerHTML = `
          <div class="form-success-card-full">
            <div class="thankyou-crest" aria-hidden="true">
              <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="32" cy="32" r="30" stroke="#C69D59" stroke-width="1.2" stroke-dasharray="2 3"/>
                <circle cx="32" cy="32" r="26" stroke="#C69D59" stroke-width="1.5"/>
                <path d="M32 14c2.5 5.5 6 9.5 6 15 0 6.5-6 11-6 11s-6-4.5-6-11c0-5.5 3.5-9.5 6-15z" fill="#C69D59" fill-opacity="0.2" stroke="#C69D59" stroke-width="1.5" stroke-linejoin="round"/>
                <path d="M22 28c4 2 7 6 7 11 0 4-3 7-7 7s-7-3-7-7c0-5 3.5-9 7-11z" fill="#C69D59" fill-opacity="0.15" stroke="#C69D59" stroke-width="1.2"/>
                <path d="M42 28c-4 2-7 6-7 11 0 4 3 7 7 7s7-3 7-7c0-5-3.5-9-7-11z" fill="#C69D59" fill-opacity="0.15" stroke="#C69D59" stroke-width="1.2"/>
                <circle cx="32" cy="36" r="2.5" fill="#6B1F2F"/>
              </svg>
            </div>

            <p class="thankyou-eyebrow">ASHIRWAD PRIVATE CONCIERGE</p>
            <h3 class="thankyou-title">Celebration Details Received</h3>
            <p class="thankyou-greeting">${safeClientName ? 'Namaste, ' + safeClientName : 'Namaste'}</p>

            <p class="thankyou-lead">
              Thank you for entrusting your celebration to <strong>Ashirwad Weddings &amp; Events</strong>. Our senior wedding planning team will review your celebration vision and connect with you within 24 hours.
            </p>

            <div class="thankyou-receipt">
              <div class="receipt-item">
                <span class="receipt-label">Event Vision</span>
                <span class="receipt-val">${safeEventType}</span>
              </div>
              <div class="receipt-item">
                <span class="receipt-label">Preferred Destination</span>
                <span class="receipt-val">${safeDest}</span>
              </div>
              <div class="receipt-item">
                <span class="receipt-label">Target Date</span>
                <span class="receipt-val">${safeDate}</span>
              </div>
              <div class="receipt-item">
                <span class="receipt-label">Guest Scale</span>
                <span class="receipt-val">${safeGuests ? safeGuests + ' Guests' : 'To be confirmed'}</span>
              </div>
            </div>

            <div class="thankyou-steps">
              <div class="step-box">
                <span class="step-num">01</span>
                <div class="step-text">
                  <strong>Vision Review</strong>
                  <p>Our team aligns dates, guest scale &amp; logistics.</p>
                </div>
              </div>
              <div class="step-box">
                <span class="step-num">02</span>
                <div class="step-text">
                  <strong>Private Discovery Call</strong>
                  <p>A 1-on-1 walkthrough of your preferences &amp; aesthetic.</p>
                </div>
              </div>
              <div class="step-box">
                <span class="step-num">03</span>
                <div class="step-text">
                  <strong>Curated Deck</strong>
                  <p>Bespoke proposals, moodboards &amp; venue options.</p>
                </div>
              </div>
            </div>

            <div class="success-actions">
              <a href="${waUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-wa-fallback">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.301-.15-1.78-.878-2.056-.978-.276-.1-.476-.15-.676.15-.2.301-.776.978-.952 1.18-.175.2-.351.225-.652.075-.301-.15-1.27-.468-2.42-1.493-.895-.798-1.5-1.784-1.676-2.085-.175-.301-.019-.464.132-.614.136-.134.301-.35.452-.525.15-.175.2-.3.301-.5.1-.2.05-.375-.025-.525s-.677-1.632-.927-2.235c-.244-.588-.492-.508-.676-.518-.175-.008-.376-.01-.577-.01-.2 0-.527.075-.802.375-.276.301-1.054 1.03-1.054 2.513s1.079 2.912 1.23 3.113c.15.2 2.123 3.242 5.143 4.547.718.31 1.279.496 1.716.635.722.23 1.378.197 1.897.12.578-.088 1.78-.727 2.03-1.428.25-.702.25-1.303.175-1.428-.075-.125-.276-.2-.577-.35zM12.042 21.75c-1.802 0-3.567-.47-5.127-1.36l-.367-.212-3.808 1 1.018-3.712-.236-.375A9.704 9.704 0 0 1 2.25 12.042C2.25 6.643 6.643 2.25 12.042 2.25s9.792 4.393 9.792 9.792-4.393 9.708-9.792 9.708zm0-17.917c-4.509 0-8.175 3.666-8.175 8.209 0 1.583.454 3.125 1.317 4.458l.192.3-.617 2.25 2.308-.608.292.175c1.283.766 2.766 1.175 4.283 1.175 4.509 0 8.175-3.667 8.175-8.209s-3.666-7.75-8.175-7.75z"/></svg>
                <span>Instant WhatsApp Connect</span>
              </a>
              <button type="button" class="btn btn-reset-inquiry" id="btn-reset-form">
                Send Another Enquiry
              </button>
            </div>
          </div>
        `;
        statusEl.style.display = 'block';
        statusEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

        document.getElementById('btn-reset-form')?.addEventListener('click', () => {
          form.reset();
          formElementsToHide.forEach(el => el.style.display = '');
          statusEl.style.display = 'none';
          statusEl.innerHTML = '';
          form.querySelectorAll('.form-input').forEach(el => el.classList.remove('has-error', 'is-valid'));
        });
      } else {
        // Formspree not yet verified or returned an error — trigger WhatsApp fallback with pre-filled inputs
        showWhatsAppFallback("Our email server is currently awaiting final domain confirmation. Don't worry — your enquiry details are saved! Click below to send directly via WhatsApp:");
      }
    } catch {
      // Network or cross-origin issue — trigger WhatsApp fallback with pre-filled inputs
      showWhatsAppFallback("Network glitch prevented direct email transmission. We've preserved all your event details — tap below to send them straight to WhatsApp:");
    } finally {
      setLoadingState(false);
    }
  });
})();

/* ============================================================
   8. BACK TO TOP
   ============================================================ */
(function initBackToTop() {
  const btn = document.getElementById('back-to-top');
  if (!btn) return;

  function updateVisibility() {
    if (window.scrollY > 500) {
      btn.removeAttribute('hidden');
    } else {
      btn.setAttribute('hidden', '');
    }
  }

  window.addEventListener('scroll', updateVisibility, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  updateVisibility();
})();


/* ============================================================
   9. FOOTER YEAR
   ============================================================ */
(function updateFooterYear() {
  const el = document.getElementById('footer-year');
  if (el) el.textContent = new Date().getFullYear();
})();


/* ============================================================
   10. FAQ ACCORDION
   ============================================================ */
(function initFaqAccordion() {
  const accordion = document.getElementById('faq-accordion');
  if (!accordion) return;

  const items = accordion.querySelectorAll('.faq-item');

  items.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');
    const icon = item.querySelector('.faq-icon');

    if (!questionBtn || !answer) return;

    questionBtn.addEventListener('click', () => {
      const isExpanded = questionBtn.getAttribute('aria-expanded') === 'true';

      // Close all other items for clean single-open accordion feel
      items.forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('active');
          const otherBtn = otherItem.querySelector('.faq-question');
          const otherAns = otherItem.querySelector('.faq-answer');
          const otherIcon = otherItem.querySelector('.faq-icon');
          if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
          if (otherAns) otherAns.setAttribute('hidden', '');
          if (otherIcon) otherIcon.innerHTML = '&#43;';
        }
      });

      // Toggle current item
      if (isExpanded) {
        item.classList.remove('active');
        questionBtn.setAttribute('aria-expanded', 'false');
        answer.setAttribute('hidden', '');
        if (icon) icon.innerHTML = '&#43;';
      } else {
        item.classList.add('active');
        questionBtn.setAttribute('aria-expanded', 'true');
        answer.removeAttribute('hidden');
        if (icon) icon.innerHTML = '&minus;';
      }
    });
  });
})();


/* ============================================================
   11. SCROLL REVEAL (INTERSECTION OBSERVER)
   ============================================================ */
(function initScrollReveal() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const revealElements = document.querySelectorAll(
    '.service-card, .destination-card, .testimonial-card, .video-testimonial-card, .about-media, .about-text, .story-portrait, .story-content, .faq-item, .contact-info, .enquiry-form'
  );

  if (!revealElements.length) return;

  revealElements.forEach(el => el.classList.add('reveal'));

  if (!('IntersectionObserver' in window)) {
    revealElements.forEach(el => el.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        obs.unobserve(entry.target);
      }
    });
  }, {
    rootMargin: '0px 0px -40px 0px',
    threshold: 0.12
  });

  revealElements.forEach(el => observer.observe(el));
})();
