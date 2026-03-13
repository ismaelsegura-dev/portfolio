/* =========================================
   ISMAEL SEGURA — SCRIPTS
   ========================================= */

// --- INTRO ANIMATION ---
window.addEventListener('load', () => {
    const overlay = document.getElementById('introOverlay');
    if (!overlay) return;

    gsap.to(overlay, {
        opacity: 0,
        duration: 0.8,
        delay: 1.0,
        ease: 'power2.inOut',
        onComplete: () => {
            overlay.style.display = 'none';
        }
    });
});

// --- CUSTOM CURSOR ---
const cursorDot = document.getElementById('cursorDot');
const cursorRing = document.getElementById('cursorRing');

if (cursorDot && cursorRing) {
    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursorDot.style.left = mouseX + 'px';
        cursorDot.style.top = mouseY + 'px';
    });

    function animateRing() {
        ringX += (mouseX - ringX) * 0.12;
        ringY += (mouseY - ringY) * 0.12;
        cursorRing.style.left = ringX + 'px';
        cursorRing.style.top = ringY + 'px';
        requestAnimationFrame(animateRing);
    }
    animateRing();

    document.addEventListener('mouseleave', () => {
        cursorDot.style.opacity = '0';
        cursorRing.style.opacity = '0';
    });

    document.addEventListener('mouseenter', () => {
        cursorDot.style.opacity = '1';
        cursorRing.style.opacity = '1';
    });
}

// --- NAVBAR SCROLL ---
const nav = document.getElementById('mainNav');
if (nav) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 60) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    }, { passive: true });
}

// --- MOBILE MENU ---
const hamburger = document.getElementById('navHamburger');
const mobileMenu = document.getElementById('mobileMenu');

if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('open');
        mobileMenu.classList.toggle('open');
        document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
    });

    mobileMenu.querySelectorAll('.mobile-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('open');
            mobileMenu.classList.remove('open');
            document.body.style.overflow = '';
        });
    });
}

// --- SMOOTH ANCHOR SCROLL ---
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
        const target = document.querySelector(anchor.getAttribute('href'));
        if (target) {
            e.preventDefault();
            const navH = nav ? nav.offsetHeight : 72;
            const top = target.getBoundingClientRect().top + window.scrollY - navH;
            window.scrollTo({ top, behavior: 'smooth' });
        }
    });
});

// --- GSAP SCROLL ANIMATIONS (if GSAP available) ---
if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    // ===== PARALLAX EFFECT EN IMÁGENES DE PROYECTOS =====
    gsap.utils.toArray('.project-image-wrap').forEach(wrap => {
        const img = wrap.querySelector('img');
        if (!img) return;

        gsap.to(img, {
            scrollTrigger: {
                trigger: wrap,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 0.6,
                markers: false
            },
            y: (i, target) => {
                const rect = target.getBoundingClientRect();
                const scrollPercent = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
                return -60 * scrollPercent;
            },
            ease: 'none'
        });
    });

    // ===== SCALE PROJECTS ON SCROLL =====
    gsap.utils.toArray('.project-item').forEach((item, i) => {
        gsap.to(item, {
            scrollTrigger: {
                trigger: item,
                start: 'top 60%',
                end: 'top 30%',
                scrub: 0.8,
                markers: false
            },
            scale: 1,
            opacity: 1,
            ease: 'power2.out'
        });
    });

    // ===== REVEAL SECTION TITLES CON MOVIMIENTO =====
    gsap.utils.toArray('.section-title').forEach(title => {
        gsap.from(title, {
            scrollTrigger: {
                trigger: title,
                start: 'top 85%',
                toggleActions: 'play none none none'
            },
            y: 60,
            opacity: 0,
            duration: 1,
            ease: 'power3.out'
        });
    });

    // ===== SECTION LABELS SLIDE IN =====
    gsap.utils.toArray('.section-label').forEach(label => {
        gsap.from(label, {
            scrollTrigger: {
                trigger: label,
                start: 'top 88%',
                toggleActions: 'play none none none'
            },
            x: -30,
            opacity: 0,
            duration: 0.8,
            ease: 'power2.out'
        });
    });

    // ===== CONTACT HEADLINE REVEAL =====
    const contactHeadline = document.querySelector('.contact-headline');
    if (contactHeadline) {
        gsap.from(contactHeadline, {
            scrollTrigger: {
                trigger: contactHeadline,
                start: 'top 80%',
                toggleActions: 'play none none none'
            },
            y: 80,
            opacity: 0,
            duration: 1.2,
            ease: 'power3.out'
        });
    }

    // ===== EXPERIENCE ITEMS STAGGER =====
    gsap.utils.toArray('.exp-item').forEach((item, i) => {
        gsap.from(item, {
            scrollTrigger: {
                trigger: item,
                start: 'top 75%',
                toggleActions: 'play none none none'
            },
            x: -50,
            opacity: 0,
            duration: 0.7,
            delay: i * 0.08,
            ease: 'power3.out'
        });
    });

    // ===== ARSENAL CARDS BOUNCE IN =====
    gsap.utils.toArray('.arsenal-card').forEach((card, i) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 75%',
                toggleActions: 'play none none none'
            },
            y: 50,
            opacity: 0,
            duration: 0.8,
            delay: i * 0.1,
            ease: 'back.out(1.1)'
        });
    });
}

// --- MARQUEE PAUSE ON HOVER ---
const marqueeInner = document.querySelector('.marquee-inner');
if (marqueeInner) {
    marqueeInner.parentElement.addEventListener('mouseenter', () => {
        marqueeInner.style.animationPlayState = 'paused';
    });
    marqueeInner.parentElement.addEventListener('mouseleave', () => {
        marqueeInner.style.animationPlayState = 'running';
    });
}
