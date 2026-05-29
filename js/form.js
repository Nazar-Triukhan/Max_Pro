// Form Handling
const form = document.getElementById("renovationForm");
const fileInput = document.getElementById("fileInput");
const fileLabel = document.querySelector(".form__file-label");
const fileNameDisplay = document.getElementById("fileName");
const successMessage = document.getElementById("successMessage");

if (!form) {
  console.error("Form #renovationForm not found");
}

if (fileInput && fileLabel && fileNameDisplay) {
  fileInput.addEventListener("change", (e) => {
    const files = e.target.files;

    if (files.length > 0) {
      fileLabel.classList.add("has-file");

      const fileNames = Array.from(files)
        .map((file) => file.name)
        .join(", ");

      fileNameDisplay.textContent = `${files.length} file(s) selected: ${fileNames}`;
    } else {
      fileLabel.classList.remove("has-file");
      fileNameDisplay.textContent = "";
    }
  });

  fileLabel.addEventListener("dragover", (e) => {
    e.preventDefault();
    fileLabel.style.borderColor = "var(--secondary-accent)";
    fileLabel.style.backgroundColor = "rgba(245, 166, 35, 0.15)";
  });

  fileLabel.addEventListener("dragleave", () => {
    fileLabel.style.borderColor = "";
    fileLabel.style.backgroundColor = "";
  });

  fileLabel.addEventListener("drop", (e) => {
    e.preventDefault();

    fileLabel.style.borderColor = "";
    fileLabel.style.backgroundColor = "";

    fileInput.files = e.dataTransfer.files;
    fileInput.dispatchEvent(new Event("change", { bubbles: true }));
  });
}

function getValue(id) {
  const element = document.getElementById(id);
  return element ? element.value.trim() : "";
}

function getChecked(id) {
  const element = document.getElementById(id);
  return element ? element.checked : false;
}

function clearErrors() {
  document.querySelectorAll(".form__error-message").forEach((msg) => {
    msg.classList.remove("show");
    msg.textContent = "";
  });

  document.querySelectorAll(".form__submit-error").forEach((msg) => {
    msg.remove();
  });
}

function showError(fieldName, message) {
  const errorElement = document.querySelector(`[data-error="${fieldName}"]`);

  if (errorElement) {
    errorElement.textContent = message;
    errorElement.classList.add("show");
  }
}

function validateForm() {
  const name = getValue("name");
  const email = getValue("email");
  const phone = getValue("phone");
  const projectType = getValue("projectType");
  const description = getValue("description");
  const agreement = getChecked("agreement");

  let isValid = true;

  clearErrors();

  if (!name) {
    showError("name", "Please enter your name");
    isValid = false;
  } else if (name.length < 2) {
    showError("name", "Name must be at least 2 characters");
    isValid = false;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!email) {
    showError("email", "Please enter your email");
    isValid = false;
  } else if (!emailRegex.test(email)) {
    showError("email", "Please enter a valid email");
    isValid = false;
  }

  if (phone && !/^[\d\s\-\+\(\)]+$/.test(phone)) {
    showError("phone", "Please enter a valid phone number");
    isValid = false;
  }

  if (!projectType) {
    showError("projectType", "Please select a project type");
    isValid = false;
  }

  if (!description) {
    showError("description", "Please describe your project");
    isValid = false;
  } else if (description.length < 10) {
    showError("description", "Description must be at least 10 characters");
    isValid = false;
  }

  if (!agreement) {
    showError("agreement", "Please agree to the terms");
    isValid = false;
  }

  return isValid;
}

function showSuccessMessage() {
  if (successMessage) {
    successMessage.textContent =
      "Thank you! Your request has been submitted successfully.";
    successMessage.classList.add("show");
    return;
  }

  const message = document.createElement("div");
  message.className = "form__success-message show";
  message.textContent =
    "Thank you! Your request has been submitted successfully.";

  form.appendChild(message);
}

function showSubmitError(submitBtn) {
  const submitError = document.createElement("div");
  submitError.className = "form__submit-error";
  submitError.textContent =
    "Something went wrong while sending the form. Please try again later.";

  submitBtn.insertAdjacentElement("afterend", submitError);

  setTimeout(() => {
    submitError.remove();
  }, 7000);
}

if (form) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const submitBtn = form.querySelector('button[type="submit"]');

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = "Sending...";
    }

    const formData = {
      name: document.getElementById('name').value,
      email: document.getElementById('email').value,
      phone: document.getElementById('phone').value,
      projectType: document.getElementById('projectType').value,
      description: document.getElementById('description').value,
    };

    try {
      const result = await sendFormToBackend(formData);
      console.log('Backend response:', result);

      showSuccessMessage();

      form.reset();

      if (fileLabel) {
        fileLabel.classList.remove("has-file");
      }

      if (fileNameDisplay) {
        fileNameDisplay.textContent = "";
      }
    } catch (error) {
      console.error("Form submission failed:", error);

      if (submitBtn) {
        showSubmitError(submitBtn);
      }
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = "Get Your Free Quote";
      }
    }
  });
}

const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const descriptionInput = document.getElementById("description");

if (nameInput) {
  nameInput.addEventListener("blur", function () {
    if (this.value.trim().length > 0 && this.value.trim().length < 2) {
      showError("name", "Name must be at least 2 characters");
    }
  });
}

if (emailInput) {
  emailInput.addEventListener("blur", function () {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (this.value.trim().length > 0 && !emailRegex.test(this.value)) {
      showError("email", "Please enter a valid email");
    }
  });
}

if (descriptionInput) {
  descriptionInput.addEventListener("blur", function () {
    if (this.value.trim().length > 0 && this.value.trim().length < 10) {
      showError("description", "Description must be at least 10 characters");
    }
  });
}