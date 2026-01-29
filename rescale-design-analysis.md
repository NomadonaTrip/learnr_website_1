# Rescale Website Design Analysis

**Source:** https://rescale.framer.ai/
**Analysis Date:** January 2026
**Purpose:** Reference document for building a static site with similar design DNA

---

## Table of Contents

1. [Visual Style DNA](#visual-style-dna)
2. [Typography](#typography)
3. [Color Palette](#color-palette)
4. [Layout & Spacing](#layout--spacing)
5. [Component Library](#component-library)
6. [Section Structure](#section-structure)
7. [Interaction Patterns](#interaction-patterns)
8. [Micro-Animations](#micro-animations)
9. [Responsive Behavior](#responsive-behavior)
10. [Technical Implementation Notes](#technical-implementation-notes)
11. [Advanced Nuances & Implementation Details](#advanced-nuances--implementation-details)

---

## Visual Style DNA

### Overall Aesthetic
- **Style:** Modern SaaS / AI-focused with glassmorphism elements
- **Mood:** Professional yet approachable, innovative, trustworthy
- **Visual Density:** Generous whitespace, content breathes
- **Depth:** Layered design with subtle shadows and overlapping elements

### Key Visual Elements
- Frosted glass effect (glassmorphism) on navigation and cards
- Soft gradient backgrounds with purple/blue tones
- Rounded corners throughout (16-24px radius)
- Subtle drop shadows for depth
- Bento grid layouts for feature showcases
- Abstract blob shapes as decorative elements

---

## Typography

### Font Families
```css
/* Primary - Headings */
font-family: 'PP Editorial New', serif;  /* Or similar editorial serif */

/* Secondary - Body */
font-family: 'Inter', -apple-system, sans-serif;
```

### Type Scale
| Element | Size | Weight | Style |
|---------|------|--------|-------|
| H1 (Hero) | 64-80px | 400 | Mixed italic + normal |
| H2 (Section) | 48-56px | 400 | Mixed italic accent |
| H3 (Card titles) | 24-32px | 500 | Normal |
| H6 (Labels) | 12-14px | 500 | Uppercase, letter-spacing: 0.1em |
| Body | 16-18px | 400 | Normal |
| Small | 14px | 400 | Normal |

### Typography Patterns
- **Accent words** in headings are italicized (e.g., "*Amplify* your growth")
- **Section labels** are small caps with letter-spacing
- **Stats/numbers** use larger, bolder weights
- **Testimonial quotes** use slightly larger body text with bold styling

---

## Color Palette

### Primary Colors
```css
:root {
  /* Purple/Violet - Primary brand color */
  --color-primary-50: #f5f3ff;
  --color-primary-100: #ede9fe;
  --color-primary-200: #ddd6fe;
  --color-primary-300: #c4b5fd;
  --color-primary-400: #a78bfa;
  --color-primary-500: #8b5cf6;
  --color-primary-600: #7c3aed;
  --color-primary-700: #6d28d9;

  /* Green - CTA accent */
  --color-accent: #22c55e;
  --color-accent-dark: #16a34a;

  /* Neutrals */
  --color-text-primary: #1e1b4b;
  --color-text-secondary: #64748b;
  --color-text-muted: #94a3b8;
  --color-background: #ffffff;
  --color-surface: #f8fafc;
  --color-border: #e2e8f0;
}
```

### Gradient Backgrounds
```css
/* Hero section gradient */
background: linear-gradient(
  135deg,
  rgba(139, 92, 246, 0.05) 0%,
  rgba(59, 130, 246, 0.05) 50%,
  rgba(236, 72, 153, 0.03) 100%
);

/* Card subtle gradient */
background: linear-gradient(
  180deg,
  rgba(255, 255, 255, 0.8) 0%,
  rgba(248, 250, 252, 0.9) 100%
);
```

---

## Layout & Spacing

### Container Widths
```css
--container-max: 1280px;
--container-wide: 1440px;
--container-narrow: 768px;
```

### Spacing Scale
```css
--space-1: 4px;
--space-2: 8px;
--space-3: 12px;
--space-4: 16px;
--space-5: 20px;
--space-6: 24px;
--space-8: 32px;
--space-10: 40px;
--space-12: 48px;
--space-16: 64px;
--space-20: 80px;
--space-24: 96px;
--space-32: 128px;
```

### Section Padding
- Vertical padding between sections: 100-150px
- Horizontal container padding: 24-48px
- Card internal padding: 24-32px

### Border Radius
```css
--radius-sm: 8px;
--radius-md: 12px;
--radius-lg: 16px;
--radius-xl: 24px;
--radius-2xl: 32px;
--radius-full: 9999px;
```

---

## Component Library

### Navigation Bar
- Frosted glass background with blur
- Logo on left, links center, CTA right
- Hamburger menu on mobile with overlay
- Sticky positioning on scroll

```css
.navbar {
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 16px;
  padding: 12px 24px;
}
```

### Buttons

**Primary Button (Filled)**
```css
.btn-primary {
  background: var(--color-primary-600);
  color: white;
  padding: 14px 28px;
  border-radius: 12px;
  font-weight: 500;
  transition: all 0.3s ease;
}
.btn-primary:hover {
  background: var(--color-primary-700);
  transform: translateY(-2px);
}
```

**Secondary Button (Outlined)**
```css
.btn-secondary {
  background: transparent;
  border: 1px solid var(--color-border);
  color: var(--color-text-primary);
  padding: 14px 28px;
  border-radius: 12px;
}
```

**CTA Button (Green)**
```css
.btn-cta {
  background: var(--color-accent);
  color: white;
  padding: 14px 28px;
  border-radius: 12px;
}
```

### Cards

**Standard Card**
```css
.card {
  background: white;
  border-radius: 20px;
  padding: 32px;
  box-shadow:
    0 1px 3px rgba(0, 0, 0, 0.04),
    0 4px 12px rgba(0, 0, 0, 0.04);
  border: 1px solid rgba(0, 0, 0, 0.04);
}
```

**Glass Card**
```css
.card-glass {
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 20px;
}
```

### Badges/Pills
```css
.badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background: rgba(139, 92, 246, 0.1);
  border-radius: 9999px;
  font-size: 14px;
  font-weight: 500;
  color: var(--color-primary-600);
}
```

### Toggle Switch (Pricing)
```css
.toggle {
  display: flex;
  background: var(--color-surface);
  border-radius: 9999px;
  padding: 4px;
  position: relative;
}
.toggle-indicator {
  position: absolute;
  background: white;
  border-radius: 9999px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}
```

### FAQ Accordion
```css
.accordion-item {
  border: 1px solid var(--color-border);
  border-radius: 16px;
  margin-bottom: 12px;
  overflow: hidden;
}
.accordion-header {
  padding: 20px 24px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.accordion-content {
  padding: 0 24px 20px;
  color: var(--color-primary-600);
}
```

---

## Section Structure

### 1. Hero Section
```
[Badge: "12K+ Growing Businesses"]
[Split Headline: italic accent + normal text]
[Subtext paragraph]
[CTA Buttons: Primary + Secondary]
[Partner Logo Marquee]
```

### 2. Features Bento Grid
```
[Dashboard mockup card - large]
[Stats card with counters]
[Typing animation card]
[Category pills scroll]
[Partner circle rotation]
[Simple strategies grid]
[Process optimization bars]
```

### 3. How It Works
```
[Section label: "HOW IT WORKS"]
[Heading with italic accent]
[Subtext]
[4 Step Cards in row]:
  - Step number
  - Animated icon
  - Title
  - Description
[CTA bar]
```

### 4. Integration Section
```
[Section label: "INTEGRATION"]
[Heading + subtext]
[Bento grid]:
  - Analytics module card
  - AI Model card
  - Integration templates
  - Speed stats (2x, 4x)
  - System reliability counter
[Platform logos row]
[CTA]
```

### 5. Performance/Stats Section
```
[Section label: "PERFORMANCE"]
[Heading + subtext]
[6 Stat cards with]:
  - Background image
  - Label
  - Animated counter
[CTA]
```

### 6. About/Team Section
```
[Section label: "ABOUT US"]
[Heading: "Meet the Founders"]
[3 Founder cards]:
  - Photo
  - Name + title
  - Social links
[Story text block]
[Y Combinator badge]
[Photo gallery carousel]
[CTAs]
```

### 7. Testimonials Section
```
[Section label: "CLIENT INSIGHTS"]
[Heading + subtext]
[Featured testimonial with video avatar]
[Horizontal scrolling testimonial cards]:
  - Quote text (bold)
  - Avatar
  - Name + title + company
```

### 8. Pricing Section
```
[Section label: "PRICING"]
[Heading + subtext]
[Monthly/Annual toggle with "Save 20%" badge]
[3 Pricing cards]:
  - Plan name
  - Feature list with checkmarks
  - Price + period
  - CTA button
[Trusted by marquee]
[Help CTA]
```

### 9. FAQ Section
```
[Section label: "FAQ"]
[Heading + subtext]
[6 Accordion items]:
  - Question
  - Answer (purple text when expanded)
[Help CTA]
```

### 10. Final CTA Section
```
[Decorative gradient background]
[Large heading: "Ready? Let's Talk!"]
[Subtext]
[Book a Call button]
[Urgency text: "2 spots available"]
```

### 11. Footer
```
[Scrolling features marquee]
[Logo + tagline]
[Newsletter signup]
[Social icons]
[Link columns (2)]
[Copyright]
[Decorative illustration]
```

---

## Interaction Patterns

### Navigation
| Interaction | Behavior |
|-------------|----------|
| Nav link hover | Underline slides in from left |
| Hamburger click | Menu overlay slides down with staggered link animation |
| Logo click | Smooth scroll to top |
| Section link click | Smooth scroll to section with offset |

### Buttons
| Interaction | Behavior |
|-------------|----------|
| Hover | Text sweep reveal animation (characters animate left-to-right) |
| Click | Scale down slightly (0.98) |
| Focus | Ring outline appears |

### Cards
| Interaction | Behavior |
|-------------|----------|
| Hover | Subtle lift (translateY -4px) + shadow increase |
| Pricing card hover | Border glow intensifies |
| Testimonial hover | Slight scale (1.02) |

### Form Elements
| Interaction | Behavior |
|-------------|----------|
| Input focus | Border color change + subtle glow |
| Toggle click | Indicator slides with spring animation |
| Accordion click | Smooth height transition + icon rotation |

### Scroll Interactions
| Element | Trigger |
|---------|---------|
| Stats counters | Count up when scrolled into view |
| Cards | Fade in + slide up when visible |
| Section headings | Fade in when visible |
| Images | Subtle parallax on scroll |

---

## Micro-Animations

### Scroll-Triggered Animations

| Element | Animation | Duration | Easing |
|---------|-----------|----------|--------|
| Section headings | Fade-in + slide-up (20px) | 600ms | ease-out |
| Cards | Fade-in + slide-up + stagger | 500ms | ease-out |
| Stat counters | Count from 0 to target | 2000ms | ease-out |
| Icons | Float/bob continuously | 3000ms | ease-in-out |
| Parallax backgrounds | Translate at 0.5x scroll speed | - | linear |

### Continuous/Looping Animations

| Element | Animation | Duration |
|---------|-----------|----------|
| Logo marquees | Infinite horizontal scroll | 30s |
| Partner logo circle | Slow rotation | 60s |
| "Smart AI" highlight | Subtle glow pulse | 2s |
| Typing effect | Character-by-character reveal | 3s |
| Background gradients | Slow position shift | 20s |
| Floating icons | Gentle vertical bob (5px) | 3s |
| Category pills | Horizontal scroll loop | 20s |

### Hover Animations

| Element | Animation | Duration |
|---------|-----------|----------|
| Button text | Sweep reveal left-to-right | 300ms |
| Nav underline | Width expansion from left | 200ms |
| Card lift | TranslateY + shadow | 200ms |
| Social icons | Scale + color change | 150ms |
| Images | Subtle zoom (1.05x) | 300ms |

### Animation Timing Functions

```css
/* Recommended easing curves */
--ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);
--ease-out-quart: cubic-bezier(0.25, 1, 0.5, 1);
--ease-out-back: cubic-bezier(0.34, 1.56, 0.64, 1);
--ease-in-out-sine: cubic-bezier(0.37, 0, 0.63, 1);

/* Duration tokens */
--duration-instant: 100ms;
--duration-fast: 200ms;
--duration-normal: 300ms;
--duration-slow: 500ms;
--duration-slower: 800ms;
--duration-slowest: 1200ms;
```

### CSS Animation Keyframes

```css
/* Fade in and slide up */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Floating/bobbing effect */
@keyframes float {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-5px);
  }
}

/* Marquee scroll */
@keyframes marquee {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-50%);
  }
}

/* Counter animation (use JS for actual counting) */
@keyframes countUp {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Text sweep reveal */
@keyframes textSweep {
  from {
    clip-path: inset(0 100% 0 0);
  }
  to {
    clip-path: inset(0 0 0 0);
  }
}

/* Gentle pulse/glow */
@keyframes pulse {
  0%, 100% {
    box-shadow: 0 0 0 0 rgba(139, 92, 246, 0.2);
  }
  50% {
    box-shadow: 0 0 20px 5px rgba(139, 92, 246, 0.1);
  }
}

/* Rotation for partner logos */
@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
```

### Intersection Observer Setup (JavaScript)

```javascript
// Scroll-triggered animation setup
const observerOptions = {
  root: null,
  rootMargin: '0px 0px -100px 0px',
  threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate-in');

      // For counters
      if (entry.target.dataset.counter) {
        animateCounter(entry.target);
      }
    }
  });
}, observerOptions);

// Observe all animatable elements
document.querySelectorAll('[data-animate]').forEach(el => {
  observer.observe(el);
});

// Counter animation function
function animateCounter(element) {
  const target = parseInt(element.dataset.counter);
  const duration = 2000;
  const start = performance.now();

  function update(currentTime) {
    const elapsed = currentTime - start;
    const progress = Math.min(elapsed / duration, 1);
    const easeOut = 1 - Math.pow(1 - progress, 4);
    const current = Math.floor(easeOut * target);

    element.textContent = current;

    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }

  requestAnimationFrame(update);
}
```

---

## Responsive Behavior

### Breakpoints
```css
--breakpoint-sm: 640px;
--breakpoint-md: 768px;
--breakpoint-lg: 1024px;
--breakpoint-xl: 1280px;
--breakpoint-2xl: 1536px;
```

### Layout Changes

| Element | Desktop | Tablet | Mobile |
|---------|---------|--------|--------|
| Navigation | Full links | Hamburger | Hamburger |
| Hero heading | 64-80px | 48px | 36px |
| Step cards | 4 columns | 2 columns | 1 column (carousel) |
| Pricing cards | 3 columns | 3 columns | 1 column stacked |
| Founder cards | 3 columns | 3 columns | Carousel with arrows |
| Testimonials | Horizontal scroll | Horizontal scroll | Carousel with arrows |
| Footer links | 2 columns | 2 columns | 1 column |
| Bento grid | Complex grid | Simplified grid | Stacked |

### Mobile-Specific Patterns
- Carousels replace horizontal grids
- Previous/Next arrow buttons appear
- Touch-friendly tap targets (min 44px)
- Reduced animation complexity for performance
- Sticky mobile CTA bar (optional)

---

## Technical Implementation Notes

### Performance Considerations
1. Use `transform` and `opacity` for animations (GPU-accelerated)
2. Use `will-change` sparingly and only when needed
3. Implement lazy loading for images
4. Use Intersection Observer instead of scroll events
5. Debounce/throttle scroll-based calculations
6. Consider `prefers-reduced-motion` media query

### Accessibility
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

### Browser Support
- Backdrop-filter: Use fallback for older browsers
- CSS Grid: Well supported, include flexbox fallback
- Intersection Observer: Polyfill for IE11 if needed

### Recommended Libraries
- **AOS (Animate On Scroll)** - For scroll animations
- **GSAP** - For complex animations
- **Lenis** - For smooth scrolling
- **Swiper** - For carousels/sliders

### File Structure Suggestion
```
/css
  /base
    _reset.css
    _typography.css
    _variables.css
  /components
    _buttons.css
    _cards.css
    _navigation.css
    _forms.css
  /sections
    _hero.css
    _features.css
    _pricing.css
    _faq.css
    _footer.css
  /utilities
    _animations.css
    _spacing.css
    _responsive.css
  main.css

/js
  animations.js
  navigation.js
  counters.js
  main.js
```

---

## Screenshots Reference

The following screenshots were captured during analysis:
- `rescale-hero.png` - Hero section initial view
- `rescale-button-hover.png` - Button hover state with text animation
- `rescale-nav-menu.png` - Expanded navigation menu
- `rescale-pricing.png` - Pricing section (Monthly)
- `rescale-pricing-annual.png` - Pricing section (Annual toggle)
- `rescale-faq.png` - FAQ accordion expanded
- `rescale-mobile.png` - Mobile responsive view
- `rescale-scroll-1.png` - Dashboard mockup section
- `rescale-scroll-2.png` - Bento grid with animations
- `rescale-scroll-3.png` - How it Works step cards

---

## Advanced Nuances & Implementation Details

### Triple-Text DOM Pattern (Navigation Links)

Each navigation link uses a clever 3-paragraph structure for smooth text slide animations:

```html
<!-- Each nav link contains 3 identical text elements -->
<a href="#features" class="nav-link">
  <p class="text-visible">Features</p>   <!-- Default visible -->
  <p class="text-hover">Features</p>     <!-- Shown on hover -->
  <p class="text-hidden">Features</p>    <!-- Third for seamless loop -->
</a>
```

```css
.nav-link {
  display: block;
  overflow: hidden;
  height: 1.2em;
  position: relative;
}

.nav-link p {
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.nav-link:hover p {
  transform: translateY(-100%);  /* All paragraphs shift up */
}
```

**Why 3 texts?** The third text ensures seamless looping if the animation repeats, and provides fallback positioning for different animation states.

### Dual-Text Button Reveal Pattern

The "Buy Rescale" CTA button uses a dual-text reveal technique:

```html
<a href="#" class="buy-button">
  <div class="text-container">
    <p class="default-text">Buy Rescale</p>
    <p class="reveal-text">Buy for $99</p>
  </div>
</a>
```

```css
.buy-button {
  overflow: hidden;  /* Critical - clips the hidden text */
}

.text-container {
  display: flex;
  flex-direction: column;
  transition: transform 0.3s ease;
}

.buy-button:hover .text-container {
  transform: translateY(-50%);  /* Reveals price text */
}
```

This pattern:
1. Shows generic CTA ("Buy Rescale") by default
2. Reveals specific value ("Buy for $99") on hover
3. Creates curiosity and encourages interaction

### Typing Animation with Phrase Cycling

The hero section typing animation cycles between multiple phrases:

**Observed phrases:**
- "Ask AI anything..."
- "Searching...."

**Character-by-character DOM structure:**
```html
<p>
  <strong>
    <span><span>A</span><span>s</span><span>k</span></span>
    <span><span>A</span><span>I</span></span>
    <span><span>a</span><span>n</span><span>y</span><span>t</span><span>h</span><span>i</span><span>n</span><span>g</span><span>…</span></span>
  </strong>
</p>
```

**Implementation approach:**
```javascript
const phrases = [
  "Ask AI anything...",
  "Searching....",
  "Analyzing data...",
  "Generating insights..."
];

let phraseIndex = 0;
let charIndex = 0;

function typePhrase() {
  const currentPhrase = phrases[phraseIndex];

  if (charIndex < currentPhrase.length) {
    // Add next character
    element.textContent += currentPhrase[charIndex];
    charIndex++;
    setTimeout(typePhrase, 80);  // Typing speed
  } else {
    // Pause, then clear and start next phrase
    setTimeout(() => {
      element.textContent = '';
      charIndex = 0;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      typePhrase();
    }, 2000);  // Pause between phrases
  }
}
```

### Partner Circle Rotating Text

The partner logo component features rotating text around a circular badge:

```
✦ INSTANTLY ✦ CONNECTED GROWTH PARTNERS
```

**Implementation:**
```html
<div class="partner-circle">
  <svg class="rotating-text" viewBox="0 0 200 200">
    <defs>
      <path id="circlePath" d="M100,100 m-80,0 a80,80 0 1,1 160,0 a80,80 0 1,1 -160,0"/>
    </defs>
    <text>
      <textPath href="#circlePath">✦ INSTANTLY ✦ CONNECTED GROWTH PARTNERS</textPath>
    </text>
  </svg>
  <div class="logo-grid">
    <!-- Partner logos in center -->
  </div>
</div>
```

```css
.rotating-text {
  animation: rotate 60s linear infinite;
  position: absolute;
  width: 100%;
  height: 100%;
}

@keyframes rotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
```

### Testimonial Carousel Infinite Loop

The testimonial section uses **16 items per list** (original 8 duplicated) for seamless infinite scrolling:

```html
<ul class="testimonial-track">
  <!-- Original 8 testimonials -->
  <li>...</li>
  <li>...</li>
  ...
  <!-- Duplicated 8 testimonials for seamless loop -->
  <li>...</li>  <!-- Same as first -->
  <li>...</li>  <!-- Same as second -->
  ...
</ul>
```

```css
.testimonial-track {
  display: flex;
  gap: 24px;
  animation: scroll-left 40s linear infinite;
}

@keyframes scroll-left {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }  /* Move exactly half (to duplicate start) */
}
```

**Key insight:** When using `-50%` translation, the duplicated items seamlessly continue where originals end.

### Footer Marquee Triplication

The footer marquee contains **60 items** (original 10 items tripled) for ultra-smooth scrolling:

**Feature keywords:**
- Predictive Analysis
- Business Growth
- Smart Automation
- Strategic Planning
- AI Intelligence
- Performance Optimization
- Seamless Integration
- Future-Proof Innovation
- Advanced Analytics
- 98% Success Rate

```css
.footer-marquee {
  display: flex;
  gap: 48px;
  animation: marquee 30s linear infinite;
}

/* Triple the content for smoothest loop */
.footer-marquee::after,
.footer-marquee::before {
  content: attr(data-items);  /* Or use JS to clone */
}
```

### Hero Heading Color Scheme

The hero uses a specific color scheme for visual hierarchy:

| Text | Color | RGB Value | Purpose |
|------|-------|-----------|---------|
| "mplify" | Dark blue-gray | rgb(70, 84, 120) | Base text |
| "your growth" | Purple accent | rgb(117, 132, 214) | Highlighted phrase |
| "with" | Dark blue-gray | rgb(70, 84, 120) | Base text |
| "Smart AI" | Gradient/accent | Animated glow | Key feature callout |

```css
.hero-text-base {
  color: rgb(70, 84, 120);
}

.hero-text-accent {
  color: rgb(117, 132, 214);
  font-style: italic;
}

.hero-text-highlight {
  background: linear-gradient(135deg, #8b5cf6, #3b82f6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
```

### Photo Gallery Stacking Effect

The "Life at Rescale" section uses 4+ overlapping photos with a fan/stack layout:

```css
.photo-stack {
  position: relative;
  width: 300px;
  height: 400px;
}

.photo-stack img {
  position: absolute;
  border-radius: 16px;
  box-shadow: 0 10px 40px rgba(0,0,0,0.15);
  transition: transform 0.4s ease;
}

.photo-stack img:nth-child(1) { transform: rotate(-5deg); z-index: 4; }
.photo-stack img:nth-child(2) { transform: rotate(3deg) translateX(20px); z-index: 3; }
.photo-stack img:nth-child(3) { transform: rotate(-2deg) translateX(40px); z-index: 2; }
.photo-stack img:nth-child(4) { transform: rotate(4deg) translateX(60px); z-index: 1; }

.photo-stack:hover img {
  /* Fan out on hover */
  transform: rotate(0deg) translateX(calc(var(--index) * 80px));
}
```

### Scarcity/Urgency Indicators

The final CTA section uses psychological triggers:

```html
<section class="final-cta">
  <h1>Ready? Let's Talk!</h1>
  <p>Get expert insights and answers...</p>
  <button>Book a Call</button>
  <span class="urgency-text">2 spots available</span>  <!-- Creates FOMO -->
</section>
```

```css
.urgency-text {
  font-size: 14px;
  color: var(--color-text-secondary);
  margin-top: 12px;
  opacity: 0.8;
}
```

### Promotional Notification Badge

A floating "New Template!" badge appears at the top:

```html
<div class="promo-badge">
  <span>New Template!</span>
  <a href="#">Preview</a>
</div>
```

```css
.promo-badge {
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 9999px;
  padding: 8px 16px;
  font-size: 14px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  animation: slideDown 0.5s ease-out;
}
```

### Performance Counter Target Values

The stat counters animate to these specific values:

| Metric | Target Value | Suffix |
|--------|--------------|--------|
| Campaigns Launched | 25 | K+ |
| Active Platform Users | 180 | K |
| AI Insights Generated | 500 | K |
| Global Engagement | 85 | K |
| Customer Satisfaction | 98 | % |
| Strategic Solutions | 12 | K |

### Bento Grid Counter Targets

| Metric | Target Value |
|--------|--------------|
| Growth | 73% |
| Sales | 41% |
| Efficiency | 89% |
| System Reliability | 99% |

### Element Animation Statistics

Analysis revealed:
- **3,345 elements** with CSS transitions
- **Transition timing:** Primarily `opacity 0.2s ease-in-out`
- IntersectionObserver API used for scroll triggering
- GPU-accelerated transforms throughout

### FAQ Accordion Answer Color

When expanded, FAQ answers use a distinctive purple color:

```css
.faq-answer {
  color: var(--color-primary-600);  /* #7c3aed */
  padding: 0 24px 20px;
  line-height: 1.6;
}
```

---

## Summary

The Rescale website exemplifies modern SaaS design with:

1. **Clean, spacious layouts** that let content breathe
2. **Consistent visual language** with purple accents and glassmorphism
3. **Thoughtful micro-interactions** that enhance without overwhelming
4. **Performance-conscious animations** using transforms and opacity
5. **Strong typography hierarchy** with editorial serif accents
6. **Responsive design** that gracefully adapts across devices

### Key Implementation Takeaways

**Animation Philosophy:**
- 3,345+ elements have transitions - the site feels alive at every touchpoint
- GPU-accelerated properties only (transform, opacity) for smooth 60fps
- IntersectionObserver for scroll-triggered reveals
- Duplicated/tripled content for seamless infinite loops

**Clever DOM Patterns:**
- Triple-text technique for nav link hover animations
- Dual-text buttons for reveal interactions
- Character-by-character spans for typing effects
- Stacked photos with CSS transforms for gallery effects

**Psychological Design Elements:**
- Scarcity indicators ("2 spots available")
- Social proof counters that animate when viewed
- Rotating partner badges for credibility
- Promotional notification badges for urgency

**The Secret Sauce:**
The magic is in the *layering* of subtle effects. No single animation is dramatic, but the combination of:
- Floating icons
- Counter animations
- Marquee scrolls
- Hover reveals
- Staggered fade-ins
- Parallax backgrounds

...creates an experience that feels premium and polished. Each interaction rewards the user with a micro-delight.

**Replication Priority:**
1. Get the spacing and typography right first
2. Implement scroll-triggered fade-ins
3. Add the counter animations
4. Layer in hover effects
5. Add infinite scroll marquees
6. Polish with floating/bobbing animations

The key to replicating this design is attention to detail in spacing, subtle animations, and the overall polish of interactions. Focus on making the experience feel "alive" without being distracting.
