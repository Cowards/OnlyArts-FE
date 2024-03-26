import http from "./http.js";
const logout = async () => {
  await http.send("DELETE", "/api/v1/authentication/logout").then((res) => {
    console.log(res);
    localStorage.removeItem("authtoken");
    window.location.href = "/login";
  });
  // localStorage.removeItem("authtoken");
  // window.location.href = "/login";
};
logout();
