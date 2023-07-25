const catNamePath = document.querySelector(
  ".section-category-advertisement .namepath"
);
const namePathSubCat = document.querySelector(".namepath-subcategory");
const namePathCat = document.querySelector(".namepath-category");
const subCategoryTitle = document.querySelector(".subcategory-title h1");
const subCategoryCounter = document.querySelector(".subcategory-title span");
const subCatMainCat = document.querySelector(".subcategory-main-container");
const subCatMainCatTop = document.querySelector(
  ".subcategory-main-container-top"
);

const subCatLists = document.querySelector(".subcat-main-container-top ul");

console.log(subCatLists);

console.log(catNamePath);
const subCatMainCatBottom = document.querySelector(
  ".subcategory-main-container-bottom"
);
const changeAdvName = async function () {
  let urlId = window.location.search;
  console.log(urlId);
  urlId = urlId.slice(4).split("-")[0];
  console.log(urlId);
  console.log(urlId.slice(4).split("-")[0].replaceAll("e", "ə"));

  try {
    const data = await fetch("http://localhost:3000/categories");
    const res = await data.json();
    console.log(urlId);
    res.forEach((m) => console.log(m.name));
    const d = res.filter((r) =>
      r["name-eng"].startsWith(urlId[0].toUpperCase() + urlId.slice(1), 0)
    );
    console.log(d);
    console.log(res);

    console.log(d[0]);
    console.log(catNamePath);

    namePathCat.innerText = d[0].name;
    namePathSubCat.innerText = d[0].classes[0].title;
    subCategoryTitle.innerText = d[0].classes[0].title;
    console.log(d[0].classes[0]);
    d[0].classes[0].subCategories.forEach((item) => {
      const html = `
        <li>${item} <span>${item.length}</span></li>
        `;

      subCatLists.insertAdjacentHTML("afterbegin", html);
    });
  } catch (error) {
    console.log(error);
  }
};

function init() {
  changeAdvName();
}

window.addEventListener("DOMContentLoaded", init); //
