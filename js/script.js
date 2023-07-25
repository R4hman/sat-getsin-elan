const toggleOpen = document.querySelector(".toggle-open");
const toggleClose = document.querySelector(".toggle-close");
const modal = document.querySelector(".modal");
const searchInput = document.getElementById("search-input");
const inputResultContainer = document.querySelector(".input-result-container");
const headerSearchForm = document.querySelector(".header-search--form");
const lastSearches = document.querySelector(".last-searches");
const categoryLists = document.querySelector(".category-lists");
const categoryList = document.querySelector(".category-list");

const optionMenu = document.querySelector(".select-menu"),
  selectBtn = document.querySelector(".select-btn"),
  options = document.querySelectorAll(".option"),
  btnText = document.querySelector(".select-city");

// İMPORTS

import { showAdv } from "./showAdv.js";

//CATEGORY SELECTION
const CategoryOptionMenu = document.querySelector(".select-menu-category"),
  selectBtnCategory = document.querySelector(".select-btn-category"),
  optionsCategory = document.querySelectorAll(".category-option"),
  optionsCat = document.querySelectorAll(".cat-option"),
  btnTextCategory = document.querySelector(".select-category");

toggleOpen.addEventListener("click", () => {
  toggleOpen.classList.remove("active");
  toggleClose.classList.add("active");
  modal.style.display = "block";
});

toggleClose.addEventListener("click", () => {
  toggleClose.classList.remove("active");
  toggleOpen.classList.add("active");
  modal.style.display = "none";
});

// close the modal when it's clicked from outside
window.onclick = (e) => {
  if (e.target.classList.contains("modal")) {
    console.log("yes");
    modal.style.display = "none";
    toggleClose.classList.remove("active");
    toggleOpen.classList.add("active");
  }
};

// show search results whilst input is being focused
searchInput.addEventListener("click", () => {
  inputResultContainer.style.display = "block";
  toggleClose.classList.remove("active");
  toggleOpen.classList.add("active");
  modal.style.display = "none";
});

window.onclick = (e) => {
  if (e.target.classList.contains("input-result-container")) {
    inputResultContainer.style.display = "none";
  }
};

// searchInput.addEventListener("focusout", () => {
//   inputResultContainer.style.display = "none";
// });

// Category select FUNCTIONALITY

// selectBtnCategory.addEventListener("click", () => {
//   CategoryOptionMenu.classList.toggle("active");
// });

//City SELECTION FUNCTIONALITY
options.forEach((option, i) => {
  option.addEventListener("click", () => {
    btnText.innerHTML = option.innerHTML;

    optionMenu.classList.remove("active");
  });
});

selectBtn.addEventListener("click", () => {
  optionMenu.classList.toggle("active");
});

//FORM SUBMITTION
const input = document.querySelector("#search-input");
headerSearchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let val;

  const data = new FormData(headerSearchForm);
  const searches = JSON.parse(sessionStorage.getItem("recentSearches"));

  for (const [name, value] of data) {
    val = value;
    console.log(value);
    if (val.trim().length === 0) {
      return;
    }

    if (searches === null) {
      const data = [];
      data.push(value.trim());
      sessionStorage.setItem("recentSearches", JSON.stringify(data));
    } else {
      // console.log(Array.isArray(searches));
      searches.indexOf(value) === -1 && searches.push(value.trim());
      sessionStorage.setItem("recentSearches", JSON.stringify(searches));
    }
  }

  const val1 = input.value.trim();
  console.log(val1);

  if (val1) {
    window.location.replace(`products.html?query=${val1}`);
  } else {
  }

  document.forms[0].reset();
});

// ADD RECENT SEARCHES FROM SESSION STORAGE
function displayRecentSearch() {
  const searches = JSON.parse(sessionStorage.getItem("recentSearches"));
  if (searches) {
    searches.forEach((search) => {
      const el = document.createElement("span");
      el.classList.add("recent-searches");
      el.innerHTML = search;
      lastSearches.insertAdjacentElement("afterbegin", el);
    });
  }
}

// VIDEO IMG MODAL
// const advFiles = document.querySelectorAll(
//   ".single-adv_file-container .adv-file"
// );

