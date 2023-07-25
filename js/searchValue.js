"use strict";

const form = document.querySelector(".header-search--form");
const mainSearchInput = document.querySelector("#search-input");
const relatedResults = document.querySelector(".related-results");

const fetchData = async (url) => {
  const data = await fetch(url);

  const response = await data.json();

  searchValue(response);
};

function searchValue(data) {
  form.addEventListener("keyup", function () {
    if (relatedResults.children.length > 1) {
      relatedResults.children[1].remove();
    }
    const value = mainSearchInput.value.trim();

    // console.log(data);
    let response = data.filter((db) => {
      // console.log(db.productName);
      return db.productName.toLowerCase().trim().includes(value.toLowerCase());
    });
    // console.log(response);
    if (response.length === data.length) {
      response = [];
    }
    if (response.length > 0) {
      const listItems = document.createElement("ul");
      listItems.classList.add("result-lists");
      response.forEach((item) => {
        const listItem = document.createElement("li");
        listItem.classList.add("result-list");
        // const highlight = (value.style.color = "red");
        // const val = item.productName.split(" ").find((el) => el === value);
        // console.log(val);
        const index = item.productName.toLowerCase().indexOf(value);
        // console.log(item.productName.toLowerCase().indexOf(value));
        // console.log(item.productName.slice(index, value.length));
        listItem.innerHTML = `
          <a class="highlight-val" href="http://127.0.0.1:8080/products.html?query=${value}">${item.productName}</a>
          `;

        listItems.appendChild(listItem);
      });
      relatedResults.appendChild(listItems);
    }
  });
}

function Init() {
  fetchData("http://localhost:3000/products");
  document.querySelector(".input-result-container").style.display = "none";
}

window.addEventListener("DOMContentLoaded", Init);

export { searchValue };
