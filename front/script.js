document.addEventListener('DOMContentLoaded', function () {
    const animatedElements = document.querySelectorAll('.animated');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    animatedElements.forEach(element => {
        observer.observe(element);
    });

    // Smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });

    // Navbar scroll effect
    const navbar = document.getElementById('desktop-navbar');
    let lastScrollTop = 0;
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        if (navbar) {
            navbar.style.background = scrollTop > 50 ? 'rgba(5, 5, 5, 0.98)' : 'rgba(5, 5, 5, 0.95)';
        }
        const mobileNavbar = document.getElementById('mobile-navbar');
        if (mobileNavbar && window.innerWidth <= 768) {
            mobileNavbar.style.transform = (scrollTop > lastScrollTop && scrollTop > 200) ? 'translateY(100%)' : 'translateY(0)';
            lastScrollTop = scrollTop;
        }
    });

    // Counter animation
    const counters = document.querySelectorAll('.stats-counter');
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.textContent.replace(/[^\d]/g, ''));
                let current = 0;
                const increment = target / 50;
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        counter.textContent = counter.textContent.replace(/\d+/, target);
                        clearInterval(timer);
                    } else {
                        counter.textContent = counter.textContent.replace(/\d+/, Math.floor(current));
                    }
                }, 30);
                counterObserver.unobserve(counter);
            }
        });
    });
    counters.forEach(counter => counterObserver.observe(counter));

    // Card hover effect
    document.querySelectorAll('.collection-card, .bestseller-card, .journal-card').forEach(card => {
        card.addEventListener('mouseenter', () => { card.style.transform = 'translateY(-10px) scale(1.02)'; });
        card.addEventListener('mouseleave', () => { card.style.transform = 'translateY(0) scale(1)'; });
    });

    // Parallax effect
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const hero = document.getElementById('hero');
        if (hero) hero.style.transform = `translateY(${scrolled * 0.4}px)`;
    });

    // Button loading state
    document.querySelectorAll('.btn-premium, .btn-outline-premium').forEach(btn => {
        btn.addEventListener('click', function(e) {
            if (this.href.endsWith('#')) {
                e.preventDefault();
                const originalText = this.textContent;
                this.textContent = 'Loading...';
                this.style.opacity = '0.7';
                setTimeout(() => { this.textContent = originalText; this.style.opacity = '1'; }, 1500);
            }
        });
    });

    // Theme Switcher
    const themeSwitcher = document.getElementById('theme-switcher');
    const body = document.body;
    const setTheme = (theme) => {
        body.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    };
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme);
    themeSwitcher.addEventListener('click', () => {
        const currentTheme = body.getAttribute('data-theme');
        setTheme(currentTheme === 'dark' ? 'light' : 'dark');
    });

    // Contact Form
    const contactForm = document.getElementById('contact-form');
    const formResponse = document.getElementById('form-response');
    if(contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;

            if (name === '' || email === '' || message === '') {
                formResponse.innerHTML = '<div class="alert alert-danger">Please fill out all required fields.</div>';
                return;
            }

            formResponse.innerHTML = '<div class="alert alert-success">Thank you for your message! We will get back to you shortly.</div>';
            contactForm.reset();
        });
    }
});
