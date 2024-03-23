const menuBtn = document.querySelector("#menu-btn");
const sideBar = document.querySelector("#sidebar");
const sideBarImg = document.querySelector("#sidebar-img");

menuBtn.addEventListener("click", () => {
  sideBarImg.src = sideBar.classList.toggle("show")
    ? "../img/logo.png"
    : "../img/logo-no-text.png";
});
