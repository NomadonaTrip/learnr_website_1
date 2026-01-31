/**
 * LearnR Landing Page - Premium Animation System
 * GSAP + Lenis + SplitType for Top 1% Experience
 */

// ====================================
// Global State & Configuration
// ====================================
const CONFIG = {
  reducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  isTouchDevice: window.matchMedia('(hover: none)').matches,
  isDesktop: window.matchMedia('(hover: hover) and (pointer: fine)').matches
};

let lenis = null;

// ====================================
// Lenis Smooth Scroll
// ====================================
function initLenis() {
  if (CONFIG.reducedMotion || typeof Lenis === 'undefined') return;

  lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    direction: 'vertical',
    gestureDirection: 'vertical',
    smooth: true,
    smoothTouch: false,
    touchMultiplier: 2,
  });

  // Integrate Lenis with GSAP ScrollTrigger
  lenis.on('scroll', ScrollTrigger.update);

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });

  gsap.ticker.lagSmoothing(0);

  // Handle anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const target = document.querySelector(targetId);
      if (target) {
        lenis.scrollTo(target, {
          offset: -100,
          duration: 1.2
        });
      }
    });
  });
}

// ====================================
// GSAP & ScrollTrigger Setup
// ====================================
function initGSAP() {
  if (typeof gsap === 'undefined') return;

  gsap.registerPlugin(ScrollTrigger);

  // Default easing
  gsap.config({
    nullTargetWarn: false
  });

  // Note: Initial states are set by individual animation functions
  // to prevent conflicts with hero entrance sequence
}

// ====================================
// Custom Cursor
// ====================================
function initCursor() {
  if (!CONFIG.isDesktop || CONFIG.reducedMotion) return;

  const cursor = document.getElementById('cursor');
  if (!cursor) return;

  const cursorDot = cursor.querySelector('.cursor-dot');
  const cursorRing = cursor.querySelector('.cursor-ring');

  let mouseX = 0, mouseY = 0;
  let dotX = 0, dotY = 0;
  let ringX = 0, ringY = 0;

  // Smooth cursor following
  function animateCursor() {
    // Dot follows instantly
    dotX += (mouseX - dotX) * 0.5;
    dotY += (mouseY - dotY) * 0.5;

    // Ring follows with delay
    ringX += (mouseX - ringX) * 0.15;
    ringY += (mouseY - ringY) * 0.15;

    cursorDot.style.left = `${dotX}px`;
    cursorDot.style.top = `${dotY}px`;
    cursorRing.style.left = `${ringX}px`;
    cursorRing.style.top = `${ringY}px`;

    requestAnimationFrame(animateCursor);
  }

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    if (!cursor.classList.contains('cursor-visible')) {
      cursor.classList.add('cursor-visible');
    }
  });

  document.addEventListener('mouseleave', () => {
    cursor.classList.remove('cursor-visible');
  });

  document.addEventListener('mouseenter', () => {
    cursor.classList.add('cursor-visible');
  });

  // Hover states
  const hoverElements = document.querySelectorAll('a, button, input, textarea, select, .glass-card, .bento-card, .algo-card, .step-card, .stat-card, .faq-item');

  hoverElements.forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('cursor-hover'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('cursor-hover'));
  });

  // Click states
  document.addEventListener('mousedown', () => cursor.classList.add('cursor-click'));
  document.addEventListener('mouseup', () => cursor.classList.remove('cursor-click'));

  animateCursor();
}

// ====================================
// Magnetic Buttons
// ====================================
function initMagneticButtons() {
  if (!CONFIG.isDesktop || CONFIG.reducedMotion) return;
  if (typeof gsap === 'undefined') return;

  const magneticButtons = document.querySelectorAll('.btn-primary, .btn-cta, .btn-nav');

  magneticButtons.forEach(btn => {
    const strength = 0.3;

    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = (e.clientX - centerX) * strength;
      const deltaY = (e.clientY - centerY) * strength;

      gsap.to(btn, {
        x: deltaX,
        y: deltaY,
        duration: 0.3,
        ease: 'power2.out'
      });
    });

    btn.addEventListener('mouseleave', () => {
      gsap.to(btn, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: 'elastic.out(1, 0.3)'
      });
    });
  });
}

