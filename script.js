const menuToggle = document.querySelector('.menu-toggle');
const siteNav = document.querySelector('.site-nav');
const siteHeader = document.querySelector('.site-header');

if (menuToggle && siteNav) {
    menuToggle.addEventListener('click', () => {
        const isOpen = siteNav.classList.toggle('is-open');
        menuToggle.setAttribute('aria-expanded', String(isOpen));
        document.body.classList.toggle('nav-open', isOpen);

        if (isOpen) {
            siteHeader?.classList.remove('is-hidden');
        }
    });

    siteNav.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', () => {
            siteNav.classList.remove('is-open');
            menuToggle.setAttribute('aria-expanded', 'false');
            document.body.classList.remove('nav-open');
            siteHeader?.classList.remove('is-hidden');
        });
    });
}

if (siteHeader) {
    let lastScrollY = window.scrollY;
    let ticking = false;

    const updateHeaderVisibility = () => {
        const currentScrollY = window.scrollY;
        const menuOpen = siteNav?.classList.contains('is-open');
        const nearTop = currentScrollY < 24;
        const scrollingUp = currentScrollY < lastScrollY - 6;
        const scrollingDown = currentScrollY > lastScrollY + 6;

        if (menuOpen || nearTop || scrollingUp) {
            siteHeader.classList.remove('is-hidden');
        } else if (scrollingDown) {
            siteHeader.classList.add('is-hidden');
        }

        lastScrollY = currentScrollY;
        ticking = false;
    };

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(updateHeaderVisibility);
            ticking = true;
        }
    }, { passive: true });
}

document.querySelectorAll('.faq-question').forEach((button) => {
    button.addEventListener('click', () => {
        const item = button.closest('.faq-item');
        const isOpen = item.classList.contains('is-open');

        document.querySelectorAll('.faq-item').forEach((faqItem) => {
            faqItem.classList.remove('is-open');
            faqItem.querySelector('.faq-question')?.setAttribute('aria-expanded', 'false');
        });

        if (!isOpen) {
            item.classList.add('is-open');
            button.setAttribute('aria-expanded', 'true');
        }
    });
});

const contactForm = document.querySelector('#contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const formData = new FormData(contactForm);
        const whatsappNumber = contactForm.dataset.whatsapp || '447475821221';
        const lines = [
            'Quote request',
            '',
            `Name: ${formData.get('name') || ''}`,
            `Phone: ${formData.get('phone') || ''}`,
            `Email: ${formData.get('email') || ''}`,
            `Service: ${formData.get('service') || ''}`,
            `Location: ${formData.get('location') || ''}`,
            '',
            'Project details:',
            `${formData.get('message') || ''}`
        ];

        const message = encodeURIComponent(lines.join('\n'));
        window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank', 'noopener,noreferrer');

        const note = document.querySelector('#contact-note');
        if (note) {
            note.hidden = false;
        }
    });
}

if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.12
    });

    document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));
} else {
    document.querySelectorAll('.reveal').forEach((element) => element.classList.add('is-visible'));
}
