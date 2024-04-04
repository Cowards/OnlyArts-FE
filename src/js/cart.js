import http from "./http.js";
import { loadAccountInfo } from "./home.js";
loadAccountInfo();

const loadCartInfo = async () => {
  const cartArtworks = await http.send("GET", "/api/v3/cart");
  let total = 0;
  const cart = document.querySelector(".cart-item-list");
  cartArtworks.forEach(async (artwork) => {
    total += artwork.price;
    const artworkImg = await http.send(
      "GET",
      `/api/v1/image/${artwork.artworkImage}`
    );
    cart.innerHTML += `
        <div class="cart-item-block">
            <div class="cart-item-img img">
                <img src="${artworkImg.imageData}" alt="" />
            </div>
            <div class="cart-item-info">
                <div class="cart-item-title"><h3>${artwork.name}</h3></div>
                <div class="cart-item-price"><p>$ ${artwork.price}</p></div>
                <div class="cart-item-remove">
                    <button dataId="${artwork.artworkId}"><i class="bx bx-trash"></i></button>
                </div>
            </div>
        </div>
    `;
  });
  const totalCart = document.querySelector(".cart-total-info>.price");
  totalCart.innerHTML = `$ ${total}`;
};
loadCartInfo();

document
  .querySelector(".cart-item-list")
  .addEventListener("click", async (e) => {
    if (e.target.tagName === "I") {
      const artworkId = e.target.parentElement.getAttribute("dataId");
      await http.send("PUT", `/api/v3/cart`, { artworkId });
      location.reload();
    }
    if (e.target.tagName === "BUTTON") {
      const artworkId = e.target.getAttribute("dataId");
      await http.send("PUT", `/api/v3/cart`, { artworkId });
      location.reload();
    }
  });

const checkoutBtn = document.querySelector(".checkout-btn");
checkoutBtn.addEventListener("click", () => {
  const totalCart = document.querySelector(".cart-total-info>.price");
  const total = totalCart.innerHTML.split(" ")[1];
  if (total === "0") {
    alert("Your cart is empty");
  } else {
    window.location.href = "/checkout";
  }
});
