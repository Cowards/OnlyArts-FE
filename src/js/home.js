import http from "./http.js";
const loadAccountInfo = async () => {
  const AD = ["discover", "index", "contact", "login", "cart", "notification"];
  const CR = ["dashboard", "account", "artwork", "cart", "purchased", "login"];
  const CT = ["dashboard", "account", "artwork", "login"];
  const GS = [
    "dashboard",
    "account",
    "artwork",
    "logout",
    "cart",
    "notification",
  ];
  const accountLink = document.querySelector("#profile-link");
  try {
    const accountInfo = await http.send("GET", "/api/v4/user");
    const accountName = document.querySelector("#profile-name");
    accountName.textContent =
      accountInfo.firstName + " " + accountInfo.lastName;
    const sideBarMenu = document.querySelector(".side-menu");
    const menuItems = sideBarMenu.querySelectorAll("li");
    accountLink.href = `/profile/${accountInfo.userId}`;
    menuItems.forEach((item) => {
      if (accountInfo.roleId === "AD") {
        if (AD.includes(item.id)) {
          item.style.display = "none";
        } else {
          item.style.display = "block";
        }
      } else if (accountInfo.roleId === "CR") {
        if (CR.includes(item.id)) {
          item.style.display = "none";
        } else {
          item.style.display = "block";
        }
      } else if (accountInfo.roleId === "CT") {
        if (CT.includes(item.id)) {
          item.style.display = "none";
        } else {
          item.style.display = "block";
        }
      }
    });
    if (accountInfo.roleId === "AD") {
      document.querySelector("#main-search-form").style.display = "none";
      document.querySelector("li#dashboard>a").href = "/dashboard/admin";
    }
  } catch (err) {
    localStorage.removeItem("authtoken");
    const sideBarMenu = document.querySelector(".side-menu");
    const menuItems = sideBarMenu.querySelectorAll("li");
    accountLink.href = "/login";
    menuItems.forEach((item) => {
      if (GS.includes(item.id)) {
        item.style.display = "none";
      } else {
        item.style.display = "block";
      }
    });
  }
};
const artworkCardHoler = document.querySelector(".card-holder");
const loadArtworks = async () => {
  const currentPage = window.location.pathname.split("/")[2];
  const prevBtn = document.querySelector("#prev");
  const nextBtn = document.querySelector("#next");

  const artworks = await http.send(
    "GET",
    `/api/v2/artworks/offset/${currentPage}`
  );
  artworks.forEach(async (artwork) => {
    if (artwork.banned || artwork.removed) {
      return;
    }
    const artworkImg = await http.send(
      "GET",
      `/api/v1/image/${artwork.artworkImage}`
    );
    const owner = await http.send("GET", `/api/v4/user/${artwork.ownerId}`);
    const reaction = await http.send(
      "GET",
      `/api/v2/reactions/${artwork.artworkId}`
    );
    const category = await http.send(
      "GET",
      `/api/v3/categories/${artwork.cateId}`
    );
    artworkCardHoler.innerHTML += `
      <div class="card">
      <a class="product-block" href="/discover/artwork/${artwork.artworkId}">
        <div class="card-img img">
        <img src="${artworkImg.imageData}" alt="" />
        </div>
        <div class="product-info">
        ${
          artwork.price
            ? `<div class="premium-tag">
            <img src="../img/cta.png" alt="" />
            </div>`
            : ""
        }
        <div class="favor-btn">${category.cateName}</div>
        <div class="product-bottom">
          <p class="product-name">${artwork.name}</p>
          ${
            artwork.price
              ? `<p class="product-price">$ ${artwork.price}</p>`
              : ""
          }
        </div>
        </div>
      </a>
      <div class="creator-block">
        <a class="creator-link" href="#">${
          owner.firstName + " " + owner.lastName
        }</a>
        <div class="reaction">
        <i class="bx bxs-heart"></i>
        <p class="reaction-count">${reaction.length}</p>
        </div>
      </div>
      </div>
    `;
  });

  if (currentPage === "1") {
    prevBtn.style.opacity = "0";
  }
  if (artworks.length < 28) {
    nextBtn.style.opacity = "0";
  }
  prevBtn.addEventListener("click", () => {
    if (parseInt(currentPage) === 1) {
      return;
    }
    window.location.href = `/home/${parseInt(currentPage) - 1}`;
  });
  nextBtn.addEventListener("click", () => {
    window.location.href = `/home/${parseInt(currentPage) + 1}`;
  });
};

export { loadAccountInfo, loadArtworks };

loadAccountInfo();
loadArtworks();
