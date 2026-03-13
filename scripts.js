/* =========================================
   ISMAEL SEGURA — SCRIPTS (VERSIÓN LIMPIA)
   Solo efectos de scroll seguros, sin revelados
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

// --- GSAP SCROLL EFFECTS (SOLO PARALLAX, SIN REVELADOS) ---
if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    // ===== PARALLAX EFFECT EN IMÁGENES DE PROYECTOS =====
    gsap.utils.toArray('.project-image-wrap img').forEach(img => {
        gsap.to(img, {
            scrollTrigger: {
                trigger: img.closest('.project-image-wrap'),
                start: 'top bottom',
                end: 'bottom top',
                scrub: 0.6,
                markers: false
            },
            y: (i, target) => {
                const rect = target.getBoundingClientRect();
                const scrollPercent = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
                return -40 * scrollPercent;
            },
            ease: 'none'
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
