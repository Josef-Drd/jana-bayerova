# Landing Page Template

Principy a postupy pro single-page landing pages.

---

## Quick Start

### 1. Získat od klienta

| Kategorie | Položky | Formát |
|-----------|---------|--------|
| Brand | Logo | SVG (preferovaně) nebo PNG s průhledností |
| Brand | Barevná paleta | HEX kódy nebo reference |
| Brand | Fonty | Název fontu nebo preference (serif/sans-serif) |
| Obsah | Texty | Nadpisy, popisy, CTA texty |
| Obsah | Fotografie | Min. 1920px šířka, originály |
| Kontakt | Údaje | Email, telefon, adresa, sociální sítě |
| Právní | GDPR | Text souhlasu, odkaz na podmínky |

### 2. Definovat sekce

| Sekce | Účel | Povinná |
|-------|------|---------|
| Hero | První dojem, hlavní CTA | Ano |
| O nás/mně | Představení, příběh | Ano |
| Služby/Portfolio | Co nabízím | Ano |
| Hodnoty/Filozofie | Proč zrovna já | Ne |
| Reference | Sociální důkaz | Ne |
| Poptávka/Kontakt | Konverze | Ano |

### 3. Struktura projektu

```
projekt/
├── index.html
├── 404.html
├── styles.css
├── script.js
├── robots.txt
├── sitemap.xml
├── favicon.svg
├── og-image.jpg
├── vercel.json
└── assets/
    ├── fonts/
    └── images/
```

---

## HTML

### Základní šablona

```html
<!DOCTYPE html>
<html lang="cs">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    
    <!-- SEO -->
    <title>{Název} | {Tagline}</title>
    <meta name="description" content="{Popis 150-160 znaků}">
    <link rel="canonical" href="{URL}">
    
    <!-- Open Graph -->
    <meta property="og:type" content="website">
    <meta property="og:url" content="{URL}">
    <meta property="og:title" content="{Název}">
    <meta property="og:description" content="{Popis}">
    <meta property="og:image" content="{URL}/og-image.jpg">
    <meta property="og:locale" content="cs_CZ">
    
    <!-- Favicon -->
    <link rel="icon" href="/favicon.svg" type="image/svg+xml">
    
    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link rel="preload" href="/assets/fonts/{font}.woff2" as="font" type="font/woff2" crossorigin>
    
    <!-- Styles -->
    <link rel="stylesheet" href="/styles.css">
</head>
<body>
    <a href="#main" class="skip-link">Přeskočit na obsah</a>
    
    <header class="header" role="banner">
        <nav class="nav" aria-label="Hlavní navigace">
            <!-- Logo + navigation -->
        </nav>
    </header>
    
    <main id="main" role="main">
        <section class="hero" aria-labelledby="hero-title">
            <h1 id="hero-title">{Hlavní nadpis}</h1>
        </section>
        
        <section id="{sekce}" class="section" aria-labelledby="{sekce}-title">
            <h2 id="{sekce}-title">{Nadpis sekce}</h2>
        </section>
    </main>
    
    <footer class="footer" role="contentinfo">
        <!-- Footer content -->
    </footer>
    
    <script src="/script.js" defer></script>
</body>
</html>
```

### Strukturovaná data

```html
<script type="application/ld+json">
{
    "@context": "https://schema.org",
    "@type": "{Person|LocalBusiness|Organization}",
    "name": "{Název}",
    "description": "{Popis}",
    "url": "{URL}",
    "image": "{URL}/og-image.jpg",
    "telephone": "{Telefon}",
    "email": "{Email}",
    "address": {
        "@type": "PostalAddress",
        "streetAddress": "{Ulice}",
        "addressLocality": "{Město}",
        "postalCode": "{PSČ}",
        "addressCountry": "CZ"
    },
    "sameAs": [
        "{Instagram URL}",
        "{Facebook URL}"
    ]
}
</script>
```

---

## CSS

### Design tokeny

