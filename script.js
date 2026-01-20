// Esperamos a que cargue el DOM
document.addEventListener("DOMContentLoaded", () => {
    
    // Timeline de GSAP (Secuencia de animación)
    const tl = gsap.timeline();

    // 1. Animamos el texto principal
    tl.from("h1", {
        y: 100, // Viene desde abajo 100px
        opacity: 0,
        duration: 1.5,
        ease: "power4.out",
        delay: 0.5
    })
    // 2. Animamos el párrafo
    .from("p", {
        y: 20,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
    }, "-=1") // Empieza 1 segundo antes de que acabe el anterior
    // 3. Animamos los botones
    .from(".cta-container button", {
        y: 20,
        opacity: 0,
        stagger: 0.2, // Uno detrás de otro
        duration: 0.8
    }, "-=0.8")
    // 4. Animamos la barra inferior
    .from(".bottom-bar", {
        opacity: 0,
        duration: 1
    }, "-=0.5");

    // NOTA: El 3D de Spline se anima solo porque ya viene programado dentro del archivo .spline
});
