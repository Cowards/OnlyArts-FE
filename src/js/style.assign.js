const eyeicon = document.querySelector("#eyeicon");
const password = document.querySelector("#password");
const password2 = document.querySelector("#confirm");

eyeicon.addEventListener("click", () => {
  if (password.type === "password") {
    password.type = "text";
    if (password2) {
      password2.type = "text";
    }
    eyeicon.src = "../img/eye-open.png";
  } else {
    password.type = "password";
    if (password2) {
      password2.type = "password";
    }
    eyeicon.src = "../img/eye-close.png";
  }
});
