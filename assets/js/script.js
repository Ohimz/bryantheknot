// ==========================================
// CONFIGURATION
// ==========================================

const RSVP_ENDPOINT =
    "https://script.google.com/macros/s/AKfycbzlD0rkfhIUHu3-yD0breEYsyW9wCzu77RhLiUrmddob0UAIiODOs2Fint6cwJLyINM/exec";

history.scrollRestoration = "manual";


// ==========================================
// MOBILE MENU
// ==========================================

const menuBtn = document.querySelector(".menu-btn");
const navMenu = document.querySelector(".nav-links");

if (menuBtn && navMenu) {

    menuBtn.addEventListener("click", (e) => {

        e.stopPropagation();

        navMenu.classList.toggle("active");

        menuBtn.setAttribute(
            "aria-expanded",
            navMenu.classList.contains("active")
        );

    });

    document.querySelectorAll(".nav-links a").forEach(link => {

        link.addEventListener("click", () => {

            navMenu.classList.remove("active");
            menuBtn.setAttribute("aria-expanded", "false");

        });

    });

    document.addEventListener("click", (e) => {

        if (
            navMenu.classList.contains("active") &&
            !navMenu.contains(e.target) &&
            !menuBtn.contains(e.target)
        ) {

            navMenu.classList.remove("active");
            menuBtn.setAttribute("aria-expanded", "false");

        }

    });

    window.addEventListener("resize", () => {

        if (window.innerWidth > 992) {

            navMenu.classList.remove("active");
            menuBtn.setAttribute("aria-expanded", "false");

        }

    });

}


// ==========================================
// ACTIVE NAVIGATION LINK
// ==========================================

document.addEventListener("DOMContentLoaded", () => {

    const navLinks = document.querySelectorAll(".nav-links a");

    const sections = [
        "hero",
        "our-story",
        "memories",
        "wedding-details",
        "rsvp-section"
    ];

    function activateLink(id) {

        navLinks.forEach(link => link.classList.remove("active"));

        const activeLink = document.querySelector(
            `.nav-links a[href="#${id}"]`
        );

        if (activeLink) {
            activeLink.classList.add("active");
        }

    }

    window.addEventListener("scroll", () => {

        let current = "";

        sections.forEach(id => {

            const section = document.getElementById(id);

            if (!section) return;

            const top = section.offsetTop;
            const height = section.offsetHeight;
            const scroll = window.scrollY + 200;

            if (scroll >= top && scroll < top + height) {
                current = id;
            }

        });

        if (current) {
            activateLink(current);
        }

    });

});


// ==========================================
// COUNTDOWN TIMER
// ==========================================

const weddingDate = new Date("2026-09-26T12:00:00").getTime();

function updateCountdown() {

    const timer = document.getElementById("countdown-timer");

    if (!timer) return;

    const now = Date.now();
    const distance = weddingDate - now;

    if (distance < 0) {

        timer.innerHTML = "It's our wedding day!";

        return;

    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("days").textContent = days;
    document.getElementById("hours").textContent = hours;
    document.getElementById("minutes").textContent = minutes;
    document.getElementById("seconds").textContent = seconds;

}

updateCountdown();
setInterval(updateCountdown, 1000);


// ==========================================
// RSVP FORM SUBMISSION
// ==========================================

const form = document.getElementById("rsvpForm");

if (form) {

    form.addEventListener("submit", async (e) => {

        e.preventDefault();

        const formData = new FormData(form);

        try {

            const response = await fetch(RSVP_ENDPOINT, {
                method: "POST",
                body: formData
            });

            if (!response.ok) {
                throw new Error("Submission failed.");
            }

          const successMessage = document.getElementById("successMessage");

if (successMessage) {

    successMessage.hidden = false;

    successMessage.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });

}

    form.reset();

            window.location.hash = "rsvp-section";
        } catch (error) {

            console.error(error);

            alert(
                "Sorry, something went wrong while submitting your RSVP. Please try again."
            );

        }

    });

} 