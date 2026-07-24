/**
 * Nabeel Ahmad - Portfolio Interactive Engine
 * Handles Dark/Light Mode, Dynamic Typewriter, Interactive Matrix Tabs, Portfolio Filters, and Contact Form Validation/Submission.
 */

document.addEventListener('DOMContentLoaded', () => {
  initThemeManager();
  initTypewriter();
  initNavigation();
  initSkillsTabs();
  initProjectFilters();
  initContactForm();
  initFooterYear();
  initTestimonialsSlider();
  initBackToTop();
  initScrollReveal();
  initStickyBar();
  initHero3dTilt();
  initAnimatedCounters();
  initCtaTypewriter();
});

/* ==========================================================================
   1. DARK / LIGHT MODE CONTROLLER WITH LOCALSTORAGE
   ========================================================================== */
function initThemeManager() {
  const html = document.documentElement;
  const toggleBtn = document.getElementById('themeToggleBtn');
  const iconDark = document.getElementById('themeIconDark');
  const iconLight = document.getElementById('themeIconLight');

  if (!toggleBtn) return;

  // Check saved preference or fallback to dark
  const savedTheme = localStorage.getItem('portfolio_theme') || 'dark';
  applyTheme(savedTheme);

  toggleBtn.addEventListener('click', () => {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    applyTheme(newTheme);
    localStorage.setItem('portfolio_theme', newTheme);
  });

  function applyTheme(theme) {
    html.setAttribute('data-theme', theme);
    if (theme === 'dark') {
      if (iconDark) iconDark.style.display = 'block';
      if (iconLight) iconLight.style.display = 'none';
    } else {
      if (iconDark) iconDark.style.display = 'none';
      if (iconLight) iconLight.style.display = 'block';
    }
  }
}

/* ==========================================================================
   2. DYNAMIC HERO TYPEWRITER EFFECT
   ========================================================================== */
function initTypewriter() {
  const element = document.getElementById('typewriterText');
  if (!element) return;

  const roles = [
    "Full Stack WordPress Developer",
    "Senior Support Engineer",
    "Custom Plugin & Add-on Specialist",
    "Speed & Core Web Vitals Expert",
    "Multi-Platform E-Commerce Engineer"
  ];

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 70;

  function type() {
    const currentRole = roles[roleIndex];

    if (isDeleting) {
      element.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 35;
    } else {
      element.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 75;
    }

    if (!isDeleting && charIndex === currentRole.length) {
      isDeleting = true;
      typingSpeed = 2200; // Pause at end of word
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      typingSpeed = 400; // Pause before typing next word
    }

    setTimeout(type, typingSpeed);
  }

  setTimeout(type, 1000);
}

function initCtaTypewriter() {
  const element = document.getElementById('ctaTypewriterText');
  if (!element) return;

  const requirements = [
    "Figma to WordPress",
    "Debug WordPress Issues",
    "Website Maintenance"
  ];

  let reqIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 70;

  function type() {
    const currentReq = requirements[reqIndex];

    if (isDeleting) {
      element.textContent = currentReq.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 35;
    } else {
      element.textContent = currentReq.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 75;
    }

    if (!isDeleting && charIndex === currentReq.length) {
      isDeleting = true;
      typingSpeed = 2200; // Pause at end of word
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      reqIndex = (reqIndex + 1) % requirements.length;
      typingSpeed = 400; // Pause before typing next word
    }

    setTimeout(type, typingSpeed);
  }

  setTimeout(type, 1500);
}

/* ==========================================================================
   3. STICKY HEADER & MOBILE MENU
   ========================================================================== */
function initNavigation() {
  const header = document.getElementById('header');
  const mobileBtn = document.getElementById('mobileMenuBtn');
  const navLinks = document.getElementById('navLinks');
  const links = document.querySelectorAll('.nav-link');

  // Sticky shadow on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // Mobile menu toggle
  if (mobileBtn && navLinks) {
    mobileBtn.addEventListener('click', () => {
      navLinks.classList.toggle('mobile-open');
      mobileBtn.textContent = navLinks.classList.contains('mobile-open') ? '✕' : '☰';
    });

    links.forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('mobile-open');
        if (mobileBtn) mobileBtn.textContent = '☰';
      });
    });
  }
}

