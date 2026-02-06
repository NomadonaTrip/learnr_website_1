/**
 * LearnR Landing Page - JavaScript
 * Handles animations, interactions, and dynamic effects
 */

// ====================================
// DOM Elements
// ====================================
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
const promoBanner = document.getElementById('promoBanner');
const faqItems = document.querySelectorAll('.faq-item');
const typingText = document.querySelector('.typing-text');
const earlyAccessForm = document.getElementById('earlyAccessForm');

// ====================================
// Intersection Observer for Animations
// ====================================
const observerOptions = {
  root: null,
  rootMargin: '0px 0px -80px 0px',
  threshold: 0.1
};

const animationObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate-in');

      // Handle counters
      const counters = entry.target.querySelectorAll('[data-counter]');
      counters.forEach(counter => {
        if (!counter.classList.contains('counted')) {
          animateCounter(counter);
          counter.classList.add('counted');
        }
      });

      // Also check if the element itself is a counter
      if (entry.target.dataset.counter && !entry.target.classList.contains('counted')) {
        animateCounter(entry.target);
        entry.target.classList.add('counted');
      }
    }
  });
}, observerOptions);

// Observe all animatable elements
document.querySelectorAll('[data-animate]').forEach(el => {
  animationObserver.observe(el);
});

// Also observe grids for staggered animations
document.querySelectorAll('.bento-grid, .algorithm-grid, .steps-grid, .stats-grid, .faq-grid').forEach(el => {
  animationObserver.observe(el);
});

// ====================================
// Counter Animation
// ====================================
function animateCounter(element) {
  const target = parseInt(element.dataset.counter);
  const duration = 2000;
  const start = performance.now();
  const startValue = 0;

  function update(currentTime) {
    const elapsed = currentTime - start;
    const progress = Math.min(elapsed / duration, 1);

    // Ease out quart
    const easeOut = 1 - Math.pow(1 - progress, 4);
    const current = Math.floor(startValue + (target - startValue) * easeOut);

    element.textContent = current;

    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      element.textContent = target;
    }
  }

  requestAnimationFrame(update);
}

// ====================================
// Navbar Scroll Behavior
// ====================================
let lastScrollY = window.scrollY;
let ticking = false;

function updateNavbar() {
  const scrollY = window.scrollY;

  // Add scrolled class after promo banner
  if (scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }

  // Hide promo banner on scroll
  if (promoBanner) {
    if (scrollY > 100) {
      promoBanner.style.transform = 'translateX(-50%) translateY(-100%)';
      promoBanner.style.opacity = '0';
    } else {
      promoBanner.style.transform = 'translateX(-50%) translateY(0)';
      promoBanner.style.opacity = '1';
    }
  }

  lastScrollY = scrollY;
  ticking = false;
}

window.addEventListener('scroll', () => {
  if (!ticking) {
    requestAnimationFrame(updateNavbar);
    ticking = true;
  }
});

// ====================================
// Mobile Menu Toggle
// ====================================
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  mobileMenu.classList.toggle('active');
  document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
});

// Close mobile menu on link click
document.querySelectorAll('.mobile-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    mobileMenu.classList.remove('active');
    document.body.style.overflow = '';
  });
});

// ====================================
// FAQ Accordion
// ====================================
faqItems.forEach(item => {
  const question = item.querySelector('.faq-question');

  question.addEventListener('click', () => {
    const isActive = item.classList.contains('active');

    // Close all other items
    faqItems.forEach(otherItem => {
      if (otherItem !== item) {
        otherItem.classList.remove('active');
        otherItem.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
      }
    });

    // Toggle current item
    item.classList.toggle('active');
    question.setAttribute('aria-expanded', !isActive);
  });
});

// ====================================
// Typing Animation
// ====================================
const typingPhrases = [
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
  if (!typingText) return;

  const currentPhrase = typingPhrases[phraseIndex];

  if (isDeleting) {
    // Deleting
    typingText.textContent = currentPhrase.substring(0, charIndex - 1);
    charIndex--;
    typingDelay = 40;

    if (charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % typingPhrases.length;
      typingDelay = 500; // Pause before typing next phrase
    }
  } else {
    // Typing
    typingText.textContent = currentPhrase.substring(0, charIndex + 1);
    charIndex++;
    typingDelay = 80;

    if (charIndex === currentPhrase.length) {
      isDeleting = true;
      typingDelay = 2000; // Pause at end of phrase
    }
  }

  setTimeout(typePhrase, typingDelay);
}

// Start typing animation
setTimeout(typePhrase, 1000);