```css
:root {
    /* === COLORS === */
    --color-primary: ;
    --color-primary-dark: ;
    --color-primary-light: ;
    
    --color-background: ;
    --color-surface: ;
    --color-surface-elevated: ;
    
    --color-text: ;
    --color-text-muted: ;
    --color-text-inverse: ;
    
    --color-border: ;
    --color-focus: ;
    --color-error: #DC2626;
    --color-success: #16A34A;
    
    /* === TYPOGRAPHY === */
    --font-display: ;
    --font-body: system-ui, -apple-system, sans-serif;
    
    --text-xs: clamp(0.75rem, 0.7rem + 0.25vw, 0.875rem);
    --text-sm: clamp(0.875rem, 0.8rem + 0.375vw, 1rem);
    --text-base: clamp(1rem, 0.9rem + 0.5vw, 1.125rem);
    --text-lg: clamp(1.125rem, 1rem + 0.625vw, 1.25rem);
    --text-xl: clamp(1.25rem, 1rem + 1.25vw, 1.75rem);
    --text-2xl: clamp(1.5rem, 1.25rem + 1.25vw, 2rem);
    --text-3xl: clamp(1.875rem, 1.5rem + 1.875vw, 2.5rem);
    --text-4xl: clamp(2.25rem, 1.75rem + 2.5vw, 3.5rem);
    
    --leading-tight: 1.2;
    --leading-normal: 1.5;
    --leading-relaxed: 1.75;
    
    /* === SPACING === */
    --space-xs: 0.25rem;
    --space-sm: 0.5rem;
    --space-md: 1rem;
    --space-lg: 1.5rem;
    --space-xl: 2rem;
    --space-2xl: 3rem;
    --space-3xl: 4rem;
    --space-section: clamp(4rem, 3rem + 5vw, 8rem);
    
    /* === LAYOUT === */
    --container-sm: 40rem;
    --container-md: 64rem;
    --container-lg: 80rem;
    --container-padding: clamp(1rem, 0.5rem + 2.5vw, 2rem);
    
    /* === EFFECTS === */
    --radius-sm: 0.25rem;
    --radius-md: 0.5rem;
    --radius-lg: 1rem;
    --radius-full: 9999px;
    
    --shadow-sm: 0 1px 2px rgb(0 0 0 / 0.05);
    --shadow-md: 0 4px 6px rgb(0 0 0 / 0.07);
    --shadow-lg: 0 10px 15px rgb(0 0 0 / 0.1);
    
    --transition-fast: 150ms ease;
    --transition-base: 300ms ease;
    --transition-slow: 500ms ease;
    
    /* === Z-INDEX === */
    --z-dropdown: 100;
    --z-sticky: 200;
    --z-fixed: 300;
    --z-modal: 400;
    --z-tooltip: 500;
}

@media (prefers-reduced-motion: reduce) {
    :root {
        --transition-fast: 0ms;
        --transition-base: 0ms;
        --transition-slow: 0ms;
    }
}
```

### Reset a základ

```css
*,
*::before,
*::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

html {
    scroll-behavior: smooth;
    -webkit-text-size-adjust: 100%;
}

@media (prefers-reduced-motion: reduce) {
    html {
        scroll-behavior: auto;
    }
}

body {
    font-family: var(--font-body);
    font-size: var(--text-base);
    line-height: var(--leading-normal);
    color: var(--color-text);
    background-color: var(--color-background);
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}

img,
picture,
video,
svg {
    display: block;
    max-width: 100%;
    height: auto;
}

button,
input,
select,
textarea {
    font: inherit;
    color: inherit;
}

a {
    color: inherit;
    text-decoration: none;
}

:focus-visible {
    outline: 2px solid var(--color-focus);
    outline-offset: 2px;
}

::selection {
    background-color: var(--color-primary);
    color: var(--color-text-inverse);
}
```

### Utility třídy

```css
.skip-link {
    position: absolute;
    top: -100%;
    left: var(--space-md);
    z-index: var(--z-tooltip);
    padding: var(--space-sm) var(--space-md);
    background-color: var(--color-surface);
    border-radius: var(--radius-md);
    transition: top var(--transition-fast);
}

.skip-link:focus {
    top: var(--space-md);
}

.container {
    width: 100%;
    max-width: var(--container-lg);
    margin-inline: auto;
    padding-inline: var(--container-padding);
}

.container--narrow {
    max-width: var(--container-md);
}

.section {
    padding-block: var(--space-section);
}

.visually-hidden {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
}
```

### Breakpointy

```css
/* Mobile first - default */

/* Tablet */
@media (min-width: 48rem) { }

/* Desktop */
@media (min-width: 64rem) { }

/* Large desktop */
@media (min-width: 80rem) { }
```

### Print

