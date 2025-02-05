document.addEventListener("DOMContentLoaded", function () {
  const authButton = document.getElementById("authButton");

  function updateAuthButton() {
      const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
      const registeredEmail = localStorage.getItem("registeredEmail");

      if (isLoggedIn && registeredEmail) {
          authButton.innerHTML = `<img src="twitter.png" alt="Profile" width="40" height="40" class="rounded-circle">`;
          authButton.removeAttribute("data-bs-toggle");
          authButton.removeAttribute("data-bs-target");
      } else if (registeredEmail) {
          authButton.innerHTML = "Log In";
          authButton.setAttribute("data-bs-toggle", "modal");
          authButton.setAttribute("data-bs-target", "#loginModal");
      } else {
          authButton.innerHTML = "Sign In";
          authButton.setAttribute("data-bs-toggle", "modal");
          authButton.setAttribute("data-bs-target", "#userFormModal");
      }
  }

  // Call function on page load
  updateAuthButton();

  // Handle Sign-Up Form Submission with Validation
  document.getElementById("userForm").addEventListener("submit", function (event) {
      event.preventDefault();
      let isValid = true;

      const firstName = document.getElementById("firstName");
      const lastName = document.getElementById("lastName");
      const email = document.getElementById("email");
      const password = document.getElementById("password");
      const mobileNumber = document.getElementById("mobileNumber");

      const mobileRegex = /^[0-9]{10}$/;
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      // Validate First Name
      if (firstName.value.trim() === "") {
          firstName.classList.add("is-invalid");
          isValid = false;
      } else {
          firstName.classList.remove("is-invalid");
      }

      // Validate Last Name
      if (lastName.value.trim() === "") {
          lastName.classList.add("is-invalid");
          isValid = false;
      } else {
          lastName.classList.remove("is-invalid");
      }

      // Validate Mobile Number
      if (!mobileRegex.test(mobileNumber.value.trim())) {
          mobileNumber.classList.add("is-invalid");
          isValid = false;
      } else {
          mobileNumber.classList.remove("is-invalid");
      }

      // Validate Email
      if (!emailRegex.test(email.value.trim())) {
          email.classList.add("is-invalid");
          isValid = false;
      } else {
          email.classList.remove("is-invalid");
      }

      // Validate Password (Min 6 characters)
      if (password.value.trim().length < 6) {
          password.classList.add("is-invalid");
          isValid = false;
      } else {
          password.classList.remove("is-invalid");
      }

      if (!isValid) return;

      // Store the password with email as key in localStorage
      localStorage.setItem(email.value.trim(), btoa(password.value.trim())); // Encrypt password using email as key

      // Store email in localStorage
      localStorage.setItem("registeredEmail", email.value.trim());

      bootstrap.Modal.getInstance(document.getElementById("userFormModal")).hide();

      updateAuthButton(); // Change button to "Log In"

      setTimeout(() => {
          new bootstrap.Modal(document.getElementById("loginModal")).show();
      }, 500);
  });

  // Handle Login Form Submission
  document.getElementById("loginForm").addEventListener("submit", function (event) {
      event.preventDefault();

      const loginEmail = document.getElementById("loginEmail").value.trim();
      const loginPassword = document.getElementById("loginPassword").value.trim();
      const storedPassword = localStorage.getItem(loginEmail); // Get password associated with email

      if (storedPassword && loginPassword === atob(storedPassword)) { // Decrypt stored password and compare
          alert("Login Successful! 🎉");
          localStorage.setItem("isLoggedIn", "true");

          bootstrap.Modal.getInstance(document.getElementById("loginModal")).hide();

          updateAuthButton(); // Change to Profile Image
      } else {
          alert("Invalid credentials!");
      }
  });

  // Handle Forgot Password
  const forget = () => {
      const storedEmail = localStorage.getItem("registeredEmail");
      const storedPassword = localStorage.getItem(storedEmail); // Retrieve password for the registered email
      if (storedPassword) {
              alert(`Your password is: ${atob(storedPassword)}`); // Decrypt and show password
      } else {
          alert("No password found!");
      }
  };

  document.getElementById("forgotPassword").addEventListener("click", forget);
});