// ====================================
// 3D Card Tilt Effect
// ====================================
function initCardTilt() {
  if (!CONFIG.isDesktop || CONFIG.reducedMotion) return;

  const cards = document.querySelectorAll('.bento-card, .algo-card, .step-card, .stat-card');

  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = (y - centerY) / 15;
      const rotateY = (centerX - x) / 15;

      card.classList.add('tilt-active');
      card.style.transform = `
        perspective(1000px)
        rotateX(${-rotateX}deg)
        rotateY(${rotateY}deg)
        translateY(-8px)
        scale(1.02)
      `;
    });

    card.addEventListener('mouseleave', () => {
      card.classList.remove('tilt-active');
      card.style.transform = '';
    });
  });
}

// ====================================
// Hero Load Sequence
// ====================================
function initHeroEntrance() {
  if (typeof gsap === 'undefined') return;

  if (CONFIG.reducedMotion) {
    gsap.set('.hero-headline, .hero-subheadline, .hero-cta, .hero-trust, .floating-card', {
      opacity: 1, y: 0, scale: 1, x: 0, rotation: 0
    });
    return;
  }

  const tl = gsap.timeline({ delay: 0.3 });

  // 1. Headline lines stagger in with character-level animation if SplitType available
  const headlineLines = document.querySelectorAll('.hero-headline .headline-line');

  if (typeof SplitType !== 'undefined') {
    // Use SplitType for character-level kinetic typography
    headlineLines.forEach((line, lineIndex) => {
      const splitLine = new SplitType(line, {
        types: 'chars',
        charClass: 'char'
      });

      tl.from(splitLine.chars, {
        opacity: 0,
        y: 60,
        rotationX: -90,
        transformOrigin: 'center bottom',
        duration: 0.7,
        ease: 'back.out(1.5)',
        stagger: 0.02
      }, lineIndex === 0 ? '>' : '-=0.5');
    });
  } else {
    // Fallback to line-level animation
    tl.from('.hero-headline .headline-line', {
      y: 80,
      opacity: 0,
      rotationX: -15,
      duration: 0.8,
      stagger: 0.15,
      ease: 'power3.out'
    });
  }

  // 2. Subheadline - handled by initKineticTypography for word reveal
  // Just ensure container is visible (words animate separately)
  tl.set('.hero-subheadline', { opacity: 1 }, '-=0.3');

  // 3. CTA buttons scale in with spring
  tl.from('.hero-cta .btn', {
    scale: 0.8,
    opacity: 0,
    duration: 0.5,
    stagger: 0.1,
    ease: 'back.out(1.7)'
  }, '-=0.2');

  // 4. Trust bar items stagger
  tl.from('.trust-item', {
    y: 20,
    opacity: 0,
    duration: 0.4,
    stagger: 0.08,
    ease: 'power2.out'
  }, '-=0.2');

  // 5. Floating cards drift in
  tl.from('.floating-card-1', { x: -100, opacity: 0, rotation: -10, duration: 0.8, ease: 'power3.out' }, '-=0.6');
  tl.from('.floating-card-2', { x: 100, opacity: 0, rotation: 10, duration: 0.8, ease: 'power3.out' }, '-=0.7');
  tl.from('.floating-card-3', { y: 50, opacity: 0, duration: 0.6, ease: 'power3.out' }, '-=0.5');

  // Trigger underline animation on headline em
  tl.add(() => {
    document.querySelectorAll('.hero-headline em, .headline-accent em').forEach(em => {
      em.classList.add('underline-visible');
    });
  }, '-=0.3');
}

