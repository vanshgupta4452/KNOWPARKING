document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");
  const registerForm = document.getElementById("registerForm");
  const loginBtn = document.getElementById("loginBtn");
  const registerBtn = document.getElementById("registerBtn");

  function registerUser(event) {
    event.preventDefault();
    const registerUserId = document.getElementById("registerUserId").value;
    const registerEmail = document.getElementById("registerEmail").value;
    const registerPassword = document.getElementById("registerPassword").value;

    const userData = {
      username: registerUserId,
      email: registerEmail,
      password: registerPassword,
    };

    fetch("http://localhost:8000/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Registration failed.");
        }
      })
      .then((data) => {
        alert(data.message);
        // Redirect or do something after successful registration
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Registration failed. Please try again.");
      });
  }

  function loginUser(event) {
    event.preventDefault();
    const loginUserId = document.getElementById("loginUserId").value;
    const loginPassword = document.getElementById("loginPassword").value;

    const userData = {
      email: loginUserId,
      password: loginPassword,
    };

    fetch("http://localhost:8000/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Login failed.");
        }
      })
      .then((data) => {
        alert("Login successful!");
        localStorage.setItem("token", data.token);
        // Redirect or do something after successful login
        window.location.href = "/frontend/booking.html";
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Login failed. Please try again.");
      });
  }

  // Event listener for login form submission
  loginForm.addEventListener("submit", loginUser);

  // Event listener for register form submission
  registerForm.addEventListener("submit", registerUser);

  // Event listener for login button click
  loginBtn.addEventListener("click", () => {
    document.getElementById("loginForm").style.left = "50px";
    document.getElementById("registerForm").style.left = "450px";
    document.getElementById("btn").style.left = "0";
  });

  // Event listener for register button click
  registerBtn.addEventListener("click", () => {
    document.getElementById("loginForm").style.left = "-400px";
    document.getElementById("registerForm").style.left = "50px";
    document.getElementById("btn").style.left = "110px";
  });

});