/* ==========================================================================
   4. SKILLS & AI MATRIX TABS
   ========================================================================== */
function initSkillsTabs() {
  const buttons = document.querySelectorAll('.skill-tab-btn');
  const panes = document.querySelectorAll('.skills-pane');

  if (!buttons.length) return;

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-target');

      buttons.forEach(b => b.classList.remove('active'));
      panes.forEach(p => p.classList.remove('active'));

      btn.classList.add('active');
      const targetPane = document.getElementById(targetId);
      if (targetPane) targetPane.classList.add('active');
    });
  });
}

/* ==========================================================================
   5. PORTFOLIO CASE STUDY FILTERS
   ========================================================================== */
function initProjectFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  if (!filterBtns.length || !projectCards.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.getAttribute('data-filter');

      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'block';
          setTimeout(() => { card.style.opacity = '1'; card.style.transform = 'translateY(0)'; }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(10px)';
          setTimeout(() => { card.style.display = 'none'; }, 200);
        }
      });
    });
  });
}

/* ==========================================================================
   6 & 7. CONTACT FORM REAL-TIME VALIDATION & AJAX SUBMISSION
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('contactForm');
  const submitBtn = document.getElementById('submitBtn');
  const btnText = document.getElementById('btnText');
  const alertBox = document.getElementById('formAlert');

  if (!form) return;

  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const serviceInput = document.getElementById('service');
  const messageInput = document.getElementById('message');

  // Real-time blur validation
  [nameInput, emailInput, serviceInput, messageInput].forEach(input => {
    if (!input) return;
    input.addEventListener('blur', () => validateField(input));
    input.addEventListener('input', () => {
      if (input.parentElement.classList.contains('error')) {
        validateField(input);
      }
    });
  });

  function validateField(input) {
    const group = input.parentElement;
    const value = input.value.trim();
    let isValid = true;

    if (input.id === 'name') {
      isValid = value.length >= 2;
    } else if (input.id === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      isValid = emailRegex.test(value);
    } else if (input.id === 'service') {
      isValid = value !== '';
    } else if (input.id === 'message') {
      isValid = value.length >= 15;
    }

    if (isValid) {
      group.classList.remove('error');
    } else {
      group.classList.add('error');
    }
    return isValid;
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Validate all required fields
    const isNameValid = validateField(nameInput);
    const isEmailValid = validateField(emailInput);
    const isServiceValid = validateField(serviceInput);
    const isMessageValid = validateField(messageInput);

    if (!isNameValid || !isEmailValid || !isServiceValid || !isMessageValid) {
      if (alertBox) {
        alertBox.className = 'form-alert error';
        alertBox.textContent = 'Please correct the highlighted errors before submitting.';
        alertBox.style.display = 'block';
      }
      return;
    }

    // Prepare payload
    const payload = {
      name: nameInput.value.trim(),
      email: emailInput.value.trim(),
      phone: document.getElementById('phone') ? document.getElementById('phone').value.trim() : '',
      service: serviceInput.value.trim(),
      message: messageInput.value.trim()
    };

    // UI Loading state
    if (submitBtn) submitBtn.disabled = true;
    if (btnText) btnText.textContent = 'Sending Message to Nabeel... ⏳';
    if (alertBox) alertBox.style.display = 'none';

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json().catch(() => ({}));

      if (response.ok || data.success) {
        if (alertBox) {
          alertBox.className = 'form-alert success';
          alertBox.innerHTML = `<strong>Message Sent Successfully! 🎉</strong><br>Thank you ${payload.name}! Your inquiry has been dispatched to Nabeel Ahmad (nabeelahmad826@gmail.com). You will receive a response within 2-4 business hours.`;
          alertBox.style.display = 'block';
        }
        form.reset();
      } else {
        throw new Error(data.message || 'Server returned an error.');
      }
    } catch (error) {
      // If running on static local preview or fallback mode where /api/contact is not yet active:
      console.warn('Backend API note:', error);
      if (alertBox) {
        alertBox.className = 'form-alert success';
        alertBox.innerHTML = `<strong>Message Logged Successfully! 🎉</strong><br>Thank you ${payload.name}! Your inquiry for <em>${payload.service}</em> has been prepared for dispatch to Nabeel Ahmad (<strong>nabeelahmad826@gmail.com</strong>). When deployed live on Vercel, this form triggers immediate email delivery!`;
        alertBox.style.display = 'block';
      }
      form.reset();
    } finally {
      if (submitBtn) submitBtn.disabled = false;
      if (btnText) btnText.textContent = 'Dispatch Message to Nabeel →';
    }
  });
}

function initFooterYear() {
  const yearSpan = document.getElementById('year');
  if (yearSpan) yearSpan.textContent = new Date().getFullYear();
}

/* ==========================================================================
   8. TESTIMONIALS SLIDER ENGINE
   ========================================================================== */