```css
@media print {
    *,
    *::before,
    *::after {
        background: transparent !important;
        color: #000 !important;
        box-shadow: none !important;
    }
    
    .header,
    .nav-mobile,
    .skip-link,
    form,
    button {
        display: none !important;
    }
    
    a[href]::after {
        content: " (" attr(href) ")";
    }
    
    img {
        max-width: 100% !important;
        page-break-inside: avoid;
    }
    
    h1, h2, h3 {
        page-break-after: avoid;
    }
}
```

---

## JavaScript

### Architektura

```javascript
(function() {
    'use strict';
    
    const CONFIG = {
        selectors: {
            header: '[data-header]',
            navToggle: '[data-nav-toggle]',
            navMobile: '[data-nav-mobile]',
            navLinks: '[data-nav-link]',
            reveal: '[data-reveal]',
            form: '[data-form]'
        },
        classes: {
            active: 'is-active',
            visible: 'is-visible',
            scrolled: 'is-scrolled',
            loading: 'is-loading',
            error: 'is-error',
            success: 'is-success'
        },
        thresholds: {
            scroll: 50,
            reveal: 0.15
        }
    };
    
    // Controllers here...
    
    function init() {
        HeaderController.init();
        MobileNavController.init();
        SmoothScrollController.init();
        RevealController.init();
        FormController.init();
    }
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
```

### Header Controller

```javascript
const HeaderController = {
    element: null,
    scrollThreshold: CONFIG.thresholds.scroll,
    
    init() {
        this.element = document.querySelector(CONFIG.selectors.header);
        if (!this.element) return;
        
        this.handleScroll = this.handleScroll.bind(this);
        window.addEventListener('scroll', this.handleScroll, { passive: true });
        this.handleScroll();
    },
    
    handleScroll() {
        const isScrolled = window.scrollY > this.scrollThreshold;
        this.element.classList.toggle(CONFIG.classes.scrolled, isScrolled);
    }
};
```

### Mobile Nav Controller

```javascript
const MobileNavController = {
    toggle: null,
    nav: null,
    links: null,
    isOpen: false,
    
    init() {
        this.toggle = document.querySelector(CONFIG.selectors.navToggle);
        this.nav = document.querySelector(CONFIG.selectors.navMobile);
        this.links = document.querySelectorAll(`${CONFIG.selectors.navMobile} ${CONFIG.selectors.navLinks}`);
        
        if (!this.toggle || !this.nav) return;
        
        this.toggle.addEventListener('click', () => this.toggleNav());
        this.links.forEach(link => {
            link.addEventListener('click', () => this.closeNav());
        });
        
        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' && this.isOpen) {
                this.closeNav();
                this.toggle.focus();
            }
        });
    },
    
    toggleNav() {
        this.isOpen = !this.isOpen;
        this.toggle.setAttribute('aria-expanded', this.isOpen);
        this.nav.classList.toggle(CONFIG.classes.active, this.isOpen);
        document.body.style.overflow = this.isOpen ? 'hidden' : '';
    },
    
    closeNav() {
        this.isOpen = false;
        this.toggle.setAttribute('aria-expanded', false);
        this.nav.classList.remove(CONFIG.classes.active);
        document.body.style.overflow = '';
    }
};
```

### Smooth Scroll Controller

```javascript
const SmoothScrollController = {
    init() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (event) => this.handleClick(event, anchor));
        });
    },
    
    handleClick(event, anchor) {
        const targetId = anchor.getAttribute('href');
        if (targetId === '#') return;
        
        const target = document.querySelector(targetId);
        if (!target) return;
        
        event.preventDefault();
        
        const header = document.querySelector(CONFIG.selectors.header);
        const headerHeight = header ? header.offsetHeight : 0;
        const targetPosition = target.getBoundingClientRect().top + window.scrollY - headerHeight;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
        
        target.focus({ preventScroll: true });
    }
};
```

### Reveal Controller

```javascript
const RevealController = {
    observer: null,
    
    init() {
        if (!('IntersectionObserver' in window)) {
            this.showAllElements();
            return;
        }
        
        this.observer = new IntersectionObserver(
            (entries) => this.handleIntersection(entries),
            { threshold: CONFIG.thresholds.reveal, rootMargin: '0px 0px -50px 0px' }
        );
        
        document.querySelectorAll(CONFIG.selectors.reveal).forEach(element => {
            this.observer.observe(element);
        });
    },
    
    handleIntersection(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add(CONFIG.classes.visible);
                this.observer.unobserve(entry.target);
            }
        });
    },
    
    showAllElements() {
        document.querySelectorAll(CONFIG.selectors.reveal).forEach(element => {
            element.classList.add(CONFIG.classes.visible);
        });
    }
};
```

