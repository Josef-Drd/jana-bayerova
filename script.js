(function() {
    'use strict';

    /* ============================================
       CONFIGURATION
       ============================================ */
    const CONFIG = {
        selectors: {
            header: '[data-header]',
            navToggle: '[data-nav-toggle]',
            navMobile: '[data-nav-mobile]',
            navLinks: '[data-nav-link]',
            carousel: '[data-carousel]',
            carouselSlides: '[data-carousel-slides]',
            carouselSlide: '[data-carousel-slide]',
            carouselDot: '[data-carousel-dot]',
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
            hidden: 'is-hidden'
        },
        thresholds: {
            scroll: 50,
            reveal: 0.15
        },
        carousel: {
            autoplayInterval: 5000,
            transitionDuration: 800
        },
        storage: {
            langKey: 'jana-bayerova-lang'
        }
    };

    /* ============================================
       TRANSLATIONS
       ============================================ */
    const translations = {
        cs: {
            skip_link: 'Přeskočit na obsah',
            nav_about: 'O mně',
            nav_work: 'Tvorba',
            nav_gallery: 'Galerie',
            nav_commission: 'Zakázka',
            nav_contact: 'Kontakt',
            hero_tagline: 'Malba světla a paměti míst',
            hero_cta_gallery: 'Prohlédnout tvorbu',
            hero_cta_commission: 'Chci obraz',
            about_title: 'O mně',
            about_p1: 'Jmenuji se Jana Bayerová a narodila jsem se v krásném moravském městečku Boskovicích roku 1971. Po studiích na Střední škole uměleckoprůmyslové v Brně a Konzervátorsko-restaurátorském studiu při Moravském zemském muzeu v Brně stále žiji i pracuji v Boskovicích.',
            about_p2: 'K malování mě přivedl můj dědeček, který maloval amatérsky jen tak pro sebe a rodinu. V jeho dílně vždy voněly olejové barvy a terpentýnové silice, což mě už jako malou holku fascinovalo a lákalo.',
            about_p3: 'Maluji převážně realistické obrazy s romantickými náměty, k nimž mě velice inspiruje městské prostředí – zejména boskovická židovská čtvrť, ale také krajiny a místa, kde jsem prožila hezké chvíle. Mým velkým vzorem se stal český malíř Jakub Schikaneder, jehož vliv se dá rozpoznat v námětech večerních zákoutí ulic s melancholickou náladou.',
            work_title: 'Tvorba',
            work_subtitle: 'Obrazy vznikají na ručně připravených plátnech olejovými barvami',
            filter_all: 'Vše',
            filter_city: 'Městské scenérie',
            filter_garden: 'Zahrady a květiny',
            filter_landscape: 'Krajiny',
            filter_animal: 'Zvířata',
            filter_master: 'Kopie mistrů',
            process_title: 'Jak vzniká obraz',
            process_step1_title: 'Příprava plátna',
            process_step1_text: 'Ručně natažené lněné plátno na dřevěný slepý rám, našepsované bílým nebo černým šepsem.',
            process_step2_title: 'Podkresba',
            process_step2_text: 'Kompozice a základní tvarová kresba, která určuje budoucí atmosféru obrazu.',
            process_step3_title: 'Malba',
            process_step3_text: 'Olejomalba ve vrstvách s důrazem na práci se světlem a atmosférou.',
            process_step4_title: 'Finalizace',
            process_step4_text: 'Detaily, případné zlaté plátky a ochranný lak pro dlouhou životnost.',
            gallery_title: 'Galerie',
            gallery_show_more: 'Zobrazit více obrazů',
            gallery_show_less: 'Zobrazit méně',
            commission_title: 'Zakázková malba',
            commission_intro: 'Nechte si namalovat obraz místa, které má pro vás osobní význam. Ať už je to vaše oblíbené zákoutí města, zahrada vašeho dětství, nebo krajina z dovolené – společně vytvoříme originální dílo, které zachytí atmosféru a emoce spojené s tímto místem.',
            commission_feature1_title: 'Osobní přístup',
            commission_feature1_text: 'Každý obraz je originál vytvořený podle vašich představ a příběhu.',
            commission_feature2_title: 'Kvalitní materiály',
            commission_feature2_text: 'Lněné plátno, olejové barvy a ruční práce pro dlouhou životnost.',
            commission_feature3_title: 'Průběžná komunikace',
            commission_feature3_text: 'Během tvorby vás budu informovat o postupu práce.',
            commission_form_title: 'Nezávazná poptávka',
            form_name: 'Jméno',
            form_email: 'Email',
            form_phone: 'Telefon',
            form_message: 'Popište svou představu',
            form_message_placeholder: 'Jaké místo byste chtěli zachytit? Máte představu o velikosti obrazu?',
            form_gdpr: 'Souhlasím se zpracováním osobních údajů za účelem odpovědi na poptávku',
            form_submit: 'Odeslat poptávku',
            form_success: 'Děkuji za vaši poptávku! Ozvu se vám co nejdříve.',
            form_error: 'Něco se pokazilo. Zkuste to prosím znovu.',
            form_required: 'Toto pole je povinné',
            form_invalid_email: 'Zadejte platný email',
            contact_title: 'Kontakt',
            contact_linkedin: 'Profesní profil',
            contact_mojepaleta: 'Hotová díla k prodeji',
            contact_location_label: 'Lokalita',
            footer_rights: 'Všechna práva vyhrazena.',
            footer_note: 'Všechny obrazy jsou chráněny autorským právem.'
        },
        en: {
            skip_link: 'Skip to content',
            nav_about: 'About',
            nav_work: 'Work',
            nav_gallery: 'Gallery',
            nav_commission: 'Commission',
            nav_contact: 'Contact',
            hero_tagline: 'Painting light and memory of places',
            hero_cta_gallery: 'View artwork',
            hero_cta_commission: 'Commission a painting',
            about_title: 'About me',
            about_p1: 'My name is Jana Bayerová and I was born in the beautiful Moravian town of Boskovice in 1971. After studying at the Secondary School of Applied Arts in Brno and the Conservation-Restoration Studio at the Moravian Museum in Brno, I still live and work in Boskovice.',
            about_p2: 'My grandfather, who painted as an amateur just for himself and the family, introduced me to painting. His workshop always smelled of oil paints and turpentine, which fascinated and attracted me even as a little girl.',
            about_p3: 'I mainly paint realistic paintings with romantic themes, inspired by urban environments – especially the Jewish quarter of Boskovice, but also landscapes and places where I have spent beautiful moments. Czech painter Jakub Schikaneder became my great inspiration, whose influence can be recognized in the themes of evening street corners with melancholic mood.',
            work_title: 'Work',
            work_subtitle: 'Paintings are created on hand-prepared canvases with oil paints',
            filter_all: 'All',
            filter_city: 'City scenes',
            filter_garden: 'Gardens & flowers',
            filter_landscape: 'Landscapes',
            filter_animal: 'Animals',
            filter_master: 'Master copies',
            process_title: 'How a painting is created',
            process_step1_title: 'Canvas preparation',
            process_step1_text: 'Hand-stretched linen canvas on a wooden stretcher frame, primed with white or black gesso.',
            process_step2_title: 'Underdrawing',
            process_step2_text: 'Composition and basic shape drawing that determines the future atmosphere of the painting.',
            process_step3_title: 'Painting',
            process_step3_text: 'Oil painting in layers with emphasis on working with light and atmosphere.',
            process_step4_title: 'Finalization',
            process_step4_text: 'Details, optional gold leaf and protective varnish for long life.',
            gallery_title: 'Gallery',
            gallery_show_more: 'Show more paintings',
            gallery_show_less: 'Show less',
            commission_title: 'Commission a painting',
            commission_intro: 'Have a painting made of a place that has personal meaning for you. Whether it\'s your favorite corner of the city, the garden of your childhood, or a landscape from your vacation – together we will create an original work that captures the atmosphere and emotions associated with this place.',
            commission_feature1_title: 'Personal approach',
            commission_feature1_text: 'Each painting is an original created according to your ideas and story.',
            commission_feature2_title: 'Quality materials',
            commission_feature2_text: 'Linen canvas, oil paints and handwork for long life.',
            commission_feature3_title: 'Ongoing communication',
            commission_feature3_text: 'During the creation process, I will keep you informed about the progress.',
            commission_form_title: 'Non-binding inquiry',
            form_name: 'Name',
            form_email: 'Email',
            form_phone: 'Phone',
            form_message: 'Describe your vision',
            form_message_placeholder: 'What place would you like to capture? Do you have an idea about the size of the painting?',
            form_gdpr: 'I agree to the processing of personal data for the purpose of responding to the inquiry',
            form_submit: 'Send inquiry',
            form_success: 'Thank you for your inquiry! I will get back to you as soon as possible.',
            form_error: 'Something went wrong. Please try again.',
            form_required: 'This field is required',
            form_invalid_email: 'Please enter a valid email',
            contact_title: 'Contact',
            contact_linkedin: 'Professional profile',
            contact_mojepaleta: 'Finished works for sale',
            contact_location_label: 'Location',
            footer_rights: 'All rights reserved.',
            footer_note: 'All paintings are protected by copyright.'
        }
    };

    let currentLang = 'cs';

    /* ============================================
       HEADER CONTROLLER
       ============================================ */
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

    /* ============================================
       MOBILE NAV CONTROLLER
       ============================================ */
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

    /* ============================================
       SMOOTH SCROLL CONTROLLER
       ============================================ */
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

    /* ============================================
       CAROUSEL CONTROLLER
       ============================================ */
    const CarouselController = {
        container: null,
        slides: [],
        dots: [],
        currentIndex: 0,
        autoplayTimer: null,
        isPlaying: true,

        init() {
            this.container = document.querySelector(CONFIG.selectors.carousel);
            if (!this.container) return;

            this.slides = Array.from(this.container.querySelectorAll(CONFIG.selectors.carouselSlide));
            this.dots = Array.from(this.container.querySelectorAll(CONFIG.selectors.carouselDot));

            if (this.slides.length === 0) return;

            this.dots.forEach((dot, index) => {
                dot.addEventListener('click', () => this.goToSlide(index));
            });

            this.container.addEventListener('mouseenter', () => this.pause());
            this.container.addEventListener('mouseleave', () => this.play());

            this.play();
        },

        goToSlide(index) {
            this.slides[this.currentIndex].classList.remove(CONFIG.classes.active);
            this.dots[this.currentIndex].classList.remove(CONFIG.classes.active);

            this.currentIndex = index;

            this.slides[this.currentIndex].classList.add(CONFIG.classes.active);
            this.dots[this.currentIndex].classList.add(CONFIG.classes.active);
        },

        nextSlide() {
            const nextIndex = (this.currentIndex + 1) % this.slides.length;
            this.goToSlide(nextIndex);
        },

        play() {
            if (this.autoplayTimer) return;
            this.isPlaying = true;
            this.autoplayTimer = setInterval(() => this.nextSlide(), CONFIG.carousel.autoplayInterval);
        },

        pause() {
            this.isPlaying = false;
            if (this.autoplayTimer) {
                clearInterval(this.autoplayTimer);
                this.autoplayTimer = null;
            }
        }
    };

    /* ============================================
       GALLERY FILTER CONTROLLER
       ============================================ */
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

    /* ============================================
       GALLERY EXPAND CONTROLLER
       ============================================ */
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
            this.gallery.classList.toggle('is-expanded', this.isExpanded);
            this.expandButton.setAttribute('aria-expanded', this.isExpanded);
            
            if (!this.isExpanded) {
                const gallerySection = document.getElementById('galerie');
                if (gallerySection) {
                    const header = document.querySelector(CONFIG.selectors.header);
                    const headerHeight = header ? header.offsetHeight : 0;
                    const targetPosition = gallerySection.getBoundingClientRect().top + window.scrollY - headerHeight - 20;
                    window.scrollTo({ top: targetPosition, behavior: 'smooth' });
                }
            }
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

    /* ============================================
       LIGHTBOX CONTROLLER
       ============================================ */
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

            const closeBtn = this.lightbox.querySelector(CONFIG.selectors.lightboxClose);
            const prevBtn = this.lightbox.querySelector(CONFIG.selectors.lightboxPrev);
            const nextBtn = this.lightbox.querySelector(CONFIG.selectors.lightboxNext);

            if (closeBtn) closeBtn.addEventListener('click', () => this.close());
            if (prevBtn) prevBtn.addEventListener('click', () => this.prev());
            if (nextBtn) nextBtn.addEventListener('click', () => this.next());

            this.lightbox.addEventListener('click', (e) => {
                if (e.target === this.lightbox) this.close();
            });

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

    /* ============================================
       REVEAL CONTROLLER
       ============================================ */
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

    /* ============================================
       FORM CONTROLLER
       ============================================ */
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
                errorMessage = translations[currentLang].form_required;
            } else if (field.type === 'email' && field.value && !this.isValidEmail(field.value)) {
                errorMessage = translations[currentLang].form_invalid_email;
            } else if (field.type === 'checkbox' && field.required && !field.checked) {
                errorMessage = translations[currentLang].form_required;
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
                this.statusElement.textContent = translations[currentLang].form_success;
            }
        },

        handleError(error) {
            this.form.classList.remove(CONFIG.classes.success);
            this.form.classList.add(CONFIG.classes.error);
            if (this.statusElement) {
                this.statusElement.textContent = translations[currentLang].form_error;
            }
        }
    };

    /* ============================================
       LANGUAGE CONTROLLER
       ============================================ */
    const LanguageController = {
        toggle: null,
        currentDisplay: null,

        init() {
            this.toggle = document.querySelector(CONFIG.selectors.langToggle);
            this.currentDisplay = document.querySelector(CONFIG.selectors.langCurrent);

            if (!this.toggle) return;

            const savedLang = localStorage.getItem(CONFIG.storage.langKey);
            const urlLang = new URLSearchParams(window.location.search).get('lang');
            
            if (urlLang && (urlLang === 'cs' || urlLang === 'en')) {
                currentLang = urlLang;
            } else if (savedLang && (savedLang === 'cs' || savedLang === 'en')) {
                currentLang = savedLang;
            }

            this.updateDisplay();
            this.applyTranslations();

            this.toggle.addEventListener('click', () => this.toggleLanguage());
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
            const t = translations[currentLang];

            document.querySelectorAll(CONFIG.selectors.i18n).forEach(element => {
                const key = element.dataset.i18n;
                if (t[key]) {
                    element.textContent = t[key];
                }
            });

            document.querySelectorAll(CONFIG.selectors.i18nPlaceholder).forEach(element => {
                const key = element.dataset.i18nPlaceholder;
                if (t[key]) {
                    element.placeholder = t[key];
                }
            });
        }
    };

    /* ============================================
       UTILITY FUNCTIONS
       ============================================ */
    function setCurrentYear() {
        const yearElements = document.querySelectorAll(CONFIG.selectors.currentYear);
        const currentYear = new Date().getFullYear();
        yearElements.forEach(el => {
            el.textContent = currentYear;
        });
    }

    /* ============================================
       INITIALIZATION
       ============================================ */
    function init() {
        setCurrentYear();
        HeaderController.init();
        MobileNavController.init();
        SmoothScrollController.init();
        CarouselController.init();
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