// ====================================
// Smooth Scroll for Anchor Links
// ====================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');

    if (targetId === '#') return;

    const target = document.querySelector(targetId);
    if (target) {
      const headerOffset = 100;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// ====================================
// Form Submission
// ====================================
if (earlyAccessForm) {
  // Show/hide "Other" course text input
  const courseSelect = document.getElementById('cta-course');
  const otherCourseRow = document.getElementById('otherCourseRow');
  const otherCourseInput = document.getElementById('cta-other-course');

  if (courseSelect && otherCourseRow) {
    courseSelect.addEventListener('change', () => {
      if (courseSelect.value === 'Other') {
        otherCourseRow.style.display = 'flex';
        otherCourseInput.required = true;
      } else {
        otherCourseRow.style.display = 'none';
        otherCourseInput.required = false;
        otherCourseInput.value = '';
      }
    });
  }

  // Formspree submission via fetch
  earlyAccessForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const submitBtn = earlyAccessForm.querySelector('button[type="submit"]');
    const formData = new FormData(earlyAccessForm);

    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span class="btn-text">Submitting...</span>';

    try {
      const response = await fetch(earlyAccessForm.action, {
        method: 'POST',
        body: formData,
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok) {
        submitBtn.innerHTML = '<span class="btn-text">You\'re In!</span>';
        submitBtn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
        earlyAccessForm.reset();
        if (otherCourseRow) otherCourseRow.style.display = 'none';

        setTimeout(() => {
          submitBtn.disabled = false;
          submitBtn.innerHTML = '<span class="btn-text">Get Early Access</span><span class="btn-text-hover">Join Free →</span>';
          submitBtn.style.background = '';
        }, 4000);
      } else {
        submitBtn.innerHTML = '<span class="btn-text">Something went wrong</span>';
        setTimeout(() => {
          submitBtn.disabled = false;
          submitBtn.innerHTML = '<span class="btn-text">Get Early Access</span><span class="btn-text-hover">Join Free →</span>';
        }, 3000);
      }
    } catch (err) {
      submitBtn.innerHTML = '<span class="btn-text">Network error</span>';
      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<span class="btn-text">Get Early Access</span><span class="btn-text-hover">Join Free →</span>';
      }, 3000);
    }
  });
}

// Newsletter form
const newsletterForms = document.querySelectorAll('.newsletter-form');
newsletterForms.forEach(form => {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = form.querySelector('input');
    const btn = form.querySelector('button');

    btn.innerHTML = '✓';
    btn.style.background = '#10b981';
    input.value = '';

    setTimeout(() => {
      btn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>';
      btn.style.background = '';
    }, 2000);
  });
});

// ====================================
// Parallax Effect for Hero Orbs
// ====================================
let rafId = null;

function handleParallax() {
  const scrollY = window.scrollY;
  const heroOrbs = document.querySelectorAll('.hero-orb');

  heroOrbs.forEach((orb, index) => {
    const speed = 0.1 + (index * 0.05);
    orb.style.transform = `translateY(${scrollY * speed}px)`;
  });

  rafId = null;
}

window.addEventListener('scroll', () => {
  if (rafId === null) {
    rafId = requestAnimationFrame(handleParallax);
  }
});

// ====================================
// Button Hover Effect Enhancement
// ====================================
document.querySelectorAll('.btn').forEach(btn => {
  btn.addEventListener('mouseenter', function(e) {
    const rect = this.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    this.style.setProperty('--mouse-x', `${x}px`);
    this.style.setProperty('--mouse-y', `${y}px`);
  });
});

// ====================================
// Floating Cards Animation (Hero)
// ====================================
function animateFloatingCards() {
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

// Start floating animation on load
window.addEventListener('load', () => {
  animateFloatingCards();

  // Trigger initial animations for visible elements
  setTimeout(() => {
    document.querySelectorAll('[data-animate]').forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight) {
        el.classList.add('animate-in');
      }
    });
  }, 100);
});

// ====================================
// Forgetting Curve Animation
// ====================================
const curvePath = document.querySelector('.curve-path');
if (curvePath) {
  const curveObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        curvePath.style.animation = 'drawCurve 2s ease-out forwards';
      }
    });
  }, { threshold: 0.5 });

  curveObserver.observe(curvePath.closest('.bento-card'));
}

// ====================================
// Difficulty Bars Animation
// ====================================
const diffBars = document.querySelectorAll('.diff-bar');
if (diffBars.length > 0) {
  const barsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const bars = entry.target.querySelectorAll('.diff-bar');
        bars.forEach((bar, index) => {
          setTimeout(() => {
            bar.style.opacity = '1';
            bar.style.transform = 'translateX(0)';
          }, index * 150);
        });
      }
    });
  }, { threshold: 0.5 });

  const barsContainer = diffBars[0].parentElement;
  if (barsContainer) {
    barsObserver.observe(barsContainer.closest('.bento-card'));
  }
}

