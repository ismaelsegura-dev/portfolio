document.addEventListener("DOMContentLoaded", () => {
    
    // 0. Registrar Plugins
    gsap.registerPlugin(ScrollTrigger);

    // --- PARTE 1: Animación de la Portada (Hero) ---
    const tl = gsap.timeline();

    tl.from("h1", { y: 100, opacity: 0, duration: 1.5, ease: "power4.out", delay: 0.5 })
      .from("p", { y: 20, opacity: 0, duration: 1, ease: "power3.out" }, "-=1")
      .from(".cta-container button", { y: 20, opacity: 0, stagger: 0.2, duration: 0.8 }, "-=0.8")
      .from(".bottom-bar", { opacity: 0, duration: 1 }, "-=0.5");

    // --- PARTE 2: Animación al bajar (Scroll) ---
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

    // --- PARTE 3: Ocultar Logo de Spline (HACK) ---
    const splineViewer = document.querySelector('spline-viewer');
    if (splineViewer) {
        // A veces carga tan rápido que el evento 'load' ya pasó, así que verificamos si ya tiene shadowRoot
        const removeLogo = () => {
            const shadowRoot = splineViewer.shadowRoot;
            if (shadowRoot) {
                const logo = shadowRoot.querySelector('#logo');
                if (logo) {
                    logo.style.display = 'none'; // Lo ocultamos
                    // Opcional: logo.remove(); para borrarlo del todo
                }
            }
        };

        // Intentamos borrarlo al cargar
        splineViewer.addEventListener('load', removeLogo);
        // Por si acaso ya cargó, intentamos borrarlo ya
        setTimeout(removeLogo, 1000);
    }
});
