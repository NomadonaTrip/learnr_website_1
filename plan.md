# LearnR Landing Page: Top 1% Transformation Plan

## Overview
Transform the LearnR landing page from its current ~42/100 score to an award-worthy 90+ experience by implementing motion physics, advanced typography, visual texture effects, and interactive depth elements per the agent_design.md "Top 1%" standards.

---

## Current State Analysis

### Strengths (Preserve)
- **Color palette (9/10)**: Teal/amber is distinctive, avoids "SaaS purple" trap
- **Information architecture (8/10)**: Clear Problem → Solution → How It Works flow
- **Accessibility (8/10)**: Good WCAG foundation, skip links, ARIA attributes
- **Content/copywriting**: Strong evidence-based messaging

### Critical Gaps (Fix)
- **Motion/Animation (3/10)**: Static page, no scroll momentum, basic hover states
- **Visual Texture (4/10)**: Flat surfaces, no grain/noise, missing depth
- **Typography Dynamics (5/10)**: No variable fonts, no kinetic reveals
- **Interactive Depth (6/10)**: Cards don't respond to cursor, no 3D tilt

---

## Implementation Phases

### Phase 1: Foundation - Smooth Scroll & Animation Library
**Files**: `index.html`, `script.js`, `styles.css`

**Tasks:**
1. Add Lenis smooth scrolling library (CDN)
2. Replace Motion.js with full GSAP (Core + ScrollTrigger + CustomEase)
3. Add SplitType for text animations
4. Update CSS to support Lenis (`scroll-behavior: auto`)

**CDN additions to index.html** (before `</body>`):
```html
<script src="https://cdn.jsdelivr.net/npm/@studio-freight/lenis@1.0.42/dist/lenis.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/ScrollTrigger.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/split-type@0.3.4/umd/index.min.js"></script>
```

**CSS changes** (styles.css):
```css
html {
  scroll-behavior: auto; /* Lenis handles scrolling */
}

html.lenis, html.lenis body {
  height: auto;
}

.lenis.lenis-smooth {
  scroll-behavior: auto !important;
}
```

---

### Phase 2: Hero Section Transformation
**Files**: `script.js`, `styles.css`

**Tasks:**
1. **Choreographed load sequence**: Headlines word-stagger in, CTAs spring-scale, trust bar staggers
2. **Parallax depth**: Hero orbs move at different velocities (0.3x, 0.5x scroll speed)
3. **Hero content fade**: Content fades/moves up as user scrolls (cinematic exit)
4. **Kinetic typography**: Character-level reveals on headlines using SplitType
5. **Underline draw**: Animated underline on emphasis words (`<em>`) on scroll trigger

**JavaScript pattern for hero entrance**:
```javascript
function initHeroEntrance() {
  const tl = gsap.timeline({ delay: 0.3 });

  // Headlines stagger in
  tl.from('.hero-headline .headline-line', {
    y: 80, opacity: 0, rotationX: -15,
    duration: 0.8, stagger: 0.15, ease: 'power3.out'
  });

  // Subheadline fades up
  tl.from('.hero-subheadline', {
    y: 30, opacity: 0, duration: 0.6, ease: 'power3.out'
  }, '-=0.3');

  // CTA buttons scale in with spring
  tl.from('.hero-cta .btn', {
    scale: 0.8, opacity: 0, duration: 0.5,
    stagger: 0.1, ease: 'back.out(1.7)'
  }, '-=0.2');
}
```

---

### Phase 3: Visual Texture & Film Grain
**Files**: `styles.css`

**Tasks:**
1. **Noise overlay**: SVG-based film grain using `feTurbulence` filter (0.03 opacity)
2. **Animated grain**: Subtle position shift animation (0.5s steps)
3. **Enhanced glass cards**: Inner glow gradient on hover
4. **Reduced motion**: Disable grain animation for `prefers-reduced-motion`

**CSS for film grain**:
```css
body::before {
  content: '';
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 9998;
  opacity: 0.025;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
  background-repeat: repeat;
  mix-blend-mode: overlay;
  animation: grain 0.5s steps(10) infinite;
}

@keyframes grain {
  0%, 100% { transform: translate(0, 0); }
  10% { transform: translate(-1%, -1%); }
  20% { transform: translate(1%, 1%); }
  30% { transform: translate(-1%, 1%); }
  40% { transform: translate(1%, -1%); }
}

@media (prefers-reduced-motion: reduce) {
  body::before { animation: none; opacity: 0.015; }
}
```

---

### Phase 4: Custom Cursor & Magnetic Buttons
**Files**: `index.html`, `styles.css`, `script.js`

**Tasks:**
1. **Custom cursor**: Dot + ring, mix-blend-mode difference, scales on hover
2. **Magnetic buttons**: Primary CTAs attract toward cursor (0.3x delta)
3. **Elastic return**: Spring physics on mouse leave
4. **Mobile handling**: Hide cursor on touch devices (`@media (hover: none)`)

