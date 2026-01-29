const toggle = document.getElementById("themeToggle");
const body = document.body;

if (localStorage.getItem("theme") === "dark") {
  body.classList.add("dark");
}

toggle.addEventListener("click", () => {
  body.classList.toggle("dark");
  localStorage.setItem("theme", body.classList.contains("dark") ? "dark" : "light");
});

const roles = [
  "Java Backend Developer",
  "Full Stack Learner",
  "Problem Solver",
  "Software Engineering Enthusiast"
];

let roleIndex = 0;
let charIndex = 0;
const animatedText = document.getElementById("animatedText");

function type() {
  if (charIndex < roles[roleIndex].length) {
    animatedText.textContent += roles[roleIndex][charIndex];
    charIndex++;
    setTimeout(type, 100);
  } else {
    setTimeout(erase, 1500);
  }
}

function erase() {
  if (charIndex > 0) {
    animatedText.textContent = roles[roleIndex].substring(0, charIndex - 1);
    charIndex--;
    setTimeout(erase, 60);
  } else {
    roleIndex = (roleIndex + 1) % roles.length;
    setTimeout(type, 400);
  }
}

type();
