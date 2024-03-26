import http from "./http.js";
import { loadAccountInfo } from "./home.js";
loadAccountInfo();
const userTable = document.querySelector(".users-data");
const loadUserData = async () => {
  const users = await http.send("GET", "/api/v3/users");

  users.forEach((user) => {
    let status = user.online ? "Online" : "Offline";
    status = user.removed ? "Removed" : status;
    status = user.banned ? "Banned" : status;
    userTable.innerHTML += `
    <tr>
  
    <td>${user.userId}</td>
    <td>${user.firstName} ${user.lastName}</td>
    <td>${user.email}</td>
    <td>${user.phone}</td>
    <td>${user.address}</td>
    <td>${user.roleId}</td>
    <td>${status}</td>
    <td>
    <form action="">
    <input type="text" name="id" value="${user.userId}" hidden="" />
      <button class="trash" name="action" value="remove">
        <i class="bx bx-trash"></i></button
      ><button class="block" name="action" value="block">
        <i class="bx bx-block"></i>
      </button>
      </form>
    </td>
  
</tr>
    `;
  });
};
loadUserData();

userTable.addEventListener("click", async (e) => {
  e.preventDefault();
  console.log(e.target);
  const form = e.target.closest("form");
  const formData = new FormData(form);
  const userId = formData.get("id");
  if (e.target.className.includes("trash")) {
    await http.send("DELETE", `/api/v4/user/remove/${userId}`);
  } else if (e.target.className.includes("block")) {
    await http.send("PUT", `/api/v4/user/ban/${userId}`);
  }
  window.location.reload();
});
