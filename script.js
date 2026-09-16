const menuToggle = document.getElementById("menu-toggle");
const navbar = document.getElementById("navbar");
const navLinks = document.querySelectorAll(".navbar a");
const sections = document.querySelectorAll("section");
const typingText = document.getElementById("typing-text");
const year = document.getElementById("year");

const words = [
    "Data Analyst",
    "Business Intelligence",
    "Business Development"
];

let wordIndex = 0;
let charIndex = 0;
let deleting = false;

function typeEffect() {
    const currentWord = words[wordIndex];

    if (!deleting) {
        typingText.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;

        if (charIndex === currentWord.length) {
            deleting = true;
            setTimeout(typeEffect, 1500);
            return;
        }
    } else {
        typingText.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;

        if (charIndex === 0) {
            deleting = false;
            wordIndex = (wordIndex + 1) % words.length;
        }
    }

    setTimeout(typeEffect, deleting ? 60 : 100);
}

menuToggle.addEventListener("click", () => {
    navbar.classList.toggle("active");
    menuToggle.textContent = navbar.classList.contains("active") ? "✕" : "☰";
});

navLinks.forEach(link => {
    link.addEventListener("click", () => {
        navbar.classList.remove("active");
        menuToggle.textContent = "☰";
    });
});

window.addEventListener("scroll", () => {
    let current = "home";

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 150;

        if (window.scrollY >= sectionTop) {
            current = section.getAttribute("id");
        }
    });

    navLinks.forEach(link => {
        link.classList.remove("active");

        if (link.getAttribute("href") === `#${current}`) {
            link.classList.add("active");
        }
    });
});

year.textContent = new Date().getFullYear();
typeEffect();
