import http from "./http.js";
import { loadAccountInfo } from "./home.js";
loadAccountInfo();

document.querySelector("#image").addEventListener("change", (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.addEventListener("load", (event) => {
      document.querySelector("#imagePreview").src = event.target.result;
    });
    reader.readAsDataURL(file);
  }
});
document
  .querySelector("#publish-form")
  .addEventListener("submit", async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const image = formData.get("image");
    const name = formData.get("name");
    const description = formData.get("description");
    const cateId = formData.get("category");
    const price = formData.get("price");
    const status = formData.get("status") === "private" ? 4 : 0;
    // console.log(image, name, description, cateId, price, status);
    uploadImage(image).then((imageId) => {
      console.log(imageId);
      const artwork = {
        artworkImage: imageId,
        name: name,
        description: description,
        cateId: cateId,
        price: price,
        status: status,
      };
      try {
        http.send("POST", "/api/v2/artworks", artwork);
      } catch (error) {
        console.log(error);
      }
    });
  });

const loadImage = async (image) => {
  try {
    if (image) {
      const reader = new FileReader();

      return new Promise((resolve, reject) => {
        reader.onload = (e) => {
          const imageDataUrl = e.target.result;

          try {
            resolve(imageDataUrl);
          } catch (error) {
            reject(error);
          }
        };

        reader.readAsDataURL(image);
      });
    }
  } catch (error) {
    throw error;
  }
};

const uploadImage = async (image) => {
  try {
    const imageData = await loadImage(image);
    const _image = await http.send("POST", "/api/v1/image", { imageData });
    return _image.imageID;
  } catch (error) {
    console.log(error);
  }
};
