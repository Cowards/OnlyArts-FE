const menuBtn = document.querySelector("#menu-btn");
const sideBar = document.querySelector("#sidebar");
const sideBarImg = document.querySelector("#sidebar-img");

menuBtn.addEventListener("click", () => {
  sideBarImg.src = sideBar.classList.toggle("show")
    ? "/img/logo.png"
    : "/img/logo-no-text.png";
});

const navList = sideBar.querySelectorAll("li");
navList.forEach((navItem) => {
  const currentPath = window.location.pathname;
  const navLink = navItem.querySelector("a");
  if (currentPath.includes(navLink.getAttribute("href"))) {
    navItem.classList.add("active");
  }
});