**HTML addition** (before `</body>`):
```html
<div class="cursor" id="cursor" aria-hidden="true">
  <div class="cursor-dot"></div>
  <div class="cursor-ring"></div>
</div>
```

**CSS for cursor**:
```css
.cursor {
  position: fixed;
  top: 0;
  left: 0;
  pointer-events: none;
  z-index: 99999;
  mix-blend-mode: difference;
}

.cursor-dot {
  position: absolute;
  width: 8px;
  height: 8px;
  background: white;
  border-radius: 50%;
  transform: translate(-50%, -50%);
}

.cursor-ring {
  position: absolute;
  width: 40px;
  height: 40px;
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: 50%;
  transform: translate(-50%, -50%);
  transition: width 0.3s ease, height 0.3s ease;
}

.cursor.cursor-hover .cursor-ring {
  width: 60px;
  height: 60px;
}

@media (hover: none) {
  .cursor { display: none !important; }
}

@media (hover: hover) {
  body { cursor: none; }
}
```

**JavaScript for magnetic buttons**:
```javascript
function initMagneticButtons() {
  const magneticButtons = document.querySelectorAll('.btn-primary, .btn-cta');

  magneticButtons.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const deltaX = (e.clientX - centerX) * 0.3;
      const deltaY = (e.clientY - centerY) * 0.3;

      gsap.to(btn, { x: deltaX, y: deltaY, duration: 0.3, ease: 'power2.out' });
    });

    btn.addEventListener('mouseleave', () => {
      gsap.to(btn, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.3)' });
    });
  });
}
```

---

### Phase 5: Interactive Bento Grid
**Files**: `script.js`, `styles.css`

**Tasks:**
1. **3D tilt effect**: Cards respond to cursor position (rotateX/Y based on mouse)
2. **Hover elevation**: Scale 1.02, translateY -8px, perspective depth
3. **Staggered reveals**: GSAP ScrollTrigger with 0.1s stagger on grid entry
4. **Algorithm card animations**: SVG icons animate on scroll (nodes pulse, lines draw)

**JavaScript for 3D tilt**:
```javascript
function initCardTilt() {
  const cards = document.querySelectorAll('.bento-card, .algo-card, .step-card');

  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = (y - centerY) / 15;
      const rotateY = (centerX - x) / 15;

      card.style.transform = `
        perspective(1000px)
        rotateX(${-rotateX}deg)
        rotateY(${rotateY}deg)
        translateY(-8px)
        scale(1.02)
      `;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
}
```

**CSS for 3D cards**:
```css
.bento-card, .algo-card, .step-card {
  transform-style: preserve-3d;
  perspective: 1000px;
  will-change: transform;
}
```

---

### Phase 6: Scroll-Driven Section Animations
**Files**: `script.js`, `styles.css`

**Tasks:**
1. **Section header reveals**: Words stagger in from below with slight rotation
2. **Comparison cards**: Slide in from opposite sides (before: -100x, after: +100x)
3. **Stats counter**: Enhanced counter animation with GSAP easing
4. **Progress bar**: Gradient animation on scroll progress indicator

**JavaScript for section animations**:
```javascript
function initSectionAnimations() {
  // Section headers
  document.querySelectorAll('.section-header').forEach(header => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: header,
        start: 'top 85%',
        once: true
      }
    });

    tl.from(header.querySelector('.section-label'), {
      x: -30, opacity: 0, duration: 0.5
    });
    tl.from(header.querySelector('.section-title'), {
      y: 40, opacity: 0, duration: 0.6
    }, '-=0.3');
  });

  // Bento grid stagger
  gsap.from('.bento-card', {
    y: 60, opacity: 0, scale: 0.95,
    duration: 0.7, stagger: 0.1,
    ease: 'back.out(1.2)',
    scrollTrigger: { trigger: '.bento-grid', start: 'top 80%' }
  });

  // Comparison cards
  gsap.from('.comparison-before', {
    x: -100, opacity: 0, duration: 0.8,
    scrollTrigger: { trigger: '.comparison-container', start: 'top 75%' }
  });
  gsap.from('.comparison-after', {
    x: 100, opacity: 0, duration: 0.8,
    scrollTrigger: { trigger: '.comparison-container', start: 'top 75%' }
  });
}
```

---

### Phase 7: FAQ & Form Polish
**Files**: `script.js`

**Tasks:**
1. **GSAP accordion**: Spring physics on expand (height: auto), icon rotation with overshoot
2. **Form success**: Animated checkmark SVG draw on submission
3. **Input focus**: Subtle scale (1.01) and enhanced shadow on focus