// ====================================
// Initialize Difficulty Bars State
// ====================================
document.querySelectorAll('.diff-bar').forEach(bar => {
  bar.style.opacity = '0';
  bar.style.transform = 'translateX(-20px)';
  bar.style.transition = 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
});

// ====================================
// Keyboard Accessibility
// ====================================
document.addEventListener('keydown', (e) => {
  // Close mobile menu on Escape
  if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
    hamburger.classList.remove('active');
    mobileMenu.classList.remove('active');
    document.body.style.overflow = '';
  }
});

// ====================================
// Performance: Debounce Utility
// ====================================
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// ====================================
// Handle Resize
// ====================================
const handleResize = debounce(() => {
  // Close mobile menu on resize to desktop
  if (window.innerWidth > 768 && mobileMenu.classList.contains('active')) {
    hamburger.classList.remove('active');
    mobileMenu.classList.remove('active');
    document.body.style.overflow = '';
  }
}, 250);

window.addEventListener('resize', handleResize);

// ====================================
// Prefers Reduced Motion
// ====================================
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

if (prefersReducedMotion.matches) {
  // Disable floating card animations
  document.querySelectorAll('.floating-card').forEach(card => {
    card.style.animation = 'none';
  });

  // Disable parallax
  window.removeEventListener('scroll', handleParallax);
}

// ====================================
// Console Branding
// ====================================
console.log(
  '%c LearnR %c Study Less. Learn More. Actually Remember It.',
  'background: linear-gradient(135deg, #8b5cf6, #6366f1); color: white; padding: 10px 15px; border-radius: 4px 0 0 4px; font-weight: bold;',
  'background: #f5f3ff; color: #6d28d9; padding: 10px 15px; border-radius: 0 4px 4px 0;'
);

// ====================================
// Motion Library Animations
// ====================================
// Wait for Motion library to load
if (typeof Motion !== 'undefined' && !prefersReducedMotion.matches) {
  const { animate, spring } = Motion;

  // Button hover animations with spring physics
  document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('mouseenter', () => {
      animate(btn,
        { scale: 1.02, y: -2 },
        { type: spring, stiffness: 400, damping: 25 }
      );
    });

    btn.addEventListener('mouseleave', () => {
      animate(btn,
        { scale: 1, y: 0 },
        { type: spring, stiffness: 400, damping: 25 }
      );
    });
  });

  // Card hover animations with spring physics
  document.querySelectorAll('.glass-card, .algo-card, .step-card, .stat-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
      animate(card,
        { y: -6, scale: 1.01 },
        { type: spring, stiffness: 300, damping: 20 }
      );
    });

    card.addEventListener('mouseleave', () => {
      animate(card,
        { y: 0, scale: 1 },
        { type: spring, stiffness: 300, damping: 20 }
      );
    });
  });

  // Nav link underline animation
  document.querySelectorAll('.nav-link').forEach(link => {
    const underline = link.querySelector('span');
    if (underline) {
      link.addEventListener('mouseenter', () => {
        animate(underline,
          { backgroundSize: '100% 2px' },
          { duration: 0.3, easing: [0.16, 1, 0.3, 1] }
        );
      });

      link.addEventListener('mouseleave', () => {
        animate(underline,
          { backgroundSize: '0% 2px' },
          { duration: 0.3, easing: [0.16, 1, 0.3, 1] }
        );
      });
    }
  });

  // Floating cards enhanced animation
  document.querySelectorAll('.floating-card').forEach((card, index) => {
    const baseDelay = index * 0.5;

    function floatAnimation() {
      animate(card,
        { y: [0, -12, 0] },
        {
          duration: 3 + index * 0.5,
          repeat: Infinity,
          easing: 'ease-in-out',
          delay: baseDelay
        }
      );
    }

    floatAnimation();
  });

  // Hero badge pulse animation
  const heroBadge = document.querySelector('.hero-badge');
  if (heroBadge) {
    animate(heroBadge,
      { scale: [1, 1.02, 1] },
      { duration: 2, repeat: Infinity, easing: 'ease-in-out' }
    );
  }

  // Scroll-triggered animations with stagger
  const animateOnScroll = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const children = entry.target.querySelectorAll('[data-animate]');
        children.forEach((child, i) => {
          animate(child,
            { opacity: [0, 1], y: [30, 0] },
            {
              duration: 0.6,
              delay: i * 0.1,
              easing: [0.16, 1, 0.3, 1]
            }
          );
        });
        animateOnScroll.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  document.querySelectorAll('.section-header, .bento-grid, .algorithm-grid').forEach(el => {
    animateOnScroll.observe(el);
  });
}

