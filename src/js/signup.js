import http from "./http.js";
const signUpForm = document.querySelector(".login-form");
const formData = new FormData(signUpForm);
const errorMsg = document.querySelector("#login-error-message");

signUpForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  try {
    const firstName = document.querySelector("#firstName");
    const lastName = document.querySelector("#lastName");
    const email = document.querySelector("#email");
    const password = document.querySelector("#password");
    const confirm = document.querySelector("#confirm");
    const role = document.querySelector("#role");
    const data = {
      email: email.value,
      password: password.value,
      firstName: firstName.value,
      lastName: lastName.value,
      roleId: role.value,
    };
    const passwrodPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/g;
    if (!passwrodPattern.test(password.value))
      throw "Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, and one number";
    if (password.value !== confirm.value)
      throw "Password and confirm password must be the same";
    const token = await http.send("POST", "/api/v1/authen/register", data);
    localStorage.setItem("authtoken", token.tokenString);
    window.location.href = "/";
  } catch (error) {
    errorMsg.textContent = error;
  }
});