// ====================================
// Parallax Effects
// ====================================
function initParallax() {
  if (CONFIG.reducedMotion) return;
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

  // Hero orbs parallax
  gsap.to('.hero-orb-1', {
    y: '30%',
    ease: 'none',
    scrollTrigger: {
      trigger: '.hero',
      start: 'top top',
      end: 'bottom top',
      scrub: 0.5
    }
  });

  gsap.to('.hero-orb-2', {
    y: '50%',
    ease: 'none',
    scrollTrigger: {
      trigger: '.hero',
      start: 'top top',
      end: 'bottom top',
      scrub: 0.8
    }
  });

  gsap.to('.hero-orb-3', {
    y: '40%',
    ease: 'none',
    scrollTrigger: {
      trigger: '.hero',
      start: 'top top',
      end: 'bottom top',
      scrub: 1
    }
  });

  // Hero content fade on scroll
  gsap.to('.hero-content', {
    y: 100,
    opacity: 0.3,
    ease: 'none',
    scrollTrigger: {
      trigger: '.hero',
      start: 'top top',
      end: '60% top',
      scrub: true
    }
  });

  // Floating cards fade out
  gsap.to('.hero-floating', {
    opacity: 0,
    scale: 0.9,
    ease: 'none',
    scrollTrigger: {
      trigger: '.hero',
      start: '30% top',
      end: '70% top',
      scrub: true
    }
  });
}

// ====================================
// Kinetic Typography with SplitType
// ====================================
function initKineticTypography() {
  if (CONFIG.reducedMotion) return;
  if (typeof SplitType === 'undefined' || typeof gsap === 'undefined') return;

  // Split text elements with data-word-reveal attribute (excluding hero which has its own entrance)
  const wordRevealElements = document.querySelectorAll('[data-word-reveal]:not(.hero-subheadline)');

  wordRevealElements.forEach(element => {
    // Use SplitType to split into words
    const split = new SplitType(element, {
      types: 'words',
      wordClass: 'word'
    });

    // Set initial state for words
    gsap.set(split.words, {
      opacity: 0,
      y: 20,
      rotationX: -15
    });

    // Create scroll-triggered animation
    gsap.to(split.words, {
      opacity: 1,
      y: 0,
      rotationX: 0,
      duration: 0.6,
      ease: 'power3.out',
      stagger: 0.03,
      scrollTrigger: {
        trigger: element,
        start: 'top 85%',
        once: true
      },
      onComplete: () => {
        element.classList.add('words-visible');
      }
    });

    // Highlight em elements within the split text
    element.querySelectorAll('em').forEach(em => {
      em.classList.add('highlight');
    });
  });

  // Hero subheadline word reveal (integrated with hero entrance timing)
  const heroSubheadline = document.querySelector('.hero-subheadline[data-word-reveal]');
  if (heroSubheadline) {
    const split = new SplitType(heroSubheadline, {
      types: 'words',
      wordClass: 'word'
    });

    // Set initial state
    gsap.set(split.words, {
      opacity: 0,
      y: 15
    });

    // Animate after hero headline (delayed start)
    gsap.to(split.words, {
      opacity: 1,
      y: 0,
      duration: 0.5,
      ease: 'power3.out',
      stagger: 0.025,
      delay: 0.9 // After headline animation
    });

    // Highlight em elements
    heroSubheadline.querySelectorAll('em').forEach(em => {
      em.classList.add('highlight');
    });
  }
}

