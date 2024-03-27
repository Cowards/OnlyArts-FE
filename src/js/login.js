import http from "./http.js";
const loginForm = document.querySelector(".login-form");
loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const formData = new FormData(loginForm);
  const email = formData.get("email");
  const password = formData.get("password");
  try {
    const res = await http.send("POST", "/api/v1/authentication/login", {
      email,
      password,
    });
    const authToken = res.tokenString;
    localStorage.setItem("authtoken", authToken);
    localStorage.setItem("userId", res.userId);
    window.location.href = "/";
  } catch (err) {
    const error = document.querySelector("#login-error-message");
    error.textContent = err;
  }
});
