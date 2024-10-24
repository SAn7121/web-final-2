document.addEventListener('DOMContentLoaded', function () {
    gsap.registerPlugin(ScrollTrigger);

    const pageContainer = document.querySelector(".container-scroll");

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

        // Pinning and horizontal scrolling
        gsap.to(".pin-wrap-scroll", {
            scrollTrigger: {
                scroller: pageContainer, // Locomotive-scroll
                scrub: true,
                trigger: "#sectionPin-scroll",
                pin: true,
                start: "top top",
                end: () => `+=${horizontalScrollLength}`, // Duración del scroll horizontal
                anticipatePin: 1
            },
            x: -horizontalScrollLength,
            ease: "none"
        });

        ScrollTrigger.addEventListener("refresh", () => scroller.update());
        ScrollTrigger.refresh();
    });
});