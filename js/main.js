/**
 * ASHIRWAD WEDDINGS & EVENTS
 * Client Interaction, Lightbox, Filters, Form Processing & Dynamic UI
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Sticky Navigation on Scroll
  const navbar = document.querySelector('.site-navbar');
  const backToTopBtn = document.querySelector('.back-to-top-btn');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar?.classList.add('scrolled');
    } else {
      navbar?.classList.remove('scrolled');
    }

    if (window.scrollY > 400) {
      backToTopBtn?.classList.add('visible');
    } else {
      backToTopBtn?.classList.remove('visible');
    }
  });

  // Back to top click
  backToTopBtn?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // 2. Mobile Drawer Navigation
  const mobileToggle = document.querySelector('.mobile-nav-toggle');
  const mobileDrawer = document.querySelector('.mobile-nav-drawer');
  const drawerClose = document.querySelector('.mobile-drawer-close');
  const drawerBackdrop = document.querySelector('.mobile-drawer-backdrop');
  const mobileLinks = document.querySelectorAll('.mobile-links a');

  function openDrawer() {
    mobileDrawer?.classList.add('open');
    drawerBackdrop?.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    mobileDrawer?.classList.remove('open');
    drawerBackdrop?.classList.remove('active');
    document.body.style.overflow = '';
  }

  mobileToggle?.addEventListener('click', openDrawer);
  drawerClose?.addEventListener('click', closeDrawer);
  drawerBackdrop?.addEventListener('click', closeDrawer);
  mobileLinks.forEach(link => link.addEventListener('click', closeDrawer));

  // 3. Portfolio Category Filtering
  const filterBtns = document.querySelectorAll('.filter-btn');
  const portfolioItems = document.querySelectorAll('.portfolio-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      portfolioItems.forEach(item => {
        const itemCategory = item.getAttribute('data-category');
        if (filterValue === 'all' || itemCategory === filterValue) {
          item.style.display = 'block';
          item.style.animation = 'fadeIn 0.4s ease';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });

  // 4. Fullscreen Portfolio Lightbox
  const lightboxModal = document.querySelector('.lightbox-modal');
  const lightboxImg = document.querySelector('.lightbox-media img');
  const lightboxTitle = document.querySelector('.lightbox-title');
  const lightboxTag = document.querySelector('.lightbox-tag');
  const lightboxDesc = document.querySelector('.lightbox-desc');
  const lightboxLocation = document.querySelector('#lightbox-spec-location');
  const lightboxGuests = document.querySelector('#lightbox-spec-guests');
  const lightboxCloseBtn = document.querySelector('.lightbox-close-btn');
  const lightboxInquireBtn = document.querySelector('.lightbox-inquire-btn');

  portfolioItems.forEach(item => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img')?.getAttribute('src') || '';
      const title = item.querySelector('.portfolio-item-title')?.textContent || '';
      const tag = item.querySelector('.portfolio-category-tag')?.textContent || '';
      const location = item.getAttribute('data-location') || 'Exclusive Venue';
      const guests = item.getAttribute('data-guests') || 'Bespoke Attendance';
      const desc = item.getAttribute('data-desc') || 'A masterfully curated celebration orchestrated with precision and aesthetic magnificence by Ashirwad Weddings & Events.';
      const categoryType = item.getAttribute('data-category') || '';

      if (lightboxImg) lightboxImg.src = img;
      if (lightboxTitle) lightboxTitle.textContent = title;
      if (lightboxTag) lightboxTag.textContent = tag;
      if (lightboxDesc) lightboxDesc.textContent = desc;
      if (lightboxLocation) lightboxLocation.textContent = location;
      if (lightboxGuests) lightboxGuests.textContent = guests;

      // When clicking inquire from lightbox, pre-fill event type
      if (lightboxInquireBtn) {
        lightboxInquireBtn.onclick = () => {
          closeLightbox();
          const eventTypeSelect = document.getElementById('event-type');
          if (eventTypeSelect && categoryType) {
            eventTypeSelect.value = categoryType;
          }
          const formElement = document.getElementById('inquire');
          formElement?.scrollIntoView({ behavior: 'smooth' });
        };
      }

      openLightbox();
    });
  });

  function openLightbox() {
    lightboxModal?.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightboxModal?.classList.remove('active');
    document.body.style.overflow = '';
  }

  lightboxCloseBtn?.addEventListener('click', closeLightbox);
  lightboxModal?.addEventListener('click', (e) => {
    if (e.target === lightboxModal) closeLightbox();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightboxModal?.classList.contains('active')) {
      closeLightbox();
    }
  });

  // 5. Testimonial Slider
  const testimonialCards = document.querySelectorAll('.testimonial-card-single');
  const prevBtn = document.querySelector('.testimonial-arrow-prev');
  const nextBtn = document.querySelector('.testimonial-arrow-next');
  const dotsContainer = document.querySelector('.testimonial-dots');
  let currentTestimonialIndex = 0;
  let testimonialInterval = null;

  if (testimonialCards.length > 0 && dotsContainer) {
    // Generate dots
    testimonialCards.forEach((_, idx) => {
      const dot = document.createElement('div');
      dot.classList.add('testimonial-dot');
      if (idx === 0) dot.classList.add('active');
      dot.addEventListener('click', () => showTestimonial(idx));
      dotsContainer.appendChild(dot);
    });

    const dots = document.querySelectorAll('.testimonial-dot');

    function showTestimonial(index) {
      testimonialCards.forEach(card => card.classList.remove('active'));
      dots.forEach(d => d.classList.remove('active'));

      currentTestimonialIndex = (index + testimonialCards.length) % testimonialCards.length;
      testimonialCards[currentTestimonialIndex].classList.add('active');
      dots[currentTestimonialIndex].classList.add('active');
    }

    prevBtn?.addEventListener('click', () => {
      showTestimonial(currentTestimonialIndex - 1);
      resetAutoPlay();
    });

    nextBtn?.addEventListener('click', () => {
      showTestimonial(currentTestimonialIndex + 1);
      resetAutoPlay();
    });

    function startAutoPlay() {
      testimonialInterval = setInterval(() => {
        showTestimonial(currentTestimonialIndex + 1);
      }, 7000);
    }

    function resetAutoPlay() {
      clearInterval(testimonialInterval);
      startAutoPlay();
    }

    startAutoPlay();
  }

  // 6. Interactive FAQ Accordion
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');

    questionBtn?.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Close all other FAQs
      faqItems.forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('active');
          const otherAnswer = otherItem.querySelector('.faq-answer');
          if (otherAnswer) otherAnswer.style.maxHeight = null;
        }
      });

      // Toggle current
      if (isActive) {
        item.classList.remove('active');
        if (answer) answer.style.maxHeight = null;
      } else {
        item.classList.add('active');
        if (answer) answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });

  // 7. VIP Consultation & Lead Generation Form
  const inquiryForm = document.getElementById('consultation-form');
  const successBox = document.getElementById('form-success-box');
  const waQuickAction = document.getElementById('wa-direct-action');

  inquiryForm?.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('client-name')?.value.trim() || '';
    const phone = document.getElementById('client-phone')?.value.trim() || '';
    const email = document.getElementById('client-email')?.value.trim() || '';
    const eventType = document.getElementById('event-type')?.value || 'Not Specified';
    const eventDate = document.getElementById('event-date')?.value || 'Date TBD';
    const eventLocation = document.getElementById('event-location')?.value.trim() || 'Location TBD';
    const guestCount = document.getElementById('guest-count')?.value || 'Unspecified';
    const budgetTier = document.getElementById('budget-tier')?.value || 'Luxury Tier';
    const contactMode = document.querySelector('input[name="contact-mode"]:checked')?.value || 'WhatsApp';
    const notes = document.getElementById('event-notes')?.value.trim() || 'None provided';

    // Format WhatsApp message
    const formattedMessage = encodeURIComponent(
      `*VIP Consultation Request — Ashirwad Weddings & Events*\n\n` +
      `👤 *Name:* ${name}\n` +
      `📞 *Phone:* ${phone}\n` +
      `📧 *Email:* ${email}\n` +
      `✨ *Event Type:* ${eventType}\n` +
      `📅 *Tentative Date:* ${eventDate}\n` +
      `📍 *Destination/City:* ${eventLocation}\n` +
      `👥 *Guest Count:* ${guestCount}\n` +
      `💎 *Budget Tier:* ${budgetTier}\n` +
      `📲 *Preferred Contact Mode:* ${contactMode}\n` +
      `📝 *Vision Notes:* ${notes}\n\n` +
      `_Looking forward to orchestrating an unforgettable celebration._`
    );

    // WhatsApp Direct URL (Ashirwad Event Concierge)
    const whatsappUrl = `https://wa.me/919876543210?text=${formattedMessage}`;

    // Display in-page confirmation
    if (successBox) {
      successBox.classList.add('show');
      inquiryForm.style.display = 'none';

      if (waQuickAction) {
        waQuickAction.href = whatsappUrl;
      }
    }

    // Automatically trigger WhatsApp tab after brief delay for seamless concierge experience
    setTimeout(() => {
      window.open(whatsappUrl, '_blank');
    }, 1200);
  });

  // 8. Update Current Year in Footer
  const yearEl = document.getElementById('current-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
});
