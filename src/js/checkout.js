import http from "./http.js";
import { loadAccountInfo } from "./home.js";
loadAccountInfo();
const loadCartInfo = async () => {
  const cartArtworks = await http.send("GET", "/api/v3/cart");
  let total = 0;
  const billing = document.querySelector(".billing-details");
  cartArtworks.forEach(async (artwork) => {
    total += artwork.price;
    billing.innerHTML += `
      <div class="billing-item">
        <p class="artwork-name">${artwork.name}</p>
        <p class="artwork-price">$ ${artwork.price}</p>
      </div>
    `;
  });
  const totalCart = document.querySelector("#amount");
  totalCart.value = `${total}`;
};
loadCartInfo();

const send = async (method, url) => {
  const data = await fetch(url, {
    method: method,
  }).then((res) =>
    res.json().then((data) => {
      return data;
    })
  );
  return data;
};

const form = document.querySelector("#createOrder");
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const data = new FormData(form);
  const amount = data.get("amount") * 23000;
  const url = await send("POST", `/checkout/create_payment_url/${amount}`);
  console.log(url);
  window.location.href = url.vnpUrl;
});
