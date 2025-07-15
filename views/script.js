document.addEventListener("DOMContentLoaded", function() {
    // Load GSAP & ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    // Smooth fade & scale effect from hero to first section
    gsap.from(".about-crop-rotation", {
        opacity: 0,
        scale: 0.8,
        duration: 1.5,
        ease: "power2.out",
        scrollTrigger: {
            trigger: ".about-crop-rotation",
            start: "top 80%",
            end: "top 30%",
            scrub: true
        }
    });

    // Smooth scroll for navigation links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            document.getElementById(targetId).scrollIntoView({ behavior: 'smooth' });
        });
    });

    // Initialize AOS animations
    AOS.init({
        once: false, // Animation should run every time the element comes into view
        duration: 1600, // Animation duration in milliseconds
    });
});