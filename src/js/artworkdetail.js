import http from "./http.js";
import { loadAccountInfo } from "./home.js";
loadAccountInfo();

const artworkId = window.location.pathname.split("/")[3];
const loadArtworkDetail = async () => {
  const artwork = await http.send("GET", `/api/v2/artworks/${artworkId}`);
  const artworkImg = await http.send(
    "GET",
    `/api/v1/image/${artwork.artworkImage}`
  );
  const owner = await http.send("GET", `/api/v4/user/${artwork.ownerId}`);
  console.log(artwork);
  console.log(artworkImg);
  console.log(owner);
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
};
loadArtworkDetail();
