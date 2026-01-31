(function() {
    'use strict';

    const CONFIG = {
        selectors: {
            header: '[data-header]',
            navToggle: '[data-nav-toggle]',
            navMobile: '[data-nav-mobile]',
            navLinks: '[data-nav-link]',
            gallery: '[data-gallery]',
            galleryItem: '.gallery__item',
            galleryExpand: '[data-gallery-expand]',
            lightboxTrigger: '[data-lightbox-trigger]',
            lightbox: '[data-lightbox]',
            lightboxImage: '[data-lightbox-image]',
            lightboxCaption: '[data-lightbox-caption]',
            lightboxClose: '[data-lightbox-close]',
            lightboxPrev: '[data-lightbox-prev]',
            lightboxNext: '[data-lightbox-next]',
            filter: '[data-filter]',
            reveal: '[data-reveal]',
            form: '[data-form]',
            langToggle: '[data-lang-toggle]',
            langCurrent: '[data-lang-current]',
            i18n: '[data-i18n]',
            i18nPlaceholder: '[data-i18n-placeholder]',
            currentYear: '[data-current-year]'
        },
        classes: {
            active: 'is-active',
            visible: 'is-visible',
            scrolled: 'is-scrolled',
            loading: 'is-loading',
            error: 'is-error',
            success: 'is-success',
            hidden: 'is-hidden',
            expanded: 'is-expanded'
        },
        thresholds: {
            scroll: 50,
            reveal: 0.15
        },
        storage: {
            langKey: 'jana-bayerova-lang'
        },
        defaultLang: 'cs',
        supportedLangs: ['cs', 'en']
    };

    let translations = {};
    let currentLang = CONFIG.defaultLang;

    async function loadTranslations(lang) {
        try {
            const response = await fetch(`./i18n/${lang}.json`);
            if (!response.ok) throw new Error('Translation file not found');
            return await response.json();
        } catch (error) {
            console.error(`Failed to load translations for ${lang}:`, error);
            return null;
        }
    }

    async function initTranslations() {
        const loadPromises = CONFIG.supportedLangs.map(async (lang) => {
            const data = await loadTranslations(lang);
            if (data) translations[lang] = data;
        });
        await Promise.all(loadPromises);
    }

    function getTranslation(key) {
        return translations[currentLang]?.[key] || translations[CONFIG.defaultLang]?.[key] || key;
    }

    const HeaderController = {
        element: null,

        init() {
            this.element = document.querySelector(CONFIG.selectors.header);
            if (!this.element) return;

            this.handleScroll = this.handleScroll.bind(this);
            window.addEventListener('scroll', this.handleScroll, { passive: true });
            this.handleScroll();
        },

        handleScroll() {
            const isScrolled = window.scrollY > CONFIG.thresholds.scroll;
            this.element.classList.toggle(CONFIG.classes.scrolled, isScrolled);
        }
    };

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
            this.links.forEach(link => link.addEventListener('click', () => this.closeNav()));

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
            const targetPosition = target.getBoundingClientRect().top + window.scrollY - headerHeight - 20;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    };

    const GalleryFilterController = {
        filters: [],
        items: [],
        currentFilter: 'all',

        init() {
            this.filters = Array.from(document.querySelectorAll(CONFIG.selectors.filter));
            this.items = Array.from(document.querySelectorAll(CONFIG.selectors.galleryItem));

            if (this.filters.length === 0 || this.items.length === 0) return;

            this.filters.forEach(filter => {
                filter.addEventListener('click', () => this.setFilter(filter));
            });
        },

        setFilter(filterButton) {
            const category = filterButton.dataset.filter;
            if (category === this.currentFilter) return;

            this.currentFilter = category;

            this.filters.forEach(f => f.classList.remove(CONFIG.classes.active));
            filterButton.classList.add(CONFIG.classes.active);

            this.items.forEach(item => {
                const itemCategory = item.dataset.category;
                const shouldShow = category === 'all' || itemCategory === category;
                item.classList.toggle(CONFIG.classes.hidden, !shouldShow);
            });

            GalleryExpandController.updateButtonVisibility();
        }
    };

    const GalleryExpandController = {
        gallery: null,
        expandButton: null,
        isExpanded: false,

        init() {
            this.gallery = document.querySelector(CONFIG.selectors.gallery);
            this.expandButton = document.querySelector(CONFIG.selectors.galleryExpand);

            if (!this.gallery || !this.expandButton) return;

            this.expandButton.addEventListener('click', () => this.toggle());
            window.addEventListener('resize', () => this.updateButtonVisibility());
            this.updateButtonVisibility();
        },

        toggle() {
            this.isExpanded = !this.isExpanded;
            this.gallery.classList.toggle(CONFIG.classes.expanded, this.isExpanded);
            this.expandButton.setAttribute('aria-expanded', this.isExpanded);

            if (!this.isExpanded) {
                this.scrollToGallery();
            }
        },

        scrollToGallery() {
            const gallerySection = document.getElementById('galerie');
            if (!gallerySection) return;

            const header = document.querySelector(CONFIG.selectors.header);
            const headerHeight = header ? header.offsetHeight : 0;
            const targetPosition = gallerySection.getBoundingClientRect().top + window.scrollY - headerHeight - 20;
            window.scrollTo({ top: targetPosition, behavior: 'smooth' });
        },

        updateButtonVisibility() {
            if (!this.expandButton || !this.gallery) return;

            const items = this.gallery.querySelectorAll(CONFIG.selectors.galleryItem);
            const visibleItems = Array.from(items).filter(item => !item.classList.contains(CONFIG.classes.hidden));

            const isMobile = window.matchMedia('(max-width: 47.9375rem)').matches;
            const shouldShowButton = isMobile && visibleItems.length > 6;

            this.expandButton.style.display = shouldShowButton ? 'flex' : 'none';
        }
    };

    const LightboxController = {
        lightbox: null,
        image: null,
        caption: null,
        triggers: [],
        currentIndex: 0,
        isOpen: false,

        init() {
            this.lightbox = document.querySelector(CONFIG.selectors.lightbox);
            if (!this.lightbox) return;

            this.image = this.lightbox.querySelector(CONFIG.selectors.lightboxImage);
            this.caption = this.lightbox.querySelector(CONFIG.selectors.lightboxCaption);
            this.triggers = Array.from(document.querySelectorAll(CONFIG.selectors.lightboxTrigger));

            if (this.triggers.length === 0) return;

            this.triggers.forEach((trigger, index) => {
                trigger.addEventListener('click', () => this.open(index));
            });

            this.bindControls();
            this.bindKeyboard();
        },

        bindControls() {
            const closeBtn = this.lightbox.querySelector(CONFIG.selectors.lightboxClose);
            const prevBtn = this.lightbox.querySelector(CONFIG.selectors.lightboxPrev);
            const nextBtn = this.lightbox.querySelector(CONFIG.selectors.lightboxNext);

            if (closeBtn) closeBtn.addEventListener('click', () => this.close());
            if (prevBtn) prevBtn.addEventListener('click', () => this.prev());
            if (nextBtn) nextBtn.addEventListener('click', () => this.next());

            this.lightbox.addEventListener('click', (e) => {
                if (e.target === this.lightbox) this.close();
            });
        },

        bindKeyboard() {
            document.addEventListener('keydown', (e) => {
                if (!this.isOpen) return;
                if (e.key === 'Escape') this.close();
                if (e.key === 'ArrowLeft') this.prev();
                if (e.key === 'ArrowRight') this.next();
            });
        },

        open(index) {
            this.currentIndex = index;
            this.updateContent();
            this.lightbox.classList.add(CONFIG.classes.active);
            this.lightbox.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden';
            this.isOpen = true;
        },

        close() {
            this.lightbox.classList.remove(CONFIG.classes.active);
            this.lightbox.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = '';
            this.isOpen = false;
        },

        prev() {
            const visibleTriggers = this.getVisibleTriggers();
            const currentVisibleIndex = visibleTriggers.indexOf(this.triggers[this.currentIndex]);
            const prevVisibleIndex = (currentVisibleIndex - 1 + visibleTriggers.length) % visibleTriggers.length;
            this.currentIndex = this.triggers.indexOf(visibleTriggers[prevVisibleIndex]);
            this.updateContent();
        },

        next() {
            const visibleTriggers = this.getVisibleTriggers();
            const currentVisibleIndex = visibleTriggers.indexOf(this.triggers[this.currentIndex]);
            const nextVisibleIndex = (currentVisibleIndex + 1) % visibleTriggers.length;
            this.currentIndex = this.triggers.indexOf(visibleTriggers[nextVisibleIndex]);
            this.updateContent();
        },

        getVisibleTriggers() {
            return this.triggers.filter(trigger => {
                const item = trigger.closest(CONFIG.selectors.galleryItem);
                return item && !item.classList.contains(CONFIG.classes.hidden);
            });
        },

        updateContent() {
            const trigger = this.triggers[this.currentIndex];
            const img = trigger.querySelector('img');
            const title = trigger.querySelector('.gallery__item-title');

            if (img) {
                this.image.src = img.src;
                this.image.alt = img.alt;
            }

            if (title && this.caption) {
                this.caption.textContent = title.textContent;
            }
        }
    };

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
                    throw new Error('Submission failed');
                }
            } catch (error) {
                this.handleError();
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
                errorMessage = getTranslation('form_required');
            } else if (field.type === 'email' && field.value && !this.isValidEmail(field.value)) {
                errorMessage = getTranslation('form_invalid_email');
            } else if (field.type === 'checkbox' && field.required && !field.checked) {
                errorMessage = getTranslation('form_required');
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
            this.form.classList.remove(CONFIG.classes.error);
            this.form.classList.add(CONFIG.classes.success);
            if (this.statusElement) {
                this.statusElement.textContent = getTranslation('form_success');
            }
        },

        handleError() {
            this.form.classList.remove(CONFIG.classes.success);
            this.form.classList.add(CONFIG.classes.error);
            if (this.statusElement) {
                this.statusElement.textContent = getTranslation('form_error');
            }
        }
    };

    const LanguageController = {
        toggle: null,
        currentDisplay: null,

        init() {
            this.toggle = document.querySelector(CONFIG.selectors.langToggle);
            this.currentDisplay = document.querySelector(CONFIG.selectors.langCurrent);

            if (!this.toggle) return;

            this.detectLanguage();
            this.updateDisplay();
            this.applyTranslations();

            this.toggle.addEventListener('click', () => this.toggleLanguage());
        },

        detectLanguage() {
            const urlLang = new URLSearchParams(window.location.search).get('lang');
            const savedLang = localStorage.getItem(CONFIG.storage.langKey);

            if (urlLang && CONFIG.supportedLangs.includes(urlLang)) {
                currentLang = urlLang;
            } else if (savedLang && CONFIG.supportedLangs.includes(savedLang)) {
                currentLang = savedLang;
            }
        },

        toggleLanguage() {
            currentLang = currentLang === 'cs' ? 'en' : 'cs';
            localStorage.setItem(CONFIG.storage.langKey, currentLang);
            this.updateDisplay();
            this.applyTranslations();
            this.updateHtmlLang();
        },

        updateDisplay() {
            if (this.currentDisplay) {
                this.currentDisplay.textContent = currentLang.toUpperCase();
            }
        },

        updateHtmlLang() {
            document.documentElement.lang = currentLang;
        },

        applyTranslations() {
            document.querySelectorAll(CONFIG.selectors.i18n).forEach(element => {
                const key = element.dataset.i18n;
                const translation = getTranslation(key);
                if (translation !== key) {
                    element.textContent = translation;
                }
            });

            document.querySelectorAll(CONFIG.selectors.i18nPlaceholder).forEach(element => {
                const key = element.dataset.i18nPlaceholder;
                const translation = getTranslation(key);
                if (translation !== key) {
                    element.placeholder = translation;
                }
            });
        }
    };

    function setCurrentYear() {
        const yearElements = document.querySelectorAll(CONFIG.selectors.currentYear);
        const year = new Date().getFullYear();
        yearElements.forEach(el => {
            el.textContent = year;
        });
    }

    async function init() {
        await initTranslations();
        setCurrentYear();
        HeaderController.init();
        MobileNavController.init();
        SmoothScrollController.init();
        GalleryFilterController.init();
        GalleryExpandController.init();
        LightboxController.init();
        RevealController.init();
        FormController.init();
        LanguageController.init();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