// ====================================
// Word-by-Word Text Reveal
// ====================================
function initWordReveal() {
  const textElements = document.querySelectorAll('[data-word-reveal]');

  textElements.forEach(el => {
    const text = el.innerHTML;
    // Split by words but preserve HTML tags for highlighting
    const words = text.split(/\s+/);

    el.innerHTML = words.map((word, i) => {
      // Check if word contains emphasis tags
      if (word.includes('<em>') || word.includes('</em>')) {
        return `<span class="word highlight" style="--word-index: ${i}">${word.replace(/<\/?em>/g, '')}</span>`;
      }
      return `<span class="word" style="--word-index: ${i}">${word}</span>`;
    }).join(' ');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('words-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });

    observer.observe(el);
  });
}

// ====================================
// Enhanced Parallax Effects
// ====================================
function initParallax() {
  const parallaxElements = document.querySelectorAll('[data-parallax]');
  if (parallaxElements.length === 0) return;

  let ticking = false;

  const handleScroll = () => {
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;

    parallaxElements.forEach(el => {
      const rect = el.getBoundingClientRect();
      const speed = parseFloat(el.dataset.parallax) || 0.1;

      // Only animate when in viewport
      if (rect.top < windowHeight && rect.bottom > 0) {
        const yPos = (rect.top - windowHeight / 2) * speed;
        el.style.transform = `translateY(${yPos}px)`;
      }
    });

    ticking = false;
  };

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(handleScroll);
      ticking = true;
    }
  }, { passive: true });

  // Initial call
  handleScroll();
}

// ====================================
// Hero Scale on Scroll
// ====================================
function initHeroScale() {
  const heroFloating = document.querySelector('.hero-floating');
  const heroContent = document.querySelector('.hero-content');
  if (!heroFloating && !heroContent) return;

  let ticking = false;

  const handleScroll = () => {
    const scrollY = window.scrollY;
    const maxScroll = 600;

    if (scrollY < maxScroll) {
      const progress = scrollY / maxScroll;

      if (heroFloating) {
        const scale = Math.max(0.85, 1 - progress * 0.15);
        const opacity = Math.max(0, 1 - progress * 1.5);
        heroFloating.style.transform = `scale(${scale})`;
        heroFloating.style.opacity = opacity;
      }

      if (heroContent) {
        const yOffset = scrollY * 0.3;
        const opacity = Math.max(0, 1 - progress * 0.8);
        heroContent.style.transform = `translateY(${yOffset}px)`;
        heroContent.style.opacity = opacity;
      }
    }

    ticking = false;
  };

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(handleScroll);
      ticking = true;
    }
  }, { passive: true });
}

// ====================================
// Section Header Animations
// ====================================
function initSectionAnimations() {
  const sectionHeaders = document.querySelectorAll('.section-header');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2, rootMargin: '0px 0px -50px 0px' });

  sectionHeaders.forEach(header => observer.observe(header));
}

// ====================================
// Comparison Cards Animation
// ====================================
function initComparisonReveal() {
  const comparisonContainer = document.querySelector('.comparison-container');
  if (!comparisonContainer) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  observer.observe(comparisonContainer);
}

// ====================================
// Enhanced Grid Animations
// ====================================
function initGridAnimations() {
  const grids = document.querySelectorAll('.bento-grid, .algorithm-grid, .steps-grid, .stats-grid, .faq-grid');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');

        // Also add animate-in to individual cards for icon animations
        const cards = entry.target.querySelectorAll('.bento-card, .algo-card, .step-card, .stat-card, .faq-item');
        cards.forEach((card, i) => {
          setTimeout(() => {
            card.classList.add('animate-in');
          }, i * 60);
        });

        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -80px 0px' });

  grids.forEach(grid => observer.observe(grid));
}

// ====================================
// Smooth Scroll Progress Indicator
// ====================================
function initScrollProgress() {
  // Create progress bar element
  const progressBar = document.createElement('div');
  progressBar.className = 'scroll-progress';
  progressBar.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 0%;
    height: 3px;
    background: linear-gradient(90deg, var(--color-primary-500), var(--color-accent));
    z-index: 9999;
    transition: width 0.1s ease-out;
  `;
  document.body.appendChild(progressBar);

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    progressBar.style.width = `${scrollPercent}%`;
  }, { passive: true });
}

// ====================================
// Initialize All Premium Animations
// ====================================
function initPremiumAnimations() {
  // Check for reduced motion preference
  if (prefersReducedMotion.matches) {
    // Still run basic observers but skip parallax/scale effects
    initSectionAnimations();
    initComparisonReveal();
    initGridAnimations();
    return;
  }

  // Initialize all animation systems
  initWordReveal();
  initParallax();
  initHeroScale();
  initSectionAnimations();
  initComparisonReveal();
  initGridAnimations();
  initScrollProgress();
}

// Run on DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initPremiumAnimations);
} else {
  initPremiumAnimations();
}
