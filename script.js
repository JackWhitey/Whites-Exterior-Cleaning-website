const menuToggle = document.querySelector('.menu-toggle');
const siteNav = document.querySelector('.site-nav');

if (menuToggle && siteNav) {
    menuToggle.addEventListener('click', () => {
        const isOpen = siteNav.classList.toggle('is-open');
        menuToggle.setAttribute('aria-expanded', String(isOpen));
        document.body.classList.toggle('nav-open', isOpen);
    });

    siteNav.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', () => {
            siteNav.classList.remove('is-open');
            menuToggle.setAttribute('aria-expanded', 'false');
            document.body.classList.remove('nav-open');
        });
    });
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
        const recipient = contactForm.dataset.recipient || 'info@whitesexteriorcleaning.co.uk';
        const lines = [
            `Name: ${formData.get('name') || ''}`,
            `Phone: ${formData.get('phone') || ''}`,
            `Email: ${formData.get('email') || ''}`,
            `Service: ${formData.get('service') || ''}`,
            `Location: ${formData.get('location') || ''}`,
            '',
            'Project details:',
            `${formData.get('message') || ''}`
        ];

        const subject = encodeURIComponent(`Quote request from ${formData.get('name') || 'website visitor'}`);
        const body = encodeURIComponent(lines.join('\n'));
        window.location.href = `mailto:${recipient}?subject=${subject}&body=${body}`;

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
