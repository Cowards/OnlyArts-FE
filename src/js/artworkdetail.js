import http from "./http.js";
import { loadAccountInfo } from "./home.js";
loadAccountInfo();
const reactBtn = document.querySelector("#react");
const inreactBtn = document.querySelector("#inreact");
const favorBtn = document.querySelector("#favor");
const unfavorBtn = document.querySelector("#unfavor");
const artworkId = window.location.pathname.split("/")[3];
const loadArtworkDetail = async () => {
  const artwork = await http.send("GET", `/api/v2/artworks/${artworkId}`);
  const artworkImg = await http.send(
    "GET",
    `/api/v1/image/${artwork.artworkImage}`
  );
  const title = document.querySelector("title");
  title.innerHTML = `${artwork.name} - OnlyArts`;
  const owner = await http.send("GET", `/api/v4/user/${artwork.ownerId}`);

  const img = document.querySelector("#artwork-img");
  img.src = artworkImg.imageData;
  const description = document.querySelector("#description");
  description.innerHTML = `<a class="author-name" href="/profile/${
    owner.userId
  }">${owner.firstName + " " + owner.lastName + " "}</a>${artwork.description}`;
  const ownerImg =
    owner.avatar === null
      ? "/img/user.png"
      : (await http.send("GET", `/api/v1/image/${owner.avatar}`)).imageData;
  const ownerImgElement = document.querySelector(".author-img>img");
  ownerImgElement.src = ownerImg;
  const publishDate = document.querySelector(".publishdate");
  const releasedDate = new Date(artwork.releasedDate);
  const formattedDate = `${releasedDate.getDate()}-${
    releasedDate.getMonth() + 1
  }-${releasedDate.getFullYear()}`;
  publishDate.innerHTML = formattedDate;

  try {
    const checkReact = await http.send("PUT", `/api/v2/reactions/${artworkId}`);
    const checkFavor = await http.send("PUT", `/api/v2/favorite/${artworkId}`);
    if (checkReact.react) {
      reactBtn.style.display = "none";
    } else {
      inreactBtn.style.display = "none";
    }
    if (checkFavor.react) {
      favorBtn.style.display = "none";
    } else {
      unfavorBtn.style.display = "none";
    }
  } catch {
    inreactBtn.style.display = "none";
    unfavorBtn.style.display = "none";
  }

  const comments = await http.send("GET", `/api/v2/comments/${artworkId}`);
  const commentContainer = document.querySelector(".right-center");
  comments.forEach(async (comment) => {
    const commenter = await http.send(
      "GET",
      `/api/v4/user/${comment.commenterId}`
    );
    const commentDate = new Date(comment.comment_time);
    commentContainer.innerHTML += `
    <div class="comment-block">
      <p id="description">
      <a class="commenter-name" href="">${commenter.firstName} ${
      commenter.lastName
    }</a>
      ${comment.description}
      </p>
      <p class="comment-time">${commentDate.getDate()}-${
      commentDate.getMonth() + 1
    }-${commentDate.getFullYear()}</p>
    </div>
    `;
  });
};
const loadButtons = async () => {
  const checkReact = (await http.send("PUT", `/api/v2/reactions/${artworkId}`))
    .react;
  if (checkReact) {
    reactBtn.style.display = "none";
  } else {
    inreactBtn.style.display = "none";
  }
  const checkFavor = (await http.send("PUT", `/api/v2/favorite/${artworkId}`))
    .react;
  if (checkFavor) {
    favorBtn.style.display = "none";
  } else {
    unfavorBtn.style.display = "none";
  }
};
loadButtons();

reactBtn.addEventListener("click", async () => {
  try {
    await http.send("POST", `/api/v2/reactions`, { artworkId: artworkId });
    window.location.reload();
  } catch {
    window.location.href = "/login";
  }
});
inreactBtn.addEventListener("click", async () => {
  try {
    await http.send("DELETE", `/api/v2/reactions/${artworkId}`);
    window.location.reload();
  } catch {
    window.location.href = "/login";
  }
});
favorBtn.addEventListener("click", async () => {
  try {
    await http.send("POST", `/api/v2/favorite/`, { artworkId: artworkId });
    window.location.reload();
  } catch {
    window.location.href = "/login";
  }
});
unfavorBtn.addEventListener("click", async () => {
  try {
    await http.send("DELETE", `/api/v2/favorite/${artworkId}`);
    window.location.reload();
  } catch {
    window.location.href = "/login";
  }
});
const commentForm = document.querySelector(".comment-form");
commentForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const comment = document.querySelector("#comment").value;
  try {
    await http.send("POST", `/api/v2/comments`, {
      artworkId: artworkId,
      description: comment,
    });
    window.location.reload();
  } catch {
    window.location.href = "/login";
  }
});

loadArtworkDetail();