// ====================================
// Section Animations
// ====================================
function initSectionAnimations() {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

  // Section headers
  document.querySelectorAll('.section-header').forEach(header => {
    const label = header.querySelector('.section-label');
    const title = header.querySelector('.section-title');
    const subtitle = header.querySelector('.section-subtitle');

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: header,
        start: 'top 85%',
        once: true
      }
    });

    if (CONFIG.reducedMotion) {
      gsap.set([label, title, subtitle], { opacity: 1, y: 0, x: 0 });
      return;
    }

    if (label) {
      tl.from(label, { x: -30, opacity: 0, duration: 0.5, ease: 'power3.out' });
    }

    if (title) {
      tl.from(title, { y: 40, opacity: 0, duration: 0.6, ease: 'power3.out' }, '-=0.3');

      // Trigger underline on em elements
      tl.add(() => {
        title.querySelectorAll('em').forEach(em => {
          em.classList.add('underline-visible');
        });
      }, '-=0.2');
    }

    if (subtitle) {
      tl.from(subtitle, { y: 30, opacity: 0, duration: 0.5, ease: 'power3.out' }, '-=0.3');
    }
  });

  // Grid card animations - using CSS transitions instead of GSAP
  // to avoid visibility issues with GSAP's immediate rendering
  // Cards will use subtle hover effects defined in CSS

  // Comparison cards
  const comparisonContainer = document.querySelector('.comparison-container');
  if (comparisonContainer) {
    const before = comparisonContainer.querySelector('.comparison-before');
    const after = comparisonContainer.querySelector('.comparison-after');
    const arrow = comparisonContainer.querySelector('.comparison-arrow');

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: comparisonContainer,
        start: 'top 75%',
        once: true
      }
    });

    if (CONFIG.reducedMotion) {
      gsap.set([before, after, arrow], { opacity: 1, x: 0, scale: 1 });
      return;
    }

    if (before) {
      tl.from(before, { x: -100, opacity: 0, duration: 0.8, ease: 'power3.out' });
    }

    if (after) {
      tl.from(after, { x: 100, opacity: 0, duration: 0.8, ease: 'power3.out' }, '-=0.6');
    }

    if (arrow) {
      tl.from(arrow, { scale: 0, opacity: 0, duration: 0.5, ease: 'back.out(1.7)' }, '-=0.4');
    }
  }
}

// ====================================
// Counter Animation
// ====================================
function initCounters() {
  const counters = document.querySelectorAll('[data-counter]');

  counters.forEach(counter => {
    const target = parseInt(counter.dataset.counter);

    ScrollTrigger.create({
      trigger: counter,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        if (counter.classList.contains('counted')) return;
        counter.classList.add('counted');

        gsap.to(counter, {
          textContent: target,
          duration: 2,
          ease: 'power2.out',
          snap: { textContent: 1 },
          onUpdate: function() {
            counter.textContent = Math.round(this.targets()[0].textContent);
          }
        });
      }
    });
  });
}

// ====================================
// FAQ Accordion
// ====================================
function initFAQ() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');
    const icon = item.querySelector('.faq-icon');

    if (!question || !answer) return;

    // Set initial state
    gsap.set(answer, { height: 0, opacity: 0 });

    question.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Close all other items
      faqItems.forEach(other => {
        if (other !== item && other.classList.contains('active')) {
          other.classList.remove('active');
          other.querySelector('.faq-question').setAttribute('aria-expanded', 'false');

          gsap.to(other.querySelector('.faq-answer'), {
            height: 0,
            opacity: 0,
            duration: 0.4,
            ease: 'power3.inOut'
          });

          gsap.to(other.querySelector('.faq-icon'), {
            rotation: 0,
            duration: 0.3,
            ease: 'power2.out'
          });
        }
      });

      // Toggle current
      if (!isActive) {
        item.classList.add('active');
        question.setAttribute('aria-expanded', 'true');

        gsap.to(answer, {
          height: 'auto',
          opacity: 1,
          duration: 0.5,
          ease: 'power3.out'
        });

        gsap.to(icon, {
          rotation: 180,
          duration: 0.4,
          ease: 'back.out(1.7)'
        });
      } else {
        item.classList.remove('active');
        question.setAttribute('aria-expanded', 'false');

        gsap.to(answer, {
          height: 0,
          opacity: 0,
          duration: 0.4,
          ease: 'power3.inOut'
        });

        gsap.to(icon, {
          rotation: 0,
          duration: 0.3,
          ease: 'power2.out'
        });
      }
    });
  });
}

