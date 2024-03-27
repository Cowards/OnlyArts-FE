import http from "./http.js"; // Import the http module
import { loadAccountInfo } from "./home.js"; // Import the loadAccountInfo function from the home module
loadAccountInfo(); // Call the loadAccountInfo function
const currentProfile = window.location.pathname.split("/")[2]; // Get the current profile from the URL

const followBtn = document.querySelector("#btn-follow"); // Get the follow button
const unfollowBtn = document.querySelector("#btn-unfollow"); // Get the unfollow button
const requestBtn = document.querySelector("#btn-request"); // Get the request button
const publishBtn = document.querySelector("#btn-publish"); // Get the publish button
const changePwBtn = document.querySelector("#btn-change-pw"); // Get the change password button
const updateBtn = document.querySelector("#btn-update"); // Get the update button

const loadProfile = async () => {
  try {
    const profile = await http.send("GET", `/api/v4/user/${currentProfile}`);
    let avatar = profile.avatar;
    if (avatar === null) {
      avatar = "/img/user.png";
    } else {
      avatar = (await http.send("GET", `/api/v1/image/${avatar}`)).imageData;
    }
    const profileImg = document.querySelector(".account-img>img");
    profileImg.src = avatar;
    const profileName = document.querySelector(".account-name");
    profileName.innerHTML = `${profile.firstName} ${profile.lastName}`;
    const profileBio = document.querySelector(".account-bio");
    profileBio.innerHTML = profile.bio;
    const followings = await http.send(
      "GET",
      `/api/v4/follow/following/${currentProfile}`
    );
    const followers = await http.send(
      "GET",
      `/api/v4/follow/follower/${currentProfile}`
    );
    const profileFollowers = document.querySelector(".followers");
    profileFollowers.innerHTML = `${followers.length} Followers`;
    const profileFollowing = document.querySelector(".followings");
    profileFollowing.innerHTML = `${followings.length} Followings`;

    const loginUser = localStorage.getItem("userId");
    console.log(loginUser);
    if (loginUser === currentProfile) {
      followBtn.style.display = "none";
      unfollowBtn.style.display = "none";
      requestBtn.style.display = "none";
      if (profile.roleId !== "CR") {
        publishBtn.style.display = "none";
      }
    } else {
      if (profile.roleId !== "CR") {
        requestBtn.style.display = "none";
      }
      updateBtn.style.display = "none";
      changePwBtn.style.display = "none";
      publishBtn.style.display = "none";
      try {
        const follow = await http.send(
          "GET",
          `/api/v4/follow/${currentProfile}`
        );
        if (follow.follow) {
          followBtn.style.display = "none";
        } else {
          unfollowBtn.style.display = "none";
        }
      } catch {
        unfollowBtn.style.display = "none";
      }
    }

    const roleInfo = document.querySelector(".info-block>.role");
    const phoneInfo = document.querySelector(".info-block>.phone");
    const emailInfo = document.querySelector(".info-block>.email");
    const addressInfo = document.querySelector(".info-block>.address");
    const role =
      profile.roleId === "AD"
        ? "Admin"
        : profile.roleId === "CR"
        ? "Creator"
        : "Audience";
    roleInfo.innerHTML = `${role}`;
    phoneInfo.innerHTML = `${profile.phone}`;
    emailInfo.innerHTML = `${profile.email}`;
    addressInfo.innerHTML = `${profile.address}`;

    const artworks =
      profile.roleId === "CR"
        ? await http.send(
            "GET",
            `/api/v2/artworks/creator/${profile.firstName} ${profile.lastName}`
          )
        : await http.send("GET", `/api/v4/favor/${currentProfile}`);
    console.log(artworks);
    document.querySelector("#artwork>.title").innerHTML = `${
      profile.roleId === "CR" ? " Published Artworks" : "Favorite Artworks"
    }`;
    const artworkContainer = document.querySelector(".card-holder");
    if (artworks.length === 0) {
      artworkContainer.innerHTML = "No artworks found";
    } else {
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
        artworkContainer.innerHTML += `
              <div class="card">
              <a class="product-block" href="/discover/artwork/${
                artwork.artworkId
              }">
                <div class="card-img img">
                <img src="${artworkImg.imageData}" alt="" />
                </div>
                <div class="product-info">
                ${
                  artwork.price > 0
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
    }
  } catch {}
  // Get the profile data
};
loadProfile(); // Call the loadProfile function

followBtn.addEventListener("click", async () => {
  try {
    await http.send("POST", `/api/v4/follow/${currentProfile}`);
    window.location.reload();
  } catch {
    window.location.href = "/login";
  }
});
unfollowBtn.addEventListener("click", async () => {
  try {
    await http.send("DELETE", `/api/v4/follow/${currentProfile}`);
    window.location.reload();
  } catch {
    window.location.href = "/login";
  }
});
publishBtn.addEventListener("click", () => {
  window.location.href = "/publish";
});
