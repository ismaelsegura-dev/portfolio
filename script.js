document.addEventListener("DOMContentLoaded", () => {
    
    // 0. Registrar Plugins (¡Vital para que el scroll funcione!)
    gsap.registerPlugin(ScrollTrigger);

    // --- PARTE 1: Animación de la Portada (Hero) ---
    const tl = gsap.timeline();

    tl.from("h1", { 
        y: 100, 
        opacity: 0, 
        duration: 1.5, 
        ease: "power4.out", 
        delay: 0.5 
    })
    .from("p", { 
        y: 20, 
        opacity: 0, 
        duration: 1, 
        ease: "power3.out" 
    }, "-=1")
    .from(".cta-container button", { 
        y: 20, 
        opacity: 0, 
        stagger: 0.2, 
        duration: 0.8 
    }, "-=0.8")
    .from(".bottom-bar", { 
        opacity: 0, 
        duration: 1 
    }, "-=0.5");

    // --- PARTE 2: Animación al bajar (Scroll) ---
    gsap.utils.toArray('.project-card').forEach((card) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: "top 85%", // La animación empieza cuando la tarjeta asoma por abajo
                toggleActions: "play none none reverse" // Si subes, la tarjeta desaparece suavemente
            },
            y: 100, // Viene desde abajo 100px
            opacity: 0,
            duration: 1.2,
            ease: "power3.out"
        });
    });
});