// ====================================
// Navbar Scroll Behavior
// ====================================
function initNavbar() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  ScrollTrigger.create({
    start: 60,
    onUpdate: (self) => {
      if (self.scroll() > 60) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }
  });
}

// ====================================
// Mobile Menu
// ====================================
function initMobileMenu() {
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');

  if (!hamburger || !mobileMenu) return;

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    mobileMenu.classList.toggle('active');
    document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';

    // Pause Lenis when mobile menu is open
    if (lenis) {
      if (mobileMenu.classList.contains('active')) {
        lenis.stop();
      } else {
        lenis.start();
      }
    }
  });

  // Close on link click
  document.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      mobileMenu.classList.remove('active');
      document.body.style.overflow = '';
      if (lenis) lenis.start();
    });
  });

  // Close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
      hamburger.classList.remove('active');
      mobileMenu.classList.remove('active');
      document.body.style.overflow = '';
      if (lenis) lenis.start();
    }
  });
}

// ====================================
// Form Handling
// ====================================
function initForms() {
  const earlyAccessForm = document.getElementById('earlyAccessForm');

  if (earlyAccessForm) {
    earlyAccessForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const emailInput = earlyAccessForm.querySelector('input[type="email"]');
      const submitBtn = earlyAccessForm.querySelector('button[type="submit"]');

      submitBtn.disabled = true;
      submitBtn.innerHTML = '<span class="btn-text">Joining...</span>';

      // Simulate API call
      setTimeout(() => {
        submitBtn.innerHTML = '<span class="btn-text">You\'re In!</span>';
        submitBtn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
        emailInput.value = '';

        setTimeout(() => {
          submitBtn.disabled = false;
          submitBtn.innerHTML = '<span class="btn-text">Get Early Access</span><span class="btn-text-hover">Join Free</span>';
          submitBtn.style.background = '';
        }, 3000);
      }, 1500);
    });
  }

  // Newsletter forms
  document.querySelectorAll('.newsletter-form').forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = form.querySelector('input');
      const btn = form.querySelector('button');

      btn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6L9 17l-5-5"/></svg>';
      btn.style.background = '#10b981';
      input.value = '';

      setTimeout(() => {
        btn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>';
        btn.style.background = '';
      }, 2000);
    });
  });
}

// ====================================
// Scroll Progress Bar
// ====================================
function initScrollProgress() {
  // Create progress bar if not exists
  let progressBar = document.querySelector('.scroll-progress');
  if (!progressBar) {
    progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    document.body.appendChild(progressBar);
  }

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    progressBar.style.width = `${scrollPercent}%`;
  }, { passive: true });
}

// ====================================
// Typing Animation
// ====================================
function initTypingAnimation() {
  const typingText = document.querySelector('.typing-text');
  if (!typingText) return;

  const phrases = [
    "Finding your knowledge gaps...",
    "Mapping exam concepts...",
    "Personalizing your path...",
    "Optimizing question difficulty...",
    "Building lasting memory..."
  ];

  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingDelay = 80;

  function typePhrase() {
    const currentPhrase = phrases[phraseIndex];

    if (isDeleting) {
      typingText.textContent = currentPhrase.substring(0, charIndex - 1);
      charIndex--;
      typingDelay = 40;

      if (charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typingDelay = 500;
      }
    } else {
      typingText.textContent = currentPhrase.substring(0, charIndex + 1);
      charIndex++;
      typingDelay = 80;

      if (charIndex === currentPhrase.length) {
        isDeleting = true;
        typingDelay = 2000;
      }
    }

    setTimeout(typePhrase, typingDelay);
  }

  setTimeout(typePhrase, 1000);
}

