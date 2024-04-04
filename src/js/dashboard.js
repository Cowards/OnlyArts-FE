import http from "./http.js";
import { loadAccountInfo } from "./home.js";
loadAccountInfo();

const loadDashboard = async () => {
  const artworks = await http.send("GET", "/api/v2/artworks");
  const users = await http.send("GET", "/api/v3/users");
  const orders = await http.send("GET", "/api/v3/orders");
  artworks.sort((a, b) => {
    return a.releaseDate - b.releaseDate;
  });
  users.sort((a, b) => {
    return b.joinDate - a.joinDate;
  });
  const artworkCount = document.querySelector("#artwork-count");
  artworkCount.textContent = artworks.length;
  const userCount = document.querySelector("#user-count");
  userCount.textContent = users.length;
  const orderCount = document.querySelector("#order-count");
  orderCount.textContent = orders.length;
  let totalProfit = 0;
  orders.forEach((order) => {
    totalProfit += Math.round(order.totalPrice * 0.05 * 100) / 100;
  });
  const profit = document.querySelector("#profit-count");
  profit.textContent = totalProfit;
  const firstArtworks = artworks.slice(0, 8);
  const firstUsers = users.slice(0, 10);
  const firstOrders = orders.slice(0, 10);
  const artworkCardHoler = document.querySelector(".card-holder");
  firstArtworks.forEach(async (artwork) => {
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
  const userCardHolder = document.querySelector(".user-list");
  const orderCardHolder = document.querySelector(".order-list");
  firstUsers.forEach((user) => {
    const joinDate = new Date(user.joinDate);
    userCardHolder.innerHTML += `
        <tr>
          <td>${user.roleId}</td>
          <td>${user.firstName + " " + user.lastName}</td>
          <td>${user.email}</td>
          <td>${joinDate.getDate()}-${
      joinDate.getMonth() + 1
    }-${joinDate.getFullYear()}</td>
        </tr>
    `;
  });
  firstOrders.forEach((order) => {
    console.log(order);
    const orderDate = new Date(order.orderTime);
    orderCardHolder.innerHTML += `
      <tr>
        <td>${order.orderId}</td>
        <td>${orderDate.getDate()}-${
      orderDate.getMonth() + 1
    }-${orderDate.getFullYear()}</td>
        <td>${order.totalPrice}</td>
        <td>${order.paymentMethod}</td>
      </tr>
        `;
  });
};

loadDashboard();
