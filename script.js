
console.log("Portfolio JavaScript loaded!");

// Reusable function to select elements
function getElement(id) {
  return document.getElementById(id);
}

// Feature 1: Dark mode with Local Storage
const themeToggle = getElement("themeToggle");

function applyTheme(theme) {
  document.body.classList.toggle(
    "dark-mode",
    theme === "dark"
  );

  themeToggle.textContent =
    theme === "dark" ? "Light Mode" : "Dark Mode";

  localStorage.setItem("portfolioTheme", theme);
}

const savedTheme = localStorage.getItem("portfolioTheme");
applyTheme(savedTheme || "light");

themeToggle.addEventListener("click", function () {
  const isDark = document.body.classList.contains("dark-mode");
  applyTheme(isDark ? "light" : "dark");
});

// Feature 2: Show/Hide About Me
getElement("toggleAbout").addEventListener("click", function () {
  const aboutText = getElement("aboutText");

  aboutText.hidden = !aboutText.hidden;

  this.textContent = aboutText.hidden
    ? "Show About"
    : "Hide About";
});

// Feature 3: Live character counter
getElement("message").addEventListener("input", function () {
  getElement("messageCount").textContent =
    `${this.value.length}/500 characters`;
});

// Reusable function to display errors
function showError(id, message) {
  getElement(id).textContent = message;
}

// Feature 4: Form validation
getElement("contactForm").addEventListener("submit", function (event) {
  event.preventDefault();

  const name = getElement("name").value.trim();
  const email = getElement("email").value.trim();
  const message = getElement("message").value.trim();

  // Clear previous errors
  showError("nameError", "");
  showError("emailError", "");
  showError("messageError", "");
  showError("formStatus", "");

  let isValid = true;

  if (name.length < 2) {
    showError("nameError", "Name must have at least 2 characters.");
    isValid = false;
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailPattern.test(email)) {
    showError("emailError", "Please enter a valid email address.");
    isValid = false;
  }

  if (message.length < 10) {
    showError(
      "messageError",
      "Message must be at least 10 characters."
    );
    isValid = false;
  }

  if (!isValid) {
    showError("formStatus", "Please correct the errors above.");
    return;
  }

  showError(
    "formStatus",
    "Validation successful! Your form is ready to submit."
  );

  this.reset();
  getElement("messageCount").textContent = "0/500 characters";
});