**JavaScript for FAQ accordion**:
```javascript
function initFAQ() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');
    const icon = item.querySelector('.faq-icon');

    gsap.set(answer, { height: 0, opacity: 0 });

    question.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Close others
      faqItems.forEach(other => {
        if (other !== item && other.classList.contains('active')) {
          other.classList.remove('active');
          gsap.to(other.querySelector('.faq-answer'), { height: 0, opacity: 0, duration: 0.4 });
          gsap.to(other.querySelector('.faq-icon'), { rotation: 0, duration: 0.3 });
        }
      });

      // Toggle current
      if (!isActive) {
        item.classList.add('active');
        gsap.to(answer, { height: 'auto', opacity: 1, duration: 0.5 });
        gsap.to(icon, { rotation: 180, duration: 0.4, ease: 'back.out(1.7)' });
      } else {
        item.classList.remove('active');
        gsap.to(answer, { height: 0, opacity: 0, duration: 0.4 });
        gsap.to(icon, { rotation: 0, duration: 0.3 });
      }
    });
  });
}
```

---

### Phase 8: Performance & Accessibility
**Files**: `styles.css`, `script.js`

**Tasks:**
1. **GPU hints**: `will-change: transform` on animated elements
2. **Reduced motion handler**: Complete disable of all animations, Lenis destroy
3. **Cleanup**: Remove old Motion.js conditional code
4. **Font preloading**: Add preconnect hints for Google Fonts

**CSS for GPU hints**:
```css
.hero-orb, .floating-card, .bento-card, .algo-card,
.step-card, .stat-card, .cursor-dot, .cursor-ring {
  will-change: transform;
}

.hero-content, .section-header {
  will-change: transform, opacity;
}
```

**JavaScript for reduced motion**:
```javascript
function handleReducedMotion() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    if (lenis) lenis.destroy();
    ScrollTrigger.getAll().forEach(st => st.kill());

    gsap.set('[data-animate], .bento-card, .algo-card, .step-card', {
      opacity: 1, y: 0, x: 0, scale: 1
    });

    const cursor = document.getElementById('cursor');
    if (cursor) cursor.style.display = 'none';
  }
}
```

---

## Files to Modify Summary

| File | Changes |
|------|---------|
| `index.html` | Add GSAP/Lenis/SplitType CDN scripts, custom cursor HTML element |
| `styles.css` | Film grain overlay, cursor styles, enhanced glass cards, will-change hints, Lenis support |
| `script.js` | Complete animation system rewrite: Lenis init, GSAP timelines, magnetic buttons, 3D tilt, kinetic typography, FAQ accordion |

---

## Verification Plan (Playwright MCP)

After each phase, use Playwright MCP to verify:

1. **Phase 1**: Navigate to page, scroll slowly - verify smooth momentum scroll
2. **Phase 2**: Reload page - verify choreographed entrance sequence
3. **Phase 3**: Take screenshot - verify subtle grain texture visible
4. **Phase 4**: Hover over CTA buttons - verify magnetic attraction effect
5. **Phase 5**: Scroll to bento grid, hover cards - verify 3D tilt response
6. **Phase 6**: Scroll through page - verify section animations trigger correctly
7. **Phase 7**: Click FAQ items - verify spring accordion animation
8. **Phase 8**: Enable reduced motion in browser - verify all animations disabled gracefully

**Final test**: Full page scroll recording comparing before/after feel

---

## Success Criteria

| Metric | Before | Target |
|--------|--------|--------|
| Motion/Animation | 3/10 | 9/10 |
| Visual Texture | 4/10 | 8/10 |
| Typography Dynamics | 5/10 | 9/10 |
| Interactive Depth | 6/10 | 9/10 |
| **Overall Score** | **42/100** | **90+/100** |

---

## Reference Materials
- Design standards: `/mnt/e/TOOLMAKER/WEB PROJECTS/LearnR_6/agent_design.md`
- Reference site: https://emitra.framer.website/
- Screenshots: `/mnt/e/TOOLMAKER/WEB PROJECTS/LearnR_6/.playwright-mcp/`

---

## Key Libraries

| Library | Version | Purpose |
|---------|---------|---------|
| Lenis | 1.0.42 | Smooth momentum scrolling |
| GSAP | 3.12.5 | Animation engine with spring physics |
| ScrollTrigger | 3.12.5 | Scroll-driven animations |
| SplitType | 0.3.4 | Text splitting for kinetic typography |

---

## Estimated Timeline

| Phase | Estimated Time |
|-------|----------------|
| Phase 1: Foundation | 2-3 hours |
| Phase 2: Hero | 4-5 hours |
| Phase 3: Texture | 2-3 hours |
| Phase 4: Cursor | 3-4 hours |
| Phase 5: Bento | 4-5 hours |
| Phase 6: Scroll | 3-4 hours |
| Phase 7: FAQ/Form | 2 hours |
| Phase 8: Performance | 2-3 hours |
| **Total** | **22-29 hours** |
