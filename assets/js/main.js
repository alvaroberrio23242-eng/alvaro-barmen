const backgroundVideo = document.getElementById("background-video");

if (backgroundVideo) {
    backgroundVideo.muted = true;
    backgroundVideo.loop = true;
    backgroundVideo.playsInline = true;

    const startVideo = () => {
        const playPromise = backgroundVideo.play();

        if (playPromise !== undefined) {
            playPromise.catch(() => {
                // El navegador puede bloquear autoplay hasta que exista interacción.
            });
        }
    };

    backgroundVideo.addEventListener("loadeddata", startVideo);
    backgroundVideo.addEventListener("canplay", startVideo);

    startVideo();
}

/* Menú móvil */
const menuToggle = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".navigation");

if (menuToggle && navigation) {
    menuToggle.addEventListener("click", () => {
        const isOpen = navigation.classList.toggle("is-open");
        menuToggle.setAttribute("aria-expanded", String(isOpen));
    });

    navigation.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
            navigation.classList.remove("is-open");
            menuToggle.setAttribute("aria-expanded", "false");
        });
    });
}

/* Animaciones de entrada */
const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window && revealElements.length > 0) {
    const observer = new IntersectionObserver(
        (entries, currentObserver) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    currentObserver.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.12
        }
    );

    revealElements.forEach((element) => observer.observe(element));
} else {
    revealElements.forEach((element) => {
        element.classList.add("visible");
    });
}