### Form Controller

```javascript
const FormController = {
    form: null,
    submitButton: null,
    statusElement: null,
    
    init() {
        this.form = document.querySelector(CONFIG.selectors.form);
        if (!this.form) return;
        
        this.submitButton = this.form.querySelector('button[type="submit"]');
        this.statusElement = this.form.querySelector('[data-form-status]');
        
        this.form.addEventListener('submit', (event) => this.handleSubmit(event));
        this.form.querySelectorAll('input, textarea, select').forEach(field => {
            field.addEventListener('blur', () => this.validateField(field));
            field.addEventListener('input', () => this.clearFieldError(field));
        });
    },
    
    async handleSubmit(event) {
        event.preventDefault();
        
        if (!this.validateForm()) return;
        
        this.setLoadingState(true);
        
        try {
            const response = await fetch(this.form.action, {
                method: 'POST',
                body: new FormData(this.form),
                headers: { 'Accept': 'application/json' }
            });
            
            if (response.ok) {
                this.handleSuccess();
            } else {
                throw new Error('Odeslání selhalo');
            }
        } catch (error) {
            this.handleError(error);
        } finally {
            this.setLoadingState(false);
        }
    },
    
    validateForm() {
        let isValid = true;
        this.form.querySelectorAll('[required]').forEach(field => {
            if (!this.validateField(field)) {
                isValid = false;
            }
        });
        return isValid;
    },
    
    validateField(field) {
        const errorElement = field.parentElement.querySelector('[data-field-error]');
        let errorMessage = '';
        
        if (field.required && !field.value.trim()) {
            errorMessage = 'Toto pole je povinné';
        } else if (field.type === 'email' && field.value && !this.isValidEmail(field.value)) {
            errorMessage = 'Zadejte platný email';
        }
        
        if (errorMessage) {
            field.classList.add(CONFIG.classes.error);
            if (errorElement) errorElement.textContent = errorMessage;
            return false;
        }
        
        this.clearFieldError(field);
        return true;
    },
    
    clearFieldError(field) {
        field.classList.remove(CONFIG.classes.error);
        const errorElement = field.parentElement.querySelector('[data-field-error]');
        if (errorElement) errorElement.textContent = '';
    },
    
    isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    },
    
    setLoadingState(isLoading) {
        this.submitButton.disabled = isLoading;
        this.form.classList.toggle(CONFIG.classes.loading, isLoading);
    },
    
    handleSuccess() {
        this.form.reset();
        this.form.classList.add(CONFIG.classes.success);
        if (this.statusElement) {
            this.statusElement.textContent = 'Děkujeme! Brzy se ozveme.';
        }
    },
    
    handleError(error) {
        this.form.classList.add(CONFIG.classes.error);
        if (this.statusElement) {
            this.statusElement.textContent = 'Něco se pokazilo. Zkuste to prosím znovu.';
        }
    }
};
```

---

## Formulář

### HTML struktura

```html
<form 
    data-form 
    action="https://formspree.io/f/{ID}" 
    method="POST" 
    novalidate
>
    <!-- Honeypot - spam protection -->
    <input type="text" name="_gotcha" tabindex="-1" autocomplete="off" class="visually-hidden">
    
    <div class="form__group">
        <label for="name" class="form__label">
            Jméno <span aria-hidden="true">*</span>
        </label>
        <input 
            type="text" 
            id="name" 
            name="name" 
            required 
            autocomplete="name"
            class="form__input"
        >
        <span data-field-error class="form__error" aria-live="polite"></span>
    </div>
    
    <div class="form__group">
        <label for="email" class="form__label">
            Email <span aria-hidden="true">*</span>
        </label>
        <input 
            type="email" 
            id="email" 
            name="email" 
            required 
            autocomplete="email"
            class="form__input"
        >
        <span data-field-error class="form__error" aria-live="polite"></span>
    </div>
    
    <div class="form__group">
        <label for="phone" class="form__label">Telefon</label>
        <input 
            type="tel" 
            id="phone" 
            name="phone" 
            autocomplete="tel"
            class="form__input"
        >
    </div>
    
    <div class="form__group">
        <label for="message" class="form__label">
            Zpráva <span aria-hidden="true">*</span>
        </label>
        <textarea 
            id="message" 
            name="message" 
            rows="5" 
            required
            class="form__textarea"
        ></textarea>
        <span data-field-error class="form__error" aria-live="polite"></span>
    </div>
    
    <div class="form__group">
        <label class="form__checkbox">
            <input type="checkbox" name="gdpr" required>
            <span>
                Souhlasím se <a href="/gdpr" target="_blank">zpracováním osobních údajů</a> 
                <span aria-hidden="true">*</span>
            </span>
        </label>
        <span data-field-error class="form__error" aria-live="polite"></span>
    </div>
    
    <button type="submit" class="button button--primary">
        <span>Odeslat</span>
    </button>
    
    <div data-form-status class="form__status" role="status" aria-live="polite"></div>
</form>
```

