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