// ====================================
// Floating Cards Animation
// ====================================
function initFloatingCards() {
  if (CONFIG.reducedMotion) return;

  const cards = document.querySelectorAll('.floating-card');

  cards.forEach((card, index) => {
    const baseDelay = index * 2;
    const amplitude = 8 + (index * 2);

    function animate() {
      const time = Date.now() / 1000;
      const y = Math.sin(time + baseDelay) * amplitude;
      const rotation = Math.sin(time * 0.5 + baseDelay) * 2;

      card.style.transform = `translateY(${y}px) rotate(${rotation}deg)`;
      requestAnimationFrame(animate);
    }

    animate();
  });
}

// ====================================
// Reduced Motion Handler
// ====================================
function handleReducedMotion() {
  if (CONFIG.reducedMotion) {
    // Destroy Lenis
    if (lenis) {
      lenis.destroy();
      lenis = null;
    }

    // Kill all ScrollTriggers
    ScrollTrigger.getAll().forEach(st => st.kill());

    // Reset all animated elements
    gsap.set('[data-animate], .bento-card, .algo-card, .step-card, .stat-card, .section-header, .hero-headline, .hero-subheadline, .hero-cta, .trust-item, .floating-card, .comparison-card', {
      opacity: 1,
      y: 0,
      x: 0,
      scale: 1,
      rotation: 0
    });

    // Hide custom cursor
    const cursor = document.getElementById('cursor');
    if (cursor) cursor.style.display = 'none';

    // Disable body cursor override
    document.body.classList.add('cursor-disabled');
  }
}

// ====================================
// Resize Handler
// ====================================
function initResizeHandler() {
  let resizeTimeout;

  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      // Close mobile menu on resize to desktop
      const mobileMenu = document.getElementById('mobileMenu');
      const hamburger = document.getElementById('hamburger');

      if (window.innerWidth > 768 && mobileMenu && mobileMenu.classList.contains('active')) {
        hamburger.classList.remove('active');
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
        if (lenis) lenis.start();
      }

      // Refresh ScrollTrigger
      ScrollTrigger.refresh();
    }, 250);
  });
}

// ====================================
// Grid Animation Observer
// ====================================
function initGridAnimations() {
  if (CONFIG.reducedMotion) {
    // If reduced motion, just show all items immediately
    document.querySelectorAll('.bento-grid, .algorithm-grid, .steps-grid, .stats-grid, .faq-grid').forEach(grid => {
      grid.classList.add('animate-in');
    });
    return;
  }

  const grids = document.querySelectorAll('.bento-grid, .algorithm-grid, .steps-grid, .stats-grid, .faq-grid');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  grids.forEach(grid => observer.observe(grid));
}

// ====================================
// Initialize Everything
// ====================================
function init() {
  // Core setup
  initGSAP();
  initLenis();

  // Check reduced motion first
  handleReducedMotion();

  // Interactive elements
  initCursor();
  initMagneticButtons();
  initCardTilt();

  // Animations
  initHeroEntrance();
  initParallax();
  initKineticTypography();
  initSectionAnimations();
  initGridAnimations();
  initCounters();

  // UI Components
  initNavbar();
  initMobileMenu();
  initFAQ();
  initForms();
  initScrollProgress();
  initTypingAnimation();
  initFloatingCards();

  // Utilities
  initResizeHandler();

  // Listen for reduced motion changes
  window.matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change', (e) => {
    CONFIG.reducedMotion = e.matches;
    if (e.matches) {
      handleReducedMotion();
    } else {
      window.location.reload();
    }
  });
}

// Run on DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

// ====================================
// Console Branding
// ====================================
console.log(
  '%c LearnR %c Study Less. Learn More. Actually Remember It.',
  'background: linear-gradient(135deg, #0D7377, #074547); color: white; padding: 10px 15px; border-radius: 4px 0 0 4px; font-weight: bold;',
  'background: #f0fdfa; color: #0D7377; padding: 10px 15px; border-radius: 0 4px 4px 0;'
);
