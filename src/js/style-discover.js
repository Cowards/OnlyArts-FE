const cateBtn = document.querySelector(".filter-btn");
const categoryForm = document.querySelector("#category-form");

cateBtn.addEventListener("click", () => {
  categoryForm.classList.toggle("active");
  cateBtn.classList.toggle("active");
});
