

const root = document.documentElement;
const menuToggle = document.getElementById("menuToggle");
const nav = document.getElementById("nav");
const themeToggle = document.getElementById("themeToggle");
const contactForm = document.getElementById("contact-form");


menuToggle.addEventListener("click", () => {
    nav.classList.toggle("active");
});

document.querySelectorAll(".nav a").forEach(link => {
    link.addEventListener("click", () => {
        nav.classList.remove("active");
    });
});


const savedTheme = localStorage.getItem("theme");
if (savedTheme) {
    root.setAttribute("data-theme", savedTheme);
}

themeToggle.addEventListener("click", () => {
    const nextTheme =
        root.getAttribute("data-theme") === "dark" ? "light" : "dark";

    root.setAttribute("data-theme", nextTheme);
    localStorage.setItem("theme", nextTheme);
});


const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav a");

const navObserver = new IntersectionObserver(
    entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navLinks.forEach(link => {
                    link.classList.toggle(
                        "active",
                        link.getAttribute("href").slice(1) === entry.target.id
                    );
                });
            }
        });
    },
    {
        threshold: 0.5
    }
);

sections.forEach(section => navObserver.observe(section));


const revealObserver = new IntersectionObserver(
    entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                revealObserver.unobserve(entry.target);
            }
        });
    },
    {
        threshold: 0.1
    }
);

sections.forEach(section => {
    section.classList.add("section-reveal");
    revealObserver.observe(section);
});


document.getElementById("year").textContent = new Date().getFullYear();


(function () {
    emailjs.init("Gs0ZXQu9DDewzeiHv"); 
})();

contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const submitBtn = contactForm.querySelector("button");
    submitBtn.disabled = true;
    submitBtn.textContent = "Sending...";

    emailjs.sendForm(
        "service_rus3ke9",
        "template_hnivty7",
        this
    ).then(
        () => {
            alert("✅ Message sent successfully!");
            contactForm.reset();
            submitBtn.disabled = false;
            submitBtn.textContent = "Send Message";
        },
        () => {
            alert("❌ Failed to send message. Please try again.");
            submitBtn.disabled = false;
            submitBtn.textContent = "Send Message";
        }
    );
});