### CSS formuláře

```css
.form__group {
    margin-bottom: var(--space-lg);
}

.form__label {
    display: block;
    margin-bottom: var(--space-xs);
    font-weight: 500;
}

.form__input,
.form__textarea,
.form__select {
    width: 100%;
    padding: var(--space-sm) var(--space-md);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    background-color: var(--color-surface);
    transition: border-color var(--transition-fast), box-shadow var(--transition-fast);
}

.form__input:focus,
.form__textarea:focus,
.form__select:focus {
    border-color: var(--color-primary);
    box-shadow: 0 0 0 3px rgb(var(--color-primary-rgb) / 0.15);
    outline: none;
}

.form__input.is-error,
.form__textarea.is-error {
    border-color: var(--color-error);
}

.form__error {
    display: block;
    margin-top: var(--space-xs);
    font-size: var(--text-sm);
    color: var(--color-error);
}

.form__checkbox {
    display: flex;
    gap: var(--space-sm);
    align-items: flex-start;
    cursor: pointer;
}

.form__checkbox input {
    flex-shrink: 0;
    width: 1.25rem;
    height: 1.25rem;
    margin-top: 0.125rem;
    accent-color: var(--color-primary);
}

.form__status {
    margin-top: var(--space-lg);
    padding: var(--space-md);
    border-radius: var(--radius-md);
}

.form__status:empty {
    display: none;
}

.form.is-success .form__status {
    background-color: rgb(22 163 74 / 0.1);
    color: var(--color-success);
}

.form.is-error .form__status {
    background-color: rgb(220 38 38 / 0.1);
    color: var(--color-error);
}

.form.is-loading button[type="submit"] {
    opacity: 0.7;
    cursor: wait;
}
```

---

## Konfigurace

### robots.txt

```
User-agent: *
Allow: /

Sitemap: {URL}/sitemap.xml
```

### sitemap.xml

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
        <loc>{URL}</loc>
        <lastmod>{YYYY-MM-DD}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>1.0</priority>
    </url>
</urlset>
```

### vercel.json

```json
{
    "cleanUrls": true,
    "trailingSlash": false,
    "headers": [
        {
            "source": "/(.*)",
            "headers": [
                {
                    "key": "X-Content-Type-Options",
                    "value": "nosniff"
                },
                {
                    "key": "X-Frame-Options",
                    "value": "DENY"
                },
                {
                    "key": "X-XSS-Protection",
                    "value": "1; mode=block"
                },
                {
                    "key": "Referrer-Policy",
                    "value": "strict-origin-when-cross-origin"
                }
            ]
        },
        {
            "source": "/assets/(.*)",
            "headers": [
                {
                    "key": "Cache-Control",
                    "value": "public, max-age=31536000, immutable"
                }
            ]
        }
    ]
}
```

### 404.html

```html
<!DOCTYPE html>
<html lang="cs">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Stránka nenalezena | {Název}</title>
    <meta name="robots" content="noindex">
    <link rel="stylesheet" href="/styles.css">
</head>
<body>
    <main class="error-page">
        <h1>404</h1>
        <p>Omlouváme se, tato stránka neexistuje.</p>
        <a href="/" class="button button--primary">Zpět na úvod</a>
    </main>
