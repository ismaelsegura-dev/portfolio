document.addEventListener("DOMContentLoaded", () => {
    
    gsap.registerPlugin(ScrollTrigger);

    // --- 1. MOVIMIENTO DEL CURSOR ---
    const cursor = document.querySelector('.cursor-dot');
    
    if (cursor) { // Verificamos que exista para evitar errores
        document.addEventListener('mousemove', (e) => {
            gsap.to(cursor, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.1,
                ease: "power2.out"
            });
        });
    }

    // --- 2. ANIMACIÓN PORTADA (HERO) ---
    const tl = gsap.timeline();
    tl.from("h1", { y: 100, opacity: 0, duration: 1.5, ease: "power4.out", delay: 0.5 })
      .from("p", { y: 20, opacity: 0, duration: 1, ease: "power3.out" }, "-=1")
      .from(".cta-container button", { y: 20, opacity: 0, stagger: 0.2, duration: 0.8 }, "-=0.8")
      .from(".bottom-bar", { opacity: 0, duration: 1 }, "-=0.5");

    // --- 3. ANIMACIÓN SCROLL ---
    gsap.utils.toArray('.project-card').forEach((card) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: "top 85%",
                toggleActions: "play none none reverse"
            },
            y: 100,
            opacity: 0,
            duration: 1.2,
            ease: "power3.out"
        });
    });

    // --- 4. OCULTAR LOGO SPLINE ---
    const splineViewer = document.querySelector('spline-viewer');
    if (splineViewer) {
        const removeLogo = () => {
            const shadowRoot = splineViewer.shadowRoot;
            if (shadowRoot) {
                const logo = shadowRoot.querySelector('#logo');
                if (logo) logo.style.display = 'none';
            }
        };
        splineViewer.addEventListener('load', removeLogo);
        setTimeout(removeLogo, 1000);
    }
});