// document.querySelector(".popup-cover span").onclick = () => {
//   document.querySelector(".file-popup").style.display = "none";
//   document.querySelector(" .show-popup-file-container iframe").src = "";

//   // document.querySelector(" .show-popup-file-container").innerHTML = "";
// };

// advFiles.forEach((file) => {
//   let el;
//   file.addEventListener("click", (e) => {
//     e.stopPropagation();
//     if (e.target.tagName === "DIV") {
//       el = e.target.parentElement.children[1];
//       document.querySelector(" .show-popup-file-container img").style.display =
//         "none";
//       document.querySelector(
//         " .show-popup-file-container iframe"
//       ).style.display = "block";
//       document.querySelector(" .show-popup-file-container iframe").src = el.src;
//     } else {
//       el = e.target;
//       document.querySelector(
//         " .show-popup-file-container iframe"
//       ).style.display = "none";
//       document.querySelector(" .show-popup-file-container img").style.display =
//         "block";
//       document.querySelector(" .show-popup-file-container img").src = el.src;
//     }

//     document.querySelector(".file-popup").style.display = "block";
//   });
// });

async function createCategoryList() {
  const data = await fetch("http://localhost:3000/categories");
  const res = await data.json();

  res.forEach((cat) => {
    // console.log(cat.name.toLowerCase().split(" ").join("-"));

    // if (cat.name === "Xidmətlər") {
    //   console.log("yes it is Xidmetler");
    // } else if (cat.name === "Nəqliyyat") {
    //   console.log("it is neqliyyat");
    // } else if (cat.name === "Uşaq aləmi") {
    //   console.log("it is usaq");
    //   cat.name = "Usaq alemi";
    // }

    const html = `
      <div class="category-list">
      <a href="advertisement.html?id=${cat["name-eng"]

        .toLowerCase()
        .split(" ")
        .join("-")
        .replace(",", "")
        .replaceAll("ə", "e")}">
    <div class="category-list--img-container">
      <img src="${cat.url}" alt="" />
    </div>
      <h3>${cat.name}</h3>
      </a>
  </div>
    `;
    categoryLists.insertAdjacentHTML("afterbegin", html);
  });
}

const dropdownLatest = document.querySelector(".dropdown-latest");

const spanFilters = document.querySelectorAll(".content-latest span");

spanFilters.forEach((sp) => {
  sp.addEventListener("click", (e) => {
    let data = getStorageItem("products");

    if (sp.dataset.id === "newest") {
      data = data.sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
      );
    }
    // console.log(data);

    if (sp.dataset.id === "cheap") {
      data = data.sort((a, b) => +b.price - +a.price);
    }

    if (sp.dataset.id === "expensive") {
      data = data.sort((a, b) => +a.price - +b.price);
    }

    setStorage("products", data);

    let el;
    let key;
    if (sp.closest(".section-vip-adv")) {
      el = sp.closest(".section-vip-adv").querySelector(".premium-lists");
      key = "vip";
      console.log(el);
    } else if (sp.closest(".section-last-adv")) {
      el = sp.closest(".section-last-adv").querySelector(".premium-lists");

      key = "forward";
    } else if (sp.closest(".index-premium")) {
      el = sp.closest(".index-premium").querySelector(".premium-lists");
      // el = sp.closest(".index-premium").querySelector(".premium-lists");
      // console.log(el);
      key = "premium";
      console.log(el);
    }

    // console.log(el);

    // funcTest();
    showAdv(data, el, key);
  });
});

// PRICE INPUT FUNCTION

//  FETCH DATA AND SAVE TO LOCAL STORAGE

const fetchAndSaveLocalStorage = async function (url) {
  const data = await fetch(url);
  const res = await data.json();

  setStorage("products", res);
};

function getStorageItem(item) {
  let storageItem = localStorage.getItem(item);
  if (storageItem) {
    storageItem = JSON.parse(localStorage.getItem(item));
  } else {
    storageItem = [];
  }

  return storageItem;
}

function setStorage(name, item) {
  localStorage.setItem(name, JSON.stringify(item));
}

function init() {
  displayRecentSearch();
  fetchAndSaveLocalStorage("http://localhost:3000/products");
  if (categoryLists) {
    createCategoryList();
  }
}

document.addEventListener("DOMContentLoaded", init);
