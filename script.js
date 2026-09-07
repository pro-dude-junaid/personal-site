document.addEventListener("DOMContentLoaded", () => {
    const body = document.body;

    /* =========================================================
       PAGE LOAD
       ========================================================= */

    // Add a class once the document is ready.
    requestAnimationFrame(() => {
        body.classList.add("page-ready");
    });


    /* =========================================================
       SCROLL REVEALS
       ========================================================= */

    const revealElements = document.querySelectorAll(
        ".announce, .hero, section, footer"
    );

    const revealObserver = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;

                entry.target.classList.add("is-visible");
                observer.unobserve(entry.target);
            });
        },
        {
            threshold: 0.12,
            rootMargin: "0px 0px -40px 0px"
        }
    );

    revealElements.forEach((element) => {
        element.classList.add("reveal");
        revealObserver.observe(element);
    });


    /* =========================================================
       STAGGERED CARDS
       ========================================================= */

    const cards = document.querySelectorAll(
        ".platform-card, .film-card"
    );

    cards.forEach((card, index) => {
        card.classList.add("reveal-item");
        card.style.setProperty(
            "--delay",
            `${index * 90}ms`
        );
    });

    const cardObserver = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;

                entry.target.classList.add("is-visible");
                observer.unobserve(entry.target);
            });
        },
        {
            threshold: 0.08,
            rootMargin: "0px 0px -30px 0px"
        }
    );

    cards.forEach((card) => {
        cardObserver.observe(card);
    });


    /* =========================================================
       PHOTOGRAPHY REVEALS
       ========================================================= */

    const photos = document.querySelectorAll(
        ".photo-grid figure"
    );

    photos.forEach((photo, index) => {
        photo.classList.add("photo-reveal");
        photo.style.setProperty(
            "--delay",
            `${index * 70}ms`
        );
    });

    const photoObserver = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;

                entry.target.classList.add("is-visible");
                observer.unobserve(entry.target);
            });
        },
        {
            threshold: 0.1,
            rootMargin: "0px 0px -30px 0px"
        }
    );

    photos.forEach((photo) => {
        photoObserver.observe(photo);
    });


    /* =========================================================
       ACTIVE NAVIGATION
       ========================================================= */

    const sections = document.querySelectorAll(
        "#music, #photography, #film, #contact"
    );

    const navLinks = document.querySelectorAll(
        "nav a[href^='#']"
    );

    const sectionObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;

                const id = entry.target.getAttribute("id");

                navLinks.forEach((link) => {
                    link.classList.remove("active");

                    if (link.getAttribute("href") === `#${id}`) {
                        link.classList.add("active");
                    }
                });
            });
        },
        {
            threshold: 0,
            rootMargin: "-35% 0px -55% 0px"
        }
    );

    sections.forEach((section) => {
        sectionObserver.observe(section);
    });


    /* =========================================================
       ANCHOR NAVIGATION
       ========================================================= */

    navLinks.forEach((link) => {
        link.addEventListener("click", (event) => {
            const targetId = link.getAttribute("href");

            if (!targetId || targetId === "#") return;

            const target = document.querySelector(targetId);

            if (!target) return;

            event.preventDefault();

            const nav = document.querySelector("nav");
            const navHeight = nav
                ? nav.offsetHeight
                : 0;

            const targetPosition =
                target.getBoundingClientRect().top +
                window.scrollY -
                navHeight -
                20;

            window.scrollTo({
                top: targetPosition,
                behavior: "smooth"
            });
        });
    });


    /* =========================================================
       IMAGE HOVER EFFECT
       ========================================================= */

    const images = document.querySelectorAll(
        ".photo-grid figure img, .film-thumb img"
    );

    images.forEach((image) => {
        image.addEventListener("mouseenter", () => {
            image.classList.add("image-hover");
        });

        image.addEventListener("mouseleave", () => {
            image.classList.remove("image-hover");
        });
    });


    /* =========================================================
       CURRENT YEAR
       ========================================================= */

    const yearElement = document.querySelector(
        ".foot-note"
    );

    if (yearElement) {
        yearElement.innerHTML =
            yearElement.innerHTML.replace(
                /©\s*\d{4}/,
                `© ${new Date().getFullYear()}`
            );
    }
});