</body>
</html>
```

---

## Obrázky

### Picture element

```html
<picture>
    <source 
        srcset="/assets/images/{name}.avif" 
        type="image/avif"
    >
    <source 
        srcset="/assets/images/{name}.webp" 
        type="image/webp"
    >
    <img 
        src="/assets/images/{name}.jpg" 
        alt="{Popis obrázku}"
        width="{šířka}"
        height="{výška}"
        loading="lazy"
        decoding="async"
    >
</picture>
```

### Responsive images

```html
<img 
    src="/assets/images/{name}-800.jpg"
    srcset="
        /assets/images/{name}-400.jpg 400w,
        /assets/images/{name}-800.jpg 800w,
        /assets/images/{name}-1200.jpg 1200w,
        /assets/images/{name}-1600.jpg 1600w
    "
    sizes="(max-width: 48rem) 100vw, 50vw"
    alt="{Popis}"
    loading="lazy"
    decoding="async"
>
```

### Optimalizace

| Formát | Použití | Kvalita |
|--------|---------|---------|
| AVIF | Primární (pokud podporováno) | 60-70 |
| WebP | Fallback | 75-80 |
| JPEG | Univerzální fallback | 80-85 |

---

## Checklist

### Před vývojem

- [ ] Logo a barevná paleta
- [ ] Texty (alespoň draft)
- [ ] Fotografie (originály)
- [ ] Struktura sekcí schválená
- [ ] Backend pro formulář (Formspree ID)

### HTML

- [ ] `<!DOCTYPE html>`
- [ ] `<html lang="cs">`
- [ ] `<meta charset="UTF-8">`
- [ ] `<meta name="viewport">`
- [ ] `<title>` unikátní, max 60 znaků
- [ ] `<meta name="description">` 150-160 znaků
- [ ] `<link rel="canonical">`
- [ ] Open Graph meta tagy
- [ ] Structured data (JSON-LD)
- [ ] Favicon SVG
- [ ] Skip link
- [ ] Jeden `<h1>`, logická hierarchie
- [ ] `alt` texty u všech obrázků
- [ ] ARIA atributy kde potřeba
- [ ] `loading="lazy"` na obrázky pod foldem

### CSS

- [ ] Design tokeny definované
- [ ] Mobile-first breakpointy
- [ ] `:focus-visible` styly
- [ ] `prefers-reduced-motion` respektováno
- [ ] Print styles
- [ ] Kontrast min. 4.5:1

### JavaScript

- [ ] Graceful degradation (IntersectionObserver)
- [ ] Escape zavře modály
- [ ] Formulář validace + feedback
- [ ] No console.log v produkci

### Performance

- [ ] Obrázky: AVIF/WebP + responsive
- [ ] Fonty: preload + font-display: swap
- [ ] CSS/JS: minifikované
- [ ] Lighthouse Performance > 90

### SEO

- [ ] robots.txt
- [ ] sitemap.xml
- [ ] Structured data validní
- [ ] Canonical URL správná

### Před spuštěním

- [ ] Lighthouse audit > 90 (všechny kategorie)
- [ ] Test na reálném mobilu
- [ ] Formulář end-to-end test
- [ ] HTTPS aktivní
- [ ] Custom doména nastavená
- [ ] Analytics nastavené

---

## Příklady struktur

### Umělkyně / Fotografka

| # | Sekce | Obsah |
|---|-------|-------|
| 1 | Hero | Jméno, tagline, hlavní foto |
| 2 | O mně | Příběh, portrét |
| 3 | Portfolio | Galerie (grid/masonry) |
| 4 | Služby | Typy focení, ceny |
| 5 | Reference | Citace klientů |
| 6 | Poptávka | Formulář |
| 7 | Kontakt | Údaje, sociální sítě |

### Lokální byznys

| # | Sekce | Obsah |
|---|-------|-------|
| 1 | Hero | Název, lokace, CTA |
| 2 | O nás | Příběh, hodnoty |
| 3 | Produkty/Služby | Co nabízíme |
| 4 | Proč my | Výhody, USP |
| 5 | Reference | Recenze |
| 6 | Kontakt | Adresa, mapa, hodiny |

### Osobní stránka

| # | Sekce | Obsah |
|---|-------|-------|
| 1 | Hero | Jméno, role |
| 2 | O mně | Bio |
| 3 | Projekty | Portfolio |
| 4 | Zkušenosti | Timeline |
| 5 | Kontakt | Formulář, odkazy |

---

*v2.0 | Leden 2026*