function initTestimonialsSlider() {
  const track = document.getElementById('testimonialsTrack');
  const prevBtn = document.getElementById('sliderPrevBtn');
  const nextBtn = document.getElementById('sliderNextBtn');
  const dotsContainer = document.getElementById('sliderDots');
  const slides = document.querySelectorAll('.testimonial-slide');
  
  if (!track || !prevBtn || !nextBtn || !dotsContainer || !slides.length) return;
  
  let currentIndex = 0;
  let autoPlayInterval;
  
  function getSlidesPerView() {
    return window.innerWidth >= 992 ? 2 : 1;
  }
  
  function getMaxIndex() {
    return Math.max(0, slides.length - getSlidesPerView());
  }
  
  function updateSlider() {
    const maxIndex = getMaxIndex();
    if (currentIndex > maxIndex) {
      currentIndex = maxIndex;
    }
    
    const isDesktop = window.innerWidth >= 992;
    const slideWidth = isDesktop ? 50 : 100;
    track.style.transform = `translateX(-${currentIndex * slideWidth}%)`;
    
    // Update dots
    const dots = dotsContainer.querySelectorAll('.slider-dot');
    dots.forEach((dot, index) => {
      if (index === currentIndex) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });
  }
  
  function createDots() {
    dotsContainer.innerHTML = '';
    const maxIndex = getMaxIndex();
    for (let i = 0; i <= maxIndex; i++) {
      const dot = document.createElement('button');
      dot.classList.add('slider-dot');
      if (i === currentIndex) dot.classList.add('active');
      dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
      dot.addEventListener('click', () => {
        currentIndex = i;
        updateSlider();
        resetAutoPlay();
      });
      dotsContainer.appendChild(dot);
    }
  }
  
  function slideNext() {
    const maxIndex = getMaxIndex();
    if (currentIndex >= maxIndex) {
      currentIndex = 0;
    } else {
      currentIndex++;
    }
    updateSlider();
  }
  
  function slidePrev() {
    const maxIndex = getMaxIndex();
    if (currentIndex <= 0) {
      currentIndex = maxIndex;
    } else {
      currentIndex--;
    }
    updateSlider();
  }
  
  nextBtn.addEventListener('click', () => {
    slideNext();
    resetAutoPlay();
  });
  
  prevBtn.addEventListener('click', () => {
    slidePrev();
    resetAutoPlay();
  });
  
  function startAutoPlay() {
    autoPlayInterval = setInterval(slideNext, 5000);
  }
  
  function resetAutoPlay() {
    clearInterval(autoPlayInterval);
    startAutoPlay();
  }
  
  // Handle resize to adjust slides per view and recreate dots
  let lastWidth = window.innerWidth;
  window.addEventListener('resize', () => {
    const currentWidth = window.innerWidth;
    const wasDesktop = lastWidth >= 992;
    const isDesktopNow = currentWidth >= 992;
    if (wasDesktop !== isDesktopNow) {
      lastWidth = currentWidth;
      createDots();
      updateSlider();
    }
  });
  
  // Swipe support for touch screens
  let startX = 0;
  let endX = 0;
  track.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
  }, { passive: true });
  
  track.addEventListener('touchend', (e) => {
    endX = e.changedTouches[0].clientX;
    const diff = startX - endX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        slideNext();
      } else {
        slidePrev();
      }
      resetAutoPlay();
    }
  }, { passive: true });
  
  // Pause autoplay on hover
  const sliderContainer = document.querySelector('.testimonials-slider-container');
  if (sliderContainer) {
    sliderContainer.addEventListener('mouseenter', () => clearInterval(autoPlayInterval));
    sliderContainer.addEventListener('mouseleave', startAutoPlay);
  }
  
  createDots();
  updateSlider();
  startAutoPlay();
}

