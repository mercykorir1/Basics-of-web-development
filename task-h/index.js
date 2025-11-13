// index.js
// Author: Mercy Korir
// Date: 2025-11-06
// Handles form validation and adding new registration rows 

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("registerForm");
  const tableBody = document.querySelector("#timetable tbody");

  // Fill timestamp on page load
  const timestampInput = document.getElementById("timestamp");
  timestampInput.value = new Date().toISOString();

  // Helper: validation rules
  function validate() {
    let isValid = true;

    // Full Name: at least 2 words
    const fullName = document.getElementById("fullName").value.trim();
    const fullNameError = document.getElementById("fullNameError");
    if (!fullName || fullName.split(" ").length < 2 || fullName.split(" ").some(w => w.length < 2)) {
      fullNameError.textContent = "Please enter your full name (first and last, ≥2 chars each).";
      isValid = false;
    } else {
      fullNameError.textContent = "";
    }

    // Email: simple regex check
    const email = document.getElementById("email").value.trim();
    const emailError = document.getElementById("emailError");
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      emailError.textContent = "Please enter a valid email address.";
      isValid = false;
    } else {
      emailError.textContent = "";
    }

    // Phone: Finnish +358 pattern
    const phone = document.getElementById("phone").value.trim();
    const phoneError = document.getElementById("phoneError");
    const phoneRegex = /^\+358\s?\d{2,3}\s?\d{4,5}$/;
    if (!phoneRegex.test(phone)) {
      phoneError.textContent = "Please enter a Finnish phone number starting with +358.";
      isValid = false;
    } else {
      phoneError.textContent = "";
    }

    // Birth date: not in the future, min age 13
    const birthDate = document.getElementById("birthDate").value;
    const birthDateError = document.getElementById("birthDateError");
    const today = new Date();
    const birth = new Date(birthDate);
    const age = today.getFullYear() - birth.getFullYear() - (today.getMonth() < birth.getMonth() || (today.getMonth() === birth.getMonth() && today.getDate() < birth.getDate()) ? 1 : 0);
    if (!birthDate) {
      birthDateError.textContent = "Please enter your birth date.";
      isValid = false;
    } else if (birth > today) {
      birthDateError.textContent = "Birth date cannot be in the future.";
      isValid = false;
    } else if (age < 16) {
      birthDateError.textContent = "You must be at least 16 years old.";
      isValid = false;
    } else {
      birthDateError.textContent = "";
    }

    // Terms checkbox
    const terms = document.getElementById("terms").checked;
    const termsError = document.getElementById("termsError");
    if (!terms) {
      termsError.textContent = "You must accept the terms to register.";
      isValid = false;
    } else {
      termsError.textContent = "";
    }

    return isValid;
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    if (!validate()) return;

    // Create a new row
    const row = document.createElement("tr");
    const fields = ["timestamp", "fullName", "email", "phone", "birthDate"];
    fields.forEach(id => {
      const cell = document.createElement("td");
      cell.textContent = document.getElementById(id).value;
      row.appendChild(cell);
    });

    tableBody.appendChild(row);

    form.reset();
    timestampInput.value = new Date().toISOString();
  });
});
