const body = document.querySelector("body");
const openButton = document.querySelector(".open__button");
const closeButton = document.querySelector(".close__button");

// Function to update aria attributes on ALL menu control buttons
function updateMenuAttributes(isOpen) {
  const state = isOpen ? "true" : "false";
  openButton.setAttribute("aria-expanded", state);
  closeButton.setAttribute("aria-expanded", state);
}

function initMenu() {
  // Closing and opening upon clicking the corresponding buttons
  openButton.addEventListener("click", () => {
    body.classList.add("menu__active");
    updateMenuAttributes(true);
    // move focus to the close button or the first link inside the menu
    closeButton.focus();
  });

  closeButton.addEventListener("click", () => {
    body.classList.remove("menu__active");
    updateMenuAttributes(false);
    // return focus to the open button so the user doesn't get lost
    openButton.focus();
  });

  // Close on Escape key press
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && body.classList.contains("menu__active")) {
      body.classList.remove("menu__active");
      updateMenuAttributes(false);
      // Возвращаем фокус
      openButton.focus();
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initMenu();
});

function emailValidate() {
  const roots = document.querySelectorAll(".form__email");
  // Check if any forms were found at all
  if (!roots.length) return;

  roots.forEach((root) => {
    // We use querySelector, since inside EACH form there is only ONE input, ONE error and ONE button
    const emailInput =
      root.querySelector('input[type="email"]') || root.querySelector("#email");
    const errorMsg = root.querySelector(".error-msg");
    const emailSubmit =
      root.querySelector(".email-btn") || root.querySelector("#email-btn");

    // Safety check: if any form is missing elements, skip it to avoid errors.
    if (!emailInput || !errorMsg || !emailSubmit) return;

    // Regular expression for email validation
    const mailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    // Function to hide the error
    function setValid() {
      errorMsg.style.display = "none";
      emailInput.style.borderColor = "";
    }

    // Function to display an error
    function setInvalid() {
      errorMsg.style.display = "block";
      emailInput.style.borderColor = "red";
    }

    // Check on every character input
    emailInput.addEventListener("input", () => {
      if (emailInput.value === "" || mailRegex.test(emailInput.value)) {
        setValid();
      } else {
        setInvalid();
      }
    });

    // Check upon clicking the submit button (no longer using forEach, since there is only one button within the current form)
    emailSubmit.addEventListener("click", (event) => {
      // Prevent form submission for validation
      event.preventDefault();

      if (!mailRegex.test(emailInput.value)) {
        setInvalid();
      } else {
        setValid();
        // You can submit a specific form here: root.submit();
      }
    });
  });
}

emailValidate();

function contactFormValidate() {
  const form = document.querySelector(".contact__form");
  if (!form) return;

  const nameInput = form.querySelector("#name");
  const emailAdress = form.querySelector("#emailAdress");
  const messageText = form.querySelector("#message");

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    // First, check mandatory fields for emptiness
    const isRequiredValid = checkRequired([
      nameInput,
      emailAdress,
      messageText,
    ]);

    // If all fields are filled in, perform detailed format validation.
    if (isRequiredValid) {
      const isNameInputValid = checkLength(nameInput, 3, 15, "Name");
      const isEmailValid = checkEmail(emailAdress);
      // Pass min=3, max=Infinity (so the message can be of any length) and the field name "Message"
      const isMessageValid = checkLength(messageText, 3, Infinity, "Message");

      const isFormValid = isNameInputValid && isEmailValid && isMessageValid;

      if (isFormValid) {
       // For testing
        alert("Form submitted successfully!"); 

        // Clear the form and remove success/error classes
        form.reset();
        document.querySelectorAll(".form-group").forEach((group) => {
          group.classList.remove("error", "success");
        });
      }
    }
  });

  function checkEmail(emailAdress) {
    const mailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (mailRegex.test(emailAdress.value.trim())) {
      showSuccess(emailAdress);
      return true;
    } else {
      showError(emailAdress, `Please use a valid email address`);
      return false;
    }
  }

  // added the fieldName argument for nicely formatted error output
  function checkLength(input, min, max, fieldName) {
    const valueLength = input.value.trim().length;

    if (valueLength < min) {
      showError(input, `${fieldName} must be at least ${min} characters`);
      return false;
    } else if (valueLength > max) {
      showError(input, `${fieldName} must be less than ${max} characters`);
      return false;
    } else {
      showSuccess(input);
      return true;
    }
  }

  function checkRequired(inputArray) {
    let isValid = true;

    inputArray.forEach((input) => {
      if (input.value.trim() === "") {
        showError(input, `This field can't be empty`);
        isValid = false;
      } else {
        showSuccess(input);
      }
    });
    return isValid;
  }

  function showError(input, message) {
    const formGroup = input.parentElement;
    formGroup.className = "form-group error";
    const small = formGroup.querySelector("small");
    small.innerText = message;
  }

  function showSuccess(input) {
    const formGroup = input.parentElement;
    formGroup.className = "form-group success";
  }
}

contactFormValidate();
