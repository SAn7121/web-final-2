document.addEventListener('DOMContentLoaded', function () {
    gsap.registerPlugin(ScrollTrigger);

    const pageContainer = document.querySelector(".container-scroll");

    // Detectar si es dispositivo móvil
    const isMobile = window.innerWidth <= 768;

    // SMOOTH SCROLL
    const scroller = new LocomotiveScroll({
        el: pageContainer,
        smooth: true
    });

    scroller.on("scroll", ScrollTrigger.update);

    ScrollTrigger.scrollerProxy(pageContainer, {
        scrollTop(value) {
            return arguments.length ? scroller.scrollTo(value, 0, 0) : scroller.scroll.instance.scroll.y;
        },
        getBoundingClientRect() {
            return {
                left: 0,
                top: 0,
                width: window.innerWidth,
                height: window.innerHeight
            };
        },
        pinType: pageContainer.style.transform ? "transform" : "fixed"
    });

    window.addEventListener("load", function () {
        let pinWrap = document.querySelector(".pin-wrap-scroll");
        let pinWrapWidth = pinWrap.scrollWidth;
        let horizontalScrollLength = pinWrapWidth - window.innerWidth;

        // Configuración específica para móvil
        let isMobile = window.innerWidth < 768; // Define si es móvil basado en el ancho de la ventana
        let startOffset = isMobile ? "top 14%" : "top 26%"; // Ajusta para móvil 
        let scrollEnd = isMobile ? horizontalScrollLength * 1.5 : horizontalScrollLength; // Reducir longitud en móvil
    
        // Configuración del ScrollTrigger
        gsap.to(".pin-wrap-scroll", {
            scrollTrigger: {
                scroller: pageContainer,
                scrub: true,
                trigger: "#sectionPin-scroll",
                pin: true,
                start: startOffset , // Usar offset dinámico
                end: () => `+=${scrollEnd}`, // Usar longitud dinámica
                anticipatePin: 1
            },
            x: -scrollEnd, // Desplazamiento horizontal dinámico
            ease: "none"
        });
    
        ScrollTrigger.addEventListener("refresh", () => scroller.update());
        ScrollTrigger.refresh();
    });

    // Ajustar el scroll cuando cambia el tamaño de la pantalla
    window.addEventListener("resize", () => {
        if ((isMobile && window.innerWidth > 768) || (!isMobile && window.innerWidth <= 768)) {
            location.reload(); // Recargar para aplicar las configuraciones de nuevo en el contexto adecuado
        }
    });
});