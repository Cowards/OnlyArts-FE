import http from "./http.js";
import { loadAccountInfo } from "./home.js";
loadAccountInfo();
const artworkCardHolder = document.querySelector(".card-holder");
const categoryForm = document.querySelector("#category-form");
categoryForm.addEventListener("click", async (e) => {
  e.preventDefault();
  const label = e.target.closest("label");
  if (label) {
    window.location.href = `/discover/${label.htmlFor}`;
  }
});
const category = window.location.pathname.split("/")[2];
const checkBoxs = document.querySelectorAll(".cate-checkbox");
console.log(checkBoxs);
console.log(category);
checkBoxs.forEach((checkbox) => {
  if (checkbox.id === category) {
    checkbox.checked = true;
  }
});

const loadArtworks = async () => {
  const artworks = await http.send("GET", `/api/v2/artworks/type/${category}`);
  artworks.forEach(async (artwork) => {
    if (artwork.banned || artwork.removed) {
      return;
    }
    const artworkImg = await http.send(
      "GET",
      `/api/v1/image/${artwork.artworkImage}`
    );
    const reaction = await http.send(
      "GET",
      `/api/v2/reactions/${artwork.artworkId}`
    );
    artworkCardHolder.innerHTML += `
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
        <a class="creator-link" href="#">${artwork.ownerId}</a>
        <div class="reaction">
        <i class="bx bxs-heart"></i>
        <p class="reaction-count">${reaction.length}</p>
        </div>
      </div>
      </div>
    `;
  });
};
loadArtworks();
