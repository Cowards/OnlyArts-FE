import http from "./http.js";
const loadAccountInfo = async () => {
  const AD = ["about", "contact", "login", "request"];
  const CR = ["dashboard", "account", "artwork", "login"];
  const CT = ["dashboard", "account", "artwork", "login"];
  const GS = [
    "dashboard",
    "account",
    "artwork",
    "logout",
    "request",
    "notification",
  ];
  try {
    const accountInfo = await http.send("GET", "/api/v4/user");
    const accountName = document.querySelector("#profile-name");
    accountName.textContent =
      accountInfo.firstName + " " + accountInfo.lastName;
    const sideBarMenu = document.querySelector(".side-menu");
    const menuItems = sideBarMenu.querySelectorAll("li");
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
  } catch (err) {
    localStorage.removeItem("authtoken");
    const sideBarMenu = document.querySelector(".side-menu");
    const menuItems = sideBarMenu.querySelectorAll("li");
    menuItems.forEach((item) => {
      if (GS.includes(item.id)) {
        item.style.display = "none";
      } else {
        item.style.display = "block";
      }
    });
  }
};
loadAccountInfo();
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
    const artworkImg = await http.send(
      "GET",
      `/api/v1/image/${artwork.artworkImage}`
    );
    const owner = await http.send("GET", `/api/v4/user/${artwork.ownerId}`);
    const reaction = await http.send(
      "GET",
      `/api/v2/reactions/${artwork.artworkId}`
    );
    artworkCardHoler.innerHTML += `
      <div class="card">
      <a class="product-block" href="/discover/artwork/${artwork.artworkId}">
        <div class="card-img img">
        <img src="${artworkImg.imageData}" alt="" />
        </div>
        <div class="product-info">
        ${
          artwork.premium
            ? `<div class="premium-tag">
            <img src="../img/cta.png" alt="" />
            </div>`
            : ""
        }
        <button class="favor-btn" data-id="${artwork.artworkId}">
          <i class="bx bx-archive-in">Favor</i>
        </button>
        <p class="product-bottom">${artwork.name}</p>
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
loadArtworks();

export { loadAccountInfo, loadArtworks };