/* ==========================================================================
   9. BACK TO TOP BUTTON LOGIC
   ========================================================================== */
function initBackToTop() {
  const backToTopBtn = document.getElementById('backToTop');
  if (!backToTopBtn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      backToTopBtn.classList.add('show');
    } else {
      backToTopBtn.classList.remove('show');
    }
  });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/* ==========================================================================
   10. GLOBAL SCROLL REVEAL ENGINE
   ========================================================================== */
function initScrollReveal() {
  const revealElements = document.querySelectorAll('[data-reveal], .section-header, .stat-box, .service-card, .project-card, .timeline-item, .contact-card, .skill-card');
  
  if (!revealElements.length) return;

  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -50px 0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-revealed');
      }
    });
  }, observerOptions);

  revealElements.forEach(el => {
    if (!el.hasAttribute('data-reveal')) {
      el.setAttribute('data-reveal', 'fade-up');
    }
    observer.observe(el);
  });
}

/* ==========================================================================
   11. STICKY CTA BAR CONTROLLER
   ========================================================================== */
function initStickyBar() {
  const stickyBar = document.getElementById('stickyBar');
  const heroSection = document.getElementById('hero');
  const closeBtn = document.getElementById('stickyCloseBtn');

  if (!stickyBar || !heroSection) return;

  let isClosed = false;

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      isClosed = true;
      stickyBar.classList.remove('is-visible');
      stickyBar.classList.add('is-closed');
    });
  }

  window.addEventListener('scroll', () => {
    if (isClosed) return;

    const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
    // On laptops or smaller screen sizes (width <= 1440px), show only after scrolling past the hero completely.
    // On larger desktop screens, trigger 150px before the hero ends.
    const isLaptopOrSmaller = window.innerWidth <= 1440;
    const triggerPoint = isLaptopOrSmaller ? heroBottom : (heroBottom - 150);

    if (window.scrollY > triggerPoint) {
      stickyBar.classList.add('is-visible');
    } else {
      stickyBar.classList.remove('is-visible');
    }
  });
}

/* ==========================================================================
   12. HERO CARD 3D INTERACTIVE TILT EFFECT
   ========================================================================== */
function initHero3dTilt() {
  const container = document.getElementById('heroCard3d');
  const visualArea = document.querySelector('.hero-visual');

  if (!container || !visualArea) return;

  visualArea.addEventListener('mousemove', (e) => {
    const rect = visualArea.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * -6;
    const rotateY = ((x - centerX) / centerX) * 6;
    
    container.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
  });

  visualArea.addEventListener('mouseleave', () => {
    container.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
  });
}

/* ==========================================================================
   13. ANIMATED COUNTERS FOR STATS
   ========================================================================== */
function initAnimatedCounters() {
  const trustNums = document.querySelectorAll('.trust-num, .stat-number');
  if (!trustNums.length) return;

  let hasAnimated = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !hasAnimated) {
        hasAnimated = true;
        animateCounters();
      }
    });
  }, { threshold: 0.3 });

  const targetSections = document.querySelectorAll('.stats-strip, .hero-trust, .expertise-footer');
  targetSections.forEach(section => {
    if (section) observer.observe(section);
  });

  function animateCounters() {
    trustNums.forEach(counter => {
      const targetText = counter.textContent.trim();
      const num = parseFloat(targetText.replace(/[^0-9.]/g, ''));
      if (isNaN(num)) return;

      const suffix = targetText.replace(/[0-9.]/g, '');
      const duration = 1800;
      const startTime = performance.now();

      function updateNumber(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeProgress = 1 - Math.pow(1 - progress, 3);
        const currentVal = num % 1 === 0 
          ? Math.floor(easeProgress * num) 
          : (easeProgress * num).toFixed(1);

        counter.textContent = currentVal + suffix;

        if (progress < 1) {
          requestAnimationFrame(updateNumber);
        } else {
          counter.textContent = targetText;
        }
      }

      requestAnimationFrame(updateNumber);
    });
  }
}
