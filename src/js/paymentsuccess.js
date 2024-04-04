import http from "./http.js";
import { loadAccountInfo } from "./home.js";
loadAccountInfo();

document.addEventListener("DOMContentLoaded", async () => {
  const amount = document.querySelector("#amount");
  amount.innerHTML = (
    parseInt(amount.innerHTML.replace("$", "")) / 2300000
  ).toFixed(2);
  const orderId = document.querySelector("#orderid").innerHTML;
  const bankCode = document.querySelector("#bankcode").innerHTML;
  const status = document.querySelector("#status");
  status.innerHTML = status.innerHTML === "00" ? "Success" : "Failed";
  const data = {
    orderId: orderId,
    paymentMethod: bankCode,
  };
  console.log(data);
  await http.send("POST", "/api/v3/orders", data);
  await http.send("DELETE", "/api/v3/cart");
});
