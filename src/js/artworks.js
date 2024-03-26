import http from "./http.js";
import { loadAccountInfo } from "./home.js";
loadAccountInfo();
const currentPage = window.location.pathname.split("/")[2];
const artworkCardHoler = document.querySelector(".artworks-data");
const loadArtworksManage = async () => {
  const currentPage = window.location.pathname.split("/")[2];
  const prevBtn = document.querySelector("#prev-manage");
  const nextBtn = document.querySelector("#next-manage");

  const artworks = await http.send(
    "GET",
    `/api/v2/artworks/offset/${currentPage}`
  );
  artworks.forEach(async (artwork) => {
    const artworkImg = await http.send(
      "GET",
      `/api/v1/image/${artwork.artworkImage}`
    );
    let status = artwork.private ? "Private" : "Public";
    status = artwork.removed ? "Removed" : status;
    status = artwork.banned ? "Banned" : status;
    artworkCardHoler.innerHTML += `
        <tr>
          <td class="img"><img src="${
            artworkImg.imageData
          }" alt="artwork" /></td>
          <td><p>${artwork.name}</p></td>
          <td class="description">
            <p>${artwork.description}</p>
          </td>
          <td><p>${artwork.price > 0 ? "Premium" : "Free"}</p></td>
          <td><p>${status}</p></td>
          <td>
            <form action="">
              <input type="text" name="id" value="${
                artwork.artworkId
              }" hidden="" />
              <button class="block" type="submit">
                <i class="bx bx-block"></i>
              </button>
            </form>
          </td>
        </tr>
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
    window.location.href = `/artworks/${parseInt(currentPage) - 1}`;
  });
  nextBtn.addEventListener("click", () => {
    window.location.href = `/artworks/${parseInt(currentPage) + 1}`;
  });
};

artworkCardHoler.addEventListener("click", async (e) => {
  e.preventDefault();
  console.log(e.target);
  const form = e.target.closest("form");
  const formData = new FormData(form);
  const artworkId = formData.get("id");
  if (e.target.className.includes("block")) {
    await http.send("PUT", `/api/v3/artworks/ban/${artworkId}`);
  }
  window.location.reload();
});

loadArtworksManage();
console.log(currentPage);
