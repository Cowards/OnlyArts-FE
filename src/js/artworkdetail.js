import http from "./http.js";
import { loadAccountInfo } from "./home.js";
loadAccountInfo();
const reactBtn = document.querySelector("#react");
const inreactBtn = document.querySelector("#inreact");
const favorBtn = document.querySelector("#favor");
const unfavorBtn = document.querySelector("#unfavor");
const shareBtn = document.querySelector("#share");
const addCartBtn = document.querySelector("#addcart");
const downloadBtn = document.querySelector("#download");
const artworkId = window.location.pathname.split("/")[3];
let artworkImage;
const loadArtworkDetail = async () => {
  const artwork = await http.send("GET", `/api/v2/artworks/${artworkId}`);
  const artworkImg = await http.send(
    "GET",
    `/api/v1/image/${artwork.artworkImage}`
  );

  const owner = await http.send("GET", `/api/v4/user/${artwork.ownerId}`);
  const category = await http.send(
    "GET",
    `/api/v3/categories/${artwork.cateId}`
  );
  const categoryTag = document.querySelector(".category-tag");
  categoryTag.innerHTML = category.cateName;
  const premiumTag = document.querySelector(".premium-tag");
  const priceTag = document.querySelector(".price-tag");
  if (!artwork.price) {
    premiumTag.style.display = "none";
    priceTag.style.display = "none";

    downloadBtn.addEventListener("click", async () => {
      const img = document.querySelector("#artwork-img");
      const downloadLink = document.createElement("a");
      downloadLink.href = img.src;
      downloadLink.download = `artwork-${artworkId}.jpg`;
      downloadLink.click();
    });
  } else {
    priceTag.innerHTML = `$ ${artwork.price}`;

    downloadBtn.addEventListener("click", async () => {
      try {
        const checkBuy = await http.send("PUT", `/api/v3/artworks/isbuy`, {
          artworkId: artworkId,
        }).react;
        console.log(checkBuy);
        if (checkBuy) {
          const img = document.querySelector("#artwork-img");
          const downloadLink = document.createElement("a");
          downloadLink.href = img.src;
          downloadLink.download = `artwork-${artworkId}.jpg`;
          downloadLink.click();
        } else {
          alert("You have to buy this artwork to download it");
        }
      } catch (err) {
        console.log(err);
        window.location.href = "/login";
      }
    });

    ///////////////////////premium
    var noCopy = true;
    var noScreenshot = true;
    var noPrint = true;
    var autoBlur = true;
    if (noCopy) {
      document.body.oncopy = function () {
        return false;
      };
      document.body.oncontextmenu = function () {
        return false;
      };
      document.body.onselectstart = document.body.ondrag = function () {
        return false;
      };
      document.onkeydown = function () {
        if (
          (event.ctrlKey == true || event.metaKey == true) &&
          event.keyCode == 83
        ) {
          event.preventDefault();
        }
        if (
          (event.ctrlKey == true || event.metaKey == true) &&
          event.code == 83
        ) {
          event.preventDefault();
        }
      };
    }

    if (noPrint) {
      var c = document.createElement("span");
      c.style.display = "none";
      c.style.postion = "absolute";
      c.style.background = "#000";
      var first = document.body.firstChild;
      var wraphtml = document.body.insertBefore(c, first);
      c.setAttribute("width", document.body.scrollWidth);
      c.setAttribute("height", document.body.scrollHeight);
      c.style.display = "block";
      var cssNode3 = document.createElement("style");
      cssNode3.type = "text/css";
      cssNode3.media = "print";
      cssNode3.innerHTML = "body{display:none}";
      document.head.appendChild(cssNode3);
    }

    var cssNode2 = document.createElement("style");
    cssNode2.type = "text/css";
    cssNode2.media = "screen";
    cssNode2.innerHTML =
      "div{-webkit-touch-callout: none;-webkit-user-select: none;-khtml-user-select: none;-moz-user-select: none;-ms-user-select: none;user-select: none;}";
    document.head.appendChild(cssNode2);
    document.body.style.cssText =
      "-webkit-touch-callout: none;-webkit-user-select: none;-khtml-user-select: none;-moz-user-select: none;-ms-user-select: none;user-select: none;";

    function toBlur() {
      const img = document.querySelector("#artwork-img");
      img.src += "#####";
      if (autoBlur)
        document.body.style.cssText =
          "-webkit-filter: blur(5px);-moz-filter: blur(5px);-ms-filter: blur(5px);-o-filter: blur(5px);filter: blur(5px);";
    }

    function toClear() {
      const img = document.querySelector("#artwork-img");
      img.src = img.src.replaceAll("#####", "");
      document.body.style.cssText =
        "-webkit-filter: blur(0px);-moz-filter: blur(0px);-ms-filter: blur(0px);-o-filter: blur(0px);filter: blur(0px);";
    }

    document.onclick = function (event) {
      toClear();
    };

    document.onmouseleave = function (event) {
      toBlur();
    };

    document.onblur = function (event) {
      toBlur();
    };

    document.addEventListener("keyup", (e) => {
      if (e.key == "PrintScreen") {
        if (noScreenshot) {
          navigator.clipboard.writeText("");
        }
      }
    });

    document.addEventListener("keydown", (e) => {
      if (e.ctrlKey && e.key == "p") {
        if (noPrint) {
          e.cancelBubble = true;
          e.preventDefault();
          e.stopImmediatePropagation();
        }
      }
    });
  }
  const img = document.querySelector("#artwork-img");
  artworkImage = artworkImg.imageData;
  img.src = artworkImage;
  const description = document.querySelector("#description");
  const title = document.querySelector("title");
  title.innerHTML = `${artwork.name} - ${
    owner.firstName + " " + owner.lastName
  }`;
  const reactions = await http.send(
    "GET",
    `/api/v2/reactions/${artwork.artworkId}`
  );
  document.querySelector("#reactions").innerHTML = reactions.length;
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

  try {
    const checkCart = await http.send("GET", `/api/v3/cart/${artworkId}`).react;
    if (!artwork.price || checkCart) {
      addCartBtn.style.display = "none";
    }
  } catch {
    addCartBtn.style.display = "none";
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
      <a class="commenter-name" href="/profile/${commenter.userId}">
      ${commenter.firstName} ${commenter.lastName}</a>
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
  try {
    const checkReact = (
      await http.send("PUT", `/api/v2/reactions/${artworkId}`)
    ).react;
    if (checkReact) {
      reactBtn.style.display = "none";
    } else {
      inreactBtn.style.display = "none";
    }
  } catch {
    inreactBtn.style.display = "none";
  }
  try {
    const checkFavor = (await http.send("PUT", `/api/v2/favorite/${artworkId}`))
      .react;
    if (checkFavor) {
      favorBtn.style.display = "none";
    } else {
      unfavorBtn.style.display = "none";
    }
  } catch {
    unfavorBtn.style.display = "none";
  }
};
loadButtons();

reactBtn.addEventListener("click", async () => {
  try {
    await http.send("POST", `/api/v2/reactions`, {
      artworkId: artworkId,
    });
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
    await http.send("POST", `/api/v2/favorite/`, {
      artworkId: artworkId,
    });
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
addCartBtn.addEventListener("click", async () => {
  try {
    await http.send("POST", `/api/v3/cart`, {
      artworkId: artworkId,
    });
    window.location.reload();
  } catch (err) {
    if (err === "You have already added this artwork to your cart") {
      alert(err);
    } else {
      window.location.href = "/login";
    }
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

const popupClose = document.querySelector(".popup-close");
const popup = document.querySelector(".artwork-popup");
const fbShareBtn = document.querySelector("#share-to-fb-btn");
const twShareBtn = document.querySelector("#share-to-twitter-btn");
const instagramShareBtn = document.querySelector("#share-to-instagram-btn");
const pinterestShareBtn = document.querySelector("#share-to-pinterest-btn");
const telegramShareBtn = document.querySelector("#share-to-telegram-btn");
const thisUrl = window.location.href;
const shareUrl = encodeURIComponent(thisUrl);
fbShareBtn.href = `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`;
twShareBtn.href = `https://twitter.com/intent/tweet?url=${shareUrl}`;
instagramShareBtn.href = `https://www.instagram.com/?url=${shareUrl}`;
pinterestShareBtn.href = `https://pinterest.com/pin/create/button/?url=${shareUrl}`;
telegramShareBtn.href = `https://t.me/share/url?url=${shareUrl}`;
const linkCopyBtn = document.querySelector("#link-copy");
const linkToArtwork = document.querySelector("#link-to-artwork");
linkToArtwork.value = thisUrl;
linkCopyBtn.addEventListener("click", async () => {
  await navigator.clipboard.writeText(thisUrl);
});
shareBtn.addEventListener("click", () => {
  popup.style.display = "block";
});
popupClose.addEventListener("click", () => {
  popup.style.display = "none";
});
